import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ArrowRight, Check, Home, Building, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import Cookies from "js-cookie";

// Seeker Components
import SeekerPersonalDetails from "../components/registration/seeker/PersonalDetails";
import SeekerOccupationDetails from "../components/registration/seeker/OccupationDetails";
import SeekerVerification from "../components/registration/seeker/Verification";

// Provider Components
import ProviderPersonalDetails from "../components/registration/provider/PersonalDetails";
import ProviderVerification from "../components/registration/provider/Verification";

// Reusable Split-Flap Character Component
function FlapChar({ char, size = "16px" }) {
  const displayChar = char === " " ? "\u00A0" : char.toUpperCase();
  const isSpecial = char === "+" || char === "-" || char === "/" || char === ":" || char === ".";

  return (
    <span 
      className={`c ${isSpecial ? "op" : ""}`}
      style={{ "--cw": size }}
      aria-hidden="true"
    >
      <i className="u">{displayChar}</i>
      <i className="l">{displayChar}</i>
    </span>
  );
}

// Reusable Split-Flap Word/String Component
function FlapWord({ text, size = "16px", colorClass = "text-[#f2f2f2]" }) {
  const chars = String(text).toUpperCase().split("");
  return (
    <span className={`fl ${colorClass}`}>
      {chars.map((ch, idx) => (
        <FlapChar key={idx} char={ch} size={size} />
      ))}
    </span>
  );
}

