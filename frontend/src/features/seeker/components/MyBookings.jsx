import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles
} from 'lucide-react';
import { getSecureImageUrl } from '../../../utils/imageUtils';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      if (!user) {
        navigate('/login');
        return;
      }
      
      const response = await bookingApi.getSeekerBookings(user.id);
      
      if (!response) {
        throw new Error('No response from server');
      }

      if (Array.isArray(response)) {
        setBookings(response);
        return;
      }

      const bookingsData = response?.data || [];
      
      if (!Array.isArray(bookingsData)) {
        throw new Error('Invalid response format');
      }
      
      const uniqueBookings = bookingsData.reduce((acc, current) => {
        const exists = acc.find(item => item.propertyId === current.propertyId && item.id === current.id);
        if (!exists) {
          acc.push(current);
        }
        return acc;
      }, []);
      
      setBookings(uniqueBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(error.message || 'Failed to fetch bookings');
      toast.error(error.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CONFIRMED':
      case 'PAID':
        return {
          bg: 'bg-emerald-500 text-black shadow-md',
          icon: CheckCircle2,
          label: status
        };
      case 'PENDING':
        return {
          bg: 'bg-amber-500 text-black shadow-md',
          icon: Clock,
          label: 'Pending'
        };
      case 'CANCELLED':
        return {
          bg: 'bg-red-600 text-white shadow-md',
          icon: XCircle,
          label: 'Cancelled'
        };
      case 'COMPLETED':
        return {
          bg: 'bg-blue-500 text-white shadow-md',
          icon: CheckCircle2,
          label: 'Completed'
        };
      default:
        return {
          bg: 'bg-white/10 text-neutral-400',
          icon: AlertCircle,
          label: status || 'Unknown'
        };
    }
  };

  const getPaymentStatusDisplay = (booking) => {
    if (booking.paymentMethod === 'PAYPAL') {
      return booking.paymentStatus || 'PENDING';
    } else if (booking.paymentMethod === 'CASH') {
      return booking.status === 'PAID' ? 'PAID' : 'PENDING';
    }
    return booking.paymentStatus || 'N/A';
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-8 w-8 border-3 border-[#E50914] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#E50914]" />
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading reservations...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
          <button 
            onClick={() => navigate('/seeker-dashboard')}
            className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-all cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>My Reservations</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-600/40">
                {bookings.length} Bookings
              </span>
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">Manage confirmed stays, digital tax receipts, and host contacts.</p>
          </div>
        </div>

        {error ? (
          <div className="p-8 rounded-2xl bg-[#141414] border border-red-500/30 text-center max-w-md mx-auto space-y-4">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
            <p className="text-xs text-red-400 font-semibold">{error}</p>
            <button
              onClick={fetchBookings}
              className="px-6 py-2.5 rounded-lg bg-[#E50914] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#b80710] shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#141414] border border-white/10 text-center max-w-md mx-auto space-y-4 shadow-xl">
            <div className="h-12 w-12 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center text-[#E50914] mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">No Active Reservations</h2>
              <p className="text-xs text-neutral-400">You haven't reserved any accommodation yet. Explore our inspected units to book your stay.</p>
            </div>
            <button
              onClick={() => navigate('/seeker-dashboard/find-pg')}
              className="w-full py-3 px-4 bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              Explore Accommodations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking, bIdx) => {
              const statusInfo = getStatusBadge(booking.status);
              const StatusIcon = statusInfo.icon;
              const paymentStatus = getPaymentStatusDisplay(booking);

              return (
                <div
                  key={booking.id || bIdx}
                  className="rounded-2xl overflow-hidden bg-[#141414] border border-white/10 hover:border-red-600/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-red-600/10"
                >
                  {/* Property Image Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={getSecureImageUrl(booking.property?.images?.[0] || null, bIdx)}
                      alt={booking.property?.name || 'Property'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
                    
                    {/* Status Pill Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusInfo.bg}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusInfo.label}</span>
                      </span>
                    </div>

                    {/* Booking ID Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-neutral-300 border border-white/15">
                        REF #{booking.id?.slice?.(0, 8) || booking.id || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-base font-bold text-white truncate">
                          {booking.property?.name || 'Verified PG Stay'}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                          <span className="truncate">{booking.property?.city || 'Location'}, {booking.property?.area || ''}</span>
                        </div>
                      </div>

                      {/* Stay Schedule Specs */}
                      <div className="space-y-1.5 py-3 border-y border-white/10 text-xs">
                        <div className="flex justify-between text-neutral-400">
                          <span>Check-in:</span>
                          <span className="font-semibold text-white">{new Date(booking.checkInDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                          <span>Check-out:</span>
                          <span className="font-semibold text-white">{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                          <span>Guests:</span>
                          <span className="font-semibold text-white">{booking.numberOfGuests} Resident(s)</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-1">
                          <span className="text-neutral-400">Total Amount:</span>
                          <span className="font-extrabold text-sm text-[#E50914]">₹{booking.totalAmount?.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Owner Contact Information */}
                      <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs space-y-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E50914] block">AUTHORIZED HOST</span>
                        <div className="font-semibold text-white">{booking.property?.ownerName || 'Host Manager'}</div>
                        <div className="flex items-center gap-1.5 text-neutral-400">
                          <Phone className="w-3 h-3 text-[#E50914] shrink-0" />
                          <span>{booking.property?.ownerPhone || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-400">
                          <Mail className="w-3 h-3 text-[#E50914] shrink-0" />
                          <span className="truncate">{booking.property?.ownerEmail || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Status Footer */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Payment Status:</span>
                      <span className={`font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        paymentStatus === 'PAID' 
                          ? 'bg-emerald-500 text-black shadow-md' 
                          : 'bg-amber-500 text-black shadow-md'
                      }`}>
                        {paymentStatus} ({booking.paymentMethod})
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyBookings;