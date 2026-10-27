import React, { useState, useEffect } from 'react';
import { X, CreditCard, Home, AlertCircle } from 'lucide-react';
import { bookingApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const BookingForm = ({ property, onClose }) => {
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    roomsToBook: 1,
    paymentMethod: 'PAYPAL'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [calculatedAmount, setCalculatedAmount] = useState({ inr: 0, usd: 0, days: 0 });
  const [availableRooms, setAvailableRooms] = useState(property.rooms);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchAvailableRooms = async (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return;

    try {
      const response = await bookingApi.getAvailableRooms(
        property.id,
        formatDateForAPI(checkIn),
        formatDateForAPI(checkOut)
      );

      if (response.data) {
        setAvailableRooms(response.data.availableRooms);
        
        if (formData.roomsToBook > response.data.availableRooms) {
          setFormData(prev => ({
            ...prev,
            roomsToBook: response.data.availableRooms
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching available rooms:', error);
      toast.error('Failed to check room availability');
    }
  };

  const modalRef = React.useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    // Ensure viewport and modal scroll are reset so the user is immediately focused on the modal
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const calculateAmounts = (checkIn, checkOut, rooms = formData.roomsToBook) => {
    if (!checkIn || !checkOut || !rooms || !property?.rent) {
      return { inr: 0, usd: 0, days: 0 };
    }

    try {
      const checkInDate = parseDate(checkIn);
      const checkOutDate = parseDate(checkOut);
      
      if (!checkInDate || !checkOutDate) {
        return { inr: 0, usd: 0, days: 0 };
      }

      const year = checkInDate.getFullYear();
      if (year < 2024 || year > 2100) {
        return { inr: 0, usd: 0, days: 0 };
      }
      
      if (checkOutDate <= checkInDate) {
        return { inr: 0, usd: 0, days: 0 };
      }

      const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      const totalInr = days * property.rent * rooms;
      const USD_CONVERSION_RATE = 0.012;
      const totalUsd = Number((totalInr * USD_CONVERSION_RATE).toFixed(2));

      return {
        inr: totalInr,
        usd: totalUsd,
        days: days
      };
    } catch (error) {
      console.error('Error calculating amounts:', error);
      return { inr: 0, usd: 0, days: 0 };
    }
  };

  const validateDateFormat = (dateString) => {
    if (!dateString) return true;
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(dateString)) return false;

    const [_, day, month, year] = dateString.match(regex);
    const numDay = parseInt(day, 10);
    const numMonth = parseInt(month, 10);
    const numYear = parseInt(year, 10);

    if (numMonth < 1 || numMonth > 12) return false;
    if (numDay < 1 || numDay > 31) return false;
    if (numYear < 2024 || numYear > 2100) return false;

    const testDate = new Date(numYear, numMonth - 1, numDay);
    if (testDate.getFullYear() !== numYear || 
        testDate.getMonth() !== numMonth - 1 || 
        testDate.getDate() !== numDay) {
      return false;
    }

    return true;
  };

  const formatDateForAPI = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'checkInDate' || name === 'checkOutDate') {
      let cleaned = value.replace(/[^\d/]/g, '');
      if (cleaned.length === 2 && !cleaned.includes('/')) {
        cleaned = cleaned + '/';
      } else if (cleaned.length === 5 && cleaned.split('/').length === 2) {
        cleaned = cleaned + '/';
      }
      
      const newFormData = {
        ...formData,
        [name]: cleaned
      };
      setFormData(newFormData);

      if (cleaned.length === 10) {
        if (!validateDateFormat(cleaned)) {
          setError(`Invalid date format. Use DD/MM/YYYY`);
          return;
        }

        const otherDate = name === 'checkInDate' ? formData.checkOutDate : formData.checkInDate;
        if (otherDate && otherDate.length === 10 && validateDateFormat(otherDate)) {
          const checkIn = name === 'checkInDate' ? cleaned : formData.checkInDate;
          const checkOut = name === 'checkOutDate' ? cleaned : formData.checkOutDate;
          
          const amounts = calculateAmounts(checkIn, checkOut, formData.roomsToBook);
          setCalculatedAmount(amounts);
          fetchAvailableRooms(checkIn, checkOut);
        }
      }
    } else if (name === 'roomsToBook') {
      const rooms = Math.max(1, Math.min(availableRooms, parseInt(value) || 1));
      setFormData(prev => ({
        ...prev,
        [name]: rooms
      }));
      
      if (formData.checkInDate && formData.checkOutDate) {
        const amounts = calculateAmounts(formData.checkInDate, formData.checkOutDate, rooms);
        setCalculatedAmount(amounts);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!validateDateFormat(formData.checkInDate)) {
        throw new Error('Please enter a valid check-in date in DD/MM/YYYY format');
      }
      if (!validateDateFormat(formData.checkOutDate)) {
        throw new Error('Please enter a valid check-out date in DD/MM/YYYY format');
      }

      const checkInDate = parseDate(formData.checkInDate);
      const checkOutDate = parseDate(formData.checkOutDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkInDate < today) {
        throw new Error('Check-in date cannot be in the past');
      }

      if (checkOutDate <= checkInDate) {
        throw new Error('Check-out date must be after check-in date');
      }

      const bookingData = {
        propertyId: property.id,
        seekerId: user.id,
        email: user.email,
        checkInDate: formatDateForAPI(formData.checkInDate),
        checkOutDate: formatDateForAPI(formData.checkOutDate),
        numberOfGuests: parseInt(formData.numberOfGuests, 10),
        roomsToBook: parseInt(formData.roomsToBook, 10),
        totalAmount: calculatedAmount.inr,
        paymentMethod: formData.paymentMethod,
        status: formData.paymentMethod === 'PAYPAL' ? 'PENDING' : 'CONFIRMED',
        paymentStatus: formData.paymentMethod === 'PAYPAL' ? 'PENDING' : 'PAID'
      };

      const response = await bookingApi.createBooking(bookingData);
      const booking = response.data || response;

      if (formData.paymentMethod === 'PAYPAL') {
        const pendingBookingData = {
          ...booking,
          propertyName: property.name,
          totalAmount: calculatedAmount.usd,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
          numberOfGuests: formData.numberOfGuests
        };
        localStorage.setItem('pendingBooking', JSON.stringify(pendingBookingData));

        const paymentPayload = {
          bookingId: booking.id,
          amount: calculatedAmount.usd,
          currency: 'USD',
          description: `Booking for ${property.name} (${calculatedAmount.days} days)`,
          returnUrl: `${window.location.origin}/seeker/paypal-success`,
          cancelUrl: `${window.location.origin}/seeker/paypal-cancel`
        };

        const paymentResponse = await bookingApi.createPayPalPayment(paymentPayload);
        const approvalUrl = paymentResponse.data?.approvalUrl || 
                            paymentResponse.data?.redirectUrl || 
                            paymentResponse.approvalUrl;

        if (approvalUrl) {
          window.location.href = approvalUrl;
        } else {
          throw new Error('Could not obtain PayPal approval URL');
        }
      } else {
        await bookingApi.updateBookingStatus(booking.id, 'PAID');
        toast.success('Reservation registered successfully!');
        setTimeout(() => {
          navigate('/seeker-dashboard/bookings');
        }, 800);
      }
    } catch (error) {
      console.error('Booking error:', error);
      const errMsg = error.response?.data?.message || error.response?.data || error.message || 'Failed to create booking';
      setError(typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg));
      toast.error(typeof errMsg === 'string' ? errMsg : 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black/90 z-[120] flex items-center justify-center p-3 sm:p-4 overflow-y-auto select-none"
    >
      <div className="rounded-[3px] max-w-lg w-full bg-[#121316] border border-[#26292d] shadow-2xl relative my-auto max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Terminal Header */}
        <div className="board-head shrink-0 bg-[#121316] border-b border-[#26292d]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Big_Shoulders_Display'] uppercase tracking-[0.16em]">
                BED RESERVATION MANIFEST
              </h2>
              <p className="text-[11px] text-[#a7aaaf] font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                {property.name} // {property.city}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#a7aaaf] hover:text-white hover:border-[#ffb000] transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar">
          
          {/* Room Availability Indicator Pill */}
          <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Home className="w-3.5 h-3.5 text-[#ffb000]" />
                <span className="text-[10px] font-mono font-bold text-[#ffb000] uppercase tracking-[0.2em]">
                  LIVE ROOM TELEMETRY
                </span>
              </div>
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] ${
                availableRooms > 0 
                  ? 'bg-emerald-500 text-black' 
                  : 'bg-[#ff4b4b] text-white'
              }`}>
                {availableRooms} / {property.rooms} UNITS VACANT
              </span>
            </div>
          </div>

          {/* Rooms to Book & Guests Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
                BED UNITS TO RESERVE
              </label>
              <input
                type="number"
                name="roomsToBook"
                value={formData.roomsToBook}
                onChange={handleInputChange}
                min="1"
                max={availableRooms || 1}
                className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs sm:text-sm text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
                TOTAL RESIDENTS
              </label>
              <input
                type="number"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleInputChange}
                min="1"
                max={property.capacity || 10}
                className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs sm:text-sm text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                required
              />
            </div>
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
                CHECK-IN DATE
              </label>
              <input
                type="text"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleInputChange}
                placeholder="DD/MM/YYYY"
                className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs sm:text-sm text-white placeholder-[#a7aaaf]/50 focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                required
                maxLength="10"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
                CHECK-OUT DATE
              </label>
              <input
                type="text"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleInputChange}
                placeholder="DD/MM/YYYY"
                className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs sm:text-sm text-white placeholder-[#a7aaaf]/50 focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                required
                maxLength="10"
              />
            </div>
          </div>

          {/* Resident Email (Read-only) */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
              DIGITAL INVOICE RECIPIENT
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#26292d] rounded-[2px] text-xs text-[#a7aaaf] cursor-not-allowed font-['Barlow_Semi_Condensed']"
            />
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
              ESCROW GATEWAY
            </label>
            <div className="flex items-center gap-2.5 p-2.5 rounded-[2px] bg-[#0b0b0d] border border-[#26292d] text-white text-xs font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-[#ffb000]" />
              <span>PAYPAL ENCRYPTED DIGITAL ESCROW GATEWAY</span>
            </div>
          </div>

          {/* Price Calculation Summary Box */}
          {calculatedAmount.inr > 0 ? (
            <div className="p-3.5 rounded-[2px] bg-[#0b0b0d] border border-[#ffb000]/40 space-y-1.5 font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
              <div className="flex justify-between text-xs text-[#a7aaaf]">
                <span>DURATION TARIFF:</span>
                <span className="text-white font-mono">{calculatedAmount.days} NIGHT(S) × ₹{property.rent?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-[#a7aaaf]">
                <span>UNITS RESERVED:</span>
                <span className="text-white font-mono">{formData.roomsToBook} UNIT(S)</span>
              </div>
              <div className="pt-2 border-t border-[#202226] flex justify-between items-baseline">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-white">TOTAL PAYABLE:</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-[#ffb000] font-['Big_Shoulders_Display'] tracking-wider">
                    ₹{calculatedAmount.inr.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono text-[#a7aaaf] block">
                    (~${calculatedAmount.usd} USD ESCROW)
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d] text-center text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
              Specify check-in & check-out dates (DD/MM/YYYY) to calculate fare
            </div>
          )}

          {error && (
            <div className="p-2.5 rounded-[2px] bg-[#ff4b4b]/10 border border-[#ff4b4b]/30 text-xs text-[#ff4b4b] flex items-center gap-2 font-mono uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#ff4b4b]" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading || calculatedAmount.inr <= 0 || formData.roomsToBook > availableRooms || availableRooms === 0}
            className="btn-solari btn-solari-amber text-xs w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            {loading ? (
              <span>REDIRECTING TO PAYPAL GATEWAY...</span>
            ) : availableRooms === 0 ? (
              'NO UNITS AVAILABLE'
            ) : calculatedAmount.inr > 0 ? (
              `AUTHORIZE ₹${calculatedAmount.inr.toLocaleString()} VIA PAYPAL`
            ) : (
              'SPECIFY DATES TO PROCEED'
            )}
            <span className="chev">→</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;