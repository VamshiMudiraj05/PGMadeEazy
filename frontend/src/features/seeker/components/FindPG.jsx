import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  Building, 
  Phone, 
  Search, 
  ArrowLeft, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  User
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
      <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex flex-col items-center justify-center gap-4">
        <div className="h-8 w-8 border-3 border-[#E50914] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#E50914]" />
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading verified accommodations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex items-center justify-center p-4">
        <div className="p-8 rounded-2xl bg-[#141414] border border-red-500/30 text-center max-w-md space-y-4">
          <p className="text-red-400 text-xs font-semibold">{error}</p>
          <button
            onClick={fetchApprovedProperties}
            className="px-6 py-2.5 rounded-lg bg-[#E50914] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#b80710] shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[200px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/seeker-dashboard')}
              className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-all cursor-pointer"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Verified Accommodations
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-600/40">
                  {filteredProperties.length} Units
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">Explore inspected PG residences, studio units, and student suites.</p>
            </div>
          </div>

          {(searchTerm || selectedCity || priceRange.min || priceRange.max) && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#141414] border border-white/15 text-[11px] font-bold uppercase tracking-wider text-neutral-300 hover:text-[#E50914] hover:border-[#E50914]/40 transition-all self-start sm:self-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Filter Console */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-xl shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by property name, landmark, area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              />
            </div>

            {/* City Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all cursor-pointer"
              >
                <option value="" className="bg-[#141414]">All Locations</option>
                {cities.map(city => (
                  <option key={city} value={city} className="bg-[#141414]">{city}</option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div className="lg:col-span-2">
              <input
                type="number"
                placeholder="Min Price (₹)"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              />
            </div>

            {/* Max Price */}
            <div className="lg:col-span-2">
              <input
                type="number"
                placeholder="Max Price (₹)"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              />
            </div>

          </div>
        </div>

        {/* Property Catalog Grid */}
        {filteredProperties.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#141414] border border-white/10 text-center max-w-lg mx-auto space-y-4">
            <Building className="w-10 h-10 text-neutral-500 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">No Matching Accommodations Found</h3>
              <p className="text-xs text-neutral-400">Try adjusting your search criteria or clearing current filters.</p>
            </div>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-lg bg-[#E50914] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#b80710] shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
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
                className="group rounded-2xl overflow-hidden bg-[#141414] border border-white/10 hover:border-red-600/50 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-red-600/10"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={getSecureImageUrl(
                      property.images && property.images.length > 0
                        ? property.images[currentImageIndex[property.id] || 0]
                        : null,
                      pIdx
                    )}
                    alt={`${property.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500 text-black shadow-md">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/15">
                      ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-neutral-400 font-normal">/mo</span>
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
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 text-white hover:bg-[#E50914] transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage(property.id);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 text-white hover:bg-[#E50914] transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2.5">
                    <h2 className="text-base font-bold text-white group-hover:text-red-400 transition-colors truncate">
                      {property.name}
                    </h2>
                    
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                      <span className="truncate">{property.city}, {property.area}</span>
                    </div>

                    {/* Meta Specs */}
                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/10 text-xs text-neutral-300">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{property.rooms} Total Units</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="truncate">{property.buildingType || 'PG Stay'}</span>
                      </div>
                    </div>

                    {/* Owner Contacts */}
                    <div className="text-xs text-neutral-400 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-white font-medium truncate">{property.ownerName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
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
                    className="w-full py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider text-white bg-white/5 hover:bg-[#E50914] border border-white/10 hover:border-[#E50914] shadow-sm hover:shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
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