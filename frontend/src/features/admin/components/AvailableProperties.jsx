import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Home, 
  Users, 
  DollarSign, 
  Building, 
  Phone, 
  Mail, 
  Clock, 
  User, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
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
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex flex-col items-center justify-center gap-4 text-zinc-100">
        <div className="h-12 w-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin glow-orange-sm" />
        <p className="text-sm font-semibold text-zinc-400">Loading verified property catalog...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 selection:bg-orange-500 selection:text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Live & Approved Accommodations ({properties.length})
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">Verified catalog listings currently visible to public seekers</p>
            </div>
          </div>
        </div>

        {error ? (
          <div className="glass-panel p-8 rounded-2xl border border-red-500/30 text-center max-w-md mx-auto">
            <p className="text-sm font-semibold text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchAvailableProperties}
              className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : properties.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-zinc-800 text-center max-w-md mx-auto glow-orange-sm">
            <Building className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h2 className="text-xl font-extrabold text-white mb-1.5">No Approved Properties Live</h2>
            <p className="text-xs text-zinc-400 mb-6">
              When accommodations pass admin compliance review, they will appear here as active public listings.
            </p>
            <button
              onClick={() => navigate('/admin-dashboard/approvals')}
              className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
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
                  className="rounded-3xl overflow-hidden glass-panel border border-zinc-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-emerald-500/5 glow-orange-sm"
                >
                  {/* Photo Carousel Area */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 group">
                    <img
                      src={getSecureImageUrl(hasImages ? property.images[activeIdx] : null, pIdx)}
                      alt={`${property.name} photo`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                    {/* Approved Pill */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-md">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Live Approved</span>
                      </span>
                    </div>

                    {/* Rent Tag */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-zinc-950/80 text-orange-400 border border-orange-500/30 backdrop-blur-md">
                        ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-zinc-400 font-normal">/mo</span>
                      </span>
                    </div>

                    {/* Carousel Navigators */}
                    {hasImages && property.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => prevImage(property.id, e)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-zinc-950/70 text-white hover:bg-orange-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => nextImage(property.id, e)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-zinc-950/70 text-white hover:bg-orange-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 right-3 flex gap-1">
                          {property.images.map((_, dotIdx) => (
                            <div
                              key={dotIdx}
                              className={`h-1.5 rounded-full transition-all ${
                                dotIdx === activeIdx ? 'w-3.5 bg-emerald-400' : 'w-1.5 bg-white/40'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Property Specs Body */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white truncate mb-1">{property.name}</h3>

                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="truncate">{property.city}, {property.area}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-zinc-800/80 text-xs text-zinc-300 mb-3">
                        <div>
                          <span className="text-zinc-500 block text-[10px]">Room Capacity</span>
                          <span className="font-semibold">{property.rooms} Rooms</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block text-[10px]">Building Type</span>
                          <span className="font-semibold truncate block">{property.buildingType || 'PG Stay'}</span>
                        </div>
                      </div>

                      {/* Host Info */}
                      <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-zinc-300 font-semibold truncate">
                          <User className="w-3.5 h-3.5 text-orange-500" />
                          <span>{property.ownerName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                          <Phone className="w-3 h-3 text-zinc-500" />
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