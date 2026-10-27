import PropTypes from 'prop-types';
import { ShieldCheck, Phone, User, FileText, AlertCircle } from 'lucide-react';

const Verification = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#202226] pb-4">
        <h3 className="text-xl font-extrabold text-white tracking-tight">Identity & Safety Verification</h3>
        <p className="text-xs text-neutral-400 mt-1">Required for regulatory compliance and resident security.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Government ID Type */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Government ID Type
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <select
              name="govtIdType"
              value={formData.govtIdType}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#0e0f11] border border-[#34373c] rounded-[2px] text-xs sm:text-sm text-white focus:outline-none focus:border-[#ffb000] focus:ring-1 focus:ring-[#ffb000]/50 transition-all cursor-pointer"
            >
              <option value="" className="bg-[#0e0f11]">Select ID Type</option>
              <option value="aadhar" className="bg-[#0e0f11]">Aadhaar Card</option>
              <option value="pan" className="bg-[#0e0f11]">PAN Card</option>
              <option value="dl" className="bg-[#0e0f11]">Driving License</option>
              <option value="passport" className="bg-[#0e0f11]">Passport</option>
            </select>
          </div>
          {errors.govtIdType && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#ffb000]" />
              <span>{errors.govtIdType}</span>
            </p>
          )}
        </div>

        {/* ID Number */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Government ID Number
          </label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              name="govtIdNumber"
              value={formData.govtIdNumber}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#0e0f11] border border-[#34373c] rounded-[2px] text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ffb000] focus:ring-1 focus:ring-[#ffb000]/50 transition-all"
              placeholder="e.g. 1234 5678 9012"
            />
          </div>
          {errors.govtIdNumber && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#ffb000]" />
              <span>{errors.govtIdNumber}</span>
            </p>
          )}
        </div>

        {/* Emergency Contact Name */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Emergency Contact Name (Parent / Guardian)
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#0e0f11] border border-[#34373c] rounded-[2px] text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ffb000] focus:ring-1 focus:ring-[#ffb000]/50 transition-all"
              placeholder="e.g. Ramesh Kumar"
            />
          </div>
          {errors.emergencyContactName && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#ffb000]" />
              <span>{errors.emergencyContactName}</span>
            </p>
          )}
        </div>

        {/* Emergency Contact Number */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Emergency Contact Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <input
              type="tel"
              name="emergencyContactNumber"
              value={formData.emergencyContactNumber}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#0e0f11] border border-[#34373c] rounded-[2px] text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ffb000] focus:ring-1 focus:ring-[#ffb000]/50 transition-all"
              placeholder="9876543210"
            />
          </div>
          {errors.emergencyContactNumber && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#ffb000]" />
              <span>{errors.emergencyContactNumber}</span>
            </p>
          )}
        </div>

      </div>

      {/* Terms Agreement Box */}
      <div className="p-5 rounded-[2px] bg-[#0e0f11] border border-[#202226]">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="termsAgreed"
            checked={formData.termsAgreed}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-[#0e0f11] text-[#ffb000] focus:ring-[#ffb000] cursor-pointer"
          />
          <span className="text-xs text-neutral-400 leading-relaxed">
            I certify that the information provided is accurate and agree to the{" "}
            <span className="text-white font-semibold underline underline-offset-2">Terms of Service</span> and{" "}
            <span className="text-white font-semibold underline underline-offset-2">Privacy Policy</span>.
          </span>
        </label>
        {errors.termsAgreed && (
          <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#ffb000]" />
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
  errors: PropTypes.shape({
    govtIdType: PropTypes.string,
    govtIdNumber: PropTypes.string,
    emergencyContactName: PropTypes.string,
    emergencyContactNumber: PropTypes.string,
    termsAgreed: PropTypes.string
  })
};

export default Verification;
