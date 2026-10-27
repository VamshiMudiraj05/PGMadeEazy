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
      setError('Failed to load warden profile data');
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
      toast.success('Warden profile updated successfully');
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
      <div className="min-h-[calc(100vh-140px)] bg-[#0a0a0c] flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#ffb000]">
          VERIFYING WARDEN IDENTITY...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0c] text-neutral-100 py-10 min-h-screen relative font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="board p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/provider-dashboard')}
                className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#ffb000]/40 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#ffb000] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ffb000]">
                    DOSSIER 05 // WARDEN VERIFICATION
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-['Big_Shoulders_Display']">
                  Host Warden Profile & Identity
                </h1>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                isEditing
                  ? 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                  : 'btn-solari-amber'
              }`}
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span>{isEditing ? 'Cancel' : 'Edit Dossier'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="board p-4 text-xs font-mono text-red-400 border-red-500/40 bg-red-950/20">
            {error}
          </div>
        )}

        <div className="board p-6 sm:p-8 space-y-8">
          
          {/* Warden Badge Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-neutral-800">
            <div className="h-16 w-16 rounded bg-[#ffb000]/15 border border-[#ffb000]/40 flex items-center justify-center text-[#ffb000] text-2xl font-mono font-bold shrink-0">
              {formData.fullName?.charAt(0)?.toUpperCase() || user?.name?.charAt(0)?.toUpperCase() || 'W'}
            </div>
            <div className="text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase font-['Big_Shoulders_Display'] tracking-wide">
                  {formData.fullName || user?.name}
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/40">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Warden</span>
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400">
                Registered Student Accommodation Warden // Campus Resident Host
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Basic Identity */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase font-bold tracking-widest text-[#ffb000] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>01 // PERSONAL & DIRECT CONTACT INFO</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Legal Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#ffb000] font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Registered Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#ffb000] font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Warden Mobile Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#ffb000] font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#ffb000] font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#ffb000] font-mono cursor-pointer"
                  >
                    <option value="" className="bg-neutral-900">Select Gender</option>
                    <option value="male" className="bg-neutral-900">Male</option>
                    <option value="female" className="bg-neutral-900">Female</option>
                    <option value="other" className="bg-neutral-900">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Operating City</label>
                  <input
                    type="text"
                    name="currentCity"
                    value={formData.currentCity || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#ffb000] font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Government Identity */}
            <div className="space-y-4 pt-6 border-t border-neutral-800">
              <h3 className="text-xs font-mono uppercase font-bold tracking-widest text-[#ffb000] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>02 // OFFICIAL KYC & IDENTITY RECORD</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Govt ID Type</label>
                  <select
                    name="govtIdType"
                    value={formData.govtIdType || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#ffb000] font-mono cursor-pointer"
                  >
                    <option value="" className="bg-neutral-900">Select ID Type</option>
                    <option value="aadhar" className="bg-neutral-900">Aadhaar Card</option>
                    <option value="pan" className="bg-neutral-900">PAN Card</option>
                    <option value="driving" className="bg-neutral-900">Driving License</option>
                    <option value="voter" className="bg-neutral-900">Voter ID</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">ID Number</label>
                  <input
                    type="text"
                    name="govtIdNumber"
                    value={formData.govtIdNumber || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#ffb000] font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Emergency Contact */}
            <div className="space-y-4 pt-6 border-t border-neutral-800">
              <h3 className="text-xs font-mono uppercase font-bold tracking-widest text-[#ffb000] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>03 // EMERGENCY ESCALATION CONTACT</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Contact Full Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#ffb000] font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Emergency Mobile</label>
                  <input
                    type="tel"
                    name="emergencyContactNumber"
                    value={formData.emergencyContactNumber || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-[#ffb000] font-mono"
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
                  className="btn-solari-amber flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Transmitting Dossier...' : 'Save Dossier'}</span>
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