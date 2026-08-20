import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ArrowRight, Check, Home, Building, Sparkles, UserCircle2, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

// Seeker Components
import SeekerPersonalDetails from "../components/registration/seeker/PersonalDetails";
import SeekerOccupationDetails from "../components/registration/seeker/OccupationDetails";
import SeekerVerification from "../components/registration/seeker/Verification";

// Provider Components
import ProviderPersonalDetails from "../components/registration/provider/PersonalDetails";
import ProviderVerification from "../components/registration/provider/Verification";

const MultiStepRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
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
    }
  };

  const prevStep = () => {
    setStep(step - 1);
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
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Choose Account Type
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Select whether you are looking for a PG or managing properties
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => handleUserTypeChange("seeker")}
                className="group relative p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800 hover:border-orange-500 hover:bg-zinc-900 transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1 glow-orange-sm"
              >
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform mb-4">
                  <Home className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                  PG Seeker / Resident
                </h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Looking for verified paying guest accommodations, private rooms, or student hostels.
                </p>
                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-orange-400">
                  <span>Register as Seeker</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleUserTypeChange("provider")}
                className="group relative p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800 hover:border-orange-500 hover:bg-zinc-900 transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1 glow-orange-sm"
              >
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform mb-4">
                  <Building className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                  Property Provider / Host
                </h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  List your PG properties, manage tenant bookings, and receive automated payments.
                </p>
                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-orange-400">
                  <span>Register as Host</span>
                  <ArrowRight className="h-3 w-3" />
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
    <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        
        {/* Main Wizard Card */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-zinc-800/80 glow-orange-sm backdrop-blur-2xl">
          
          {/* Header & Step Progress Bar */}
          {userType && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                <span className="text-orange-400">
                  Step {step} of {totalSteps}
                </span>
                <span>{calculateProgress()}% Complete</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500 rounded-full"
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
                className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 border ${
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
              <div className="flex items-center justify-between pt-6 border-t border-zinc-800/80">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 bg-zinc-900/80 text-sm font-semibold transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-bold shadow-md shadow-orange-500/25 transition-all duration-200 ml-auto hover:-translate-y-0.5"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRegister}
                    className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-500/25 transition-all duration-200 ml-auto hover:-translate-y-0.5"
                  >
                    <span>Complete Registration</span>
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* Login Link if Step 1 */}
            {step === 1 && (
              <div className="text-center pt-4 border-t border-zinc-800/80">
                <p className="text-xs sm:text-sm text-zinc-400">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-semibold text-orange-400 hover:text-orange-300 transition-colors"
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