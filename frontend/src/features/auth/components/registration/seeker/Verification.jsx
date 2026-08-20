import PropTypes from 'prop-types';
import { ShieldCheck, Phone, User, FileText, AlertCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Verification = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <h3 className="text-xl font-bold text-white">Identity & Safety Verification</h3>
        <p className="text-xs text-zinc-400 mt-1">Required for government compliance and tenant protection</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Government ID Type */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
            Government ID Type
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500 pointer-events-none" />
            <select
              name="govtIdType"
              value={formData.govtIdType}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            >
              <option value="">Select ID Type</option>
              <option value="aadhar">Aadhaar Card</option>
              <option value="pan">PAN Card</option>
              <option value="dl">Driving License</option>
              <option value="passport">Passport</option>
            </select>
          </div>
          {errors.govtIdType && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 inline" />
              <span>{errors.govtIdType}</span>
            </p>
          )}
        </div>

        {/* ID Number */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
            Government ID Number
          </label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500 pointer-events-none" />
            <input
              type="text"
              name="govtIdNumber"
              value={formData.govtIdNumber}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              placeholder="e.g. 1234 5678 9012"
            />
          </div>
          {errors.govtIdNumber && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 inline" />
              <span>{errors.govtIdNumber}</span>
            </p>
          )}
        </div>

        {/* Emergency Contact Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
            Emergency Contact Name (Parent / Guardian)
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500 pointer-events-none" />
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              placeholder="e.g. Ramesh Kumar"
            />
          </div>
          {errors.emergencyContactName && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 inline" />
              <span>{errors.emergencyContactName}</span>
            </p>
          )}
        </div>

        {/* Emergency Contact Number */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
            Emergency Contact Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500 pointer-events-none" />
            <input
              type="tel"
              name="emergencyContactNumber"
              value={formData.emergencyContactNumber}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              placeholder="9876543210"
            />
          </div>
          {errors.emergencyContactNumber && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 inline" />
              <span>{errors.emergencyContactNumber}</span>
            </p>
          )}
        </div>

      </div>

      {/* Terms Agreement Box */}
      <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="termsAgreed"
            checked={formData.termsAgreed}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-orange-500 focus:ring-orange-500"
          />
          <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            I certify that the information provided is accurate and agree to the{" "}
            <span className="text-orange-400 font-semibold underline">Terms of Service</span> and{" "}
            <span className="text-orange-400 font-semibold underline">Privacy Policy</span>.
          </span>
        </label>
        {errors.termsAgreed && (
          <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="h-3 w-3 inline" />
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

