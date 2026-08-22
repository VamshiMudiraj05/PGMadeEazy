import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Download, ArrowLeft, ShieldCheck, Sparkles, Building, Calendar, DollarSign, FileText } from 'lucide-react';
import { bookingApi } from '../../../services/api';
import { toast } from 'react-hot-toast';

const PayPalSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const processPayment = async () => {
    try {
      const paymentId = searchParams.get('paymentId');
      const PayerID = searchParams.get('PayerID');

      if (!paymentId || !PayerID) {
        throw new Error('Missing payment information from PayPal');
      }

      const pendingBookingStr = localStorage.getItem('pendingBooking');
      if (!pendingBookingStr) {
        throw new Error('No pending booking record found');
      }

      const pendingBooking = JSON.parse(pendingBookingStr);
      if (!pendingBooking || !pendingBooking.id) {
        throw new Error('Invalid pending booking data');
      }

      const paymentResult = await bookingApi.executePayPalPayment(paymentId, PayerID);

      if (paymentResult.state !== 'approved') {
        throw new Error('Payment was not approved by PayPal');
      }

      await bookingApi.updateBookingStatus(pendingBooking.id, 'CONFIRMED');

      setReceipt({
        bookingId: pendingBooking.id,
        propertyName: pendingBooking.propertyName,
        checkInDate: new Date(pendingBooking.checkInDate).toLocaleDateString(),
        checkOutDate: new Date(pendingBooking.checkOutDate).toLocaleDateString(),
        numberOfGuests: pendingBooking.numberOfGuests,
        totalAmount: pendingBooking.totalAmount,
        paymentId: paymentId,
        paymentDate: new Date().toLocaleDateString(),
        paymentMethod: 'PayPal Digital Escrow'
      });

      localStorage.removeItem('pendingBooking');
      toast.success('Payment confirmed! Reservation active.');
    } catch (error) {
      console.error('Payment processing error:', error);
      setError(error.message || 'Failed to process payment');
      toast.error(error.message || 'Failed to process payment');

      // Attempt to clean up pending booking status in backend
      const pendingBookingStr = localStorage.getItem('pendingBooking');
      if (pendingBookingStr) {
        try {
          const pendingBooking = JSON.parse(pendingBookingStr);
          if (pendingBooking.id) {
            bookingApi.updateBookingStatus(pendingBooking.id, 'CANCELLED')
              .catch(e => console.warn('Could not cancel booking on backend:', e));
          }
        } catch (e) {
          // ignore
        }
        localStorage.removeItem('pendingBooking');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    processPayment();
  }, []);

  const handleDownloadReceipt = () => {
    if (!receipt) return;
    const receiptContent = `
=========================================
          PG MADE EAZY DIGITAL RECEIPT   
=========================================
Booking ID:     ${receipt.bookingId}
Property:       ${receipt.propertyName}
Check-in Date:  ${receipt.checkInDate}
Check-out Date: ${receipt.checkOutDate}
Guests:         ${receipt.numberOfGuests}
Total Fare:     $${receipt.totalAmount} USD
Transaction ID: ${receipt.paymentId}
Issued Date:    ${receipt.paymentDate}
Payment Mode:   ${receipt.paymentMethod}
Status:         CONFIRMED & PAID
=========================================
Thank you for choosing PG Made Eazy!
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-receipt-${receipt.bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#0B0B0E] flex flex-col items-center justify-center gap-3 text-[#FAFAFA]">
        <div className="h-6 w-6 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#7A7A85]">Verifying gateway settlement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#0B0B0E] flex items-center justify-center p-4 text-[#FAFAFA]">
        <div className="p-8 sm:p-10 rounded-sm max-w-md w-full bg-[#121217] border border-red-500/30 text-center shadow-2xl space-y-6">
          <div className="h-12 w-12 rounded-sm bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mx-auto">
            <CheckCircle2 className="w-6 h-6 rotate-45" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight">Payment Verification Failed</h2>
            <p className="text-xs text-red-400 leading-relaxed bg-[#0B0B0E] p-3 rounded-sm border border-red-500/20">
              {error}
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => navigate('/seeker-dashboard/find-pg')}
              className="w-full py-2.5 px-4 rounded-sm font-bold text-xs uppercase tracking-wider bg-[#FF5A36] hover:bg-[#E54B28] text-white transition-colors"
            >
              Try Reserving Again
            </button>
            
            <button
              onClick={() => navigate('/seeker-dashboard/bookings')}
              className="w-full py-2.5 px-4 rounded-sm font-bold text-xs uppercase tracking-wider bg-[#181820] border border-[#22222A] text-white hover:bg-[#22222A] transition-colors"
            >
              View My Reservations
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="w-full py-2 text-[#7A7A85] hover:text-white font-semibold text-xs transition-colors"
            >
              Contact Support Desk
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (receipt) {
    return (
      <div className="min-h-screen bg-[#0B0B0E] text-[#FAFAFA] py-12 px-4 flex items-center justify-center">
        <div className="p-8 rounded-sm max-w-lg w-full bg-[#121217] border border-[#1E1E26] shadow-2xl relative space-y-6">
          
          {/* Success Banner */}
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-sm bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              Transaction Settled
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">Stay Reservation Confirmed</h2>
            <p className="text-xs text-[#7A7A85]">Your digital escrow payment has been processed and host notified.</p>
          </div>

          {/* Digital Receipt Card */}
          <div className="p-5 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-[#7A7A85]">
              <span>Booking Reference:</span>
              <span className="font-mono text-white font-bold">{receipt.bookingId}</span>
            </div>
            <div className="flex justify-between items-center text-[#7A7A85]">
              <span>Accommodation:</span>
              <span className="text-white font-medium">{receipt.propertyName}</span>
            </div>
            <div className="flex justify-between items-center text-[#7A7A85]">
              <span>Check-in Date:</span>
              <span className="text-white font-medium">{receipt.checkInDate}</span>
            </div>
            <div className="flex justify-between items-center text-[#7A7A85]">
              <span>Check-out Date:</span>
              <span className="text-white font-medium">{receipt.checkOutDate}</span>
            </div>
            <div className="flex justify-between items-center text-[#7A7A85]">
              <span>Occupants:</span>
              <span className="text-white font-medium">{receipt.numberOfGuests} Resident(s)</span>
            </div>
            <div className="pt-2 border-t border-[#1E1E26] flex justify-between items-baseline">
              <span className="font-bold text-white uppercase tracking-wider">Total Paid:</span>
              <span className="text-lg font-bold text-[#FF5A36]">${receipt.totalAmount} USD</span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-[#7A7A85] pt-1">
              <span>Gateway Transaction ID:</span>
              <span className="font-mono">{receipt.paymentId}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5">
            <button
              onClick={handleDownloadReceipt}
              className="w-full py-3 px-4 rounded-sm font-bold text-xs uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Tax Invoice (.txt)</span>
            </button>
            
            <button
              onClick={() => navigate('/seeker-dashboard/bookings')}
              className="w-full py-3 px-4 rounded-sm font-bold text-xs uppercase tracking-wider bg-[#181820] border border-[#22222A] text-white hover:bg-[#22222A] transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span>Go to My Reservations</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return null;
};

export default PayPalSuccess;