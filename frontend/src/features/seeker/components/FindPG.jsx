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
  User,
  BedDouble,
  Utensils,
  Wifi
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import PropertyDetails from './PropertyDetails';
import { getSecureImageUrl } from '../../../utils/imageUtils';

// Solari Flap Character Unit
function FlapChar({ char, size = "18px" }) {
  const isSpace = char === " ";
  const displayChar = isSpace ? "" : char;
  return (
    <span
      className={`c ${isSpace ? "sp" : ""}`}
      style={{ "--cw": size }}
      aria-hidden="true"
    >
      <i className="u">{displayChar}</i>
      <i className="l">{displayChar}</i>
    </span>
  );
}

function FlapWord({ text, size = "18px", colorClass = "text-[#f2f2f2]" }) {
  const chars = String(text).toUpperCase().split("");
  return (
    <span className={`fl ${colorClass}`}>
      {chars.map((ch, idx) => (
        <FlapChar key={idx} char={ch} size={size} />
      ))}
    </span>
  );
}

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
      <div className="min-h-[calc(100vh-140px)] bg-[#0b0b0d] flex flex-col items-center justify-center gap-4">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-none animate-spin shadow-[0_0_10px_#ffb000]" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
          RETRIEVING LIVE STUDENT PG ROSTER...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#0b0b0d] flex items-center justify-center p-4">
        <div className="board max-w-md text-center p-8 space-y-4">
          <p className="text-[#ff4b4b] text-xs font-mono uppercase tracking-wider">{error}</p>
          <button
            onClick={fetchApprovedProperties}
            className="btn-solari btn-solari-amber text-xs mx-auto"
          >
            RETRY TRANSMISSION
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0b0d] text-[#f2f2f2] py-8 min-h-screen relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 relative z-10">
        
        {/* Top Departure Board Header */}
        <div className="board">
          <div className="board-head">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/seeker-dashboard')}
                className="p-1.5 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#a7aaaf] hover:text-[#ffb000] hover:border-[#ffb000]/60 transition-all cursor-pointer"
                title="Return to Dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="w-2 h-2 bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffb000] font-['Barlow_Semi_Condensed']">
                CATALOG DIRECTORY // VERIFIED STUDENT HOSTELS
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-['Barlow_Semi_Condensed'] uppercase tracking-[0.16em] text-[#a7aaaf]">
              <span>ACTIVE UNITS: <b className="text-white font-mono">{filteredProperties.length}</b></span>
              <span>ZERO BROKERAGE: <b className="text-emerald-400 font-mono">100%</b></span>
            </div>
          </div>

          <div className="py-4 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed'] mb-1">
                CAMPUS ACCOMMODATIONS ROSTER
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                <FlapWord text="STUDENT" size="clamp(22px, 3.5vw, 36px)" colorClass="text-[#f2f2f2]" />
                <FlapWord text="HOSTELS & PGS." size="clamp(22px, 3.5vw, 36px)" colorClass="text-[#ffb000]" />
              </div>
            </div>

            {(searchTerm || selectedCity || priceRange.min || priceRange.max) && (
              <button
                onClick={resetFilters}
                className="btn-solari btn-solari-steel text-xs self-start md:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#ffb000]" />
                <span>RESET FILTERS</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Terminal */}
        <div className="p-4 rounded-[3px] bg-[#121316] border border-[#26292d]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a7aaaf] pointer-events-none" />
              <input
                type="text"
                placeholder="SEARCH PG NAME, COLLEGE, LANDMARK..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-[#f2f2f2] placeholder-[#a7aaaf]/50 focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed'] uppercase tracking-wider"
              />
            </div>

            {/* City Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-[#f2f2f2] focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed'] uppercase tracking-wider cursor-pointer"
              >
                <option value="" className="bg-[#121316]">ALL CAMPUS CITIES</option>
                {cities.map(city => (
                  <option key={city} value={city} className="bg-[#121316]">{city.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div className="lg:col-span-2">
              <input
                type="number"
                placeholder="MIN BUDGET (₹)"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                className="w-full px-3 py-2.5 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-[#f2f2f2] placeholder-[#a7aaaf]/50 focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
              />
            </div>

            {/* Max Price */}
            <div className="lg:col-span-2">
              <input
                type="number"
                placeholder="MAX BUDGET (₹)"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-full px-3 py-2.5 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-[#f2f2f2] placeholder-[#a7aaaf]/50 focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
              />
            </div>

          </div>
        </div>

        {/* Student PG Grid */}
        {filteredProperties.length === 0 ? (
          <div className="board text-center p-12 space-y-4 max-w-lg mx-auto">
            <Building className="w-8 h-8 text-[#a7aaaf] mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold uppercase tracking-[0.16em] text-white font-['Big_Shoulders_Display']">
                NO MATCHING STUDENT PGS FOUND
              </h3>
              <p className="text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
                Try widening your budget filter or searching a neighboring campus area.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="btn-solari btn-solari-amber text-xs mx-auto"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProperties.map((property, pIdx) => (
              <div
                key={property.id}
                onClick={() => setSelectedProperty(property)}
                className="rounded-[3px] overflow-hidden bg-[#121316] border border-[#26292d] hover:border-[#ffb000]/70 transition-all cursor-pointer flex flex-col justify-between group"
              >
                {/* Photo Manifest Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0b0d]">
                  <img
                    src={getSecureImageUrl(
                      property.images && property.images.length > 0
                        ? property.images[currentImageIndex[property.id] || 0]
                        : null,
                      pIdx
                    )}
                    alt={`${property.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-[2px] bg-emerald-500 text-black font-['Barlow_Semi_Condensed']">
                      <ShieldCheck className="w-3 h-3" />
                      <span>AUDITED PG</span>
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-[2px] bg-[#0b0b0d]/90 text-[#ffb000] border border-[#ffb000]/50 font-['Big_Shoulders_Display'] tracking-wider">
                      ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">/BED/MO</span>
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
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-[2px] bg-black/80 text-white hover:bg-[#ffb000] hover:text-black transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage(property.id);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-[2px] bg-black/80 text-white hover:bg-[#ffb000] hover:text-black transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-base font-bold uppercase tracking-[0.14em] text-white font-['Big_Shoulders_Display'] group-hover:text-[#ffb000] transition-colors truncate">
                      {property.name}
                    </h2>
                    
                    <div className="flex items-center gap-1.5 text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                      <span className="truncate">{property.city}, {property.area}</span>
                    </div>

                    {/* Meta Amenities Strip */}
                    <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-[#202226] text-xs text-[#f2f2f2] font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-[#ffb000]" />
                        <span>{property.rooms} ROOMS TOTAL</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="truncate">{property.buildingType || 'STUDENT HOSTEL'}</span>
                      </div>
                    </div>

                    {/* Warden / Host Info */}
                    <div className="text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed'] uppercase tracking-wider space-y-1 pt-1">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#a7aaaf]" />
                        <span className="text-white font-medium truncate">WARDEN: {property.ownerName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#a7aaaf]" />
                        <span>CONTACT: {property.ownerPhone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trigger Action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProperty(property);
                    }}
                    className="btn-solari btn-solari-steel text-xs w-full justify-center group-hover:border-[#ffb000]/60 group-hover:text-white"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#ffb000]" />
                    <span>INSPECT SPECIFICATIONS</span>
                    <span className="chev">→</span>
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