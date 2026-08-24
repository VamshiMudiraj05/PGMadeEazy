import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  Building, 
  Phone, 
  Mail, 
  User, 
  ShieldCheck, 
  Wifi, 
  Utensils, 
  Dumbbell, 
  ParkingCircle, 
  Shirt, 
  Tv, 
  AirVent, 
  Waves, 
  Lock, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Key
} from 'lucide-react';
import BookingForm from './BookingForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getSecureImageUrl } from '../../../utils/imageUtils';

const PropertyDetails = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const modalContainerRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    if (modalContainerRef.current) {
      modalContainerRef.current.scrollTop = 0;
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

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

  const handleOpenBooking = () => {
    if (modalContainerRef.current) {
      modalContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
      modalContainerRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    setShowBookingForm(true);
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
    <div ref={modalContainerRef} className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 backdrop-blur-md select-none">
      <div className="min-h-screen py-8 px-4 sm:px-6 flex items-center justify-center">
        
        <div className="w-full max-w-5xl rounded-2xl bg-[#141414] border border-white/10 shadow-2xl overflow-hidden relative">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#050505] sticky top-0 z-20">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {property.name}
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500 text-black shadow-md">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Audited Listing</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#E50914]" />
                <span>{property.city}, {property.area}</span>
                <span className="text-neutral-600">•</span>
                <span>Type: <strong className="text-white font-semibold">{property.category || 'Paying Guest'}</strong></span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Photo Gallery Grid */}
          <div className="p-6 pb-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden bg-black border border-white/10">
              
              {/* Primary Large Photo */}
              <div
                onClick={() => {
                  setCurrentImageIndex(0);
                  setShowLightbox(true);
                }}
                className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto h-72 md:h-96 group cursor-pointer overflow-hidden bg-black"
              >
                <img
                  src={getSecureImageUrl(propertyImages[0] || null, 0)}
                  alt={`${property.name} Main View`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/15">
                  Audited Primary Angle
                </div>
              </div>

              {/* Secondary Thumbnails */}
              {[1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentImageIndex(idx < propertyImages.length ? idx : 0);
                    setShowLightbox(true);
                  }}
                  className="hidden md:block relative h-47 group cursor-pointer overflow-hidden bg-black"
                >
                  <img
                    src={getSecureImageUrl(propertyImages[idx] || null, idx)}
                    alt={`${property.name} View ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {idx === 4 && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-bold text-xs gap-1.5 hover:bg-black/80 transition-colors">
                      <Maximize2 className="w-3.5 h-3.5 text-[#E50914]" />
                      <span>Full Gallery ({propertyImages.length})</span>
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* Content Layout */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Key Specs */}
              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E50914]">
                  SPECIFICATION SUMMARY
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-neutral-400 block">Room Inventory</span>
                    <span className="text-white font-extrabold text-sm">{property.rooms} Units</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Structure Format</span>
                    <span className="text-white font-extrabold text-sm">{property.buildingType || 'PG Building'}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Geographic District</span>
                    <span className="text-white font-extrabold text-sm truncate block">{property.area}</span>
                  </div>
                </div>
              </div>

              {/* Verified Amenities */}
              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Audited Inclusions & Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {property.amenities && property.amenities.length > 0 ? (
                    property.amenities.map((amenity, aIdx) => {
                      const IconComp = amenityIcons[amenity] || ShieldCheck;
                      return (
                        <div
                          key={aIdx}
                          className="flex items-center gap-2 p-2.5 rounded-lg bg-[#141414] border border-white/10 text-xs font-semibold text-neutral-200"
                        >
                          <IconComp className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-neutral-400 col-span-full">All standard hostel amenities verified by audit team.</p>
                  )}
                </div>
              </div>

              {/* Guidelines & Rules */}
              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Host Guidelines & House Rules
                </h3>
                <div className="space-y-2">
                  {property.rules && property.rules.length > 0 ? (
                    property.rules.map((rule, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{rule}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Standard residential code of conduct applies</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Host Contacts */}
              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Verified Property Host
                </h3>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-red-600/15 border border-red-600/30 flex items-center justify-center text-[#E50914]">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{property.ownerName}</h4>
                    <p className="text-xs text-neutral-400">Authorized Host / Operator</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-300">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-[#141414] border border-white/10">
                    <Phone className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                    <span className="truncate">{property.ownerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-[#141414] border border-white/10">
                    <Mail className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                    <span className="truncate">{property.ownerEmail}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Pricing Breakdown (5 Cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="p-6 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl space-y-6 shadow-2xl">
                
                {/* Price Display */}
                <div>
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">
                    MONTHLY RENT TARIFF
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold text-white">
                      ₹{property.rent?.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-400">/ resident month</span>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Monthly Accommodation Rent</span>
                    <span className="text-white font-semibold">₹{property.rent?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Security Deposit (Refundable)</span>
                    <span className="text-white font-semibold">₹{property.deposit?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Brokerage Markup</span>
                    <span className="text-emerald-400 font-bold uppercase">₹0 (Zero Brokerage)</span>
                  </div>
                </div>

                {/* Trust Guarantee */}
                <div className="p-3.5 rounded-xl bg-[#141414] border border-white/10 text-xs text-neutral-300 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                  <span>
                    Secured by PG Made Eazy Digital Guarantee. Direct landlord reservation with encrypted PayPal checkout.
                  </span>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={handleOpenBooking}
                  className="w-full py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider text-white bg-[#E50914] hover:bg-[#b80710] shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Key className="w-4 h-4" />
                  <span>Reserve Room Online</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Carousel */}
      {showLightbox && propertyImages.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-[#E50914] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center">
            <img
              src={getSecureImageUrl(propertyImages[currentImageIndex], currentImageIndex)}
              alt={`${property.name} Full View`}
              className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />

            {propertyImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 p-2 rounded-full bg-black/80 text-white hover:bg-[#E50914] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 p-2 rounded-full bg-black/80 text-white hover:bg-[#E50914] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="mt-4 text-xs font-semibold text-neutral-400">
            Photo {currentImageIndex + 1} of {propertyImages.length}
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
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


