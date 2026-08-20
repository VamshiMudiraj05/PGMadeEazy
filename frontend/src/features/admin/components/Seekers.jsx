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
  Users,
  AlertCircle
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
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex flex-col items-center justify-center gap-4 text-zinc-100">
        <div className="h-12 w-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin glow-orange-sm" />
        <p className="text-sm font-semibold text-zinc-400">Loading registered seeker directory...</p>
      </div>
    );
  }

  const renderOccupationDetails = (seeker) => {
    if (seeker.occupationType === 'student') {
      return (
        <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400">
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{seeker.collegeName || 'Student (College not listed)'}</span>
          </div>
          {seeker.courseName && (
            <div className="text-[11px] text-zinc-400 pl-5">
              {seeker.courseName} • Year {seeker.yearOfStudy || '1'}
            </div>
          )}
        </div>
      );
    } else if (seeker.occupationType === 'professional') {
      return (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{seeker.companyName || 'Working Professional'}</span>
          </div>
          {seeker.jobRole && (
            <div className="text-[11px] text-zinc-400 pl-5">
              {seeker.jobRole} • {seeker.workExperience || '1+ yrs exp'}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 selection:bg-orange-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Header */}
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
                Resident Seeker Directory ({seekers.length})
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">Verified student and working professional resident accounts</p>
            </div>
          </div>
        </div>

        {error ? (
          <div className="glass-panel p-8 rounded-2xl border border-red-500/30 text-center max-w-md mx-auto">
            <p className="text-sm font-semibold text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchSeekers}
              className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors"
            >
              Retry Loading
            </button>
          </div>
        ) : seekers.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-zinc-800 text-center max-w-md mx-auto glow-orange-sm">
            <Users className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h2 className="text-xl font-extrabold text-white mb-1.5">No Seekers Registered</h2>
            <p className="text-xs text-zinc-400 mb-6">
              When residents sign up and complete their onboarding, their profiles will populate here.
            </p>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-bold text-xs transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seekers.map((seeker) => (
              <div 
                key={seeker.id} 
                className="glass-panel p-6 rounded-3xl border border-zinc-800 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-blue-500/5 glow-orange-sm"
              >
                <div>
                  {/* Seeker Profile Head */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-blue-500/25 shrink-0">
                      {seeker.fullName?.charAt(0)?.toUpperCase() || 'S'}
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-base font-bold text-white truncate">{seeker.fullName || 'Seeker'}</h2>
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      </div>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">ID: {seeker.id}</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2.5 py-3 border-y border-zinc-800/80 text-xs">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Phone className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>{seeker.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Mail className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="truncate">{seeker.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="truncate">
                        {seeker.currentCity}
                        {seeker.preferredLocation && seeker.preferredLocation !== seeker.currentCity && 
                          ` (Target: ${seeker.preferredLocation})`}
                      </span>
                    </div>
                    {seeker.dateOfBirth && (
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span>DOB: {seeker.dateOfBirth}</span>
                      </div>
                    )}
                  </div>

                  {/* Occupation Details */}
                  <div className="mt-3.5">
                    {renderOccupationDetails(seeker)}
                  </div>
                </div>

                {/* Identity Metadata Footer */}
                <div className="mt-4 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span>Govt ID Verified:</span>
                    <span className="text-orange-400 uppercase font-semibold">{seeker.govtIdType || 'Aadhaar'}</span>
                  </div>
                  {seeker.emergencyContactName && (
                    <div className="flex justify-between items-center text-zinc-400">
                      <span>Emergency Ref:</span>
                      <span className="text-zinc-200 font-medium truncate max-w-[150px]">{seeker.emergencyContactName}</span>
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