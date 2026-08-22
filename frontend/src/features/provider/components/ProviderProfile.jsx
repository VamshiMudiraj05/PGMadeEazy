import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Calendar, 
  FileText, 
  Edit3, 
  Save, 
  X,
  Sparkles,
  Building
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
      <div className="min-h-[calc(100vh-140px)] bg-[#0B0B0E] flex flex-col items-center justify-center gap-3 text-[#FAFAFA]">
        <div className="h-6 w-6 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#7A7A85]">Loading host identity...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0E] text-[#FAFAFA] py-10 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1E1E26]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF5A36]">Operator Verification</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Host Profile & Identity
              </h1>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              isEditing
                ? 'bg-[#181820] text-[#9E9EA7] hover:text-white border border-[#22222A]'
                : 'bg-[#FF5A36] hover:bg-[#E54B28] text-white'
            }`}
          >
            {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-sm bg-[#121217] border border-red-500/30 text-xs text-red-400 font-semibold">
            {error}
          </div>
        )}

        <div className="p-6 sm:p-8 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-8">
          
          {/* Host Header Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-[#1E1E26]">
            <div className="h-16 w-16 rounded-sm bg-[#FF5A36] flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {formData.fullName?.charAt(0)?.toUpperCase() || user?.name?.charAt(0)?.toUpperCase() || 'H'}
            </div>
            <div className="text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {formData.fullName || user?.name}
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-emerald-500 text-black">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Host</span>
                </span>
              </div>
              <p className="text-xs text-[#7A7A85]">Registered PG Stay Operator & Accommodation Host</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Basic Identity */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-widest text-[#FF5A36] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>1. Personal & Contact Info</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Full Legal Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white disabled:opacity-60 focus:outline-none focus:border-[#FF5A36] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Registered Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white disabled:opacity-60 focus:outline-none focus:border-[#FF5A36] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Phone Contact</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white disabled:opacity-60 focus:outline-none focus:border-[#FF5A36] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white disabled:opacity-60 focus:outline-none focus:border-[#FF5A36] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white disabled:opacity-60 focus:outline-none focus:border-[#FF5A36] transition-colors"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Operating City</label>
                  <input
                    type="text"
                    name="currentCity"
                    value={formData.currentCity || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white disabled:opacity-60 focus:outline-none focus:border-[#FF5A36] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Government Identity */}
            <div className="space-y-4 pt-6 border-t border-[#1E1E26]">
              <h3 className="text-xs uppercase font-bold tracking-widest text-[#FF5A36] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>2. Government Identity Verification</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Govt ID Type</label>
                  <select
                    name="govtIdType"
                    value={formData.govtIdType || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white disabled:opacity-60 focus:outline-none focus:border-[#FF5A36] transition-colors"
                  >
                    <option value="">Select ID Type</option>
                    <option value="aadhar">Aadhaar Card</option>
                    <option value="pan">PAN Card</option>
                    <option value="driving">Driving License</option>
                    <option value="voter">Voter ID</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">ID Number</label>
                  <input
                    type="text"
                    name="govtIdNumber"
                    value={formData.govtIdNumber || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white disabled:opacity-60 focus:outline-none focus:border-[#FF5A36] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Emergency Contact */}
            <div className="space-y-4 pt-6 border-t border-[#1E1E26]">
              <h3 className="text-xs uppercase font-bold tracking-widest text-[#FF5A36] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>3. Emergency Contact Line</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Contact Full Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white disabled:opacity-60 focus:outline-none focus:border-[#FF5A36] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Contact Mobile Phone</label>
                  <input
                    type="tel"
                    name="emergencyContactNumber"
                    value={formData.emergencyContactNumber || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white disabled:opacity-60 focus:outline-none focus:border-[#FF5A36] transition-colors"
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
                  className="px-6 py-2.5 rounded-sm bg-[#FF5A36] hover:bg-[#E54B28] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
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