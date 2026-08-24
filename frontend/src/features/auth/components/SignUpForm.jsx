import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ArrowRight, Check, Home, Building, Sparkles, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import Cookies from "js-cookie";

// Seeker Components
import SeekerPersonalDetails from "../components/registration/seeker/PersonalDetails";
import SeekerOccupationDetails from "../components/registration/seeker/OccupationDetails";
import SeekerVerification from "../components/registration/seeker/Verification";

// Provider Components
import ProviderPersonalDetails from "../components/registration/provider/PersonalDetails";
import ProviderVerification from "../components/registration/provider/Verification";

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

    // Clear error for this field if it exists
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
      setMessage("Processing registration...");

      const submissionData = removeEmptyFields({
        ...formData,
        userType: userType
      });

      if (submissionData.houseRules) {
        submissionData.houseRules = Array.isArray(submissionData.houseRules) 
          ? submissionData.houseRules 
          : [submissionData.houseRules];
      }

      const endpoint = userType === "seeker" ? 
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register/seeker` :
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register/provider`;

      try {
        const response = await axios.post(endpoint, submissionData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.status === 200 || response.status === 201) {
          setMessage("Registration successful! Redirecting to login...");
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
            <div className="space-y-1 pb-4 border-b border-white/10">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Select Account Protocol
              </h3>
              <p className="text-xs text-neutral-400">
                Choose your registration profile to access customized tooling.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => handleUserTypeChange("seeker")}
                className="group p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/15 hover:border-red-600/50 hover:bg-[#141414] transition-all flex flex-col justify-between text-left space-y-6 cursor-pointer shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600/15 border border-red-600/30 text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white transition-all">
                    <Home className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    Resident / Seeker
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Search and reserve paying guest accommodations, private studios, and verified student suites.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white">
                  <span>Register as Seeker</span>
                  <ArrowRight className="h-4 w-4 text-[#E50914] group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleUserTypeChange("provider")}
                className="group p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/15 hover:border-red-600/50 hover:bg-[#141414] transition-all flex flex-col justify-between text-left space-y-6 cursor-pointer shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600/15 border border-red-600/30 text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white transition-all">
                    <Building className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    Host / Property Operator
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Publish building listings, manage tenant leases, and track digital payments.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white">
                  <span>Register as Host</span>
                  <ArrowRight className="h-4 w-4 text-[#E50914] group-hover:translate-x-1 transition-transform" />
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
    <div className="bg-[#050505] text-white min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-4 sm:px-8 relative overflow-hidden select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/10 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/10 w-[500px] h-[500px] bg-red-950/15 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="w-full max-w-3xl relative z-10">
        
        {/* Main Wizard Card */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-2xl space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-80" />
          
          {/* Header & Step Progress Bar */}
          {userType && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                <span className="text-[#E50914]">
                  Step {step} of {totalSteps}
                </span>
                <span>{calculateProgress()}% Complete</span>
              </div>
              <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-[#E50914] shadow-[0_0_10px_#E50914] transition-all duration-300 rounded-full"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            {renderStep()}

            {/* Error / Success Toast Message */}
            {message && (
              <div
                className={`p-3.5 rounded-lg text-xs font-medium flex items-center gap-2.5 border backdrop-blur-md transition-all ${
                  message.includes("successful")
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                    : "bg-red-500/10 text-red-300 border-red-500/30"
                }`}
              >
                {message.includes("successful") ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 text-[#E50914]" />
                )}
                <span>{message}</span>
              </div>
            )}

            {/* Navigation Buttons */}
            {step > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-neutral-300 hover:text-white bg-black/60 hover:bg-black/90 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E50914] hover:bg-[#b80710] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all ml-auto cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRegister}
                    className="flex items-center gap-2 px-7 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all ml-auto cursor-pointer"
                  >
                    <span>Complete Registration</span>
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Login Link if Step 1 */}
            {step === 1 && (
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-xs text-neutral-400">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-bold text-[#E50914] hover:text-red-400 transition-colors"
                  >
                    Sign in here
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