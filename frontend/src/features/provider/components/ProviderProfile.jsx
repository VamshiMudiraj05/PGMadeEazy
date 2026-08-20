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
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex flex-col items-center justify-center gap-4 text-zinc-100">
        <div className="h-12 w-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin glow-orange-sm" />
        <p className="text-sm font-semibold text-zinc-400">Loading host profile records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 selection:bg-orange-500 selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Host Profile & Identity
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">Manage your personal verification and property manager profile</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isEditing
                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md shadow-orange-500/20'
            }`}
          >
            {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 mb-6">
            {error}
          </div>
        )}

        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-8 glow-orange-sm">
          
          {/* Host Header Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-zinc-800/80">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-orange-500/25 shrink-0">
              {formData.fullName?.charAt(0)?.toUpperCase() || user?.name?.charAt(0)?.toUpperCase() || 'H'}
            </div>
            <div className="text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {formData.fullName || user?.name}
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Host</span>
                </span>
              </div>
              <p className="text-xs text-zinc-400">Registered PG Stay Operator & Accommodation Host</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Basic Identity */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-orange-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Personal & Contact Info</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Full Legal Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 disabled:opacity-60 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Registered Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 disabled:opacity-60 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Phone Contact</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 disabled:opacity-60 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 disabled:opacity-60 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 disabled:opacity-60 focus:outline-none focus:border-orange-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Operating City</label>
                  <input
                    type="text"
                    name="currentCity"
                    value={formData.currentCity || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 disabled:opacity-60 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Government Identity */}
            <div className="space-y-4 pt-4 border-t border-zinc-800/80">
              <h3 className="text-xs uppercase font-bold tracking-wider text-orange-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Government Identity Verification</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Govt ID Type</label>
                  <select
                    name="govtIdType"
                    value={formData.govtIdType || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 disabled:opacity-60 focus:outline-none focus:border-orange-500"
                  >
                    <option value="">Select ID Type</option>
                    <option value="aadhar">Aadhaar Card</option>
                    <option value="pan">PAN Card</option>
                    <option value="driving">Driving License</option>
                    <option value="voter">Voter ID</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">ID Number</label>
                  <input
                    type="text"
                    name="govtIdNumber"
                    value={formData.govtIdNumber || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 disabled:opacity-60 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Emergency Contact */}
            <div className="space-y-4 pt-4 border-t border-zinc-800/80">
              <h3 className="text-xs uppercase font-bold tracking-wider text-orange-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>Emergency Contact Person</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Contact Full Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 disabled:opacity-60 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Contact Mobile Phone</label>
                  <input
                    type="tel"
                    name="emergencyContactNumber"
                    value={formData.emergencyContactNumber || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 disabled:opacity-60 focus:outline-none focus:border-orange-500"
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
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-extrabold shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
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