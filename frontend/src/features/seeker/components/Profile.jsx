import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap, 
  Edit3, 
  Check, 
  AlertCircle,
  Sparkles
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
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex flex-col items-center justify-center gap-4 text-zinc-100">
        <div className="h-12 w-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin glow-orange-sm" />
        <p className="text-sm font-semibold text-zinc-400">Loading your profile record...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 selection:bg-orange-500 selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Back */}
        <button
          onClick={() => navigate('/seeker-dashboard')}
          className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-all mb-6 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {error && (
          <div className="glass-panel border-red-500/30 p-4 rounded-2xl mb-6 flex items-center gap-3 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="glass-panel border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl glow-orange-sm">
          
          {/* Header & Avatar Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-zinc-800/80">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-extrabold text-2xl shadow-inner">
                {profileData.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {profileData.fullName || 'Seeker Resident'}
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active Seeker
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">{profileData.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:border-orange-500/40 transition-all self-start sm:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5 text-orange-400" />
              <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Form / Content View */}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-8 mt-8">
              
              {/* Section 1: Personal Details */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Personal Details</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={profileData.fullName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={profileData.gender || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Current City</label>
                    <input
                      type="text"
                      name="currentCity"
                      value={profileData.currentCity || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Occupation Info */}
              <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>College / Occupation Details</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Occupation Type</label>
                    <select
                      name="occupationType"
                      value={profileData.occupationType || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                      required
                    >
                      <option value="">Select Occupation Type</option>
                      <option value="student">Student</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>

                  {profileData.occupationType === 'student' ? (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">College Name</label>
                        <input
                          type="text"
                          name="collegeName"
                          value={profileData.collegeName || ''}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">Course / Major</label>
                        <input
                          type="text"
                          name="courseName"
                          value={profileData.courseName || ''}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">Year of Study</label>
                        <input
                          type="text"
                          name="yearOfStudy"
                          value={profileData.yearOfStudy || ''}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">Student Roll / ID</label>
                        <input
                          type="text"
                          name="studentId"
                          value={profileData.studentId || ''}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </>
                  ) : profileData.occupationType === 'professional' ? (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">Company Name</label>
                        <input
                          type="text"
                          name="companyName"
                          value={profileData.companyName || ''}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">Designation / Role</label>
                        <input
                          type="text"
                          name="jobRole"
                          value={profileData.jobRole || ''}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">Work Experience (Years)</label>
                        <input
                          type="text"
                          name="workExperience"
                          value={profileData.workExperience || ''}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 mb-1">Employee / Work ID</label>
                        <input
                          type="text"
                          name="workId"
                          value={profileData.workId || ''}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Section 3: Identity & Emergency Contacts */}
              <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Government ID & Emergency Contacts</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Government ID Type</label>
                    <select
                      name="govtIdType"
                      value={profileData.govtIdType || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                      required
                    >
                      <option value="">Select ID Type</option>
                      <option value="aadhar">Aadhaar Card</option>
                      <option value="pan">PAN Card</option>
                      <option value="driving">Driving License</option>
                      <option value="passport">Passport</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">ID Number</label>
                    <input
                      type="text"
                      name="govtIdNumber"
                      value={profileData.govtIdNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Emergency Contact Name</label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={profileData.emergencyContactName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Emergency Contact Number</label>
                    <input
                      type="text"
                      name="emergencyContactNumber"
                      value={profileData.emergencyContactNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Save Action */}
              <div className="pt-6 border-t border-zinc-800 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-50"
                >
                  Save Profile Changes
                </button>
              </div>

            </form>
          ) : (
            <div className="space-y-8 mt-8">
              
              {/* Personal Info Grid */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Personal Profile Details</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-xs text-zinc-500 block mb-1">Full Name</span>
                    <span className="text-sm font-semibold text-white">{profileData.fullName || 'Not provided'}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-xs text-zinc-500 block mb-1">Email</span>
                    <span className="text-sm font-semibold text-white truncate block">{profileData.email || 'Not provided'}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-xs text-zinc-500 block mb-1">Contact Phone</span>
                    <span className="text-sm font-semibold text-white">{profileData.phone || 'Not provided'}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-xs text-zinc-500 block mb-1">Date of Birth</span>
                    <span className="text-sm font-semibold text-white">{profileData.dateOfBirth || 'Not provided'}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-xs text-zinc-500 block mb-1">Gender</span>
                    <span className="text-sm font-semibold text-white capitalize">{profileData.gender || 'Not specified'}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-xs text-zinc-500 block mb-1">Current Base City</span>
                    <span className="text-sm font-semibold text-white">{profileData.currentCity || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              {/* Occupation Info Grid */}
              <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>College / Employment Data</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-xs text-zinc-500 block mb-1">Occupation Status</span>
                    <span className="text-sm font-semibold text-white capitalize">{profileData.occupationType || 'Not specified'}</span>
                  </div>

                  {profileData.occupationType === 'student' ? (
                    <>
                      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                        <span className="text-xs text-zinc-500 block mb-1">College Institution</span>
                        <span className="text-sm font-semibold text-white">{profileData.collegeName || 'N/A'}</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                        <span className="text-xs text-zinc-500 block mb-1">Enrolled Course</span>
                        <span className="text-sm font-semibold text-white">{profileData.courseName || 'N/A'}</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                        <span className="text-xs text-zinc-500 block mb-1">Year of Study</span>
                        <span className="text-sm font-semibold text-white">{profileData.yearOfStudy || 'N/A'}</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                        <span className="text-xs text-zinc-500 block mb-1">Student Identifier</span>
                        <span className="text-sm font-semibold text-white">{profileData.studentId || 'N/A'}</span>
                      </div>
                    </>
                  ) : profileData.occupationType === 'professional' ? (
                    <>
                      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                        <span className="text-xs text-zinc-500 block mb-1">Employer / Org</span>
                        <span className="text-sm font-semibold text-white">{profileData.companyName || 'N/A'}</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                        <span className="text-xs text-zinc-500 block mb-1">Designation</span>
                        <span className="text-sm font-semibold text-white">{profileData.jobRole || 'N/A'}</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                        <span className="text-xs text-zinc-500 block mb-1">Experience</span>
                        <span className="text-sm font-semibold text-white">{profileData.workExperience ? `${profileData.workExperience} years` : 'N/A'}</span>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Identity & Emergency Grid */}
              <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Compliance & Emergency Contacts</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-xs text-zinc-500 block mb-1">ID Document Type</span>
                    <span className="text-sm font-semibold text-white uppercase">{profileData.govtIdType || 'N/A'}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-xs text-zinc-500 block mb-1">ID Document Number</span>
                    <span className="text-sm font-semibold text-white">{profileData.govtIdNumber || 'N/A'}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-xs text-zinc-500 block mb-1">Emergency Person</span>
                    <span className="text-sm font-semibold text-white">{profileData.emergencyContactName || 'N/A'}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-xs text-zinc-500 block mb-1">Emergency Contact</span>
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

