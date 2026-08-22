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
      <div className="min-h-[calc(100vh-140px)] bg-[#0B0B0E] flex flex-col items-center justify-center gap-3 text-[#FAFAFA]">
        <div className="h-6 w-6 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#7A7A85]">Loading resident directory...</p>
      </div>
    );
  }

  const renderOccupationDetails = (seeker) => {
    if (seeker.occupationType === 'student') {
      return (
        <div className="p-2.5 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400">
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{seeker.collegeName || 'Student'}</span>
          </div>
          {seeker.courseName && (
            <div className="text-[11px] text-[#7A7A85] pl-5">
              {seeker.courseName} • Year {seeker.yearOfStudy || '1'}
            </div>
          )}
        </div>
      );
    } else if (seeker.occupationType === 'professional') {
      return (
        <div className="p-2.5 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{seeker.companyName || 'Working Professional'}</span>
          </div>
          {seeker.jobRole && (
            <div className="text-[11px] text-[#7A7A85] pl-5">
              {seeker.jobRole} • {seeker.workExperience || '1+ yrs exp'}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

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
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Resident Registry</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Seeker Resident Roster ({seekers.length})
              </h1>
            </div>
          </div>
        </div>

        {error ? (
          <div className="p-8 rounded-sm bg-[#121217] border border-red-500/30 text-center max-w-md mx-auto space-y-4">
            <p className="text-xs font-semibold text-red-400">{error}</p>
            <button
              onClick={fetchSeekers}
              className="px-4 py-2 rounded-sm bg-[#FF5A36] text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Retry Loading
            </button>
          </div>
        ) : seekers.length === 0 ? (
          <div className="p-12 rounded-sm bg-[#121217] border border-[#1E1E26] text-center max-w-md mx-auto space-y-4">
            <Users className="w-8 h-8 text-[#7A7A85] mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">No Registered Seekers</h2>
              <p className="text-xs text-[#7A7A85]">
                When residents sign up and complete their onboarding, their profiles will populate here.
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
            {seekers.map((seeker) => (
              <div 
                key={seeker.id} 
                className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  {/* Seeker Profile Head */}
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-sm bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {seeker.fullName?.charAt(0)?.toUpperCase() || 'S'}
                    </div>
                    <div className="overflow-hidden space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm font-bold text-white truncate">{seeker.fullName || 'Seeker'}</h2>
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      </div>
                      <p className="text-[10px] text-[#7A7A85] font-mono">ID: {seeker.id}</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2 py-3 border-y border-[#1E1E26] text-xs">
                    <div className="flex items-center gap-2 text-[#FAFAFA]">
                      <Phone className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                      <span>{seeker.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#FAFAFA]">
                      <Mail className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                      <span className="truncate">{seeker.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#FAFAFA]">
                      <MapPin className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                      <span className="truncate">
                        {seeker.currentCity}
                        {seeker.preferredLocation && seeker.preferredLocation !== seeker.currentCity && 
                          ` (Target: ${seeker.preferredLocation})`}
                      </span>
                    </div>
                    {seeker.dateOfBirth && (
                      <div className="flex items-center gap-2 text-[#7A7A85]">
                        <Calendar className="w-3.5 h-3.5 text-[#7A7A85] shrink-0" />
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
                  <div className="flex justify-between items-center text-[#7A7A85]">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Govt ID:</span>
                    <span className="text-[#FF5A36] uppercase font-bold text-[10px]">{seeker.govtIdType || 'Aadhaar'}</span>
                  </div>
                  {seeker.emergencyContactName && (
                    <div className="flex justify-between items-center text-[#7A7A85]">
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