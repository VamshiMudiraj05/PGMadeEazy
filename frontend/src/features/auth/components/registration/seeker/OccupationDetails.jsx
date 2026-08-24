import PropTypes from 'prop-types';
import { GraduationCap, Briefcase, AlertCircle } from 'lucide-react';

const OccupationDetails = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-xl font-extrabold text-white tracking-tight">Occupation & Education</h3>
        <p className="text-xs text-neutral-400 mt-1">Select your profile category to customize your PG application.</p>
      </div>

      <div className="space-y-6">
        {/* Occupation Type Selector */}
        <div className="space-y-3">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
            Select Your Current Status
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleChange({
                target: { name: 'occupationType', value: 'student' }
              })}
              className={`p-5 rounded-xl border transition-all flex items-center gap-4 text-left cursor-pointer ${
                formData.occupationType === 'student'
                  ? 'border-[#E50914] bg-red-600/10 text-white shadow-[0_0_20px_rgba(229,9,20,0.2)]'
                  : 'border-white/15 bg-black/60 text-neutral-400 hover:border-red-600/40 hover:text-white'
              }`}
            >
              <div className={`p-3 rounded-lg ${formData.occupationType === 'student' ? 'bg-[#E50914] text-white shadow-[0_0_10px_#E50914]' : 'bg-white/5 text-neutral-400'}`}>
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Student</div>
                <div className="text-xs text-neutral-400 mt-0.5">Enrolled in college / university</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleChange({
                target: { name: 'occupationType', value: 'professional' }
              })}
              className={`p-5 rounded-xl border transition-all flex items-center gap-4 text-left cursor-pointer ${
                formData.occupationType === 'professional'
                  ? 'border-[#E50914] bg-red-600/10 text-white shadow-[0_0_20px_rgba(229,9,20,0.2)]'
                  : 'border-white/15 bg-black/60 text-neutral-400 hover:border-red-600/40 hover:text-white'
              }`}
            >
              <div className={`p-3 rounded-lg ${formData.occupationType === 'professional' ? 'bg-[#E50914] text-white shadow-[0_0_10px_#E50914]' : 'bg-white/5 text-neutral-400'}`}>
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Working Professional</div>
                <div className="text-xs text-neutral-400 mt-0.5">Employed in corporate / startup</div>
              </div>
            </button>
          </div>
          {errors.occupationType && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
              <span>{errors.occupationType}</span>
            </p>
          )}
        </div>

        {/* Student Specific Fields */}
        {formData.occupationType === 'student' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-xl bg-black/60 border border-white/10">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                College / University Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#141414] border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                placeholder="e.g. IIT Hyderabad, BITS Pilani"
              />
              {errors.collegeName && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
                  <span>{errors.collegeName}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                Course / Major
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#141414] border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                placeholder="e.g. B.Tech Computer Science"
              />
              {errors.courseName && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
                  <span>{errors.courseName}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                Current Year of Study
              </label>
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#141414] border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all cursor-pointer"
              >
                <option value="" className="bg-[#141414]">Select Year</option>
                <option value="1" className="bg-[#141414]">1st Year (Freshman)</option>
                <option value="2" className="bg-[#141414]">2nd Year (Sophomore)</option>
                <option value="3" className="bg-[#141414]">3rd Year (Junior)</option>
                <option value="4" className="bg-[#141414]">4th Year (Senior)</option>
                <option value="5" className="bg-[#141414]">5th Year (Postgrad / Dual)</option>
              </select>
              {errors.yearOfStudy && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
                  <span>{errors.yearOfStudy}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                Student ID / Roll No. (Optional)
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#141414] border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                placeholder="e.g. 21CS049"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                College Campus Address
              </label>
              <textarea
                name="collegeAddress"
                value={formData.collegeAddress}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 bg-[#141414] border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all resize-none"
                placeholder="Enter college campus address..."
              />
              {errors.collegeAddress && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
                  <span>{errors.collegeAddress}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Professional Specific Fields */}
        {formData.occupationType === 'professional' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-xl bg-black/60 border border-white/10">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                Company / Organization
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#141414] border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                placeholder="e.g. Microsoft, Infosys, Deloitte"
              />
              {errors.companyName && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
                  <span>{errors.companyName}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                Designation / Job Role
              </label>
              <input
                type="text"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#141414] border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                placeholder="e.g. Frontend Developer"
              />
              {errors.jobRole && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
                  <span>{errors.jobRole}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                Total Experience
              </label>
              <select
                name="workExperience"
                value={formData.workExperience}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#141414] border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all cursor-pointer"
              >
                <option value="" className="bg-[#141414]">Select Experience</option>
                <option value="0" className="bg-[#141414]">Fresher (0 - 1 Years)</option>
                <option value="1" className="bg-[#141414]">1 - 2 Years</option>
                <option value="3" className="bg-[#141414]">3 - 5 Years</option>
                <option value="5" className="bg-[#141414]">5+ Years</option>
              </select>
              {errors.workExperience && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
                  <span>{errors.workExperience}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                Employee / Work ID (Optional)
              </label>
              <input
                type="text"
                name="workId"
                value={formData.workId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#141414] border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                placeholder="e.g. EMP-9921"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                Office / Work Address
              </label>
              <textarea
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 bg-[#141414] border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all resize-none"
                placeholder="Enter office building address..."
              />
              {errors.officeAddress && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
                  <span>{errors.officeAddress}</span>
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

OccupationDetails.propTypes = {
  formData: PropTypes.shape({
    occupationType: PropTypes.string,
    collegeName: PropTypes.string,
    courseName: PropTypes.string,
    yearOfStudy: PropTypes.string,
    collegeAddress: PropTypes.string,
    studentId: PropTypes.string,
    companyName: PropTypes.string,
    jobRole: PropTypes.string,
    workExperience: PropTypes.string,
    officeAddress: PropTypes.string,
    workId: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    occupationType: PropTypes.string,
    collegeName: PropTypes.string,
    courseName: PropTypes.string,
    yearOfStudy: PropTypes.string,
    collegeAddress: PropTypes.string,
    companyName: PropTypes.string,
    jobRole: PropTypes.string,
    workExperience: PropTypes.string,
    officeAddress: PropTypes.string
  })
};

export default OccupationDetails;


