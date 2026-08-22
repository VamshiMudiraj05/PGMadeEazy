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
      <div className="min-h-[calc(100vh-140px)] bg-[#0B0B0E] flex flex-col items-center justify-center gap-3 text-[#FAFAFA]">
        <div className="h-6 w-6 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#7A7A85]">Loading verified accommodations...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0E] text-[#FAFAFA] py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1E1E26]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="p-2 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Verified Marketplace</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Live Accommodations ({properties.length})
              </h1>
            </div>
          </div>
        </div>

        {error ? (
          <div className="p-8 rounded-sm bg-[#121217] border border-red-500/30 text-center max-w-md mx-auto space-y-4">
            <p className="text-xs font-semibold text-red-400">{error}</p>
            <button
              onClick={fetchAvailableProperties}
              className="px-4 py-2 rounded-sm bg-[#FF5A36] text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Retry
            </button>
          </div>
        ) : properties.length === 0 ? (
          <div className="p-12 rounded-sm bg-[#121217] border border-[#1E1E26] text-center max-w-md mx-auto space-y-4">
            <Building className="w-8 h-8 text-[#7A7A85] mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">Zero Active Accommodations</h2>
              <p className="text-xs text-[#7A7A85]">
                When accommodations pass admin compliance review, they will appear here as active public listings.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin-dashboard/approvals')}
              className="px-4 py-2 rounded-sm bg-[#FF5A36] hover:bg-[#E54B28] text-white font-bold text-xs uppercase tracking-wider transition-colors"
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
                  className="rounded-sm overflow-hidden bg-[#121217] border border-[#1E1E26] flex flex-col justify-between"
                >
                  {/* Photo Carousel Area */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0B0E] group">
                    <img
                      src={getSecureImageUrl(hasImages ? property.images[activeIdx] : null, pIdx)}
                      alt={`${property.name} photo`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent opacity-80" />

                    {/* Approved Pill */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-emerald-500 text-black">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Live Approved</span>
                      </span>
                    </div>

                    {/* Rent Tag */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#0B0B0E]/90 text-white border border-[#22222A]">
                        ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-[#7A7A85] font-normal">/mo</span>
                      </span>
                    </div>

                    {/* Carousel Navigators */}
                    {hasImages && property.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => prevImage(property.id, e)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-sm bg-black/80 text-white hover:bg-[#FF5A36] transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => nextImage(property.id, e)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-sm bg-black/80 text-white hover:bg-[#FF5A36] transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-2 right-3 flex gap-1">
                          {property.images.map((_, dotIdx) => (
                            <div
                              key={dotIdx}
                              className={`h-1 rounded-xs transition-all ${
                                dotIdx === activeIdx ? 'w-3 bg-emerald-400' : 'w-1 bg-white/40'
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
                        <div className="flex items-center gap-1.5 text-xs text-[#7A7A85]">
                          <MapPin className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                          <span className="truncate">{property.city}, {property.area}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-[#1E1E26] text-xs text-[#FAFAFA]">
                        <div>
                          <span className="text-[#7A7A85] block text-[10px] uppercase tracking-wider">Inventory</span>
                          <span className="font-semibold">{property.rooms} Rooms</span>
                        </div>
                        <div>
                          <span className="text-[#7A7A85] block text-[10px] uppercase tracking-wider">Structure</span>
                          <span className="font-semibold truncate block">{property.buildingType || 'PG Stay'}</span>
                        </div>
                      </div>

                      {/* Host Info */}
                      <div className="p-2.5 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] text-xs space-y-0.5">
                        <div className="flex items-center gap-1.5 text-white font-medium truncate">
                          <User className="w-3 h-3 text-[#FF5A36]" />
                          <span>{property.ownerName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#7A7A85] text-[11px]">
                          <Phone className="w-3 h-3" />
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