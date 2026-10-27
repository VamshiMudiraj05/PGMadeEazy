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
  Sparkles,
  BedDouble,
  Receipt
} from 'lucide-react';
import { getSecureImageUrl } from '../../../utils/imageUtils';

// Solari Flap Character Unit
function FlapChar({ char, size = "18px" }) {
  const isSpace = char === " ";
  const displayChar = isSpace ? "" : char;
  return (
    <span
      className={`c ${isSpace ? "sp" : ""}`}
      style={{ "--cw": size }}
      aria-hidden="true"
    >
      <i className="u">{displayChar}</i>
      <i className="l">{displayChar}</i>
    </span>
  );
}

function FlapWord({ text, size = "18px", colorClass = "text-[#f2f2f2]" }) {
  const chars = String(text).toUpperCase().split("");
  return (
    <span className={`fl ${colorClass}`}>
      {chars.map((ch, idx) => (
        <FlapChar key={idx} char={ch} size={size} />
      ))}
    </span>
  );
}

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
          bg: 'bg-[#ffb000] text-black',
          icon: Clock,
          label: 'PENDING'
        };
      case 'CANCELLED':
        return {
          bg: 'bg-[#ff4b4b] text-white',
          icon: XCircle,
          label: 'CANCELLED'
        };
      case 'COMPLETED':
        return {
          bg: 'bg-[#3b82f6] text-white',
          icon: CheckCircle2,
          label: 'COMPLETED'
        };
      default:
        return {
          bg: 'bg-[#26292d] text-[#a7aaaf]',
          icon: AlertCircle,
          label: status || 'UNKNOWN'
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
      <div className="min-h-[calc(100vh-140px)] bg-[#0b0b0d] flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-none animate-spin shadow-[0_0_10px_#ffb000]" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
          RETRIEVING RESERVATION TELEMETRY...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0b0d] text-[#f2f2f2] py-8 min-h-screen relative select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-6 relative z-10">
        
        {/* Top Departure Board Header */}
        <div className="board">
          <div className="board-head">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/seeker-dashboard')}
                className="p-1.5 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#a7aaaf] hover:text-[#ffb000] hover:border-[#ffb000]/60 transition-all cursor-pointer"
                title="Back to Dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="w-2 h-2 bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffb000] font-['Barlow_Semi_Condensed']">
                RESERVATION ARCHIVES // DIGITAL TICKETING
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-['Barlow_Semi_Condensed'] uppercase tracking-[0.16em] text-[#a7aaaf]">
              <span>ACTIVE STAYS: <b className="text-white font-mono">{bookings.length}</b></span>
              <span>ESCROW STATUS: <b className="text-emerald-400">VERIFIED</b></span>
            </div>
          </div>

          <div className="py-4 sm:py-6">
            <div className="text-xs uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed'] mb-1">
              STUDENT PG RESIDENCY LOGS
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              <FlapWord text="CONFIRMED" size="clamp(22px, 3.5vw, 36px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="DORM RESERVATIONS." size="clamp(22px, 3.5vw, 36px)" colorClass="text-[#ffb000]" />
            </div>
          </div>
        </div>

        {error ? (
          <div className="board max-w-md mx-auto p-8 text-center space-y-4">
            <AlertCircle className="w-8 h-8 text-[#ff4b4b] mx-auto" />
            <p className="text-xs text-[#ff4b4b] font-mono uppercase tracking-wider">{error}</p>
            <button
              onClick={fetchBookings}
              className="btn-solari btn-solari-amber text-xs mx-auto"
            >
              RETRY TRANSMISSION
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="board max-w-md mx-auto p-12 text-center space-y-4 shadow-xl">
            <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#ffb000] w-12 h-12 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold uppercase tracking-[0.14em] text-white font-['Big_Shoulders_Display']">
                NO ACTIVE HOSTEL RESERVATIONS
              </h2>
              <p className="text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
                You haven't reserved any student PG beds yet. Explore verified campus rooms with zero brokerage.
              </p>
            </div>
            <button
              onClick={() => navigate('/seeker-dashboard/find-pg')}
              className="btn-solari btn-solari-amber text-xs w-full justify-center"
            >
              EXPLORE STUDENT PGS
              <span className="chev">→</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bookings.map((booking, bIdx) => {
              const statusInfo = getStatusBadge(booking.status);
              const StatusIcon = statusInfo.icon;
              const paymentStatus = getPaymentStatusDisplay(booking);

              return (
                <div
                  key={booking.id || bIdx}
                  className="rounded-[3px] overflow-hidden bg-[#121316] border border-[#26292d] hover:border-[#ffb000]/60 transition-all flex flex-col justify-between group"
                >
                  {/* Property Image Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0b0d]">
                    <img
                      src={getSecureImageUrl(booking.property?.images?.[0] || null, bIdx)}
                      alt={booking.property?.name || 'Property'}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/40 to-transparent" />
                    
                    {/* Status Pill Badge */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-[2px] font-['Barlow_Semi_Condensed'] ${statusInfo.bg}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusInfo.label}</span>
                      </span>
                    </div>

                    {/* Booking ID Pill */}
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[2px] bg-[#0b0b0d]/90 text-[#a7aaaf] border border-[#34373c]">
                        TICKET #{booking.id?.slice?.(0, 8) || booking.id || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-base font-bold uppercase tracking-[0.14em] text-white font-['Big_Shoulders_Display'] group-hover:text-[#ffb000] transition-colors truncate">
                          {booking.property?.name || 'Verified PG Stay'}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed'] uppercase tracking-wider mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                          <span className="truncate">{booking.property?.city || 'Campus Area'}, {booking.property?.area || ''}</span>
                        </div>
                      </div>

                      {/* Stay Schedule Specs */}
                      <div className="space-y-1.5 py-2.5 border-y border-[#202226] text-xs font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                        <div className="flex justify-between text-[#a7aaaf]">
                          <span>CHECK-IN SCHEDULE:</span>
                          <span className="font-semibold text-white font-mono">{new Date(booking.checkInDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-[#a7aaaf]">
                          <span>CHECK-OUT SCHEDULE:</span>
                          <span className="font-semibold text-white font-mono">{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-[#a7aaaf]">
                          <span>RESIDENTS:</span>
                          <span className="font-semibold text-white">{booking.numberOfGuests} SCHOLAR(S)</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-1">
                          <span className="text-[#a7aaaf]">ESCROW TARIFF:</span>
                          <span className="font-bold text-base text-[#ffb000] font-['Big_Shoulders_Display'] tracking-wider">
                            ₹{booking.totalAmount?.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Owner Contact Information */}
                      <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d] text-xs space-y-1 font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                        <span className="text-[10px] font-mono font-bold text-[#ffb000] block">AUTHORIZED PG WARDEN</span>
                        <div className="font-semibold text-white">{booking.property?.ownerName || 'Host Manager'}</div>
                        <div className="flex items-center gap-1.5 text-[#a7aaaf]">
                          <Phone className="w-3 h-3 text-[#ffb000] shrink-0" />
                          <span>{booking.property?.ownerPhone || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#a7aaaf]">
                          <Mail className="w-3 h-3 text-[#ffb000] shrink-0" />
                          <span className="truncate">{booking.property?.ownerEmail || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Status Footer */}
                    <div className="pt-2.5 border-t border-[#202226] flex items-center justify-between text-xs font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                      <span className="text-[#a7aaaf]">PAYMENT ESCROW:</span>
                      <span className={`font-bold text-[10px] tracking-wider px-2 py-0.5 rounded-[2px] ${
                        paymentStatus === 'PAID' 
                          ? 'bg-emerald-500 text-black' 
                          : 'bg-[#ffb000] text-black'
                      }`}>
                        {paymentStatus} // {booking.paymentMethod}
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