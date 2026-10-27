import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  UserCheck
} from 'lucide-react';
import { adminApi } from '../../../services/api';
import { toast } from 'react-hot-toast';

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

const Providers = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getProviders();
      setProviders(response || []);
    } catch (error) {
      console.error('Error fetching providers:', error);
      setError('Failed to load host directory');
      toast.error('Failed to load host directory');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#1f2226] flex flex-col items-center justify-center gap-4 text-[#f2f2f2] font-['Barlow_Semi_Condensed']">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#a7aaaf]">LOADING HOST DIRECTORY...</p>
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
              <span className="w-2.5 h-2.5 bg-[#ffb000]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                PROVIDER NETWORK // HOST WARDENS
              </h2>
            </div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[#a7aaaf]">
              <span>ACTIVE HOSTS: <b className="text-[#ffb000] font-mono">{providers.length}</b></span>
              <span>VERIFICATION: <b className="text-emerald-400 font-mono">100% AUDITED</b></span>
            </div>
          </div>

          <div className="py-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <FlapWord text="HOST" size="clamp(22px, 3.4vw, 40px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="ROSTER." size="clamp(22px, 3.4vw, 40px)" colorClass="text-[#ffb000]" />
            </div>
          </div>
        </div>

        {error ? (
          <div className="board text-center max-w-md mx-auto space-y-4">
            <p className="text-xs font-mono text-red-400 uppercase tracking-wider">{error}</p>
            <button
              onClick={fetchProviders}
              className="btn-solari btn-solari-amber text-xs"
            >
              RETRY LOADING
            </button>
          </div>
        ) : providers.length === 0 ? (
          <div className="board text-center max-w-md mx-auto space-y-4 py-12">
            <User className="w-10 h-10 text-[#a7aaaf] mx-auto" />
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white uppercase font-['Big_Shoulders_Display'] tracking-[0.1em]">
                NO REGISTERED HOSTS
              </h2>
              <p className="text-xs text-[#a7aaaf]">
                When hostel owners register their accounts and list accommodations, their verified profiles will appear here.
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
            {providers.map((provider) => (
              <div 
                key={provider.id} 
                className="rounded-[3px] p-5 bg-[#0e0f11] border border-[#2a2d31] hover:border-[#ffb000]/60 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  {/* Host Profile Header */}
                  <div className="flex items-start gap-3 pb-3 border-b border-[#202226]">
                    <div className="h-10 w-10 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#ffb000] flex items-center justify-center font-bold text-base font-['Big_Shoulders_Display'] shrink-0">
                      {provider.fullName?.charAt(0)?.toUpperCase() || 'H'}
                    </div>
                    <div className="overflow-hidden space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-white uppercase tracking-[0.08em] font-['Big_Shoulders_Display'] truncate">
                          {provider.fullName || 'PROPERTY HOST'}
                        </h3>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-[10px] text-[#a7aaaf] font-mono">ID: {provider.id}</p>
                    </div>
                  </div>

                  {/* Contact Specs */}
                  <div className="space-y-2 py-2 border-b border-[#202226] text-xs">
                    <div className="flex items-center gap-2 text-white font-mono">
                      <Phone className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                      <span>{provider.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white font-mono">
                      <Mail className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                      <span className="truncate">{provider.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300 uppercase">
                      <MapPin className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                      <span className="truncate">{provider.currentCity || 'LOCATION PENDING'}</span>
                    </div>
                    {provider.dateOfBirth && (
                      <div className="flex items-center gap-2 text-[#a7aaaf] font-mono text-[11px]">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>DOB: {provider.dateOfBirth}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Identity Metadata Footer */}
                <div className="pt-1 flex justify-between items-center text-xs font-mono">
                  <span className="text-[#a7aaaf] text-[10px] uppercase">GENDER: <b className="text-white">{provider.gender || 'N/A'}</b></span>
                  <span className="text-[10px] font-bold uppercase text-[#ffb000] bg-[#ffb000]/10 border border-[#ffb000]/30 px-1.5 py-0.5 rounded-[2px]">
                    {provider.govtIdType || 'AADHAAR'}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Providers;