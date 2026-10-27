import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  XCircle, 
  AlertTriangle,
  User,
  Mail,
  CheckCircle2
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
    } catch {
      toast.error('Failed to load rejected audit archive');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#1f2226] flex flex-col items-center justify-center gap-4 text-[#f2f2f2] font-['Barlow_Semi_Condensed']">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#a7aaaf]">LOADING AUDIT ARCHIVES...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1f2226] text-[#f2f2f2] py-10 min-h-screen relative font-['Barlow_Semi_Condensed']">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Navigation & Header Board */}
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
              <span className="w-2.5 h-2.5 bg-[#ff4b4b]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                COMPLIANCE ARCHIVES // REJECTED
              </h2>
            </div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[#a7aaaf]">
              <span>REJECTED COUNT: <b className="text-[#ff4b4b] font-mono">{properties.length}</b></span>
              <span>AUDIT POLICY: <b className="text-white font-mono">NON-NEGOTIABLE</b></span>
            </div>
          </div>

          <div className="py-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <FlapWord text="REJECTED" size="clamp(22px, 3.4vw, 40px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="AUDITS." size="clamp(22px, 3.4vw, 40px)" colorClass="text-[#ff4b4b]" />
            </div>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="board text-center max-w-md mx-auto space-y-4 py-12">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white uppercase font-['Big_Shoulders_Display'] tracking-[0.1em]">
                NO REJECTED ACCOMMODATIONS
              </h2>
              <p className="text-xs text-[#a7aaaf]">
                All submitted listings meet quality guidelines and zero accommodations are currently in the rejected state.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="btn-solari btn-solari-steel text-xs"
            >
              BACK TO OPERATIONS CENTER
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, pIdx) => (
              <div
                key={property.id || pIdx}
                className="rounded-[3px] overflow-hidden bg-[#0e0f11] border border-red-500/30 flex flex-col justify-between"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={getSecureImageUrl(property.images?.[0] || null, pIdx)}
                    alt={property.name}
                    className="w-full h-full object-cover grayscale-[30%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f11] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-red-600 text-white font-mono">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>REJECTED</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Rejection Audit Reason Banner */}
                    <div className="p-3 rounded-[2px] bg-red-950/20 border border-red-500/30 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-red-400 font-mono">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>AUDIT FINDING:</span>
                      </div>
                      <p className="text-xs text-neutral-200 leading-relaxed font-mono">
                        {property.rejectionReason || 'No specific reason provided in audit record.'}
                      </p>
                    </div>

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
                        <span className="text-[#a7aaaf] block text-[10px] uppercase tracking-wider">TARIFF</span>
                        <span className="font-bold text-[#ffb000] font-['Big_Shoulders_Display'] text-base">₹{property.rent?.toLocaleString()}/MO</span>
                      </div>
                      <div>
                        <span className="text-[#a7aaaf] block text-[10px] uppercase tracking-wider">ROOMS</span>
                        <span className="font-mono font-bold">{property.rooms} ROOMS</span>
                      </div>
                    </div>

                    {/* Owner Details */}
                    <div className="p-2.5 rounded-[2px] bg-[#0b0b0d] border border-[#202226] text-xs space-y-0.5">
                      <div className="flex items-center gap-1.5 text-white font-medium truncate">
                        <User className="w-3.5 h-3.5 text-[#ffb000]" />
                        <span className="uppercase">{property.ownerName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#a7aaaf] text-[11px] pl-5 font-mono">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{property.ownerEmail}</span>
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