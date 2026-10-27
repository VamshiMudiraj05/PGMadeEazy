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
      toast.success('Profile credentials updated successfully!');
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
      <div className="min-h-[calc(100vh-140px)] bg-[#0b0b0d] flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-none animate-spin shadow-[0_0_10px_#ffb000]" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
          RETRIEVING SCHOLAR DOSSIER...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0b0d] text-[#f2f2f2] py-8 min-h-screen relative select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6 relative z-10">
        
        {/* Navigation Back */}
        <button
          onClick={() => navigate('/seeker-dashboard')}
          className="btn-solari btn-solari-steel text-xs inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-[#ffb000]" />
          <span>RETURN TO RESIDENT HUB</span>
        </button>

        {error && (
          <div className="p-3 bg-[#ff4b4b]/10 border border-[#ff4b4b]/30 rounded-[2px] flex items-center gap-3 text-[#ff4b4b] text-xs font-mono uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#ff4b4b]" />
            <span>{error}</span>
          </div>
        )}

        {/* Top Header Card */}
        <div className="board">
          <div className="board-head">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffb000] font-['Barlow_Semi_Condensed']">
                SCHOLAR CREDENTIALS // AUDITED DOSSIER
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-['Barlow_Semi_Condensed'] uppercase tracking-[0.16em] text-[#a7aaaf]">
              <span>KYC BADGE: <b className="text-emerald-400">VERIFIED</b></span>
              <span>ROLE: <b className="text-[#ffb000]">STUDENT RESIDENT</b></span>
            </div>
          </div>

          <div className="py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#0b0b0d] border border-[#ffb000]/60 text-[#ffb000] font-bold text-2xl font-['Big_Shoulders_Display'] w-14 h-14 flex items-center justify-center">
                {profileData.fullName?.charAt(0)?.toUpperCase() || 'S'}
              </div>
              <div>
                <h1 className="text-2xl font-bold uppercase tracking-[0.14em] text-white font-['Big_Shoulders_Display']">
                  {profileData.fullName || 'SEEKER RESIDENT'}
                </h1>
                <p className="text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed'] uppercase tracking-wider mt-0.5">
                  {profileData.email} // ID #{user?.id?.slice(-8) || 'SCHOLAR'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="btn-solari btn-solari-steel text-xs self-start sm:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#ffb000]" />
              <span>{isEditing ? 'ABORT EDITING' : 'EDIT CREDENTIALS'}</span>
            </button>
          </div>
        </div>

        {/* Form / Content View */}
        <div className="p-5 sm:p-6 rounded-[3px] bg-[#121316] border border-[#26292d] space-y-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Personal Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ffb000] flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>PERSONAL RESIDENT DETAILS</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">FULL LEGAL NAME</label>
                    <input
                      type="text"
                      name="fullName"
                      value={profileData.fullName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">PHONE NUMBER</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">DATE OF BIRTH</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">GENDER</label>
                    <select
                      name="gender"
                      value={profileData.gender || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed'] uppercase cursor-pointer"
                      required
                    >
                      <option value="" className="bg-[#121316]">SELECT GENDER</option>
                      <option value="male" className="bg-[#121316]">MALE</option>
                      <option value="female" className="bg-[#121316]">FEMALE</option>
                      <option value="other" className="bg-[#121316]">OTHER</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">CURRENT BASE CITY</label>
                    <input
                      type="text"
                      name="currentCity"
                      value={profileData.currentCity || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed'] uppercase"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Occupation Info */}
              <div className="pt-6 border-t border-[#202226] space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ffb000] flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>COLLEGE / ACADEMIC RECORDS</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">OCCUPATION PROFILE</label>
                    <select
                      name="occupationType"
                      value={profileData.occupationType || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed'] uppercase cursor-pointer"
                      required
                    >
                      <option value="" className="bg-[#121316]">SELECT OCCUPATION TYPE</option>
                      <option value="student" className="bg-[#121316]">STUDENT</option>
                      <option value="professional" className="bg-[#121316]">WORKING PROFESSIONAL</option>
                    </select>
                  </div>

                  {profileData.occupationType === 'student' ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">COLLEGE / UNIVERSITY</label>
                        <input
                          type="text"
                          name="collegeName"
                          value={profileData.collegeName || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">DEGREE / COURSE</label>
                        <input
                          type="text"
                          name="courseName"
                          value={profileData.courseName || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">YEAR OF STUDY</label>
                        <input
                          type="text"
                          name="yearOfStudy"
                          value={profileData.yearOfStudy || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">STUDENT ID / ROLL NO</label>
                        <input
                          type="text"
                          name="studentId"
                          value={profileData.studentId || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                        />
                      </div>
                    </>
                  ) : profileData.occupationType === 'professional' ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">EMPLOYER ORG</label>
                        <input
                          type="text"
                          name="companyName"
                          value={profileData.companyName || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">JOB ROLE</label>
                        <input
                          type="text"
                          name="jobRole"
                          value={profileData.jobRole || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Section 3: Identity & Emergency Contacts */}
              <div className="pt-6 border-t border-[#202226] space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ffb000] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>IDENTITY & EMERGENCY WARDEN CONTACTS</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">GOVERNMENT ID TYPE</label>
                    <select
                      name="govtIdType"
                      value={profileData.govtIdType || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed'] uppercase cursor-pointer"
                      required
                    >
                      <option value="" className="bg-[#121316]">SELECT ID TYPE</option>
                      <option value="aadhaar" className="bg-[#121316]">AADHAAR CARD</option>
                      <option value="pan" className="bg-[#121316]">PAN CARD</option>
                      <option value="passport" className="bg-[#121316]">PASSPORT</option>
                      <option value="driving_license" className="bg-[#121316]">DRIVING LICENSE</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">GOVT ID NUMBER</label>
                    <input
                      type="text"
                      name="govtIdNumber"
                      value={profileData.govtIdNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">EMERGENCY CONTACT PERSON</label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={profileData.emergencyContactName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">EMERGENCY PHONE NUMBER</label>
                    <input
                      type="text"
                      name="emergencyContactNumber"
                      value={profileData.emergencyContactNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-['Barlow_Semi_Condensed']"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Save Action */}
              <div className="pt-6 border-t border-[#202226] flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-solari btn-solari-amber text-xs"
                >
                  <span>COMMIT CHANGES</span>
                  <span className="chev">✓</span>
                </button>
              </div>

            </form>
          ) : (
            <div className="space-y-6">
              
              {/* Personal Info Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ffb000] flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>PERSONAL RESIDENT PROFILE</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">FULL LEGAL NAME</span>
                    <span className="text-sm font-semibold text-white font-['Barlow_Semi_Condensed']">{profileData.fullName || 'Not provided'}</span>
                  </div>
                  <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">EMAIL</span>
                    <span className="text-sm font-semibold text-white truncate block font-['Barlow_Semi_Condensed']">{profileData.email || 'Not provided'}</span>
                  </div>
                  <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">CONTACT PHONE</span>
                    <span className="text-sm font-semibold text-white font-['Barlow_Semi_Condensed']">{profileData.phone || 'Not provided'}</span>
                  </div>
                  <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">DATE OF BIRTH</span>
                    <span className="text-sm font-semibold text-white font-['Barlow_Semi_Condensed']">{profileData.dateOfBirth || 'Not provided'}</span>
                  </div>
                  <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">GENDER</span>
                    <span className="text-sm font-semibold text-white uppercase font-['Barlow_Semi_Condensed']">{profileData.gender || 'Not specified'}</span>
                  </div>
                  <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">BASE CAMPUS CITY</span>
                    <span className="text-sm font-semibold text-white uppercase font-['Barlow_Semi_Condensed']">{profileData.currentCity || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              {/* Occupation Info Grid */}
              <div className="pt-4 border-t border-[#202226] space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ffb000] flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>ACADEMIC / EMPLOYMENT RECORDS</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">OCCUPATION TYPE</span>
                    <span className="text-sm font-semibold text-white uppercase font-['Barlow_Semi_Condensed']">{profileData.occupationType || 'Not specified'}</span>
                  </div>

                  {profileData.occupationType === 'student' ? (
                    <>
                      <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">COLLEGE / UNIVERSITY</span>
                        <span className="text-sm font-semibold text-white font-['Barlow_Semi_Condensed']">{profileData.collegeName || 'N/A'}</span>
                      </div>
                      <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">DEGREE COURSE</span>
                        <span className="text-sm font-semibold text-white font-['Barlow_Semi_Condensed']">{profileData.courseName || 'N/A'}</span>
                      </div>
                      <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">YEAR OF STUDY</span>
                        <span className="text-sm font-semibold text-white font-['Barlow_Semi_Condensed']">{profileData.yearOfStudy || 'N/A'}</span>
                      </div>
                      <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">STUDENT ID</span>
                        <span className="text-sm font-semibold text-white font-mono">{profileData.studentId || 'N/A'}</span>
                      </div>
                    </>
                  ) : profileData.occupationType === 'professional' ? (
                    <>
                      <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">EMPLOYER ORG</span>
                        <span className="text-sm font-semibold text-white font-['Barlow_Semi_Condensed']">{profileData.companyName || 'N/A'}</span>
                      </div>
                      <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">JOB ROLE</span>
                        <span className="text-sm font-semibold text-white font-['Barlow_Semi_Condensed']">{profileData.jobRole || 'N/A'}</span>
                      </div>
                      <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">EXPERIENCE</span>
                        <span className="text-sm font-semibold text-white font-['Barlow_Semi_Condensed']">{profileData.workExperience ? `${profileData.workExperience} years` : 'N/A'}</span>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Identity & Emergency Grid */}
              <div className="pt-4 border-t border-[#202226] space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ffb000] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>AUDITED KYC & GUARDIAN CONTACTS</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">ID DOCUMENT</span>
                    <span className="text-sm font-semibold text-white uppercase font-['Barlow_Semi_Condensed']">{profileData.govtIdType || 'N/A'}</span>
                  </div>
                  <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">ID NUMBER</span>
                    <span className="text-sm font-semibold text-white font-mono">{profileData.govtIdNumber || 'N/A'}</span>
                  </div>
                  <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">EMERGENCY CONTACT</span>
                    <span className="text-sm font-semibold text-white font-['Barlow_Semi_Condensed']">{profileData.emergencyContactName || 'N/A'}</span>
                  </div>
                  <div className="p-3 rounded-[2px] bg-[#0b0b0d] border border-[#26292d]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7aaaf] block mb-0.5 font-['Barlow_Semi_Condensed']">EMERGENCY PHONE</span>
                    <span className="text-sm font-semibold text-white font-['Barlow_Semi_Condensed']">{profileData.emergencyContactNumber || 'N/A'}</span>
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
