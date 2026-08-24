import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  ShieldCheck, 
  Edit3, 
  Save, 
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { providerService } from '../../../services/providerService';

const ProviderProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    currentCity: '',
    govtIdType: '',
    govtIdNumber: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    role: '',
    userType: ''
  });

  useEffect(() => {
    fetchProviderProfile();
  }, []);

  const fetchProviderProfile = async () => {
    try {
      setLoading(true);
      const data = await providerService.getProviderProfile(user?.id);
      setFormData(data || {});
      setError(null);
    } catch (err) {
      setError('Failed to load profile data');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await providerService.updateProviderProfile(user?.id, formData);
      toast.success('Host profile updated successfully');
      setIsEditing(false);
      setError(null);
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
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading host identity...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#E50914]">OPERATOR VERIFICATION</div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Host Profile & Identity
              </h1>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              isEditing
                ? 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
                : 'bg-[#E50914] hover:bg-[#b80710] text-white shadow-[0_0_15px_rgba(229,9,20,0.3)]'
            }`}
          >
            {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-600/15 border border-red-600/30 text-xs text-red-400 font-semibold shadow-lg">
            {error}
          </div>
        )}

        <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-8 shadow-2xl">
          
          {/* Host Header Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-white/10">
            <div className="h-16 w-16 rounded-xl bg-red-600 flex items-center justify-center text-white text-2xl font-extrabold shrink-0 shadow-[0_0_20px_rgba(229,9,20,0.4)]">
              {formData.fullName?.charAt(0)?.toUpperCase() || user?.name?.charAt(0)?.toUpperCase() || 'H'}
            </div>
            <div className="text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {formData.fullName || user?.name}
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500 text-black shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Host</span>
                </span>
              </div>
              <p className="text-xs text-neutral-400">Registered PG Stay Operator & Accommodation Host</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Basic Identity */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-widest text-[#E50914] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>1. Personal & Contact Info</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Full Legal Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Registered Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Phone Contact</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all cursor-pointer"
                  >
                    <option value="" className="bg-[#141414]">Select Gender</option>
                    <option value="male" className="bg-[#141414]">Male</option>
                    <option value="female" className="bg-[#141414]">Female</option>
                    <option value="other" className="bg-[#141414]">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Operating City</label>
                  <input
                    type="text"
                    name="currentCity"
                    value={formData.currentCity || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Government Identity */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="text-xs uppercase font-bold tracking-widest text-[#E50914] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>2. Government Identity Verification</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Govt ID Type</label>
                  <select
                    name="govtIdType"
                    value={formData.govtIdType || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all cursor-pointer"
                  >
                    <option value="" className="bg-[#141414]">Select ID Type</option>
                    <option value="aadhar" className="bg-[#141414]">Aadhaar Card</option>
                    <option value="pan" className="bg-[#141414]">PAN Card</option>
                    <option value="driving" className="bg-[#141414]">Driving License</option>
                    <option value="voter" className="bg-[#141414]">Voter ID</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">ID Number</label>
                  <input
                    type="text"
                    name="govtIdNumber"
                    value={formData.govtIdNumber || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Emergency Contact */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="text-xs uppercase font-bold tracking-widest text-[#E50914] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>3. Emergency Contact Line</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Contact Full Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Contact Mobile Phone</label>
                  <input
                    type="tel"
                    name="emergencyContactNumber"
                    value={formData.emergencyContactNumber || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#b80710] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{loading ? 'Saving Profile...' : 'Save Profile Changes'}</span>
                </button>
              </div>
            )}

          </form>

        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;