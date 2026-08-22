import PropTypes from 'prop-types';
import { GraduationCap, Briefcase, Building, BookOpen, MapPin, Award, AlertCircle } from 'lucide-react';

const OccupationDetails = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#1E1E26] pb-4">
        <h3 className="text-xl font-bold text-white tracking-tight">Occupation & Education</h3>
        <p className="text-xs text-[#7A7A85] mt-1">Select your profile category to customize your PG application.</p>
      </div>

      <div className="space-y-6">
        {/* Occupation Type Selector */}
        <div className="space-y-3">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
            Select Your Current Status
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleChange({
                target: { name: 'occupationType', value: 'student' }
              })}
              className={`p-5 rounded-sm border transition-colors flex items-center gap-4 text-left ${
                formData.occupationType === 'student'
                  ? 'border-[#FF5A36] bg-[#121217] text-white'
                  : 'border-[#1E1E26] bg-[#0B0B0E] text-[#9E9EA7] hover:border-[#383848] hover:text-white'
              }`}
            >
              <div className={`p-2.5 rounded-sm ${formData.occupationType === 'student' ? 'bg-[#FF5A36] text-white' : 'bg-[#181820] text-[#7A7A85]'}`}>
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Student</div>
                <div className="text-xs text-[#7A7A85] mt-0.5">Enrolled in college / university</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleChange({
                target: { name: 'occupationType', value: 'professional' }
              })}
              className={`p-5 rounded-sm border transition-colors flex items-center gap-4 text-left ${
                formData.occupationType === 'professional'
                  ? 'border-[#FF5A36] bg-[#121217] text-white'
                  : 'border-[#1E1E26] bg-[#0B0B0E] text-[#9E9EA7] hover:border-[#383848] hover:text-white'
              }`}
            >
              <div className={`p-2.5 rounded-sm ${formData.occupationType === 'professional' ? 'bg-[#FF5A36] text-white' : 'bg-[#181820] text-[#7A7A85]'}`}>
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Working Professional</div>
                <div className="text-xs text-[#7A7A85] mt-0.5">Employed in corporate / startup</div>
              </div>
            </button>
          </div>
          {errors.occupationType && (
            <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3 inline shrink-0" />
              <span>{errors.occupationType}</span>
            </p>
          )}
        </div>

        {/* Student Specific Fields */}
        {formData.occupationType === 'student' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-sm bg-[#0B0B0E] border border-[#1E1E26]">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                College / University Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                placeholder="e.g. IIT Hyderabad, BITS Pilani"
              />
              {errors.collegeName && (
                <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3 inline shrink-0" />
                  <span>{errors.collegeName}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                Course / Major
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                placeholder="e.g. B.Tech Computer Science"
              />
              {errors.courseName && (
                <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3 inline shrink-0" />
                  <span>{errors.courseName}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                Current Year of Study
              </label>
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white focus:outline-none focus:border-[#FF5A36] transition-colors cursor-pointer"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year (Freshman)</option>
                <option value="2">2nd Year (Sophomore)</option>
                <option value="3">3rd Year (Junior)</option>
                <option value="4">4th Year (Senior)</option>
                <option value="5">5th Year (Postgrad / Dual)</option>
              </select>
              {errors.yearOfStudy && (
                <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3 inline shrink-0" />
                  <span>{errors.yearOfStudy}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                Student ID / Roll No. (Optional)
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                placeholder="e.g. 21CS049"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                College Campus Address
              </label>
              <textarea
                name="collegeAddress"
                value={formData.collegeAddress}
                onChange={handleChange}
                rows="3"
                className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors resize-none"
                placeholder="Enter college campus address..."
              />
              {errors.collegeAddress && (
                <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3 inline shrink-0" />
                  <span>{errors.collegeAddress}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Professional Specific Fields */}
        {formData.occupationType === 'professional' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-sm bg-[#0B0B0E] border border-[#1E1E26]">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                Company / Organization
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                placeholder="e.g. Microsoft, Infosys, Deloitte"
              />
              {errors.companyName && (
                <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3 inline shrink-0" />
                  <span>{errors.companyName}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                Designation / Job Role
              </label>
              <input
                type="text"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                placeholder="e.g. Frontend Developer"
              />
              {errors.jobRole && (
                <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3 inline shrink-0" />
                  <span>{errors.jobRole}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                Total Experience
              </label>
              <select
                name="workExperience"
                value={formData.workExperience}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white focus:outline-none focus:border-[#FF5A36] transition-colors cursor-pointer"
              >
                <option value="">Select Experience</option>
                <option value="0">Fresher (0 - 1 Years)</option>
                <option value="1">1 - 2 Years</option>
                <option value="3">3 - 5 Years</option>
                <option value="5">5+ Years</option>
              </select>
              {errors.workExperience && (
                <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3 inline shrink-0" />
                  <span>{errors.workExperience}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                Employee / Work ID (Optional)
              </label>
              <input
                type="text"
                name="workId"
                value={formData.workId}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                placeholder="e.g. EMP-9921"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                Office / Work Address
              </label>
              <textarea
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleChange}
                rows="3"
                className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors resize-none"
                placeholder="Enter office building address..."
              />
              {errors.officeAddress && (
                <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3 inline shrink-0" />
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

