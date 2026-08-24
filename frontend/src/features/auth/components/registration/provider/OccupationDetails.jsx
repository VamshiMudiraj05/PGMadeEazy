import PropTypes from 'prop-types';

const OccupationDetails = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-white">Host Business Profile</h3>
        <p className="text-xs text-neutral-400 mt-1">Specify your hospitality enterprise structure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Management Model</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleChange({
                target: { name: 'occupationType', value: 'business' }
              })}
              className={`p-4 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                formData.occupationType === 'business'
                  ? 'border-red-600 bg-red-600/10 text-white shadow-[0_0_15px_rgba(229,9,20,0.2)]'
                  : 'border-white/10 bg-black/60 text-neutral-400 hover:border-red-600/40 hover:text-white'
              }`}
            >
              Business Enterprise / Firm
            </button>
            <button
              type="button"
              onClick={() => handleChange({
                target: { name: 'occupationType', value: 'individual' }
              })}
              className={`p-4 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                formData.occupationType === 'individual'
                  ? 'border-red-600 bg-red-600/10 text-white shadow-[0_0_15px_rgba(229,9,20,0.2)]'
                  : 'border-white/10 bg-black/60 text-neutral-400 hover:border-red-600/40 hover:text-white'
              }`}
            >
              Individual Landlord / Owner
            </button>
          </div>
          {errors.occupationType && <span className="text-red-500 text-xs font-semibold">{errors.occupationType}</span>}
        </div>

        {formData.occupationType === 'business' && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full p-3.5 rounded-lg bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                placeholder="Enter enterprise brand name"
              />
              {errors.businessName && <span className="text-red-500 text-xs font-semibold">{errors.businessName}</span>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Business Type</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full p-3.5 rounded-lg bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              >
                <option value="" className="bg-[#141414]">Select Establishment Type</option>
                <option value="hostel" className="bg-[#141414]">Student Hostel</option>
                <option value="pg" className="bg-[#141414]">Paying Guest Complex</option>
                <option value="apartment" className="bg-[#141414]">Managed Apartment Complex</option>
              </select>
              {errors.businessType && <span className="text-red-500 text-xs font-semibold">{errors.businessType}</span>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Years in Business</label>
              <select
                name="yearsInBusiness"
                value={formData.yearsInBusiness}
                onChange={handleChange}
                className="w-full p-3.5 rounded-lg bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              >
                <option value="" className="bg-[#141414]">Select Operating Experience</option>
                <option value="0" className="bg-[#141414]">Less than 1 Year</option>
                <option value="1" className="bg-[#141414]">1-3 Years</option>
                <option value="3" className="bg-[#141414]">3-5 Years</option>
                <option value="5" className="bg-[#141414]">5+ Years</option>
              </select>
              {errors.yearsInBusiness && <span className="text-red-500 text-xs font-semibold">{errors.yearsInBusiness}</span>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">GST Number (Optional)</label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                className="w-full p-3.5 rounded-lg bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all uppercase"
                placeholder="22AAAAA0000A1Z5"
              />
            </div>

            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Business Address</label>
              <textarea
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                className="w-full p-3.5 rounded-lg bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-xs h-24 resize-none focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                placeholder="Registered business physical address"
              />
              {errors.businessAddress && <span className="text-red-500 text-xs font-semibold">{errors.businessAddress}</span>}
            </div>
          </>
        )}

        {formData.occupationType === 'individual' && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full p-3.5 rounded-lg bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              >
                <option value="" className="bg-[#141414]">Select Property Type</option>
                <option value="house" className="bg-[#141414]">Independent House</option>
                <option value="apartment" className="bg-[#141414]">Apartment Unit</option>
                <option value="villa" className="bg-[#141414]">Villa / Bungalow</option>
              </select>
              {errors.propertyType && <span className="text-red-500 text-xs font-semibold">{errors.propertyType}</span>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Years as Owner</label>
              <select
                name="yearsAsOwner"
                value={formData.yearsAsOwner}
                onChange={handleChange}
                className="w-full p-3.5 rounded-lg bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
              >
                <option value="" className="bg-[#141414]">Select Ownership Duration</option>
                <option value="0" className="bg-[#141414]">Less than 1 Year</option>
                <option value="1" className="bg-[#141414]">1-3 Years</option>
                <option value="3" className="bg-[#141414]">3-5 Years</option>
                <option value="5" className="bg-[#141414]">5+ Years</option>
              </select>
              {errors.yearsAsOwner && <span className="text-red-500 text-xs font-semibold">{errors.yearsAsOwner}</span>}
            </div>

            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Property Address</label>
              <textarea
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleChange}
                className="w-full p-3.5 rounded-lg bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-xs h-24 resize-none focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                placeholder="Physical address of property being listed"
              />
              {errors.propertyAddress && <span className="text-red-500 text-xs font-semibold">{errors.propertyAddress}</span>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

OccupationDetails.propTypes = {
  formData: PropTypes.shape({
    occupationType: PropTypes.string,
    // Business fields
    businessName: PropTypes.string,
    businessType: PropTypes.string,
    yearsInBusiness: PropTypes.string,
    gstNumber: PropTypes.string,
    businessAddress: PropTypes.string,
    // Individual fields
    propertyType: PropTypes.string,
    yearsAsOwner: PropTypes.string,
    propertyAddress: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    occupationType: PropTypes.string,
    // Business fields
    businessName: PropTypes.string,
    businessType: PropTypes.string,
    yearsInBusiness: PropTypes.string,
    businessAddress: PropTypes.string,
    // Individual fields
    propertyType: PropTypes.string,
    yearsAsOwner: PropTypes.string,
    propertyAddress: PropTypes.string
  })
};

export default OccupationDetails;
