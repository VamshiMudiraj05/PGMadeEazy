import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Building, 
  User, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { getSecureImageUrl } from '../../../utils/imageUtils';

// Reusable Split-Flap Character Component
function FlapChar({ char, size = "16px" }) {
  const displayChar = char === " " ? "\u00A0" : char.toUpperCase();
  const isSpecial = char === "+" || char === "-" || char === "/" || char === ":" || char === ".";

  return (
    <span 
      className={`c ${isSpecial ? "op" : ""}`}
      style={{ "--cw": size }}
      aria-hidden="true"
    >
      <i className="u">{displayChar}</i>
      <i className="l">{displayChar}</i>
    </span>
  );
}

// Reusable Split-Flap Word/String Component
function FlapWord({ text, size = "16px", colorClass = "text-[#f2f2f2]" }) {
  const chars = String(text).toUpperCase().split("");
  return (
    <span className={`fl ${colorClass}`}>
      {chars.map((ch, idx) => (
        <FlapChar key={idx} char={ch} size={size} />
      ))}
    </span>
  );
}

const AvailableProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    fetchAvailableProperties();
  }, []);

  const fetchAvailableProperties = async () => {
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
      setError('Failed to load active accommodations');
      toast.error('Failed to load active accommodations');
    } finally {
      setLoading(false);
    }
  };

  const nextImage = (propertyId, e) => {
    e.stopPropagation();
    const property = properties.find(p => p.id === propertyId);
    if (property && property.images && property.images.length > 0) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [propertyId]: (prev[propertyId] + 1) % property.images.length
      }));
    }
  };

  const prevImage = (propertyId, e) => {
    e.stopPropagation();
    const property = properties.find(p => p.id === propertyId);
    if (property && property.images && property.images.length > 0) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [propertyId]: prev[propertyId] === 0 ? property.images.length - 1 : prev[propertyId] - 1
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#1f2226] flex flex-col items-center justify-center gap-4 text-[#f2f2f2] font-['Barlow_Semi_Condensed']">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#a7aaaf]">LOADING ACTIVE PG CATALOG...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1f2226] text-[#f2f2f2] py-10 min-h-screen relative font-['Barlow_Semi_Condensed']">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Top Board Header */}
        <div className="board">
          <div className="board-head">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/admin-dashboard')}
                className="btn-solari btn-solari-steel text-xs py-1.5 px-3"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK</span>
              </button>
              <span className="w-2.5 h-2.5 bg-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                ACTIVE ACCOMMODATION ROSTER
              </h2>
            </div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[#a7aaaf]">
              <span>ACTIVE STAYS: <b className="text-emerald-400 font-mono">{properties.length}</b></span>
              <span>AUDIT STATUS: <b className="text-white font-mono">100% COMPLIANT</b></span>
            </div>
          </div>

          <div className="py-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <FlapWord text="APPROVED" size="clamp(22px, 3.4vw, 40px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="STAYS." size="clamp(22px, 3.4vw, 40px)" colorClass="text-emerald-400" />
            </div>
          </div>
        </div>

        {error ? (
          <div className="board text-center max-w-md mx-auto space-y-4">
            <p className="text-xs font-mono text-red-400 uppercase tracking-wider">{error}</p>
            <button
              onClick={fetchAvailableProperties}
              className="btn-solari btn-solari-amber text-xs"
            >
              RETRY FETCH
            </button>
          </div>
        ) : properties.length === 0 ? (
          <div className="board text-center max-w-md mx-auto space-y-4 py-12">
            <Building className="w-10 h-10 text-[#a7aaaf] mx-auto" />
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white uppercase font-['Big_Shoulders_Display'] tracking-[0.1em]">
                ZERO ACTIVE ACCOMMODATIONS
              </h2>
              <p className="text-xs text-[#a7aaaf]">
                When student PG listings pass compliance review, they will appear here as live discoverable accommodations.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin-dashboard/approvals')}
              className="btn-solari btn-solari-amber text-xs"
            >
              CHECK AUDIT QUEUE
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, pIdx) => {
              const activeIdx = currentImageIndex[property.id] || 0;
              const hasImages = property.images && property.images.length > 0;

              return (
                <div
                  key={property.id || pIdx}
                  className="rounded-[3px] overflow-hidden bg-[#0e0f11] border border-[#2a2d31] hover:border-[#ffb000]/60 transition-colors flex flex-col justify-between"
                >
                  {/* Photo Carousel Area */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black group">
                    <img
                      src={getSecureImageUrl(hasImages ? property.images[activeIdx] : null, pIdx)}
                      alt={`${property.name} photo`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f11] via-transparent to-transparent opacity-80" />

                    {/* Approved Pill */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-emerald-500 text-black font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>LIVE APPROVED</span>
                      </span>
                    </div>

                    {/* Rent Tag */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-[2px] bg-[#0b0b0d]/90 text-white border border-[#34373c] font-mono">
                        ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-[#a7aaaf]">/MO</span>
                      </span>
                    </div>

                    {/* Carousel Navigators */}
                    {hasImages && property.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => prevImage(property.id, e)}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-[2px] bg-[#0b0b0d]/90 text-white hover:text-[#ffb000] border border-[#34373c] transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => nextImage(property.id, e)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-[2px] bg-[#0b0b0d]/90 text-white hover:text-[#ffb000] border border-[#34373c] transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Property Specs Body */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white uppercase tracking-[0.08em] font-['Big_Shoulders_Display'] truncate">
                          {property.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-[#a7aaaf]">
                          <MapPin className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                          <span className="truncate uppercase">{property.city}, {property.area}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 py-2 border-y border-[#202226] text-xs text-white">
                        <div>
                          <span className="text-[#a7aaaf] block text-[10px] uppercase tracking-wider">ROOMS</span>
                          <span className="font-mono font-bold">{property.rooms} ROOMS</span>
                        </div>
                        <div>
                          <span className="text-[#a7aaaf] block text-[10px] uppercase tracking-wider">STRUCTURE</span>
                          <span className="font-mono font-bold uppercase truncate block">{property.buildingType || 'STUDENT PG'}</span>
                        </div>
                      </div>

                      {/* Host Info */}
                      <div className="p-2.5 rounded-[2px] bg-[#0b0b0d] border border-[#202226] text-xs space-y-0.5">
                        <div className="flex items-center gap-1.5 text-white font-medium truncate">
                          <User className="w-3.5 h-3.5 text-[#ffb000]" />
                          <span className="uppercase">{property.ownerName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#a7aaaf] text-[11px] pl-5 font-mono">
                          <span>{property.ownerPhone}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableProperties;