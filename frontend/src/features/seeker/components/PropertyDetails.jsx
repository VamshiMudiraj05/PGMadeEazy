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
  Key, 
  Waves, 
  Lock, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Sparkles
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
    <div ref={modalContainerRef} className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs">
      <div className="min-h-screen py-8 px-4 sm:px-6 flex items-center justify-center">
        
        <div className="w-full max-w-5xl rounded-sm bg-[#121217] border border-[#1E1E26] shadow-2xl overflow-hidden relative">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 border-b border-[#1E1E26] bg-[#0B0B0E] sticky top-0 z-20">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {property.name}
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-emerald-500 text-black">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Audited Listing</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#9E9EA7] mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF5A36]" />
                <span>{property.city}, {property.area}</span>
                <span className="text-[#383848]">•</span>
                <span>Type: <strong className="text-white font-medium">{property.category || 'Paying Guest'}</strong></span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-sm bg-[#181820] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Photo Gallery Grid */}
          <div className="p-6 pb-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-sm overflow-hidden bg-[#0B0B0E] border border-[#1E1E26]">
              
              {/* Primary Large Photo */}
              <div
                onClick={() => {
                  setCurrentImageIndex(0);
                  setShowLightbox(true);
                }}
                className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto h-72 md:h-96 group cursor-pointer overflow-hidden bg-[#0B0B0E]"
              >
                <img
                  src={getSecureImageUrl(propertyImages[0] || null, 0)}
                  alt={`${property.name} Main View`}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute bottom-3 left-3 bg-[#0B0B0E]/90 px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider text-white border border-[#22222A]">
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
                  className="hidden md:block relative h-47 group cursor-pointer overflow-hidden bg-[#0B0B0E]"
                >
                  <img
                    src={getSecureImageUrl(propertyImages[idx] || null, idx)}
                    alt={`${property.name} View ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  {idx === 4 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-xs gap-1.5 hover:bg-black/70 transition-colors">
                      <Maximize2 className="w-3.5 h-3.5 text-[#FF5A36]" />
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
              <div className="p-5 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#FF5A36]">
                  Specification Summary
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[#7A7A85] block">Room Inventory</span>
                    <span className="text-white font-bold text-sm">{property.rooms} Units</span>
                  </div>
                  <div>
                    <span className="text-[#7A7A85] block">Structure Format</span>
                    <span className="text-white font-bold text-sm">{property.buildingType || 'PG Building'}</span>
                  </div>
                  <div>
                    <span className="text-[#7A7A85] block">Geographic District</span>
                    <span className="text-white font-bold text-sm truncate block">{property.area}</span>
                  </div>
                </div>
              </div>

              {/* Verified Amenities */}
              <div className="p-5 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] space-y-4">
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
                          className="flex items-center gap-2 p-2.5 rounded-sm bg-[#121217] border border-[#1E1E26] text-xs font-semibold text-[#FAFAFA]"
                        >
                          <IconComp className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-[#7A7A85] col-span-full">All standard hostel amenities verified by audit team.</p>
                  )}
                </div>
              </div>

              {/* Guidelines & Rules */}
              <div className="p-5 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Host Guidelines & House Rules
                </h3>
                <div className="space-y-2">
                  {property.rules && property.rules.length > 0 ? (
                    property.rules.map((rule, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-[#9E9EA7]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{rule}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-[#9E9EA7]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Standard residential code of conduct applies</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Host Contacts */}
              <div className="p-5 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Verified Property Host
                </h3>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-sm bg-[#181820] border border-[#22222A] flex items-center justify-center text-[#FF5A36]">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{property.ownerName}</h4>
                    <p className="text-xs text-[#7A7A85]">Authorized Host / Operator</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#FAFAFA]">
                  <div className="flex items-center gap-2 p-2.5 rounded-sm bg-[#121217] border border-[#1E1E26]">
                    <Phone className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                    <span className="truncate">{property.ownerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-sm bg-[#121217] border border-[#1E1E26]">
                    <Mail className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                    <span className="truncate">{property.ownerEmail}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Pricing Breakdown (5 Cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="p-6 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] space-y-6">
                
                {/* Price Display */}
                <div>
                  <span className="text-[10px] font-bold text-[#7A7A85] uppercase tracking-widest block">
                    Monthly Rent Tariff
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold text-white">
                      ₹{property.rent?.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#7A7A85]">/ resident month</span>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2.5 pt-4 border-t border-[#1E1E26] text-xs">
                  <div className="flex justify-between text-[#9E9EA7]">
                    <span>Monthly Accommodation Rent</span>
                    <span className="text-white font-semibold">₹{property.rent?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#9E9EA7]">
                    <span>Security Deposit (Refundable)</span>
                    <span className="text-white font-semibold">₹{property.deposit?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#9E9EA7]">
                    <span>Brokerage Markup</span>
                    <span className="text-emerald-400 font-bold uppercase">₹0 (Zero Brokerage)</span>
                  </div>
                </div>

                {/* Trust Guarantee */}
                <div className="p-3 rounded-sm bg-[#121217] border border-[#1E1E26] text-xs text-[#9E9EA7] flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A36] shrink-0 mt-0.5" />
                  <span>
                    Secured by PG Made Eazy Digital Guarantee. Direct landlord reservation with encrypted PayPal checkout.
                  </span>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider text-white bg-[#FF5A36] hover:bg-[#E54B28] transition-colors flex items-center justify-center gap-2"
                >
                  <Key className="w-3.5 h-3.5" />
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
            className="absolute top-4 right-4 p-2 rounded-sm bg-[#121217] text-white hover:bg-[#181820]"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center">
            <img
              src={getSecureImageUrl(propertyImages[currentImageIndex], currentImageIndex)}
              alt={`${property.name} Full View`}
              className="max-h-[75vh] w-auto max-w-full rounded-sm object-contain"
            />

            {propertyImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 p-2 rounded-sm bg-[#0B0B0E]/80 text-white hover:bg-[#FF5A36] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 p-2 rounded-sm bg-[#0B0B0E]/80 text-white hover:bg-[#FF5A36] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          <div className="mt-4 text-xs font-semibold text-[#7A7A85]">
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

