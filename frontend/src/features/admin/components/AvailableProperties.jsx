import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Building, 
  Phone, 
  User, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { getSecureImageUrl } from '../../../utils/imageUtils';

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
      setError('Failed to load available properties');
      toast.error('Failed to load available properties');
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
      <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-8 w-8 border-3 border-[#E50914] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#E50914]" />
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading verified accommodations...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-emerald-550">VERIFIED MARKETPLACE</div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Live Accommodations ({properties.length})
              </h1>
            </div>
          </div>
        </div>

        {error ? (
          <div className="p-8 rounded-2xl bg-[#141414] border border-red-500/30 text-center max-w-md mx-auto space-y-4 shadow-xl">
            <p className="text-xs font-semibold text-red-400">{error}</p>
            <button
              onClick={fetchAvailableProperties}
              className="px-6 py-2.5 rounded-lg bg-[#E50914] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : properties.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#141414] border border-white/10 text-center max-w-md mx-auto space-y-4 shadow-xl">
            <Building className="w-8 h-8 text-neutral-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">Zero Active Accommodations</h2>
              <p className="text-xs text-neutral-400">
                When accommodations pass admin compliance review, they will appear here as active public listings.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin-dashboard/approvals')}
              className="w-full py-3 px-4 bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              Check Audit Queue
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
                  className="rounded-2xl overflow-hidden bg-[#141414] border border-white/10 hover:border-red-600/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-red-600/10"
                >
                  {/* Photo Carousel Area */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black group">
                    <img
                      src={getSecureImageUrl(hasImages ? property.images[activeIdx] : null, pIdx)}
                      alt={`${property.name} photo`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />

                    {/* Approved Pill */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500 text-black shadow-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Live Approved</span>
                      </span>
                    </div>

                    {/* Rent Tag */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/15">
                        ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-neutral-400 font-normal">/mo</span>
                      </span>
                    </div>

                    {/* Carousel Navigators */}
                    {hasImages && property.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => prevImage(property.id, e)}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/80 text-white hover:bg-[#E50914] transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => nextImage(property.id, e)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/80 text-white hover:bg-[#E50914] transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 right-3 flex gap-1">
                          {property.images.map((_, dotIdx) => (
                            <div
                              key={dotIdx}
                              className={`h-1 rounded-full transition-all ${
                                dotIdx === activeIdx ? 'w-3.5 bg-emerald-400' : 'w-1 bg-white/40'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Property Specs Body */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-white truncate">{property.name}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                          <MapPin className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                          <span className="truncate">{property.city}, {property.area}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-white/10 text-xs text-white">
                        <div>
                          <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Inventory</span>
                          <span className="font-semibold">{property.rooms} Rooms</span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Structure</span>
                          <span className="font-semibold truncate block">{property.buildingType || 'PG Stay'}</span>
                        </div>
                      </div>

                      {/* Host Info */}
                      <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs space-y-0.5">
                        <div className="flex items-center gap-1.5 text-white font-medium truncate">
                          <User className="w-3.5 h-3.5 text-[#E50914]" />
                          <span>{property.ownerName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] pl-5">
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