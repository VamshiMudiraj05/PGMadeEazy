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
          bg: 'bg-emerald-500 text-black',
          icon: CheckCircle2,
          label: status
        };
      case 'PENDING':
        return {
          bg: 'bg-amber-500 text-black',
          icon: Clock,
          label: 'Pending'
        };
      case 'CANCELLED':
        return {
          bg: 'bg-red-500 text-white',
          icon: XCircle,
          label: 'Cancelled'
        };
      case 'COMPLETED':
        return {
          bg: 'bg-blue-500 text-white',
          icon: CheckCircle2,
          label: 'Completed'
        };
      default:
        return {
          bg: 'bg-[#181820] text-[#7A7A85]',
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
      <div className="min-h-[calc(100vh-140px)] bg-[#0B0B0E] flex flex-col items-center justify-center gap-3 text-[#FAFAFA]">
        <div className="h-6 w-6 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#7A7A85]">Loading reservations...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0E] text-[#FAFAFA] py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-[#1E1E26]">
          <button 
            onClick={() => navigate('/seeker-dashboard')}
            className="p-2 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              My Reservations
            </h1>
            <p className="text-xs text-[#7A7A85] mt-0.5">Manage confirmed stays, digital tax receipts, and host contacts.</p>
          </div>
        </div>

        {error ? (
          <div className="p-8 rounded-sm bg-[#121217] border border-red-500/30 text-center max-w-md mx-auto space-y-4">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
            <p className="text-xs text-red-400 font-semibold">{error}</p>
            <button
              onClick={fetchBookings}
              className="px-4 py-2 rounded-sm bg-[#FF5A36] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#E54B28] transition-colors"
            >
              Retry
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 rounded-sm bg-[#121217] border border-[#1E1E26] text-center max-w-md mx-auto space-y-4">
            <div className="h-12 w-12 rounded-sm bg-[#181820] border border-[#22222A] flex items-center justify-center text-[#FF5A36] mx-auto">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">No Active Reservations</h2>
              <p className="text-xs text-[#9E9EA7]">You haven't reserved any accommodation yet. Explore our inspected units to book your stay.</p>
            </div>
            <button
              onClick={() => navigate('/seeker-dashboard/find-pg')}
              className="w-full py-2.5 px-4 bg-[#FF5A36] hover:bg-[#E54B28] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors"
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
                  className="rounded-sm overflow-hidden bg-[#121217] border border-[#1E1E26] hover:border-[#383848] transition-colors flex flex-col justify-between"
                >
                  {/* Property Image Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0B0E]">
                    <img
                      src={getSecureImageUrl(booking.property?.images?.[0] || null, bIdx)}
                      alt={booking.property?.name || 'Property'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/40 to-transparent" />
                    
                    {/* Status Pill Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${statusInfo.bg}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusInfo.label}</span>
                      </span>
                    </div>

                    {/* Booking ID Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#0B0B0E]/90 text-[#9E9EA7] border border-[#22222A]">
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
                        <div className="flex items-center gap-1.5 text-xs text-[#7A7A85] mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                          <span className="truncate">{booking.property?.city || 'Location'}, {booking.property?.area || ''}</span>
                        </div>
                      </div>

                      {/* Stay Schedule Specs */}
                      <div className="space-y-1.5 py-3 border-y border-[#1E1E26] text-xs">
                        <div className="flex justify-between text-[#9E9EA7]">
                          <span>Check-in:</span>
                          <span className="font-semibold text-white">{new Date(booking.checkInDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-[#9E9EA7]">
                          <span>Check-out:</span>
                          <span className="font-semibold text-white">{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-[#9E9EA7]">
                          <span>Guests:</span>
                          <span className="font-semibold text-white">{booking.numberOfGuests} Resident(s)</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-1">
                          <span className="text-[#9E9EA7]">Total Amount:</span>
                          <span className="font-bold text-sm text-[#FF5A36]">₹{booking.totalAmount?.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Owner Contact Information */}
                      <div className="p-3 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] text-xs space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A7A85] block">Authorized Host</span>
                        <div className="font-semibold text-white">{booking.property?.ownerName || 'Host Manager'}</div>
                        <div className="flex items-center gap-1.5 text-[#7A7A85]">
                          <Phone className="w-3 h-3 text-[#FF5A36] shrink-0" />
                          <span>{booking.property?.ownerPhone || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#7A7A85]">
                          <Mail className="w-3 h-3 text-[#FF5A36] shrink-0" />
                          <span className="truncate">{booking.property?.ownerEmail || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Status Footer */}
                    <div className="pt-3 border-t border-[#1E1E26] flex items-center justify-between text-xs">
                      <span className="text-[#7A7A85]">Payment Status:</span>
                      <span className={`font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                        paymentStatus === 'PAID' 
                          ? 'bg-emerald-500 text-black' 
                          : 'bg-amber-500 text-black'
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