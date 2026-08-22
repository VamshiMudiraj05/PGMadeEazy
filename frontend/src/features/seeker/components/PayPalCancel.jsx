import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw, AlertCircle, Building2, Calendar, ShieldAlert, Home } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { bookingApi } from '../../../services/api';

const PayPalCancel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cancelledBooking, setCancelledBooking] = useState(null);

  useEffect(() => {
    // Retrieve pending booking data before clearing
    const pendingBookingStr = localStorage.getItem('pendingBooking');
    if (pendingBookingStr) {
      try {
        const pendingBooking = JSON.parse(pendingBookingStr);
        setCancelledBooking(pendingBooking);

        // Update backend status to CANCELLED so room availability is released
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
    <div className="min-h-[calc(100vh-140px)] bg-[#0B0B0E] flex items-center justify-center p-4 text-[#FAFAFA]">
      <div className="p-8 sm:p-10 rounded-sm max-w-md w-full bg-[#121217] border border-[#1E1E26] text-center shadow-2xl space-y-6">
        
        {/* Cancel Icon Badge */}
        <div className="h-12 w-12 rounded-sm bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
          <XCircle className="w-6 h-6" />
        </div>
        
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Checkout Incomplete
          </h2>
          <p className="text-xs text-[#7A7A85] leading-relaxed">
            Your gateway session was cancelled or timed out. No charges were made to your account, and room hold has been released.
          </p>
        </div>

        {/* Cancelled Property Details (if available) */}
        {cancelledBooking && (
          <div className="p-4 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] text-left text-xs space-y-2">
            <div className="flex items-center gap-2 text-white font-bold">
              <Building2 className="w-4 h-4 text-[#FF5A36] shrink-0" />
              <span className="truncate">{cancelledBooking.propertyName || 'Selected PG Property'}</span>
            </div>
            {cancelledBooking.checkInDate && (
              <div className="flex items-center gap-2 text-[#7A7A85] text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-[#555560] shrink-0" />
                <span>Schedule: {cancelledBooking.checkInDate} to {cancelledBooking.checkOutDate}</span>
              </div>
            )}
            {cancelledBooking.totalAmount && (
              <div className="pt-2 border-t border-[#1E1E26] flex justify-between items-center">
                <span className="text-[#7A7A85]">Unprocessed Fare:</span>
                <span className="font-bold text-[#FF5A36]">${cancelledBooking.totalAmount} USD</span>
              </div>
            )}
          </div>
        )}
        
        {/* Recovery Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => navigate('/seeker-dashboard/find-pg')}
            className="w-full py-2.5 px-4 bg-[#FF5A36] hover:bg-[#E54B28] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Reserving Again</span>
          </button>
          
          <button
            onClick={() => navigate('/seeker-dashboard/bookings')}
            className="w-full py-2.5 px-4 bg-[#181820] border border-[#22222A] text-white hover:bg-[#22222A] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>View My Reservations</span>
          </button>

          <button
            onClick={() => navigate('/seeker-dashboard')}
            className="w-full py-2 text-[#7A7A85] hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
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