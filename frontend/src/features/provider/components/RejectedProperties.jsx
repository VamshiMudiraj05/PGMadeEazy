import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ArrowLeft, 
  MapPin, 
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
      toast.error('Failed to load audit findings');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#0a0a0c] flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#ffb000]">
          SYNCING COMPLIANCE AUDIT RECORDS...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0c] text-neutral-100 py-10 min-h-screen relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="board p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/provider-dashboard')}
                className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#ffb000]/40 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#ffb000] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ffb000]">
                    TERMINAL 06 // COMPLIANCE AUDITS
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-['Big_Shoulders_Display']">
                  Rejected PG Listings & Revisions
                </h1>
              </div>
            </div>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="board p-12 text-center max-w-md mx-auto space-y-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white uppercase font-['Big_Shoulders_Display']">
                Zero Flagged Listings
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                All your submitted student accommodations comply with verification standards and are active or in queue.
              </p>
            </div>
            <button
              onClick={() => navigate('/provider-dashboard/my-properties')}
              className="btn-solari-amber w-full cursor-pointer"
            >
              Go to Properties Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, pIdx) => (
              <div
                key={property.id || pIdx}
                className="board overflow-hidden flex flex-col justify-between hover:border-red-500/60 transition-all duration-200"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black border-b border-neutral-800">
                  <img
                    src={getSecureImageUrl(property.images?.[0] || null, pIdx)}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-red-500/15 text-red-400 border border-red-500/40">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Changes Required</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3 font-mono">
                    {/* Compliance Finding Note */}
                    <div className="p-3 rounded bg-red-950/20 border border-red-500/30 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-red-400">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Audit Finding:</span>
                      </div>
                      <p className="text-xs text-neutral-200 leading-relaxed">
                        {property.rejectionReason || 'Photos or accommodation details required refinement. Please update and re-submit.'}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white uppercase font-['Big_Shoulders_Display'] tracking-wide truncate">
                        {property.name}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <MapPin className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                        <span className="truncate">{property.city}, {property.area}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-neutral-800 text-xs">
                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Bed Tariff</span>
                        <span className="font-extrabold text-[#ffb000]">₹{property.rent?.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Bed Units</span>
                        <span className="font-semibold text-white">{property.rooms} Units</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => navigate('/provider-dashboard/my-properties')}
                    className="btn-solari-amber w-full py-2.5 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Update in Catalog</span>
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