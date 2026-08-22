import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  DollarSign, 
  Building, 
  Phone, 
  Mail, 
  Clock, 
  User, 
  Search, 
  ArrowLeft, 
  ShieldCheck, 
  SlidersHorizontal, 
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import PropertyDetails from './PropertyDetails';
import { getSecureImageUrl } from '../../../utils/imageUtils';

const FindPG = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchApprovedProperties();
  }, []);

  const fetchApprovedProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyApi.getApprovedProperties();
      setProperties(response || []);
      const initialIndexes = {};
      (response || []).forEach(property => {
        initialIndexes[property.id] = 0;
      });
      setCurrentImageIndex(initialIndexes);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const nextImage = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    if (property && property.images && property.images.length > 0) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [propertyId]: (prev[propertyId] + 1) % property.images.length
      }));
    }
  };

  const prevImage = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    if (property && property.images && property.images.length > 0) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [propertyId]: prev[propertyId] === 0 ? property.images.length - 1 : prev[propertyId] - 1
      }));
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCity('');
    setPriceRange({ min: '', max: '' });
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = 
      (property.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (property.area || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || (property.city || '').toLowerCase() === selectedCity.toLowerCase();
    const matchesPrice = (!priceRange.min || property.rent >= Number(priceRange.min)) &&
                        (!priceRange.max || property.rent <= Number(priceRange.max));
    return matchesSearch && matchesCity && matchesPrice;
  });

  const cities = [...new Set(properties.map(property => property.city).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#0B0B0E] flex flex-col items-center justify-center gap-3">
        <div className="h-6 w-6 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#7A7A85]">Loading verified accommodations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#0B0B0E] flex items-center justify-center p-4">
        <div className="p-8 rounded-sm bg-[#121217] border border-red-500/30 text-center max-w-md space-y-4">
          <p className="text-red-400 text-xs font-semibold">{error}</p>
          <button
            onClick={fetchApprovedProperties}
            className="px-5 py-2 rounded-sm bg-[#FF5A36] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#E54B28] transition-colors"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0E] text-[#FAFAFA] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E1E26]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/seeker-dashboard')}
              className="p-2 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Verified Accommodations
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#181820] text-[#FF5A36] border border-[#22222A]">
                  {filteredProperties.length} Units
                </span>
              </div>
              <p className="text-xs text-[#7A7A85] mt-0.5">Explore inspected PG residences, studio units, and student suites.</p>
            </div>
          </div>

          {(searchTerm || selectedCity || priceRange.min || priceRange.max) && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#121217] border border-[#22222A] text-[11px] font-bold uppercase tracking-wider text-[#9E9EA7] hover:text-[#FF5A36] transition-colors self-start sm:self-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Filter Console */}
        <div className="p-4 sm:p-5 rounded-sm bg-[#121217] border border-[#1E1E26]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            
            {/* Search Input (5 Cols on lg) */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A85] pointer-events-none" />
              <input
                type="text"
                placeholder="Search by property name, landmark, area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
              />
            </div>

            {/* City Dropdown (3 Cols on lg) */}
            <div className="lg:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white focus:outline-none focus:border-[#FF5A36] transition-colors cursor-pointer"
              >
                <option value="">All Locations</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Min Price (2 Cols on lg) */}
            <div className="lg:col-span-2">
              <input
                type="number"
                placeholder="Min Price (₹)"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
              />
            </div>

            {/* Max Price (2 Cols on lg) */}
            <div className="lg:col-span-2">
              <input
                type="number"
                placeholder="Max Price (₹)"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
              />
            </div>

          </div>
        </div>

        {/* Property Catalog Grid */}
        {filteredProperties.length === 0 ? (
          <div className="p-12 rounded-sm bg-[#121217] border border-[#1E1E26] text-center max-w-lg mx-auto space-y-4">
            <Building className="w-8 h-8 text-[#7A7A85] mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">No Matching Accommodations Found</h3>
              <p className="text-xs text-[#9E9EA7]">Try adjusting your search criteria or clearing current filters.</p>
            </div>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-sm bg-[#FF5A36] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#E54B28] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property, pIdx) => (
              <div
                key={property.id}
                onClick={() => setSelectedProperty(property)}
                className="group rounded-sm overflow-hidden bg-[#121217] border border-[#1E1E26] hover:border-[#383848] transition-colors cursor-pointer flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0B0E]">
                  <img
                    src={getSecureImageUrl(
                      property.images && property.images.length > 0
                        ? property.images[currentImageIndex[property.id] || 0]
                        : null,
                      pIdx
                    )}
                    alt={`${property.name}`}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-emerald-500 text-black">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#0B0B0E]/90 text-white border border-[#22222A]">
                      ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-[#7A7A85] font-normal">/mo</span>
                    </span>
                  </div>

                  {/* Carousel Controls */}
                  {property.images && property.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage(property.id);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-sm bg-[#0B0B0E]/80 text-white hover:bg-[#FF5A36] transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage(property.id);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm bg-[#0B0B0E]/80 text-white hover:bg-[#FF5A36] transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-base font-bold text-white group-hover:text-[#FF5A36] transition-colors truncate">
                      {property.name}
                    </h2>
                    
                    <div className="flex items-center gap-1.5 text-xs text-[#9E9EA7]">
                      <MapPin className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                      <span className="truncate">{property.city}, {property.area}</span>
                    </div>

                    {/* Meta Specs */}
                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-[#1E1E26] text-xs text-[#FAFAFA]">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#7A7A85]" />
                        <span>{property.rooms} Total Units</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[#7A7A85]" />
                        <span className="truncate">{property.buildingType || 'PG Stay'}</span>
                      </div>
                    </div>

                    {/* Owner Contacts */}
                    <div className="text-xs text-[#7A7A85] space-y-1">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#7A7A85]" />
                        <span className="text-[#FAFAFA] font-medium truncate">{property.ownerName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#7A7A85]" />
                        <span>{property.ownerPhone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trigger Action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProperty(property);
                    }}
                    className="w-full py-2.5 px-4 rounded-sm font-bold text-xs uppercase tracking-wider text-white bg-[#181820] hover:bg-[#FF5A36] border border-[#22222A] hover:border-[#FF5A36] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Specifications</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Property Details Modal */}
        {selectedProperty && (
          <PropertyDetails
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </div>
    </div>
  );
};

export default FindPG;