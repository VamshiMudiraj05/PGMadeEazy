import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ArrowRight, Check, Home, Building, Sparkles, UserCircle2, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
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
            <div className="space-y-1 pb-4 border-b border-[#1E1E26]">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Select Account Protocol
              </h3>
              <p className="text-xs text-[#7A7A85]">
                Choose your registration profile to access customized tooling.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => handleUserTypeChange("seeker")}
                className="group p-6 sm:p-8 rounded-sm bg-[#121217] border border-[#1E1E26] hover:border-[#383848] transition-all flex flex-col justify-between text-left space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#181820] border border-[#22222A] text-[#FF5A36]">
                    <Home className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#FF5A36] transition-colors">
                    Resident / Seeker
                  </h4>
                  <p className="text-xs text-[#9E9EA7] leading-relaxed">
                    Search and reserve paying guest accommodations, private studios, and verified student suites.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1E1E26] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#FAFAFA]">
                  <span>Register as Seeker</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#FF5A36]" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleUserTypeChange("provider")}
                className="group p-6 sm:p-8 rounded-sm bg-[#121217] border border-[#1E1E26] hover:border-[#383848] transition-all flex flex-col justify-between text-left space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#181820] border border-[#22222A] text-white">
                    <Building className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#FF5A36] transition-colors">
                    Host / Property Operator
                  </h4>
                  <p className="text-xs text-[#9E9EA7] leading-relaxed">
                    Publish building listings, manage tenant leases, and track digital payments.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1E1E26] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#FAFAFA]">
                  <span>Register as Host</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#FF5A36]" />
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
    <div className="bg-[#0B0B0E] text-[#FAFAFA] min-h-[calc(100vh-140px)] flex items-center justify-center py-16 px-4 sm:px-8">
      <div className="w-full max-w-3xl">
        
        {/* Main Wizard Card */}
        <div className="p-8 sm:p-12 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-8">
          
          {/* Header & Step Progress Bar */}
          {userType && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#7A7A85]">
                <span className="text-[#FF5A36]">
                  Step {step} of {totalSteps}
                </span>
                <span>{calculateProgress()}% Complete</span>
              </div>
              <div className="h-1 w-full bg-[#1E1E26] rounded-xs overflow-hidden">
                <div
                  className="h-full bg-[#FF5A36] transition-all duration-300 rounded-xs"
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
                className={`p-3 rounded-sm text-xs font-medium flex items-center gap-2 border ${
                  message.includes("successful")
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                    : "bg-red-500/10 text-red-400 border-red-500/25"
                }`}
              >
                {message.includes("successful") ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0" />
                )}
                <span>{message}</span>
              </div>
            )}

            {/* Navigation Buttons */}
            {step > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-[#1E1E26]">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-[#22222A] text-[#9E9EA7] hover:text-white bg-[#0B0B0E] text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#FF5A36] hover:bg-[#E54B28] text-white text-xs font-bold uppercase tracking-wider transition-colors ml-auto"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRegister}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors ml-auto"
                  >
                    <span>Complete Registration</span>
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Login Link if Step 1 */}
            {step === 1 && (
              <div className="text-center pt-4 border-t border-[#1E1E26]">
                <p className="text-xs text-[#7A7A85]">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-bold text-[#FF5A36] hover:text-[#E54B28] transition-colors"
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