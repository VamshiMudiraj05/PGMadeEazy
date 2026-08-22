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
  User,
  Phone,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { getSecureImageUrl } from '../../../utils/imageUtils';

const AdminRejectedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadRejectedProperties();
  }, []);

  const loadRejectedProperties = async () => {
    try {
      setLoading(true);
      const rejectedProperties = await propertyApi.getRejectedProperties();
      setProperties(rejectedProperties || []);
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
        <p className="text-xs font-semibold uppercase tracking-wider text-[#7A7A85]">Loading audit archives...</p>
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
              onClick={() => navigate('/admin-dashboard')}
              className="p-2 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">Compliance Archives</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Rejected Accommodations ({properties.length})
              </h1>
            </div>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="p-12 rounded-sm bg-[#121217] border border-[#1E1E26] text-center max-w-md mx-auto space-y-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">No Rejected Accommodations</h2>
              <p className="text-xs text-[#7A7A85]">
                All submitted listings meet quality guidelines and zero accommodations are currently in the rejected state.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="px-4 py-2 rounded-sm bg-[#181820] border border-[#22222A] text-[#9E9EA7] hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Back to Operations Center
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, pIdx) => (
              <div
                key={property.id || pIdx}
                className="rounded-sm overflow-hidden bg-[#121217] border border-red-500/30 flex flex-col justify-between"
              >
                {/* Photo Thumbnail */}
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
                      <span>Rejected</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Rejection Audit Reason Banner */}
                    <div className="p-3 rounded-sm bg-[#0B0B0E] border border-red-500/30 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-red-400">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Audit Finding:</span>
                      </div>
                      <p className="text-xs text-[#FAFAFA] leading-relaxed">
                        {property.rejectionReason || 'No specific reason provided in audit record.'}
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

                    {/* Owner Details */}
                    <div className="p-2.5 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] text-xs space-y-0.5">
                      <div className="flex items-center gap-1.5 text-white font-medium truncate">
                        <User className="w-3 h-3 text-[#FF5A36]" />
                        <span>{property.ownerName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#7A7A85] text-[11px]">
                        <Mail className="w-3 h-3" />
                        <span>{property.ownerEmail}</span>
                      </div>
                    </div>
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

export default AdminRejectedProperties;