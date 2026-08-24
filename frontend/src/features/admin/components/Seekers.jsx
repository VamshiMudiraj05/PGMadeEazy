import React, { useState, useEffect } from 'react';
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
      setError('Failed to load seekers');
      toast.error('Failed to load seekers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex flex-col items-center justify-center gap-4 text-white select-none">
        <div className="h-8 w-8 border-3 border-[#E50914] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#E50914]" />
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading resident directory...</p>
      </div>
    );
  }

  const renderOccupationDetails = (seeker) => {
    if (seeker.occupationType === 'student') {
      return (
        <div className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400">
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{seeker.collegeName || 'Student'}</span>
          </div>
          {seeker.courseName && (
            <div className="text-[11px] text-neutral-400 pl-5">
              {seeker.courseName} • Year {seeker.yearOfStudy || '1'}
            </div>
          )}
        </div>
      );
    } else if (seeker.occupationType === 'professional') {
      return (
        <div className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{seeker.companyName || 'Working Professional'}</span>
          </div>
          {seeker.jobRole && (
            <div className="text-[11px] text-neutral-400 pl-5">
              {seeker.jobRole} • {seeker.workExperience || '1+ yrs exp'}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#E50914]">RESIDENT REGISTRY</div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Seeker Resident Roster ({seekers.length})
              </h1>
            </div>
          </div>
        </div>

        {error ? (
          <div className="p-8 rounded-2xl bg-[#141414] border border-red-500/30 text-center max-w-md mx-auto space-y-4 shadow-xl">
            <p className="text-xs font-semibold text-red-400">{error}</p>
            <button
              onClick={fetchSeekers}
              className="px-6 py-2.5 rounded-lg bg-[#E50914] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              Retry Loading
            </button>
          </div>
        ) : seekers.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#141414] border border-white/10 text-center max-w-md mx-auto space-y-4 shadow-xl">
            <Users className="w-8 h-8 text-neutral-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">No Registered Seekers</h2>
              <p className="text-xs text-neutral-400">
                When residents sign up and complete their onboarding, their profiles will populate here.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="w-full py-3 px-4 bg-white/5 border border-white/10 text-neutral-400 hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
            >
              Back to Operations Center
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seekers.map((seeker) => (
              <div 
                key={seeker.id} 
                className="p-6 rounded-2xl bg-[#141414] border border-white/10 flex flex-col justify-between space-y-4 shadow-xl hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/10 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Seeker Profile Head */}
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500 font-extrabold text-sm shrink-0 shadow-sm">
                      {seeker.fullName?.charAt(0)?.toUpperCase() || 'S'}
                    </div>
                    <div className="overflow-hidden space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm font-bold text-white truncate">{seeker.fullName || 'Seeker'}</h2>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                      </div>
                      <p className="text-[10px] text-neutral-400 font-mono">ID: {seeker.id}</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2 py-3 border-y border-white/10 text-xs">
                    <div className="flex items-center gap-2 text-white">
                      <Phone className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                      <span>{seeker.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Mail className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                      <span className="truncate">{seeker.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                      <span className="truncate">
                        {seeker.currentCity}
                        {seeker.preferredLocation && seeker.preferredLocation !== seeker.currentCity && 
                          ` (Target: ${seeker.preferredLocation})`}
                      </span>
                    </div>
                    {seeker.dateOfBirth && (
                      <div className="flex items-center gap-2 text-neutral-400">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
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
                <div className="pt-2 space-y-1 text-xs">
                  <div className="flex justify-between items-center text-neutral-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Govt ID:</span>
                    <span className="text-[#E50914] uppercase font-bold text-[10px]">{seeker.govtIdType || 'Aadhaar'}</span>
                  </div>
                  {seeker.emergencyContactName && (
                    <div className="flex justify-between items-center text-neutral-400">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Emergency Ref:</span>
                      <span className="text-white font-medium truncate max-w-[150px]">{seeker.emergencyContactName}</span>
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