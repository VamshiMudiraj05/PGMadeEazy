import PropTypes from 'prop-types';
import { ShieldCheck, Phone, User, FileText, AlertCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Verification = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#1E1E26] pb-4">
        <h3 className="text-xl font-bold text-white tracking-tight">Identity & Safety Verification</h3>
        <p className="text-xs text-[#7A7A85] mt-1">Required for regulatory compliance and resident security.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Government ID Type */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Government ID Type
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
            <select
              name="govtIdType"
              value={formData.govtIdType}
              onChange={handleChange}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white focus:outline-none focus:border-[#FF5A36] transition-colors cursor-pointer"
            >
              <option value="">Select ID Type</option>
              <option value="aadhar">Aadhaar Card</option>
              <option value="pan">PAN Card</option>
              <option value="dl">Driving License</option>
              <option value="passport">Passport</option>
            </select>
          </div>
          {errors.govtIdType && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
              <span>{errors.govtIdType}</span>
            </p>
          )}
        </div>

        {/* ID Number */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Government ID Number
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
            <input
              type="text"
              name="govtIdNumber"
              value={formData.govtIdNumber}
              onChange={handleChange}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
              placeholder="e.g. 1234 5678 9012"
            />
          </div>
          {errors.govtIdNumber && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
              <span>{errors.govtIdNumber}</span>
            </p>
          )}
        </div>

        {/* Emergency Contact Name */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Emergency Contact Name (Parent / Guardian)
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
              placeholder="e.g. Ramesh Kumar"
            />
          </div>
          {errors.emergencyContactName && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
              <span>{errors.emergencyContactName}</span>
            </p>
          )}
        </div>

        {/* Emergency Contact Number */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Emergency Contact Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
            <input
              type="tel"
              name="emergencyContactNumber"
              value={formData.emergencyContactNumber}
              onChange={handleChange}
              className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
              placeholder="9876543210"
            />
          </div>
          {errors.emergencyContactNumber && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
              <span>{errors.emergencyContactNumber}</span>
            </p>
          )}
        </div>

      </div>

      {/* Terms Agreement Box */}
      <div className="p-4 rounded-sm bg-[#0B0B0E] border border-[#1E1E26]">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="termsAgreed"
            checked={formData.termsAgreed}
            onChange={handleChange}
            className="mt-1 h-3.5 w-3.5 rounded-none border-[#22222A] bg-[#121217] text-[#FF5A36] focus:ring-0 cursor-pointer"
          />
          <span className="text-xs text-[#9E9EA7] leading-relaxed">
            I certify that the information provided is accurate and agree to the{" "}
            <span className="text-white font-semibold underline underline-offset-2">Terms of Service</span> and{" "}
            <span className="text-white font-semibold underline underline-offset-2">Privacy Policy</span>.
          </span>
        </label>
        {errors.termsAgreed && (
          <p className="mt-2 text-[11px] text-red-400 flex items-center gap-1">
            <AlertCircle className="h-3 w-3 inline shrink-0" />
            <span>{errors.termsAgreed}</span>
          </p>
        )}
      </div>
    </div>
  );
};

Verification.propTypes = {
  formData: PropTypes.shape({
    govtIdType: PropTypes.string,
    govtIdNumber: PropTypes.string,
    emergencyContactName: PropTypes.string,
    emergencyContactNumber: PropTypes.string,
    termsAgreed: PropTypes.bool
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default Verification;

