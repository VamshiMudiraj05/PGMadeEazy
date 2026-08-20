import React, { useState } from 'react';
import { X, MapPin, Users, DollarSign, Building, Phone, Mail, Clock, User, Home, Calendar, Shield, Wifi, Utensils, Dumbbell, ParkingCircle, Shirt, Tv, AirVent, Key, Waves, Lock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import BookingForm from './BookingForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getSecureImageUrl } from '../../../utils/imageUtils';

const PropertyDetails = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    navigate('/seeker-dashboard/bookings');
  };

  const amenities = {
    'Wi-Fi': <Wifi className="w-5 h-5" />,
    'Food': <Utensils className="w-5 h-5" />,
    'Gym': <Dumbbell className="w-5 h-5" />,
    'Parking': <ParkingCircle className="w-5 h-5" />,
    'Laundry': <Shirt className="w-5 h-5" />,
    'TV': <Tv className="w-5 h-5" />,
    'AC': <AirVent className="w-5 h-5" />,
    'Security': <Lock className="w-5 h-5" />,
    'Swimming Pool': <Waves className="w-5 h-5" />
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-black/80 rounded-xl overflow-hidden border border-orange-600">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-orange-600">
            <div>
              <h2 className="text-2xl font-bold text-white">{property.name}</h2>
              <p className="text-gray-400 text-sm">ID: {property.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-orange-600/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image Carousel */}
          <div className="relative h-[400px]">
            <img
              src={getSecureImageUrl(property.images[currentImageIndex])}
              alt={property.name}
              className="w-full h-full object-cover"
            />
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Property Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">Basic Information</h3>
                <div className="text-gray-300">
                  <p><MapPin className="inline-block w-5 h-5 text-orange-500" /> {property.city}, {property.area}</p>
                  <p><DollarSign className="inline-block w-5 h-5 text-orange-500" /> ₹{property.rent}/month</p>
                  <p><Users className="inline-block w-5 h-5 text-orange-500" /> {property.rooms} rooms</p>
                  <p><Home className="inline-block w-5 h-5 text-orange-500" /> {property.buildingType}</p>
                  <p><Key className="inline-block w-5 h-5 text-orange-500" /> Deposit: ₹{property.deposit}</p>
                  <p><Calendar className="inline-block w-5 h-5 text-orange-500" /> Category: {property.category}</p>
                </div>
              </div>

              {/* Property Features */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">Property Features</h3>
                <div className="grid grid-cols-2 gap-3 text-gray-300">
                  {property.amenities?.map((amenity, index) => (
                    <p key={index}>{amenities[amenity]} {amenity}</p>
                  ))}
                </div>
              </div>

              {/* House Rules */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">House Rules</h3>
                <ul className="text-gray-300">
                  {property.rules?.map((rule, index) => (
                    <li key={index}><CheckCircle className="inline-block w-5 h-5 text-orange-500" /> {rule}</li>
                  ))}
                </ul>
              </div>

              {/* Owner Information */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">Owner Information</h3>
                <p className="text-gray-300"><User className="inline-block w-5 h-5 text-orange-500" /> {property.ownerName}</p>
                <p className="text-gray-300"><Phone className="inline-block w-5 h-5 text-orange-500" /> {property.ownerPhone}</p>
                <p className="text-gray-300"><Mail className="inline-block w-5 h-5 text-orange-500" /> {property.ownerEmail}</p>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="mt-6">
              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

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
