import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ArrowLeft, 
  MapPin, 
  Users, 
  DollarSign, 
  XCircle, 
  AlertTriangle,
  Edit3,
  CheckCircle2
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import { getSecureImageUrl } from '../../../utils/imageUtils';

const RejectedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    loadRejectedProperties();
  }, []);

  const loadRejectedProperties = async () => {
    try {
      setLoading(true);
      const ownerProperties = await propertyApi.getPropertiesByOwner(user?.email || user?.name);
      const rejectedProperties = (ownerProperties || []).filter(
        prop => prop.status === 'REJECTED' || prop.approvalStatus === 'REJECTED'
      );
      setProperties(rejectedProperties);
    } catch (err) {
      toast.error('Failed to load rejected properties');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex flex-col items-center justify-center gap-4 text-zinc-100">
        <div className="h-12 w-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin glow-orange-sm" />
        <p className="text-sm font-semibold text-zinc-400">Loading audit records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 selection:bg-orange-500 selection:text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Rejected Listing Reviews
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">Review admin compliance feedback and update listings for re-approval</p>
            </div>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-zinc-800 text-center max-w-md mx-auto glow-orange-sm">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h2 className="text-xl font-extrabold text-white mb-1.5">Zero Rejected Listings!</h2>
            <p className="text-xs text-zinc-400 mb-6">
              All your submitted properties comply with platform standards and are either active or currently under review.
            </p>
            <button
              onClick={() => navigate('/provider-dashboard/my-properties')}
              className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
            >
              Go to My Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, pIdx) => (
              <div
                key={property.id || pIdx}
                className="rounded-3xl overflow-hidden glass-panel border border-red-500/30 hover:border-red-500/60 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-red-500/10"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img
                    src={getSecureImageUrl(property.images?.[0] || null, pIdx)}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-red-500/10 text-red-400 border-red-500/20 backdrop-blur-md">
                      <XCircle className="w-3 h-3" />
                      <span>Rejection Audit</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Admin Reason Callout */}
                    <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/25 mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Admin Auditor Note:</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {property.rejectionReason || 'Photos or property details required refinement. Please update and re-submit.'}
                      </p>
                    </div>

                    <h3 className="text-base font-bold text-white truncate mb-1">
                      {property.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="truncate">{property.city}, {property.area}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-zinc-800/80 text-xs text-zinc-300">
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Monthly Rent</span>
                        <span className="font-semibold text-orange-400">₹{property.rent?.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Rooms</span>
                        <span className="font-semibold">{property.rooms} Rooms</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/provider/edit-property/${property.id}`)}
                      className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Update & Resubmit Listing</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default RejectedProperties;