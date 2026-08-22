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
      <div className="border-b border-[#1E1E26] pb-4">
        <h3 className="text-xl font-bold text-white tracking-tight">Personal Information</h3>
        <p className="text-xs text-[#7A7A85] mt-1">Please provide your verified contact and identification details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
              placeholder="e.g. John Doe"
            />
          </div>
          {errors.fullName && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
              placeholder="john@example.com"
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Create Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
              placeholder="Min 6 characters"
            />
          </div>
          {errors.password && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
              placeholder="Re-enter password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
              <span>{errors.confirmPassword}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Phone Number (10 Digits)
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
              placeholder="9876543210"
            />
          </div>
          {errors.phone && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Date of Birth (18+ only)
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              max={maxDate}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white focus:outline-none focus:border-[#FF5A36] transition-colors"
            />
          </div>
          {errors.dateOfBirth && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
              <span>{errors.dateOfBirth}</span>
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white focus:outline-none focus:border-[#FF5A36] transition-colors cursor-pointer"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
              <span>{errors.gender}</span>
            </p>
          )}
        </div>

        {/* Current City */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Current City
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
            <input
              type="text"
              name="currentCity"
              value={formData.currentCity}
              onChange={handleChange}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
              placeholder="e.g. Hyderabad"
            />
          </div>
          {errors.currentCity && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
              <span>{errors.currentCity}</span>
            </p>
          )}
        </div>

        {/* Preferred Location */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Preferred Stay Location / Area
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
            <input
              type="text"
              name="preferredLocation"
              value={formData.preferredLocation}
              onChange={handleChange}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
              placeholder="e.g. Gachibowli, Madhapur, Koramangala..."
            />
          </div>
          {errors.preferredLocation && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
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

