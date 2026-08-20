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
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex flex-col items-center justify-center gap-4 text-zinc-100">
        <div className="h-12 w-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin glow-orange-sm" />
        <p className="text-sm font-semibold text-zinc-400">Verifying PayPal escrow payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex items-center justify-center p-4 text-zinc-100 selection:bg-orange-500 selection:text-white">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl max-w-md w-full border border-red-500/30 text-center shadow-2xl glow-orange-sm">
          <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mx-auto mb-4">
            <XCircle className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">Payment Verification Failed</h2>
          <p className="text-xs text-red-400 mb-6 leading-relaxed bg-red-500/10 p-3 rounded-xl border border-red-500/20">
            {error}
          </p>

          <div className="space-y-2.5">
            <button
              onClick={() => navigate('/seeker-dashboard/find-pg')}
              className="w-full py-3.5 px-6 rounded-xl font-extrabold text-xs bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Booking Again</span>
            </button>
            
            <button
              onClick={() => navigate('/seeker-dashboard/bookings')}
              className="w-full py-3 px-6 rounded-xl font-bold text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/40 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>View My Reservations</span>
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="w-full py-2.5 px-6 text-zinc-400 hover:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>Need Help? Contact Support</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (receipt) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 flex items-center justify-center selection:bg-orange-500 selection:text-white">
        <div className="glass-panel p-8 rounded-3xl max-w-lg w-full border border-zinc-800 shadow-2xl glow-orange-sm relative">
          
          {/* Success Banner */}
          <div className="text-center mb-6">
            <div className="h-16 w-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-lg">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-block mb-1">
              Payment Verified
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Stay Reservation Confirmed!</h2>
            <p className="text-xs text-zinc-400 mt-1">Your payment has been processed and host notified.</p>
          </div>

          {/* Digital Receipt Card */}
          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3 mb-6 text-xs">
            <div className="flex justify-between items-center text-zinc-400">
              <span>Booking Reference:</span>
              <span className="font-mono text-zinc-200 font-bold">{receipt.bookingId}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Accommodation:</span>
              <span className="text-zinc-200 font-semibold">{receipt.propertyName}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Check-in Date:</span>
              <span className="text-zinc-200">{receipt.checkInDate}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Check-out Date:</span>
              <span className="text-zinc-200">{receipt.checkOutDate}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Total Occupants:</span>
              <span className="text-zinc-200">{receipt.numberOfGuests} Resident(s)</span>
            </div>
            <div className="pt-2 border-t border-zinc-800 flex justify-between items-baseline">
              <span className="font-bold text-white uppercase tracking-wider">Total Paid:</span>
              <span className="text-lg font-extrabold text-orange-400">${receipt.totalAmount} USD</span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-1">
              <span>PayPal Transaction ID:</span>
              <span className="font-mono">{receipt.paymentId}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <button
              onClick={handleDownloadReceipt}
              className="w-full py-3.5 px-6 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Digital Receipt (.txt)</span>
            </button>
            
            <button
              onClick={() => navigate('/seeker-dashboard/bookings')}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/40 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 text-orange-500" />
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