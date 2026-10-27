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
    <div className="min-h-[calc(100vh-140px)] bg-[#0b0b0d] flex items-center justify-center p-4 text-white select-none relative">
      <div className="board max-w-md w-full text-center space-y-6">
        
        {/* Cancel Icon Badge */}
        <div className="p-3 bg-[#0b0b0d] border border-[#ffb000]/40 text-[#ffb000] w-12 h-12 flex items-center justify-center mx-auto">
          <XCircle className="w-6 h-6" />
        </div>
        
        <div className="space-y-1">
          <h2 className="text-xl font-bold uppercase tracking-[0.14em] text-white font-['Big_Shoulders_Display']">
            CHECKOUT SESSION INCOMPLETE
          </h2>
          <p className="text-xs text-[#a7aaaf] leading-relaxed font-['Barlow_Semi_Condensed']">
            Your payment gateway session was cancelled or timed out. No charges were deducted, and temporary room holds were released.
          </p>
        </div>

        {/* Cancelled Property Details (if available) */}
        {cancelledBooking && (
          <div className="p-3.5 rounded-[2px] bg-[#0b0b0d] border border-[#26292d] text-left text-xs space-y-1.5 font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
            <div className="flex items-center gap-2 text-white font-bold font-['Big_Shoulders_Display'] text-sm">
              <Building2 className="w-4 h-4 text-[#ffb000] shrink-0" />
              <span className="truncate">{cancelledBooking.propertyName || 'Selected PG Property'}</span>
            </div>
            {cancelledBooking.checkInDate && (
              <div className="flex items-center gap-2 text-[#a7aaaf] text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                <span>SCHEDULE: {cancelledBooking.checkInDate} TO {cancelledBooking.checkOutDate}</span>
              </div>
            )}
            {cancelledBooking.totalAmount && (
              <div className="pt-2 border-t border-[#202226] flex justify-between items-center">
                <span className="text-[#a7aaaf]">UNPROCESSED TARIFF:</span>
                <span className="font-bold text-[#ffb000] font-['Big_Shoulders_Display'] text-base">${cancelledBooking.totalAmount} USD</span>
              </div>
            )}
          </div>
        )}
        
        {/* Recovery Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => navigate('/seeker-dashboard/find-pg')}
            className="btn-solari btn-solari-amber text-xs w-full justify-center"
          >
            <RefreshCw className="w-4 h-4" />
            <span>TRY RESERVING AGAIN</span>
            <span className="chev">→</span>
          </button>
          
          <button
            onClick={() => navigate('/seeker-dashboard/bookings')}
            className="btn-solari btn-solari-steel text-xs w-full justify-center"
          >
            <Calendar className="w-4 h-4 text-[#ffb000]" />
            <span>VIEW MY RESERVATIONS</span>
          </button>

          <button
            onClick={() => navigate('/seeker-dashboard')}
            className="w-full py-2 text-[#a7aaaf] hover:text-white font-['Barlow_Semi_Condensed'] uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO RESIDENT HUB</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PayPalCancel;