const MultiStepRegistration = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const activeUser = user || (Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null);
    if (activeUser) {
      const type = activeUser.userType?.replace('ROLE_', '').toUpperCase();
      if (type === 'ADMIN') {
        navigate('/admin-dashboard', { replace: true });
      } else if (type === 'PROVIDER') {
        navigate('/provider-dashboard', { replace: true });
      } else {
        navigate('/seeker-dashboard', { replace: true });
      }
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    // Personal Information (Common)
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    currentCity: "",

    // Seeker specific fields
    preferredLocation: "",
    occupationType: "",
    // Student fields
    collegeName: "",
    courseName: "",
    yearOfStudy: "",
    collegeAddress: "",
    studentId: "",
    // Professional fields
    companyName: "",
    jobRole: "",
    workExperience: "",
    officeAddress: "",
    workId: "",

    // Verification fields (Common)
    govtIdType: "",
    govtIdNumber: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    termsAgreed: false,

    // Common field
    userType: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Calculate total steps based on user type
  const totalSteps = userType === "seeker" ? 4 : userType === "provider" ? 3 : 1;

  // Calculate progress percentage
  const calculateProgress = () => {
    return Math.round((step / totalSteps) * 100);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    const commonFields = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      currentCity: formData.currentCity,
      govtIdType: formData.govtIdType,
      govtIdNumber: formData.govtIdNumber,
      emergencyContactName: formData.emergencyContactName,
      emergencyContactNumber: formData.emergencyContactNumber,
      termsAgreed: formData.termsAgreed,
      userType: type
    };
    setFormData({ ...formData, ...commonFields });
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 2) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Valid email is required";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must be 10 digits";
      }
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.currentCity.trim()) newErrors.currentCity = "Current city is required";
    }

    if (step === 3) {
      if (userType === "seeker") {
        if (!formData.occupationType) newErrors.occupationType = "Please select occupation type";
        
        if (formData.occupationType === "student") {
          if (!formData.collegeName.trim()) newErrors.collegeName = "College name is required";
          if (!formData.courseName.trim()) newErrors.courseName = "Course name is required";
          if (!formData.yearOfStudy) newErrors.yearOfStudy = "Year of study is required";
          if (!formData.collegeAddress.trim()) newErrors.collegeAddress = "College address is required";
        } else if (formData.occupationType === "professional") {
          if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
          if (!formData.jobRole.trim()) newErrors.jobRole = "Job role is required";
          if (!formData.workExperience) newErrors.workExperience = "Work experience is required";
          if (!formData.officeAddress.trim()) newErrors.officeAddress = "Office address is required";
        }
      } else if (userType === "provider") {
        if (!formData.govtIdType) newErrors.govtIdType = "Government ID type is required";
        if (!formData.govtIdNumber) newErrors.govtIdNumber = "Government ID number is required";
        if (!formData.emergencyContactName) newErrors.emergencyContactName = "Emergency contact name is required";
        if (!formData.emergencyContactNumber) newErrors.emergencyContactNumber = "Emergency contact number is required";
        if (!formData.termsAgreed) newErrors.termsAgreed = "You must agree to the terms";
      }
    }

    if (step === 4 && userType === "seeker") {
      if (!formData.govtIdType) newErrors.govtIdType = "Government ID type is required";
      if (!formData.govtIdNumber) newErrors.govtIdNumber = "Government ID number is required";
      if (!formData.emergencyContactName) newErrors.emergencyContactName = "Emergency contact name is required";
      if (!formData.emergencyContactNumber) newErrors.emergencyContactNumber = "Emergency contact number is required";
      if (!formData.termsAgreed) newErrors.termsAgreed = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeEmptyFields = (data) => {
    return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== "" && value !== null));
  };

  const handleRegister = async () => {
    if (!validateStep()) {
      return;
    }

    try {
      setMessage("Processing registration in terminal registry...");

      const submissionData = removeEmptyFields({
        ...formData,
        userType: userType
      });

      if (submissionData.houseRules) {
        submissionData.houseRules = Array.isArray(submissionData.houseRules) 
          ? submissionData.houseRules 
          : [submissionData.houseRules];
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const endpoint = userType === "seeker" ? 
        `${apiBaseUrl}/api/auth/register/seeker` :
        `${apiBaseUrl}/api/auth/register/provider`;

      try {
        const response = await axios.post(endpoint, submissionData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.status === 200 || response.status === 201) {
          setMessage("Registration approved! Redirecting to login terminal...");
          setTimeout(() => {
            navigate("/login");
          }, 1200);
        } else {
          setMessage("Registration failed. Please verify input data.");
        }
      } catch (error) {
        console.error('Registration error:', error);
        setMessage(
          error.response?.data?.message || 
          error.response?.data || 
          (error.response?.status === 409 ? 'Email or phone number already registered' : 'Registration failed. Please try again.')
        );
      }
    } catch (error) {
      setMessage(error.message || "Registration failed. Please try again.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-1 pb-4 border-b border-[#202226]">
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.14em] text-white font-['Big_Shoulders_Display']">
                SELECT ACCOUNT PROTOCOL
              </h3>
              <p className="text-xs text-[#a7aaaf]">
                Choose your registration profile to configure access to the verified student PG network.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Option 1: Seeker / Student */}
              <button
                type="button"
                onClick={() => handleUserTypeChange("seeker")}
                className="group p-6 rounded-[3px] bg-[#0e0f11] border border-[#2a2d31] hover:border-[#ffb000] transition-colors flex flex-col justify-between text-left space-y-6 cursor-pointer shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#ffb000] group-hover:bg-[#ffb000] group-hover:text-[#0b0b0d] transition-colors">
                    <Home className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-[0.1em] font-['Big_Shoulders_Display'] group-hover:text-[#ffb000] transition-colors">
                    Student / Seeker
                  </h4>
                  <p className="text-xs text-[#a7aaaf] leading-relaxed">
                    Search and reserve paying guest accommodations (PGs), sharing student beds, and verified hostel suites with mess meals.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#202226] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white">
                  <span>Register as Student</span>
                  <ArrowRight className="h-4 w-4 text-[#ffb000] group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Option 2: Provider / PG Host */}
              <button
                type="button"
                onClick={() => handleUserTypeChange("provider")}
                className="group p-6 rounded-[3px] bg-[#0e0f11] border border-[#2a2d31] hover:border-[#ffb000] transition-colors flex flex-col justify-between text-left space-y-6 cursor-pointer shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#ffb000] group-hover:bg-[#ffb000] group-hover:text-[#0b0b0d] transition-colors">
                    <Building className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-[0.1em] font-['Big_Shoulders_Display'] group-hover:text-[#ffb000] transition-colors">
                    Host / PG Warden
                  </h4>
                  <p className="text-xs text-[#a7aaaf] leading-relaxed">
                    List student hostels and PG rooms, manage bed occupancy, verify on-site compliance, and collect digital rents.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#202226] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white">
                  <span>Register as PG Host</span>
                  <ArrowRight className="h-4 w-4 text-[#ffb000] group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

            </div>
          </div>
        );
      case 2:
        return userType === "seeker" ? (
          <SeekerPersonalDetails formData={formData} handleChange={handleChange} errors={errors} />
        ) : (
          <ProviderPersonalDetails formData={formData} handleChange={handleChange} errors={errors} />
        );
      case 3:
        return userType === "seeker" ? (
          <SeekerOccupationDetails formData={formData} handleChange={handleChange} errors={errors} />
        ) : (
          <ProviderVerification formData={formData} handleChange={handleChange} errors={errors} />
        );
      case 4:
        return userType === "seeker" ? (
          <SeekerVerification formData={formData} handleChange={handleChange} errors={errors} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#1f2226] text-[#f2f2f2] min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-8 relative font-['Barlow_Semi_Condensed']">
      <div className="w-full max-w-3xl space-y-8">
        
        {/* Top Split-Flap Board Header */}
        <div className="board">
          <div className="board-head">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-none bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                ONBOARDING REGISTRY // PROTOCOL
              </h2>
            </div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[#a7aaaf]">
              <span>VERIFICATION: <b className="text-emerald-400">MANDATORY</b></span>
              <span>BROKERAGE: <b className="text-[#ffb000]">0% STRICT</b></span>
            </div>
          </div>

          <div className="py-4 sm:py-6">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <FlapWord text="NEW" size="clamp(24px, 3.8vw, 44px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="REGISTRATION." size="clamp(24px, 3.8vw, 44px)" colorClass="text-[#ffb000]" />
            </div>
          </div>
        </div>

        {/* Main Wizard Board */}
        <div className="board space-y-6">
          
          {/* Header & Step Progress Bar */}
          {userType && (
            <div className="space-y-2 pb-4 border-b border-[#202226]">
              <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-[#a7aaaf]">
                <span className="text-[#ffb000]">
                  STAGE {step} OF {totalSteps}
                </span>
                <span>{calculateProgress()}% COMPLETE</span>
              </div>
              <div className="h-1.5 w-full bg-[#0b0b0d] rounded-none overflow-hidden border border-[#34373c]">
                <div
                  className="h-full bg-[#ffb000] shadow-[0_0_8px_#ffb000] transition-all duration-300"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {renderStep()}

            {/* Error / Success Toast Message */}
            {message && (
              <div
                className={`p-3 rounded-[2px] text-xs font-mono uppercase tracking-wider flex items-center gap-2 border ${
                  message.includes("approved") || message.includes("successful")
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                    : "bg-red-500/10 text-red-300 border-red-500/30"
                }`}
              >
                {message.includes("approved") || message.includes("successful") ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                )}
                <span>{message}</span>
              </div>
            )}

            {/* Navigation Buttons */}
            {step > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-[#202226]">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-solari btn-solari-steel text-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>PREVIOUS STAGE</span>
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-solari btn-solari-amber text-xs ml-auto"
                  >
                    <span>NEXT STAGE</span>
                    <span className="chev">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRegister}
                    className="btn-solari btn-solari-amber text-xs ml-auto bg-emerald-500 border-emerald-500 text-black hover:bg-emerald-400"
                  >
                    <span>COMPLETE REGISTRATION</span>
                    <span className="chev">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  </button>
                )}
              </div>
            )}

            {/* Login Link if Step 1 */}
            {step === 1 && (
              <div className="text-center pt-4 border-t border-[#202226]">
                <p className="text-xs text-[#a7aaaf] uppercase tracking-wider">
                  Already have an active account?{' '}
                  <Link
                    to="/login"
                    className="font-bold text-[#ffb000] hover:text-[#ffc233] transition-colors ml-1"
                  >
                    SIGN IN HERE →
                  </Link>
                </p>
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
};

export default MultiStepRegistration;