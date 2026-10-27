import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Users
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

const Seekers = () => {
  const navigate = useNavigate();
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSeekers();
  }, []);

  const fetchSeekers = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getSeekers();
      setSeekers(response || []);
    } catch (error) {
      console.error('Error fetching seekers:', error);
      setError('Failed to load student registry');
      toast.error('Failed to load student registry');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#1f2226] flex flex-col items-center justify-center gap-4 text-[#f2f2f2] font-['Barlow_Semi_Condensed']">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#a7aaaf]">LOADING STUDENT ROSTER...</p>
      </div>
    );
  }

  const renderOccupationDetails = (seeker) => {
    if (seeker.occupationType === 'student') {
      return (
        <div className="p-2.5 rounded-[2px] bg-[#0b0b0d] border border-[#202226] space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#ffb000] font-['Big_Shoulders_Display'] tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{seeker.collegeName || 'COLLEGE SCHOLAR'}</span>
          </div>
          {seeker.courseName && (
            <div className="text-[11px] text-[#a7aaaf] pl-5 font-mono uppercase">
              {seeker.courseName} • YEAR {seeker.yearOfStudy || '1'}
            </div>
          )}
        </div>
      );
    } else if (seeker.occupationType === 'professional') {
      return (
        <div className="p-2.5 rounded-[2px] bg-[#0b0b0d] border border-[#202226] space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-emerald-400 font-['Big_Shoulders_Display'] tracking-wider">
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{seeker.companyName || 'WORKING PROFESSIONAL'}</span>
          </div>
          {seeker.jobRole && (
            <div className="text-[11px] text-[#a7aaaf] pl-5 font-mono uppercase">
              {seeker.jobRole} • {seeker.workExperience || '1+ YRS EXP'}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

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
                STUDENT & RESIDENT REGISTRY
              </h2>
            </div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[#a7aaaf]">
              <span>ENROLLED STUDENTS: <b className="text-[#ffb000] font-mono">{seekers.length}</b></span>
              <span>BROKERAGE PAID: <b className="text-emerald-400 font-mono">₹0.00</b></span>
            </div>
          </div>

          <div className="py-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <FlapWord text="STUDENT" size="clamp(22px, 3.4vw, 40px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="ROSTER." size="clamp(22px, 3.4vw, 40px)" colorClass="text-[#ffb000]" />
            </div>
          </div>
        </div>

        {error ? (
          <div className="board text-center max-w-md mx-auto space-y-4">
            <p className="text-xs font-mono text-red-400 uppercase tracking-wider">{error}</p>
            <button
              onClick={fetchSeekers}
              className="btn-solari btn-solari-amber text-xs"
            >
              RETRY LOADING
            </button>
          </div>
        ) : seekers.length === 0 ? (
          <div className="board text-center max-w-md mx-auto space-y-4 py-12">
            <Users className="w-10 h-10 text-[#a7aaaf] mx-auto" />
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white uppercase font-['Big_Shoulders_Display'] tracking-[0.1em]">
                NO REGISTERED STUDENTS
              </h2>
              <p className="text-xs text-[#a7aaaf]">
                When students complete registration and book PG accommodations, their profiles will populate here.
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
            {seekers.map((seeker) => (
              <div 
                key={seeker.id} 
                className="rounded-[3px] p-5 bg-[#0e0f11] border border-[#2a2d31] hover:border-[#ffb000]/60 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  {/* Seeker Profile Head */}
                  <div className="flex items-start gap-3 pb-3 border-b border-[#202226]">
                    <div className="h-10 w-10 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#ffb000] flex items-center justify-center font-bold text-base font-['Big_Shoulders_Display'] shrink-0">
                      {seeker.fullName?.charAt(0)?.toUpperCase() || 'S'}
                    </div>
                    <div className="overflow-hidden space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-white uppercase tracking-[0.08em] font-['Big_Shoulders_Display'] truncate">
                          {seeker.fullName || 'STUDENT SEEKER'}
                        </h3>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                      </div>
                      <p className="text-[10px] text-[#a7aaaf] font-mono">ID: {seeker.id}</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2 py-2 border-b border-[#202226] text-xs">
                    <div className="flex items-center gap-2 text-white font-mono">
                      <Phone className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                      <span>{seeker.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white font-mono">
                      <Mail className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                      <span className="truncate">{seeker.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300 uppercase">
                      <MapPin className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                      <span className="truncate">
                        {seeker.currentCity}
                        {seeker.preferredLocation && seeker.preferredLocation !== seeker.currentCity && 
                          ` (TARGET: ${seeker.preferredLocation})`}
                      </span>
                    </div>
                    {seeker.dateOfBirth && (
                      <div className="flex items-center gap-2 text-[#a7aaaf] font-mono text-[11px]">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>DOB: {seeker.dateOfBirth}</span>
                      </div>
                    )}
                  </div>

                  {/* Occupation Details */}
                  <div>
                    {renderOccupationDetails(seeker)}
                  </div>
                </div>

                {/* Identity Metadata Footer */}
                <div className="pt-1 space-y-1 text-xs font-mono">
                  <div className="flex justify-between items-center text-[#a7aaaf]">
                    <span className="text-[10px] uppercase">GOVT ID:</span>
                    <span className="text-[#ffb000] uppercase font-bold text-[10px]">{seeker.govtIdType || 'AADHAAR'}</span>
                  </div>
                  {seeker.emergencyContactName && (
                    <div className="flex justify-between items-center text-[#a7aaaf]">
                      <span className="text-[10px] uppercase">EMERGENCY:</span>
                      <span className="text-white font-medium uppercase truncate max-w-[150px]">{seeker.emergencyContactName}</span>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Seekers;