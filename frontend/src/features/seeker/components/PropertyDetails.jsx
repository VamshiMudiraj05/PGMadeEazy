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
  Key,
  BedDouble
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
    <div ref={modalContainerRef} className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 select-none">
      <div className="min-h-screen py-8 px-3 sm:px-6 flex items-center justify-center">
        
        <div className="w-full max-w-5xl rounded-[3px] bg-[#121316] border border-[#26292d] shadow-2xl overflow-hidden relative">
          
          {/* Top Board Header Bar */}
          <div className="board-head sticky top-0 z-20 bg-[#121316] border-b border-[#26292d]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white font-['Big_Shoulders_Display'] uppercase tracking-[0.16em] flex items-center gap-2">
                  <span>{property.name}</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-emerald-500 text-black">
                    AUDITED
                  </span>
                </h2>
                <div className="flex items-center gap-2 text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed'] uppercase tracking-wider mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#ffb000]" />
                  <span>{property.city}, {property.area}</span>
                  <span className="text-[#34373c]">/</span>
                  <span>CATEGORY: <strong className="text-white">{property.category || 'STUDENT PG'}</strong></span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#a7aaaf] hover:text-white hover:border-[#ffb000] transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Photo Manifest Grid */}
          <div className="p-4 sm:p-6 pb-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-[3px] overflow-hidden bg-[#0b0b0d] border border-[#26292d]">
              
              {/* Primary Large Photo */}
              <div
                onClick={() => {
                  setCurrentImageIndex(0);
                  setShowLightbox(true);
                }}
                className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto h-64 md:h-88 group cursor-pointer overflow-hidden bg-black"
              >
                <img
                  src={getSecureImageUrl(propertyImages[0] || null, 0)}
                  alt={`${property.name} Main View`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-[#0b0b0d]/90 px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffb000] border border-[#ffb000]/40 font-['Barlow_Semi_Condensed']">
                  VERIFIED DORM VIEW // ANGLE 01
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
                  className="hidden md:block relative h-43 group cursor-pointer overflow-hidden bg-black"
                >
                  <img
                    src={getSecureImageUrl(propertyImages[idx] || null, idx)}
                    alt={`${property.name} View ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  />
                  {idx === 4 && (
                    <div className="absolute inset-0 bg-[#0b0b0d]/80 flex items-center justify-center text-white font-bold text-xs gap-1.5 hover:bg-[#0b0b0d]/90 transition-colors font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                      <Maximize2 className="w-3.5 h-3.5 text-[#ffb000]" />
                      <span>EXPAND ({propertyImages.length})</span>
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* Content Layout */}
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Key Specs Board */}
              <div className="p-4 rounded-[3px] bg-[#0b0b0d] border border-[#26292d] space-y-3">
                <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#ffb000]">
                  CAMPUS AUDIT MANIFEST // SPECIFICATIONS
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                  <div className="p-2.5 rounded-[2px] bg-[#121316] border border-[#202226]">
                    <span className="text-[#a7aaaf] block text-[10px]">ROOM INVENTORY</span>
                    <span className="text-white font-extrabold text-sm font-['Big_Shoulders_Display']">{property.rooms} UNITS</span>
                  </div>
                  <div className="p-2.5 rounded-[2px] bg-[#121316] border border-[#202226]">
                    <span className="text-[#a7aaaf] block text-[10px]">BUILDING TYPE</span>
                    <span className="text-white font-extrabold text-sm font-['Big_Shoulders_Display'] truncate block">{property.buildingType || 'STUDENT PG'}</span>
                  </div>
                  <div className="p-2.5 rounded-[2px] bg-[#121316] border border-[#202226]">
                    <span className="text-[#a7aaaf] block text-[10px]">CAMPUS DISTRICT</span>
                    <span className="text-white font-extrabold text-sm font-['Big_Shoulders_Display'] truncate block">{property.area}</span>
                  </div>
                </div>
              </div>

              {/* Verified Amenities */}
              <div className="p-4 rounded-[3px] bg-[#0b0b0d] border border-[#26292d] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#f2f2f2] font-['Barlow_Semi_Condensed']">
                  AUDITED HOSTEL AMENITIES & INCLUSIONS
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {property.amenities && property.amenities.length > 0 ? (
                    property.amenities.map((amenity, aIdx) => {
                      const IconComp = amenityIcons[amenity] || ShieldCheck;
                      return (
                        <div
                          key={aIdx}
                          className="flex items-center gap-2 p-2 rounded-[2px] bg-[#121316] border border-[#202226] text-xs font-['Barlow_Semi_Condensed'] uppercase tracking-wider text-[#f2f2f2]"
                        >
                          <IconComp className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-[#a7aaaf] col-span-full font-['Barlow_Semi_Condensed']">
                      All standard student hostel amenities verified by audit team.
                    </p>
                  )}
                </div>
              </div>

              {/* Host Guidelines & Rules */}
              <div className="p-4 rounded-[3px] bg-[#0b0b0d] border border-[#26292d] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#f2f2f2] font-['Barlow_Semi_Condensed']">
                  HOSTEL DISCIPLINE & ENTRY REGULATIONS
                </h3>
                <div className="space-y-1.5">
                  {property.rules && property.rules.length > 0 ? (
                    property.rules.map((rule, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{rule}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Standard student hostel code of conduct and curfew apply</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Host / Warden Contacts */}
              <div className="p-4 rounded-[3px] bg-[#0b0b0d] border border-[#26292d] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#f2f2f2] font-['Barlow_Semi_Condensed']">
                  AUTHORIZED PG HOST / WARDEN
                </h3>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-[2px] bg-[#121316] border border-[#34373c] text-[#ffb000]">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-['Big_Shoulders_Display'] uppercase tracking-wider">{property.ownerName}</h4>
                    <p className="text-[11px] text-[#a7aaaf] font-['Barlow_Semi_Condensed'] uppercase tracking-wider">AUTHORIZED HOST WARDEN</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                  <div className="flex items-center gap-2 p-2 rounded-[2px] bg-[#121316] border border-[#202226]">
                    <Phone className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                    <span className="truncate">{property.ownerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-[2px] bg-[#121316] border border-[#202226]">
                    <Mail className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                    <span className="truncate">{property.ownerEmail}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Pricing Breakdown (5 Cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-20">
              <div className="p-5 rounded-[3px] bg-[#0b0b0d] border border-[#26292d] space-y-5">
                
                {/* Price Display */}
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#a7aaaf] uppercase tracking-[0.2em] block">
                    MONTHLY BED TARIFF
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold text-[#ffb000] font-['Big_Shoulders_Display'] tracking-wider">
                      ₹{property.rent?.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed'] uppercase tracking-wider">/ SCHOLAR MONTH</span>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 pt-3 border-t border-[#202226] text-xs font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                  <div className="flex justify-between text-[#a7aaaf]">
                    <span>MONTHLY BED OCCUPANCY</span>
                    <span className="text-white font-mono font-semibold">₹{property.rent?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#a7aaaf]">
                    <span>SECURITY DEPOSIT (REFUNDABLE)</span>
                    <span className="text-white font-mono font-semibold">₹{property.deposit?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#a7aaaf]">
                    <span>STUDENT BROKERAGE MARKUP</span>
                    <span className="text-emerald-400 font-mono font-bold">₹0 (ZERO BROKERAGE)</span>
                  </div>
                </div>

                {/* Trust Guarantee */}
                <div className="p-3 rounded-[2px] bg-[#121316] border border-[#26292d] text-xs text-[#a7aaaf] flex items-start gap-2.5 font-['Barlow_Semi_Condensed']">
                  <ShieldCheck className="w-4 h-4 text-[#ffb000] shrink-0 mt-0.5" />
                  <span>
                    Direct landlord reservation with zero student brokerage and verified digital receipt logs.
                  </span>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={handleOpenBooking}
                  className="btn-solari btn-solari-amber text-xs w-full justify-center"
                >
                  <Key className="w-4 h-4" />
                  <span>RESERVE HOSTEL BED</span>
                  <span className="chev">→</span>
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
            className="absolute top-4 right-4 p-2 rounded-[2px] bg-[#121316] border border-[#34373c] text-white hover:border-[#ffb000] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center">
            <img
              src={getSecureImageUrl(propertyImages[currentImageIndex], currentImageIndex)}
              alt={`${property.name} Full View`}
              className="max-h-[75vh] w-auto max-w-full rounded-[2px] object-contain border border-[#26292d]"
            />

            {propertyImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 p-2 rounded-[2px] bg-black/80 text-white hover:bg-[#ffb000] hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 p-2 rounded-[2px] bg-black/80 text-white hover:bg-[#ffb000] hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="mt-4 text-xs font-mono uppercase tracking-widest text-[#a7aaaf]">
            PHOTO {currentImageIndex + 1} OF {propertyImages.length}
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


