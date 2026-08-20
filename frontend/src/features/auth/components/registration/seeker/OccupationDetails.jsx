import PropTypes from 'prop-types';
import { GraduationCap, Briefcase, Building, BookOpen, MapPin, Award, AlertCircle } from 'lucide-react';

const OccupationDetails = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <h3 className="text-xl font-bold text-white">Occupation & Education</h3>
        <p className="text-xs text-zinc-400 mt-1">Select your profile category to customize your PG application</p>
      </div>

      <div className="space-y-6">
        {/* Occupation Type Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3">
            Select Your Current Status
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleChange({
                target: { name: 'occupationType', value: 'student' }
              })}
              className={`p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 text-left ${
                formData.occupationType === 'student'
                  ? 'border-orange-500 bg-orange-500/10 glow-orange-sm text-white shadow-sm'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <div className={`p-3 rounded-xl ${formData.occupationType === 'student' ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-base text-white">Student</div>
                <div className="text-xs text-zinc-400 mt-0.5">Enrolled in college / university</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleChange({
                target: { name: 'occupationType', value: 'professional' }
              })}
              className={`p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 text-left ${
                formData.occupationType === 'professional'
                  ? 'border-orange-500 bg-orange-500/10 glow-orange-sm text-white shadow-sm'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <div className={`p-3 rounded-xl ${formData.occupationType === 'professional' ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-base text-white">Working Professional</div>
                <div className="text-xs text-zinc-400 mt-0.5">Employed in corporate / startup</div>
              </div>
            </button>
          </div>
          {errors.occupationType && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 inline" />
              <span>{errors.occupationType}</span>
            </p>
          )}
        </div>

        {/* Student Specific Fields */}
        {formData.occupationType === 'student' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 animate-in fade-in duration-300">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                College / University Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                placeholder="e.g. IIT Hyderabad, BITS Pilani"
              />
              {errors.collegeName && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 inline" />
                  <span>{errors.collegeName}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Course / Major
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                placeholder="e.g. B.Tech Computer Science"
              />
              {errors.courseName && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 inline" />
                  <span>{errors.courseName}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Current Year of Study
              </label>
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year (Freshman)</option>
                <option value="2">2nd Year (Sophomore)</option>
                <option value="3">3rd Year (Junior)</option>
                <option value="4">4th Year (Senior)</option>
                <option value="5">5th Year (Postgrad / Dual)</option>
              </select>
              {errors.yearOfStudy && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 inline" />
                  <span>{errors.yearOfStudy}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Student ID / Roll No. (Optional)
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                placeholder="e.g. 21CS049"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                College Campus Address
              </label>
              <textarea
                name="collegeAddress"
                value={formData.collegeAddress}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                placeholder="Enter college campus address..."
              />
              {errors.collegeAddress && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 inline" />
                  <span>{errors.collegeAddress}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Professional Specific Fields */}
        {formData.occupationType === 'professional' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 animate-in fade-in duration-300">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Company / Organization
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                placeholder="e.g. Microsoft, Infosys, Deloitte"
              />
              {errors.companyName && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 inline" />
                  <span>{errors.companyName}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Designation / Job Role
              </label>
              <input
                type="text"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                placeholder="e.g. Frontend Developer"
              />
              {errors.jobRole && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 inline" />
                  <span>{errors.jobRole}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Total Experience
              </label>
              <select
                name="workExperience"
                value={formData.workExperience}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              >
                <option value="">Select Experience</option>
                <option value="0">Fresher (0 - 1 Years)</option>
                <option value="1">1 - 2 Years</option>
                <option value="3">3 - 5 Years</option>
                <option value="5">5+ Years</option>
              </select>
              {errors.workExperience && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 inline" />
                  <span>{errors.workExperience}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Employee / Work ID (Optional)
              </label>
              <input
                type="text"
                name="workId"
                value={formData.workId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                placeholder="e.g. EMP-9921"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Office / Work Address
              </label>
              <textarea
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                placeholder="Enter office building address..."
              />
              {errors.officeAddress && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 inline" />
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

