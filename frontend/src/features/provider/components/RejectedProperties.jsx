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
      <div className="min-h-[calc(100vh-140px)] bg-[#0B0B0E] flex flex-col items-center justify-center gap-3 text-[#FAFAFA]">
        <div className="h-6 w-6 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#7A7A85]">Loading audit records...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0E] text-[#FAFAFA] py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1E1E26]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">Compliance & Audits</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Rejected Listing Reviews
              </h1>
            </div>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="p-12 rounded-sm bg-[#121217] border border-[#1E1E26] text-center max-w-md mx-auto space-y-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">Zero Flagged Listings</h2>
              <p className="text-xs text-[#7A7A85]">
                All your submitted properties comply with platform guidelines and are active or in queue.
              </p>
            </div>
            <button
              onClick={() => navigate('/provider-dashboard/my-properties')}
              className="px-4 py-2 rounded-sm bg-[#FF5A36] hover:bg-[#E54B28] text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Go to Properties Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, pIdx) => (
              <div
                key={property.id || pIdx}
                className="rounded-sm overflow-hidden bg-[#121217] border border-red-500/30 flex flex-col justify-between"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0B0E]">
                  <img
                    src={getSecureImageUrl(property.images?.[0] || null, pIdx)}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-red-500 text-white">
                      <XCircle className="w-3 h-3" />
                      <span>Changes Required</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Admin Reason Callout */}
                    <div className="p-3 rounded-sm bg-[#0B0B0E] border border-red-500/30 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-red-400">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Compliance Note:</span>
                      </div>
                      <p className="text-xs text-[#FAFAFA] leading-relaxed">
                        {property.rejectionReason || 'Photos or property details required refinement. Please update and re-submit.'}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white truncate">
                        {property.name}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-xs text-[#7A7A85]">
                        <MapPin className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                        <span className="truncate">{property.city}, {property.area}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-[#1E1E26] text-xs text-[#FAFAFA]">
                      <div>
                        <span className="text-[#7A7A85] block text-[10px] uppercase tracking-wider">Monthly Tariff</span>
                        <span className="font-semibold text-[#FF5A36]">₹{property.rent?.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[#7A7A85] block text-[10px] uppercase tracking-wider">Inventory</span>
                        <span className="font-semibold">{property.rooms} Rooms</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => navigate(`/provider/edit-property/${property.id}`)}
                    className="w-full py-2.5 px-4 rounded-sm bg-[#FF5A36] hover:bg-[#E54B28] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Update & Resubmit</span>
                  </button>

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