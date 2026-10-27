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
      <div className="min-h-[calc(100vh-140px)] bg-[#0b0b0d] flex flex-col items-center justify-center gap-4 text-white select-none">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-none animate-spin shadow-[0_0_10px_#ffb000]" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
          VERIFYING PAYPAL ESCROW SETTLEMENT...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#0b0b0d] flex items-center justify-center p-4 text-white select-none relative">
        <div className="board max-w-md w-full text-center space-y-6">
          <div className="p-3 bg-[#0b0b0d] border border-[#ff4b4b]/40 text-[#ff4b4b] w-12 h-12 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6 rotate-45" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold uppercase tracking-[0.14em] text-white font-['Big_Shoulders_Display']">
              PAYMENT VERIFICATION FAILED
            </h2>
            <p className="text-xs text-[#ff4b4b] font-mono leading-relaxed bg-[#0b0b0d] p-3 rounded-[2px] border border-[#ff4b4b]/20">
              {error}
            </p>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => navigate('/seeker-dashboard/find-pg')}
              className="btn-solari btn-solari-amber text-xs w-full justify-center"
            >
              TRY RESERVING AGAIN
              <span className="chev">→</span>
            </button>
            
            <button
              onClick={() => navigate('/seeker-dashboard/bookings')}
              className="btn-solari btn-solari-steel text-xs w-full justify-center"
            >
              VIEW MY RESERVATIONS
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="w-full py-2 text-[#a7aaaf] hover:text-white font-['Barlow_Semi_Condensed'] uppercase tracking-wider text-xs transition-colors cursor-pointer"
            >
              CONTACT DISPATCH SUPPORT DESK →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (receipt) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] text-[#f2f2f2] py-12 px-4 flex items-center justify-center select-none relative">
        <div className="board max-w-lg w-full space-y-6">
          
          {/* Success Banner */}
          <div className="text-center space-y-2">
            <div className="p-3 bg-[#0b0b0d] border border-emerald-500/50 text-emerald-400 w-12 h-12 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-emerald-400">
              ESCROW SETTLED // PROTOCOL VERIFIED
            </span>
            <h2 className="text-2xl font-bold uppercase tracking-[0.14em] text-white font-['Big_Shoulders_Display']">
              DORM BED RESERVATION CONFIRMED
            </h2>
            <p className="text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
              Your digital escrow payment has been processed and host warden notified.
            </p>
          </div>

          {/* Digital Receipt Card */}
          <div className="p-4 rounded-[2px] bg-[#0b0b0d] border border-[#26292d] space-y-2 text-xs font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
            <div className="flex justify-between items-center text-[#a7aaaf]">
              <span>TICKET REFERENCE:</span>
              <span className="font-mono text-white font-bold">{receipt.bookingId}</span>
            </div>
            <div className="flex justify-between items-center text-[#a7aaaf]">
              <span>ACCOMMODATION:</span>
              <span className="text-white font-medium">{receipt.propertyName}</span>
            </div>
            <div className="flex justify-between items-center text-[#a7aaaf]">
              <span>CHECK-IN SCHEDULE:</span>
              <span className="text-white font-medium">{receipt.checkInDate}</span>
            </div>
            <div className="flex justify-between items-center text-[#a7aaaf]">
              <span>CHECK-OUT SCHEDULE:</span>
              <span className="text-white font-medium">{receipt.checkOutDate}</span>
            </div>
            <div className="flex justify-between items-center text-[#a7aaaf]">
              <span>OCCUPANTS:</span>
              <span className="text-white font-medium">{receipt.numberOfGuests} SCHOLAR(S)</span>
            </div>
            <div className="pt-2 border-t border-[#202226] flex justify-between items-baseline">
              <span className="font-bold text-white uppercase tracking-[0.16em]">TOTAL SETTLED:</span>
              <span className="text-xl font-bold text-[#ffb000] font-['Big_Shoulders_Display'] tracking-wider">${receipt.totalAmount} USD</span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-[#a7aaaf] pt-1">
              <span>GATEWAY PAYPAL ID:</span>
              <span className="font-mono">{receipt.paymentId}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5">
            <button
              onClick={handleDownloadReceipt}
              className="btn-solari btn-solari-amber text-xs w-full justify-center"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD DIGITAL RECEIPT (.TXT)</span>
              <span className="chev">↓</span>
            </button>
            
            <button
              onClick={() => navigate('/seeker-dashboard/bookings')}
              className="btn-solari btn-solari-steel text-xs w-full justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-[#ffb000]" />
              <span>GO TO MY RESERVATIONS</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return null;
};

export default PayPalSuccess;