import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  X, 
  ArrowLeft, 
  MapPin, 
  Home, 
  Users, 
  DollarSign, 
  Calendar, 
  Building, 
  Phone, 
  Mail, 
  Clock, 
  User, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { getSecureImageUrl } from '../../../utils/imageUtils';

const PropertyApproval = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchPendingProperties();
  }, []);

  const fetchPendingProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyApi.getPendingProperties();
      setProperties(response || []);
      
      const initialIndexes = {};
      (response || []).forEach(property => {
        initialIndexes[property.id] = 0;
      });
      setCurrentImageIndex(initialIndexes);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to load pending properties');
      toast.error('Failed to load pending properties');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (propertyId, action) => {
    try {
      if (action === 'approve') {
        await propertyApi.approveProperty(propertyId);
        toast.success('Property approved and published to seekers!');
        navigate('/admin-dashboard/available-pgs');
      } else {
        setSelectedPropertyId(propertyId);
        setShowRejectDialog(true);
      }
    } catch (error) {
      console.error('Error handling approval:', error);
      toast.error(`Failed to ${action} property`);
    }
  };

  const handleRejectSubmit = async () => {
    try {
      if (!rejectionReason.trim()) {
        toast.error('Please provide a specific feedback reason for the host');
        return;
      }
      await propertyApi.rejectProperty(selectedPropertyId, rejectionReason);
      toast.success('Property status marked as Rejected. Feedback recorded.');
      setShowRejectDialog(false);
      setRejectionReason('');
      navigate('/admin-dashboard/rejected-pgs');
    } catch (error) {
      console.error('Error rejecting property:', error);
      toast.error('Failed to reject property');
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
        <p className="text-sm font-semibold text-zinc-400">Loading pending property submissions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 selection:bg-orange-500 selection:text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Top Header */}
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
                Pending Property Audits ({properties.length})
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">Inspect listings and verify host compliance before live publication</p>
            </div>
          </div>
        </div>

        {error ? (
          <div className="glass-panel p-8 rounded-2xl border border-red-500/30 text-center max-w-md mx-auto">
            <p className="text-sm font-semibold text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchPendingProperties}
              className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : properties.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-zinc-800 text-center max-w-md mx-auto glow-orange-sm">
            <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h2 className="text-xl font-extrabold text-white mb-1.5">Audit Queue Clear!</h2>
            <p className="text-xs text-zinc-400 mb-6">
              All submitted PG accommodation listings have been audited. There are no pending requests waiting for review.
            </p>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-bold text-xs transition-colors"
            >
              Return to Control Center
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
                  className="rounded-3xl overflow-hidden glass-panel border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-amber-500/5 glow-orange-sm"
                >
                  {/* Photo Carousel Area */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 group">
                    <img
                      src={getSecureImageUrl(hasImages ? property.images[activeIdx] : null, pIdx)}
                      alt={`${property.name} photo`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                    {/* Pending Pill */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-amber-500/10 text-amber-400 border-amber-500/20 backdrop-blur-md">
                        <Clock className="w-3 h-3" />
                        <span>Awaiting Audit</span>
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
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {property.images.map((_, dotIdx) => (
                            <div
                              key={dotIdx}
                              className={`h-1.5 rounded-full transition-all ${
                                dotIdx === activeIdx ? 'w-4 bg-orange-500' : 'w-1.5 bg-white/40'
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
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="text-base font-bold text-white truncate mr-2">{property.name}</h3>
                        <span className="text-sm font-extrabold text-orange-400">₹{property.rent?.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="truncate">{property.city}, {property.area}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-zinc-800/80 text-xs text-zinc-300 mb-3">
                        <div>
                          <span className="text-zinc-500 block text-[10px]">Total Rooms</span>
                          <span className="font-semibold">{property.rooms} Rooms</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block text-[10px]">Structure</span>
                          <span className="font-semibold truncate block">{property.buildingType || 'PG Unit'}</span>
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

                    {/* Audit Decision Buttons */}
                    <div className="mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleApproval(property.id, 'approve')}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5 hover:-translate-y-0.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleApproval(property.id, 'reject')}
                        className="py-2.5 px-3 rounded-xl bg-zinc-900 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ⚠️ Rejection Reason Modal */}
      {showRejectDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-red-500/40 max-w-md w-full text-zinc-100 shadow-2xl glow-orange-sm">
            <div className="flex items-center gap-2.5 text-red-400 mb-3">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Specify Listing Rejection Reason</h3>
            </div>
            
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              This feedback will be displayed directly to the host provider so they can make the necessary changes and re-submit.
            </p>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Inadequate room photo resolution, invalid phone contact, or address mismatch."
              rows={4}
              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500 mb-5"
            />

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  setShowRejectDialog(false);
                  setRejectionReason('');
                }}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-md shadow-red-600/25"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PropertyApproval;
