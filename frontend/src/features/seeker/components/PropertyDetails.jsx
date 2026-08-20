import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  DollarSign, 
  Building, 
  Phone, 
  Mail, 
  Clock, 
  User, 
  Home, 
  Calendar, 
  ShieldCheck, 
  Wifi, 
  Utensils, 
  Dumbbell, 
  ParkingCircle, 
  Shirt, 
  Tv, 
  AirVent, 
  Key, 
  Waves, 
  Lock, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Sparkles,
  Award
} from 'lucide-react';
import BookingForm from './BookingForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getSecureImageUrl } from '../../../utils/imageUtils';

const PropertyDetails = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const propertyImages = (property.images && property.images.length > 0) ? property.images : [];

  const nextImage = () => {
    if (propertyImages.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    if (propertyImages.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
  };

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    navigate('/seeker-dashboard/bookings');
  };

  const amenityIcons = {
    'Wi-Fi': Wifi,
    'Food': Utensils,
    'Gym': Dumbbell,
    'Parking': ParkingCircle,
    'Laundry': Shirt,
    'TV': Tv,
    'AC': AirVent,
    'Security': Lock,
    'Swimming Pool': Waves,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="min-h-screen py-8 px-4 sm:px-6 flex items-center justify-center">
        
        <div className="w-full max-w-5xl glass-panel rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden relative">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800/80 bg-zinc-950/80 sticky top-0 z-20 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  {property.name}
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Host</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>{property.city}, {property.area}</span>
                <span className="text-zinc-600">•</span>
                <span>Category: <strong className="text-zinc-200">{property.category || 'Paying Guest'}</strong></span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-orange-500/50 transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 🖼️ Photo Mosaic Layout (Airbnb Style) */}
          <div className="p-6 pb-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
              
              {/* Primary Main Photo (Spans 2 cols & 2 rows on md) */}
              <div
                onClick={() => {
                  setCurrentImageIndex(0);
                  setShowLightbox(true);
                }}
                className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto h-72 md:h-96 group cursor-pointer overflow-hidden bg-zinc-900"
              >
                <img
                  src={getSecureImageUrl(propertyImages[0] || null, 0)}
                  alt={`${property.name} Main View`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-white border border-zinc-800">
                  Primary View
                </div>
              </div>

              {/* 4 Secondary Grid Thumbnails */}
              {[1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentImageIndex(idx < propertyImages.length ? idx : 0);
                    setShowLightbox(true);
                  }}
                  className="hidden md:block relative h-46 group cursor-pointer overflow-hidden bg-zinc-900"
                >
                  <img
                    src={getSecureImageUrl(propertyImages[idx] || null, idx)}
                    alt={`${property.name} View ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  
                  {idx === 4 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-xs gap-1.5 hover:bg-black/70 transition-colors backdrop-blur-xs">
                      <Maximize2 className="w-4 h-4 text-orange-400" />
                      <span>View Lightbox</span>
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* 📄 Content Grid (Left Details + Right Sticky Pricing Card) */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (8 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Key Specs Card */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Accommodation Highlights</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-zinc-500 block">Room Configuration</span>
                    <span className="text-zinc-200 font-bold text-sm">{property.rooms} Rooms</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Structure Type</span>
                    <span className="text-zinc-200 font-bold text-sm">{property.buildingType || 'PG Building'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Location Area</span>
                    <span className="text-zinc-200 font-bold text-sm truncate block">{property.area}</span>
                  </div>
                </div>
              </div>

              {/* Verified Amenities */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                  Verified Inclusions & Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities && property.amenities.length > 0 ? (
                    property.amenities.map((amenity, aIdx) => {
                      const IconComp = amenityIcons[amenity] || ShieldCheck;
                      return (
                        <div
                          key={aIdx}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300"
                        >
                          <IconComp className="w-4 h-4 text-orange-500 shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-zinc-500 col-span-full">All standard hostel amenities included.</p>
                  )}
                </div>
              </div>

              {/* House Rules */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                  Host Guidelines & House Rules
                </h3>
                <div className="space-y-2.5">
                  {property.rules && property.rules.length > 0 ? (
                    property.rules.map((rule, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{rule}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Standard residential code of conduct applies</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Host Contact Information */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                  Verified Property Owner
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{property.ownerName}</h4>
                    <p className="text-xs text-zinc-400">Owner / Property Manager</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <Phone className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span className="truncate">{property.ownerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <Mail className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span className="truncate">{property.ownerEmail}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Booking / Price Breakdown (5 Cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="glass-panel p-6 rounded-3xl border border-zinc-800 glow-orange-sm space-y-6">
                
                {/* Price Display */}
                <div>
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Monthly Rent
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold text-white">
                      ₹{property.rent?.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-400">/ per resident</span>
                  </div>
                </div>

                {/* Pricing & Deposit Breakdown */}
                <div className="space-y-3 pt-4 border-t border-zinc-800 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Monthly Accommodation Rent</span>
                    <span className="text-zinc-200 font-semibold">₹{property.rent?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Security Deposit (Refundable)</span>
                    <span className="text-zinc-200 font-semibold">₹{property.deposit?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Platform Brokerage Fee</span>
                    <span className="text-emerald-400 font-bold uppercase">₹0 (Zero Free)</span>
                  </div>
                </div>

                {/* Trust Guarantee */}
                <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-300 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>
                    Secured by PG Made Eazy Digital Guarantee. Direct host connection with encrypted PayPal checkout.
                  </span>
                </div>

                {/* Primary CTA Button */}
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Key className="w-4 h-4" />
                  <span>Book This Room Now</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 🖼️ Full Lightbox Carousel Modal */}
      {showLightbox && propertyImages.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-zinc-900 text-white hover:bg-zinc-800"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center">
            <img
              src={getSecureImageUrl(propertyImages[currentImageIndex], currentImageIndex)}
              alt={`${property.name} Full View`}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain"
            />

            {propertyImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 p-3 rounded-full bg-zinc-950/80 text-white hover:bg-orange-500 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 p-3 rounded-full bg-zinc-950/80 text-white hover:bg-orange-500 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="mt-4 text-xs font-semibold text-zinc-400">
            Photo {currentImageIndex + 1} of {propertyImages.length}
          </div>
        </div>
      )}

      {/* 💳 Booking Form Modal */}
      {showBookingForm && (
        <BookingForm
          property={property}
          onClose={() => setShowBookingForm(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default PropertyDetails;

