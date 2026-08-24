import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw, Building2, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { bookingApi } from '../../../services/api';

const PayPalCancel = () => {
  const navigate = useNavigate();
  const [cancelledBooking, setCancelledBooking] = useState(null);

  useEffect(() => {
    const pendingBookingStr = localStorage.getItem('pendingBooking');
    if (pendingBookingStr) {
      try {
        const pendingBooking = JSON.parse(pendingBookingStr);
        setCancelledBooking(pendingBooking);

        if (pendingBooking.id) {
          bookingApi.updateBookingStatus(pendingBooking.id, 'CANCELLED')
            .catch(err => console.warn('Could not cancel booking in backend:', err));
        }
      } catch (e) {
        console.error('Error parsing pending booking:', e);
      } finally {
        localStorage.removeItem('pendingBooking');
      }
    }
    toast.error('Payment checkout was cancelled or incomplete');
  }, []);

  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex items-center justify-center p-4 text-white select-none relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="p-8 sm:p-10 rounded-2xl max-w-md w-full bg-[#141414] border border-white/10 text-center shadow-2xl space-y-6">
        
        {/* Cancel Icon Badge */}
        <div className="h-14 w-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <XCircle className="w-7 h-7" />
        </div>
        
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Checkout Incomplete
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Your gateway session was cancelled or timed out. No charges were made to your account, and room hold has been released.
          </p>
        </div>

        {/* Cancelled Property Details (if available) */}
        {cancelledBooking && (
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-left text-xs space-y-2">
            <div className="flex items-center gap-2 text-white font-bold">
              <Building2 className="w-4 h-4 text-[#E50914] shrink-0" />
              <span className="truncate">{cancelledBooking.propertyName || 'Selected PG Property'}</span>
            </div>
            {cancelledBooking.checkInDate && (
              <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>Schedule: {cancelledBooking.checkInDate} to {cancelledBooking.checkOutDate}</span>
              </div>
            )}
            {cancelledBooking.totalAmount && (
              <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                <span className="text-neutral-400">Unprocessed Fare:</span>
                <span className="font-extrabold text-[#E50914]">${cancelledBooking.totalAmount} USD</span>
              </div>
            )}
          </div>
        )}
        
        {/* Recovery Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => navigate('/seeker-dashboard/find-pg')}
            className="w-full py-3.5 px-4 bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Reserving Again</span>
          </button>
          
          <button
            onClick={() => navigate('/seeker-dashboard/bookings')}
            className="w-full py-3.5 px-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#E50914]" />
            <span>View My Reservations</span>
          </button>

          <button
            onClick={() => navigate('/seeker-dashboard')}
            className="w-full py-2 text-neutral-400 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Hub</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PayPalCancel;