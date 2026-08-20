import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import { 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ArrowLeft, 
  Calendar, 
  Users, 
  DollarSign, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard, 
  Building,
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
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          icon: CheckCircle2,
          label: status
        };
      case 'PENDING':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          icon: Clock,
          label: 'Pending Confirmation'
        };
      case 'CANCELLED':
        return {
          bg: 'bg-red-500/10 text-red-400 border-red-500/20',
          icon: XCircle,
          label: 'Cancelled'
        };
      case 'COMPLETED':
        return {
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          icon: CheckCircle2,
          label: 'Completed Stay'
        };
      default:
        return {
          bg: 'bg-zinc-800 text-zinc-400 border-zinc-700',
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
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex flex-col items-center justify-center gap-4 text-zinc-100">
        <div className="h-12 w-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin glow-orange-sm" />
        <p className="text-sm font-semibold text-zinc-400">Loading your reservations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 selection:bg-orange-500 selection:text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Top Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/seeker-dashboard')}
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-all"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Reservations
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">Track your past, active, and upcoming PG stays</p>
          </div>
        </div>

        {error ? (
          <div className="glass-panel p-8 rounded-2xl border border-red-500/30 text-center max-w-md mx-auto">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchBookings}
              className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-zinc-800 text-center max-w-md mx-auto glow-orange-sm">
            <div className="h-16 w-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-white mb-1.5">No Active Bookings</h2>
            <p className="text-xs text-zinc-400 mb-6">You haven't reserved any PG accommodation yet. Browse our verified listings to book your stay!</p>
            <button
              onClick={() => navigate('/seeker-dashboard/find-pg')}
              className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5"
            >
              Explore Verified Accommodations
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
                  className="rounded-3xl overflow-hidden glass-panel border border-zinc-800 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-orange-500/5 glow-orange-sm"
                >
                  {/* Property Image Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                    <img
                      src={getSecureImageUrl(booking.property?.images?.[0] || null, bIdx)}
                      alt={booking.property?.name || 'Property'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                    
                    {/* Status Pill Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${statusInfo.bg}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span>{statusInfo.label}</span>
                      </span>
                    </div>

                    {/* Booking ID Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950/80 text-zinc-300 border border-zinc-800 backdrop-blur-md">
                        REF #{booking.id?.slice?.(0, 8) || booking.id || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white truncate mb-1">
                        {booking.property?.name || 'Verified PG Stay'}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="truncate">{booking.property?.city || 'Location'}, {booking.property?.area || ''}</span>
                      </div>

                      {/* Stay Schedule Specs */}
                      <div className="space-y-2 py-3 border-y border-zinc-800/80 text-xs text-zinc-300">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Check-in Date:</span>
                          <span className="font-semibold text-zinc-200">{new Date(booking.checkInDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Check-out Date:</span>
                          <span className="font-semibold text-zinc-200">{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Occupants / Guests:</span>
                          <span className="font-semibold text-zinc-200">{booking.numberOfGuests} Resident(s)</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-1">
                          <span className="text-zinc-500">Paid Total:</span>
                          <span className="font-extrabold text-sm text-orange-400">₹{booking.totalAmount?.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Owner Contact Information */}
                      <div className="mt-4 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1.5">Host Contact</span>
                        <div className="space-y-1 text-zinc-300">
                          <div className="font-semibold text-white">{booking.property?.ownerName || 'Host Manager'}</div>
                          <div className="flex items-center gap-1.5 text-zinc-400">
                            <Phone className="w-3 h-3 text-orange-500 shrink-0" />
                            <span>{booking.property?.ownerPhone || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-zinc-400">
                            <Mail className="w-3 h-3 text-orange-500 shrink-0" />
                            <span className="truncate">{booking.property?.ownerEmail || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Status Pill Footer */}
                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                      <span className="text-zinc-500 font-medium">Payment Status:</span>
                      <span className={`font-bold px-2 py-0.5 rounded-md ${
                        paymentStatus === 'PAID' 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : 'bg-amber-500/10 text-amber-400'
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