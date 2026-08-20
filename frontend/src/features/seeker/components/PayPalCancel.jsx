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
    <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex items-center justify-center p-4 text-zinc-100 selection:bg-orange-500 selection:text-white">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl max-w-md w-full border border-zinc-800 text-center shadow-2xl glow-orange-sm">
        
        {/* Cancel Icon Badge */}
        <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
          <XCircle className="w-9 h-9" />
        </div>
        
        <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">
          Booking Incomplete / Cancelled
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed mb-6">
          Your PayPal payment session was cancelled or timed out. No charges were made to your account, and room reservation hold has been released.
        </p>

        {/* Cancelled Property Details (if available) */}
        {cancelledBooking && (
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-left text-xs mb-6 space-y-2">
            <div className="flex items-center gap-2 text-zinc-300 font-bold">
              <Building2 className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="truncate">{cancelledBooking.propertyName || 'Selected PG Property'}</span>
            </div>
            {cancelledBooking.checkInDate && (
              <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span>Dates: {cancelledBooking.checkInDate} to {cancelledBooking.checkOutDate}</span>
              </div>
            )}
            {cancelledBooking.totalAmount && (
              <div className="pt-2 border-t border-zinc-800 flex justify-between items-center">
                <span className="text-zinc-500">Unprocessed Fare:</span>
                <span className="font-extrabold text-orange-400">${cancelledBooking.totalAmount} USD</span>
              </div>
            )}
          </div>
        )}
        
        {/* Recovery Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => navigate('/seeker-dashboard/find-pg')}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Booking Again</span>
          </button>
          
          <button
            onClick={() => navigate('/seeker-dashboard/bookings')}
            className="w-full py-3 px-6 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/40 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-orange-500" />
            <span>View My Reservations</span>
          </button>

          <button
            onClick={() => navigate('/seeker-dashboard')}
            className="w-full py-2.5 px-6 text-zinc-400 hover:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Dashboard</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PayPalCancel;