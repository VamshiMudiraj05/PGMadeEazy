import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  X, 
  ArrowLeft, 
  MapPin, 
  Building, 
  Phone, 
  User, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  AlertTriangle
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
      console.error('Approval action error:', error);
      toast.error(error.response?.data?.message || `Failed to ${action} property`);
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Please enter a rejection reason for the host');
      return;
    }

    try {
      await propertyApi.rejectProperty(selectedPropertyId, rejectionReason);
      toast.success('Property rejected and logged.');
      setShowRejectDialog(false);
      setRejectionReason('');
      fetchPendingProperties();
    } catch (error) {
      console.error('Rejection submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to reject property');
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
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#a7aaaf]">LOADING AUDIT QUEUE...</p>
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
              <span className="w-2.5 h-2.5 bg-[#ffb000]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                AUDIT VERIFICATION QUEUE
              </h2>
            </div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[#a7aaaf]">
              <span>PENDING REVIEWS: <b className="text-[#ffb000] font-mono">{properties.length}</b></span>
              <span>INSPECTION: <b className="text-emerald-400 font-mono">ENFORCED</b></span>
            </div>
          </div>

          <div className="py-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <FlapWord text="PENDING" size="clamp(22px, 3.4vw, 40px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="AUDITS." size="clamp(22px, 3.4vw, 40px)" colorClass="text-[#ffb000]" />
            </div>
          </div>
        </div>

        {error ? (
          <div className="board text-center max-w-md mx-auto space-y-4">
            <p className="text-xs font-mono text-red-400 uppercase tracking-wider">{error}</p>
            <button
              onClick={fetchPendingProperties}
              className="btn-solari btn-solari-amber text-xs"
            >
              RETRY FETCH
            </button>
          </div>
        ) : properties.length === 0 ? (
          <div className="board text-center max-w-md mx-auto space-y-4 py-12">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white uppercase font-['Big_Shoulders_Display'] tracking-[0.1em]">
                AUDIT QUEUE CLEAR
              </h2>
              <p className="text-xs text-[#a7aaaf]">
                All submitted student PG listings have been reviewed and audited. Zero pending requests in queue.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="btn-solari btn-solari-steel text-xs"
            >
              RETURN TO CONTROL CENTER
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

                    {/* Pending Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-[#ffb000] text-[#0b0b0d] font-mono">
                        <Building className="w-3.5 h-3.5" />
                        <span>AWAITING AUDIT</span>
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
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-lg font-bold text-white uppercase tracking-[0.08em] font-['Big_Shoulders_Display'] truncate">
                          {property.name}
                        </h3>
                        <span className="text-base font-bold text-[#ffb000] font-['Big_Shoulders_Display'] shrink-0">
                          ₹{property.rent?.toLocaleString()}/MO
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#a7aaaf]">
                        <MapPin className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                        <span className="truncate uppercase">{property.city}, {property.area}</span>
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

                    {/* Audit Decision Buttons */}
                    <div className="pt-3 border-t border-[#202226] grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleApproval(property.id, 'approve')}
                        className="py-2 px-3 rounded-[2px] bg-emerald-500 hover:bg-emerald-400 text-[#0b0b0d] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>APPROVE PG</span>
                      </button>
                      <button
                        onClick={() => handleApproval(property.id, 'reject')}
                        className="py-2 px-3 rounded-[2px] bg-[#0b0b0d] border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                        <span>REJECT</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Rejection Reason Modal */}
      {showRejectDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="board max-w-md w-full space-y-4">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">LISTING REJECTION FEEDBACK</h3>
            </div>
            
            <p className="text-xs text-[#a7aaaf] leading-relaxed">
              This notice will be recorded on the audit log and dispatched to the host warden for corrective action.
            </p>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="E.G. INADEQUATE ROOM PHOTO RESOLUTION, MISSING MESS FOOD DETAILS, OR MISMATCHED ADDRESS..."
              rows={4}
              className="w-full p-3 bg-[#0e0f11] border border-[#34373c] rounded-[2px] text-xs text-white placeholder-[#5b5e63] focus:outline-none focus:border-[#ffb000] font-mono uppercase resize-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#202226]">
              <button
                onClick={() => {
                  setShowRejectDialog(false);
                  setRejectionReason('');
                }}
                className="btn-solari btn-solari-steel text-xs py-1.5 px-3"
              >
                CANCEL
              </button>
              <button
                onClick={handleRejectSubmit}
                className="btn-solari text-xs py-1.5 px-4 bg-red-600 border-red-600 text-white hover:bg-red-500"
              >
                CONFIRM REJECTION
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PropertyApproval;
