import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, CreditCard, Mail, Home, AlertCircle, CheckCircle2, ShieldCheck, Sparkles, DollarSign } from 'lucide-react';
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

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
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

    const daysInMonth = new Date(numYear, numMonth, 0).getDate();
    if (numDay > daysInMonth) return false;

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if ((name === 'checkInDate' || name === 'checkOutDate')) {
      if (!value || value.length < formData[name].length) {
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
        return;
      }

      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 8) {
        let formatted = cleaned;
        if (cleaned.length > 4) {
          formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
        } else if (cleaned.length > 2) {
          formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        }
        
        const newFormData = { ...formData, [name]: formatted };
        setFormData(newFormData);

        if (validateDateFormat(formatted)) {
          const checkInDate = name === 'checkInDate' ? formatted : formData.checkInDate;
          const checkOutDate = name === 'checkOutDate' ? formatted : formData.checkOutDate;
          
          if (validateDateFormat(checkInDate) && validateDateFormat(checkOutDate)) {
            fetchAvailableRooms(checkInDate, checkOutDate);
            const amounts = calculateAmounts(checkInDate, checkOutDate, formData.roomsToBook);
            setCalculatedAmount(amounts);
          }
        }
      }
      return;
    }

    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (name === 'roomsToBook') {
      const amounts = calculateAmounts(formData.checkInDate, formData.checkOutDate, value);
      setCalculatedAmount(amounts);
    }
  };

  const formatDateForAPI = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const handlePaymentMethodChange = (method) => {
    const newFormData = { ...formData, paymentMethod: method };
    setFormData(newFormData);
    const amounts = calculateAmounts(newFormData.checkInDate, newFormData.checkOutDate, newFormData.roomsToBook);
    setCalculatedAmount(amounts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (calculatedAmount.inr <= 0) {
        throw new Error("Please choose valid check-in and check-out dates");
      }

      const bookingData = {
        propertyId: property.id,
        seekerId: user.id,
        email: user.email,
        checkInDate: formatDateForAPI(formData.checkInDate),
        checkOutDate: formatDateForAPI(formData.checkOutDate),
        numberOfGuests: formData.numberOfGuests,
        roomsToBook: formData.roomsToBook,
        totalAmount: calculatedAmount.inr,
        paymentMethod: formData.paymentMethod,
        status: formData.paymentMethod === 'CASH' ? 'PENDING' : 'CONFIRMED',
        paymentStatus: formData.paymentMethod === 'CASH' ? 'PENDING' : 'PAID'
      };

      const response = await bookingApi.createBooking(bookingData);
      
      if (!response || !response.data) {
        throw new Error('Invalid booking response');
      }

      const booking = response.data;

      if (formData.paymentMethod === 'PAYPAL') {
        const pendingBookingData = {
          ...booking,
          propertyName: property.name,
          totalAmount: calculatedAmount.usd
        };
        localStorage.setItem('pendingBooking', JSON.stringify(pendingBookingData));
        
        try {
          const paymentResponse = await bookingApi.createPayPalPayment({
            bookingId: booking.id,
            amount: calculatedAmount.usd,
            currency: 'USD',
            description: `Booking for ${property.name} (${calculatedAmount.days} days)`,
            returnUrl: `${window.location.origin}/seeker/paypal-success`,
            cancelUrl: `${window.location.origin}/seeker/paypal-cancel`
          });

          if (!paymentResponse || !paymentResponse.data || !paymentResponse.data.approvalUrl) {
            throw new Error('Invalid PayPal payment gateway response');
          }

          window.location.href = paymentResponse.data.approvalUrl;
        } catch (payPalErr) {
          // If PayPal creation fails, cancel the newly created pending booking
          if (booking.id) {
            bookingApi.updateBookingStatus(booking.id, 'CANCELLED').catch(() => {});
          }
          localStorage.removeItem('pendingBooking');
          throw payPalErr;
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
      setError(error.response?.data?.message || error.message || 'Failed to create booking');
      toast.error(error.response?.data?.message || error.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-lg w-full border border-zinc-800 shadow-2xl relative my-8">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-5 mb-5 border-b border-zinc-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Reserve Your Stay
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">{property.name} • {property.city}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-orange-500/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Room Availability Indicator Pill */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Availability
                </span>
              </div>
              <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                availableRooms > 0 
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-red-500/15 text-red-400 border border-red-500/30'
              }`}>
                {availableRooms} / {property.rooms} Rooms Open
              </span>
            </div>
          </div>

          {/* Rooms to Book & Guests Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Rooms to Book
              </label>
              <input
                type="number"
                name="roomsToBook"
                value={formData.roomsToBook}
                onChange={handleInputChange}
                min="1"
                max={availableRooms || 1}
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Number of Guests
              </label>
              <input
                type="number"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleInputChange}
                min="1"
                max={property.capacity || 10}
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Check-in Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleInputChange}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-all"
                  required
                  maxLength="10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Check-out Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleInputChange}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-all"
                  required
                  maxLength="10"
                />
              </div>
            </div>
          </div>

          {/* Resident Email (Read-only) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Confirm Email for Digital Receipt
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-3.5 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-xs text-zinc-400 cursor-not-allowed"
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Payment Gateway
            </label>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-white text-xs font-bold">
              <CreditCard className="w-4 h-4 text-orange-400" />
              <span>PayPal Encrypted Digital Escrow Checkout</span>
            </div>
          </div>

          {/* Price Calculation Summary Box */}
          {calculatedAmount.inr > 0 ? (
            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Duration Rate:</span>
                <span className="text-zinc-200">{calculatedAmount.days} night(s) × ₹{property.rent?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Selected Rooms:</span>
                <span className="text-zinc-200">{formData.roomsToBook} room(s)</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between items-baseline">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Total Amount:</span>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-orange-400">
                    ₹{calculatedAmount.inr.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-400 block">
                    (~${calculatedAmount.usd} USD)
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center text-xs text-zinc-500">
              Enter check-in & check-out dates (DD/MM/YYYY) to calculate total fare
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading || calculatedAmount.inr <= 0 || formData.roomsToBook > availableRooms || availableRooms === 0}
            className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Redirecting to PayPal...</span>
              </>
            ) : availableRooms === 0 ? (
              'No Rooms Available'
            ) : calculatedAmount.inr > 0 ? (
              `Pay ₹${calculatedAmount.inr.toLocaleString()} via PayPal`
            ) : (
              'Enter Dates to Confirm'
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default BookingForm;