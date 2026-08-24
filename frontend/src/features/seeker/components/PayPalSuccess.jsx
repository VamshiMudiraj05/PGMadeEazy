import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Download, ArrowLeft } from 'lucide-react';
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
      <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex flex-col items-center justify-center gap-4 text-white select-none">
        <div className="h-8 w-8 border-3 border-[#E50914] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#E50914]" />
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Verifying gateway settlement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex items-center justify-center p-4 text-white select-none relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

        <div className="p-8 sm:p-10 rounded-2xl max-w-md w-full bg-[#141414] border border-white/10 text-center shadow-2xl space-y-6">
          <div className="h-14 w-14 rounded-2xl bg-red-600/15 border border-red-600/30 flex items-center justify-center text-[#E50914] mx-auto shadow-[0_0_15px_rgba(229,9,20,0.3)]">
            <CheckCircle2 className="w-7 h-7 rotate-45" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Payment Verification Failed</h2>
            <p className="text-xs text-red-400 leading-relaxed bg-black/60 p-3.5 rounded-xl border border-red-500/20">
              {error}
            </p>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => navigate('/seeker-dashboard/find-pg')}
              className="w-full py-3.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider bg-[#E50914] hover:bg-[#b80710] text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              Try Reserving Again
            </button>
            
            <button
              onClick={() => navigate('/seeker-dashboard/bookings')}
              className="w-full py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              View My Reservations
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="w-full py-2 text-neutral-400 hover:text-white font-semibold text-xs transition-colors cursor-pointer"
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
      <div className="min-h-screen bg-[#050505] text-white py-12 px-4 flex items-center justify-center select-none relative">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

        <div className="p-8 rounded-2xl max-w-lg w-full bg-[#141414] border border-white/10 shadow-2xl relative space-y-6">
          
          {/* Success Banner */}
          <div className="text-center space-y-2">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
              TRANSACTION SETTLED
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Stay Reservation Confirmed</h2>
            <p className="text-xs text-neutral-400">Your digital escrow payment has been processed and host notified.</p>
          </div>

          {/* Digital Receipt Card */}
          <div className="p-5 rounded-xl bg-black/60 border border-white/10 space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-neutral-400">
              <span>Booking Reference:</span>
              <span className="font-mono text-white font-bold">{receipt.bookingId}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-400">
              <span>Accommodation:</span>
              <span className="text-white font-medium">{receipt.propertyName}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-400">
              <span>Check-in Date:</span>
              <span className="text-white font-medium">{receipt.checkInDate}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-400">
              <span>Check-out Date:</span>
              <span className="text-white font-medium">{receipt.checkOutDate}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-400">
              <span>Occupants:</span>
              <span className="text-white font-medium">{receipt.numberOfGuests} Resident(s)</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
              <span className="font-bold text-white uppercase tracking-wider">Total Paid:</span>
              <span className="text-lg font-extrabold text-[#E50914]">${receipt.totalAmount} USD</span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-neutral-400 pt-1">
              <span>Gateway Transaction ID:</span>
              <span className="font-mono">{receipt.paymentId}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5">
            <button
              onClick={handleDownloadReceipt}
              className="w-full py-3.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider text-black bg-emerald-500 hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Tax Invoice (.txt)</span>
            </button>
            
            <button
              onClick={() => navigate('/seeker-dashboard/bookings')}
              className="w-full py-3.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider bg-white/5 border border-white/10 text-white hover:bg-[#E50914] hover:border-[#E50914] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#E50914]" />
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