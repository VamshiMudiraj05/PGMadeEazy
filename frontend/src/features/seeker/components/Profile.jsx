import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  User, 
  ShieldCheck, 
  Briefcase, 
  Edit3, 
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { seekerService } from '../../../services/seekerService';
import { toast } from 'react-hot-toast';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    dateOfBirth: '',
    gender: '',
    currentCity: '',
    govtIdType: '',
    govtIdNumber: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    termsAgreed: false,
    preferredLocation: '',
    occupationType: '',
    collegeName: '',
    courseName: '',
    yearOfStudy: '',
    collegeAddress: '',
    studentId: '',
    companyName: '',
    jobRole: '',
    workExperience: '',
    officeAddress: '',
    workId: '',
    userType: ''
  });

  useEffect(() => {
    fetchSeekerProfile();
  }, []);

  const fetchSeekerProfile = async () => {
    try {
      setLoading(true);
      const data = await seekerService.getSeekerProfile(user.id);
      setProfileData(data || {});
      setError(null);
    } catch (err) {
      setError('Failed to load profile data');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await seekerService.updateSeekerProfile(user.id, profileData);
      setIsEditing(false);
      setError(null);
      toast.success('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
      toast.error('Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-8 w-8 border-3 border-[#E50914] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#E50914]" />
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading profile record...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6 relative z-10">
        
        {/* Navigation Back */}
        <button
          onClick={() => navigate('/seeker-dashboard')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-all text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {error && (
          <div className="bg-[#141414] border border-red-500/30 p-4 rounded-xl flex items-center gap-3 text-red-400 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#E50914]" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* Header & Avatar Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center text-[#E50914] font-extrabold text-2xl shadow-[0_0_15px_rgba(229,9,20,0.3)]">
                {profileData.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {profileData.fullName || 'Seeker Resident'}
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500 text-black shadow-md">
                    Verified Resident
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">{profileData.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider bg-white/5 border border-white/10 text-white hover:bg-[#E50914] hover:border-[#E50914] shadow-sm hover:shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all self-start sm:self-auto cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Editing' : 'Edit Credentials'}</span>
            </button>
          </div>

          {/* Form / Content View */}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Personal Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>PERSONAL DETAILS</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Full Legal Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={profileData.fullName || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Gender</label>
                    <select
                      name="gender"
                      value={profileData.gender || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all cursor-pointer"
                      required
                    >
                      <option value="" className="bg-[#141414]">Select Gender</option>
                      <option value="male" className="bg-[#141414]">Male</option>
                      <option value="female" className="bg-[#141414]">Female</option>
                      <option value="other" className="bg-[#141414]">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Current City</label>
                    <input
                      type="text"
                      name="currentCity"
                      value={profileData.currentCity || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Occupation Info */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>COLLEGE / OCCUPATION DETAILS</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Occupation Profile</label>
                    <select
                      name="occupationType"
                      value={profileData.occupationType || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all cursor-pointer"
                      required
                    >
                      <option value="" className="bg-[#141414]">Select Occupation Type</option>
                      <option value="student" className="bg-[#141414]">Student</option>
                      <option value="professional" className="bg-[#141414]">Professional</option>
                    </select>
                  </div>

                  {profileData.occupationType === 'student' ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">College / University</label>
                        <input
                          type="text"
                          name="collegeName"
                          value={profileData.collegeName || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Degree / Major</label>
                        <input
                          type="text"
                          name="courseName"
                          value={profileData.courseName || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Year of Study</label>
                        <input
                          type="text"
                          name="yearOfStudy"
                          value={profileData.yearOfStudy || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Student Roll / ID</label>
                        <input
                          type="text"
                          name="studentId"
                          value={profileData.studentId || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                        />
                      </div>
                    </>
                  ) : profileData.occupationType === 'professional' ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Company / Organization</label>
                        <input
                          type="text"
                          name="companyName"
                          value={profileData.companyName || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Designation / Title</label>
                        <input
                          type="text"
                          name="jobRole"
                          value={profileData.jobRole || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Experience (Years)</label>
                        <input
                          type="text"
                          name="workExperience"
                          value={profileData.workExperience || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Work ID</label>
                        <input
                          type="text"
                          name="workId"
                          value={profileData.workId || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Section 3: Identity & Emergency Contacts */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>GOVERNMENT ID & EMERGENCY CONTACTS</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Government ID Type</label>
                    <select
                      name="govtIdType"
                      value={profileData.govtIdType || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all cursor-pointer"
                      required
                    >
                      <option value="" className="bg-[#141414]">Select ID Type</option>
                      <option value="aadhar" className="bg-[#141414]">Aadhaar Card</option>
                      <option value="pan" className="bg-[#141414]">PAN Card</option>
                      <option value="driving" className="bg-[#141414]">Driving License</option>
                      <option value="passport" className="bg-[#141414]">Passport</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">ID Document Number</label>
                    <input
                      type="text"
                      name="govtIdNumber"
                      value={profileData.govtIdNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Emergency Contact Name</label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={profileData.emergencyContactName || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Emergency Phone</label>
                    <input
                      type="text"
                      name="emergencyContactNumber"
                      value={profileData.emergencyContactNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Save Action */}
              <div className="pt-6 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer disabled:opacity-50"
                >
                  Save Profile Changes
                </button>
              </div>

            </form>
          ) : (
            <div className="space-y-8">
              
              {/* Personal Info Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>PERSONAL PROFILE</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Full Legal Name</span>
                    <span className="text-sm font-semibold text-white">{profileData.fullName || 'Not provided'}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Email</span>
                    <span className="text-sm font-semibold text-white truncate block">{profileData.email || 'Not provided'}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Contact Phone</span>
                    <span className="text-sm font-semibold text-white">{profileData.phone || 'Not provided'}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Date of Birth</span>
                    <span className="text-sm font-semibold text-white">{profileData.dateOfBirth || 'Not provided'}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Gender</span>
                    <span className="text-sm font-semibold text-white capitalize">{profileData.gender || 'Not specified'}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Current Base City</span>
                    <span className="text-sm font-semibold text-white">{profileData.currentCity || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              {/* Occupation Info Grid */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>COLLEGE / EMPLOYMENT RECORDS</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Occupation Status</span>
                    <span className="text-sm font-semibold text-white capitalize">{profileData.occupationType || 'Not specified'}</span>
                  </div>

                  {profileData.occupationType === 'student' ? (
                    <>
                      <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">College Institution</span>
                        <span className="text-sm font-semibold text-white">{profileData.collegeName || 'N/A'}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Degree Course</span>
                        <span className="text-sm font-semibold text-white">{profileData.courseName || 'N/A'}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Year of Study</span>
                        <span className="text-sm font-semibold text-white">{profileData.yearOfStudy || 'N/A'}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Student ID</span>
                        <span className="text-sm font-semibold text-white">{profileData.studentId || 'N/A'}</span>
                      </div>
                    </>
                  ) : profileData.occupationType === 'professional' ? (
                    <>
                      <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Employer Org</span>
                        <span className="text-sm font-semibold text-white">{profileData.companyName || 'N/A'}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Designation</span>
                        <span className="text-sm font-semibold text-white">{profileData.jobRole || 'N/A'}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Experience</span>
                        <span className="text-sm font-semibold text-white">{profileData.workExperience ? `${profileData.workExperience} years` : 'N/A'}</span>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Identity & Emergency Grid */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>COMPLIANCE & EMERGENCY CONTACTS</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">ID Document Type</span>
                    <span className="text-sm font-semibold text-white uppercase">{profileData.govtIdType || 'N/A'}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">ID Number</span>
                    <span className="text-sm font-semibold text-white">{profileData.govtIdNumber || 'N/A'}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Emergency Person</span>
                    <span className="text-sm font-semibold text-white">{profileData.emergencyContactName || 'N/A'}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Emergency Phone</span>
                    <span className="text-sm font-semibold text-white">{profileData.emergencyContactNumber || 'N/A'}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}


