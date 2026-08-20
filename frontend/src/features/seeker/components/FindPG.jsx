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
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin glow-orange-sm" />
        <p className="text-sm font-semibold text-zinc-400">Loading verified accommodations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex items-center justify-center p-4">
        <div className="glass-panel p-8 rounded-2xl border border-red-500/30 text-center max-w-md">
          <p className="text-red-400 font-semibold mb-4">{error}</p>
          <button
            onClick={fetchApprovedProperties}
            className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 selection:bg-orange-500 selection:text-white">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/seeker-dashboard')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-all"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Verified Accommodations
                </h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {filteredProperties.length} Available
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">Explore approved PGs, private rooms, and student hostels</p>
            </div>
          </div>

          {(searchTerm || selectedCity || priceRange.min || priceRange.max) && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-orange-400 hover:border-orange-500/30 transition-all self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* 🔍 Smart Filter Panel */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-zinc-800 mb-8 glow-orange-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5">
            
            {/* Search Input (5 Cols on lg) */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by property name, landmark, area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>

            {/* City Dropdown (3 Cols on lg) */}
            <div className="lg:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
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
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>

            {/* Max Price (2 Cols on lg) */}
            <div className="lg:col-span-2">
              <input
                type="number"
                placeholder="Max Price (₹)"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>

          </div>
        </div>

        {/* 🏢 Property Catalog Grid */}
        {filteredProperties.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-zinc-800 text-center max-w-lg mx-auto">
            <Building className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Matching Properties Found</h3>
            <p className="text-xs text-zinc-400 mb-6">Try broadening your search term or clearing the city and price budget filters.</p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20"
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
                className="group relative rounded-3xl overflow-hidden glass-panel border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:shadow-orange-500/10 glow-orange-sm"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-500/90 text-white shadow-md backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-zinc-950/80 text-orange-400 border border-orange-500/30 backdrop-blur-md shadow-md">
                      ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-zinc-400 font-normal">/mo</span>
                    </span>
                  </div>

                  {/* Image Navigation Carousel Buttons */}
                  {property.images && property.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage(property.id);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-zinc-950/70 text-white hover:bg-orange-500 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage(property.id);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-zinc-950/70 text-white hover:bg-orange-500 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      {/* Dots */}
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {property.images.map((_, dotIdx) => (
                          <div
                            key={dotIdx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              dotIdx === (currentImageIndex[property.id] || 0)
                                ? 'w-4 bg-orange-500'
                                : 'w-1.5 bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors truncate">
                      {property.name}
                    </h2>
                    
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="truncate">{property.city}, {property.area}</span>
                    </div>

                    {/* Meta Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-zinc-800/80 text-xs text-zinc-300">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-orange-500" />
                        <span>{property.rooms} Total Rooms</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-orange-500" />
                        <span className="truncate">{property.buildingType || 'PG Stay'}</span>
                      </div>
                    </div>

                    {/* Owner Card Details */}
                    <div className="mt-3 pt-1 text-xs text-zinc-400 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-orange-500/80" />
                        <span className="text-zinc-200 font-medium truncate">{property.ownerName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-orange-500/80" />
                        <span>{property.ownerPhone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trigger Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProperty(property);
                    }}
                    className="w-full mt-5 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Property Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🌟 Property Details Modal */}
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