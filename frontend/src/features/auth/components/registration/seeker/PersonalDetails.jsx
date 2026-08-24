import { useState } from 'react';
import PropTypes from 'prop-types';
import { User, Mail, Lock, Phone, Calendar, MapPin, AlertCircle } from 'lucide-react';

const PersonalDetails = ({ formData, handleChange, errors }) => {
  const [maxDate] = useState(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split('T')[0];
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-xl font-extrabold text-white tracking-tight">Personal Information</h3>
        <p className="text-xs text-neutral-400 mt-1">Please provide your verified contact and identification details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              placeholder="e.g. Rahul Verma"
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              placeholder="rahul@example.com"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Create Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              placeholder="Min 6 characters"
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              placeholder="Re-enter password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
              <span>{errors.confirmPassword}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Phone Number (10 Digits)
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              placeholder="9876543210"
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Date of Birth (18+ only)
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              max={maxDate}
              className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
            />
          </div>
          {errors.dateOfBirth && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
              <span>{errors.dateOfBirth}</span>
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all cursor-pointer"
          >
            <option value="" className="bg-[#141414]">Select Gender</option>
            <option value="male" className="bg-[#141414]">Male</option>
            <option value="female" className="bg-[#141414]">Female</option>
            <option value="other" className="bg-[#141414]">Other</option>
          </select>
          {errors.gender && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
              <span>{errors.gender}</span>
            </p>
          )}
        </div>

        {/* Current City */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Current City
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              name="currentCity"
              value={formData.currentCity}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              placeholder="e.g. Hyderabad"
            />
          </div>
          {errors.currentCity && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
              <span>{errors.currentCity}</span>
            </p>
          )}
        </div>

        {/* Preferred Location */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Preferred Stay Location / Area
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              name="preferredLocation"
              value={formData.preferredLocation}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              placeholder="e.g. Gachibowli, Madhapur, Koramangala..."
            />
          </div>
          {errors.preferredLocation && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
              <span>{errors.preferredLocation}</span>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

PersonalDetails.propTypes = {
  formData: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    phone: PropTypes.string,
    dateOfBirth: PropTypes.string,
    gender: PropTypes.string,
    currentCity: PropTypes.string,
    preferredLocation: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    phone: PropTypes.string,
    dateOfBirth: PropTypes.string,
    gender: PropTypes.string,
    currentCity: PropTypes.string,
    preferredLocation: PropTypes.string
  })
};

export default PersonalDetails;


