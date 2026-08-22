import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Building2, ArrowRight, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import Cookies from 'js-cookie';

const SignInForm = () => {
  const navigate = useNavigate();
  const { login, loading, user } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email address is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setMessage("Authenticating credentials...");
      
      const result = await login(formData.email, formData.password);
      
      if (result) {
        setMessage("Login successful! Transferring to dashboard...");
        
        // Get user type from cookies
        const userData = Cookies.get('user');
        if (!userData) {
          throw new Error('User data not found');
        }

        const userDataObj = JSON.parse(userData);
        
        // Add a small delay before navigation for smooth UX
        setTimeout(() => {
          switch(userDataObj.userType) {
            case 'ROLE_ADMIN':
              navigate('/admin-dashboard', { replace: true });
              break;
            case 'ROLE_PROVIDER':
              navigate('/provider-dashboard', { replace: true });
              break;
            case 'ROLE_SEEKER':
              navigate('/seeker-dashboard', { replace: true });
              break;
            default:
              throw new Error('Invalid user type');
          }
        }, 1200);
      } else {
        setMessage("Invalid credentials. Please verify your email and password.");
      }

    } catch (err) {
      setMessage(err.message || "Login failed. Please check your credentials.");
      console.error('Login error:', err);
    }
  };

  return (
    <div className="bg-[#0B0B0E] text-[#FAFAFA] min-h-[calc(100vh-140px)] flex items-center justify-center py-16 px-4 sm:px-8">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Art-Directed Editorial Brand Context (5 cols) */}
        <div className="lg:col-span-5 p-8 rounded-sm bg-[#121217] border border-[#1E1E26] flex flex-col justify-between space-y-8 hidden lg:flex">
          <div className="space-y-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#FF5A36] text-white">
              <Building2 className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A36]">
              Verified Infrastructure
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
              One account for verified stays and property administration.
            </h2>
            <p className="text-xs text-[#9E9EA7] leading-relaxed">
              Instant digital reservation logs, direct landlord communication channels, and audited property specs.
            </p>
          </div>

          <div className="pt-6 border-t border-[#1E1E26] space-y-2 text-xs text-[#7A7A85]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]" />
              <span>0% Brokerage Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Encrypted Authentication</span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Form Console (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-6">
          
          <div className="space-y-1 pb-4 border-b border-[#1E1E26]">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Account Sign In
            </h1>
            <p className="text-xs text-[#7A7A85]">
              Enter your credentials to access your dashboard.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3 inline shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7A85] pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A85] hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3 inline shrink-0" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Feedback Message */}
            {message && (
              <div
                className={`p-3 rounded-sm text-xs font-medium flex items-center gap-2 border ${
                  message.includes('successful')
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                    : 'bg-red-500/10 text-red-400 border-red-500/25'
                }`}
              >
                {message.includes('successful') ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0" />
                )}
                <span>{message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.email || !formData.password}
              className="w-full py-3 rounded-sm font-bold text-xs uppercase tracking-wider text-white bg-[#FF5A36] hover:bg-[#E54B28] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>

            {/* Register Link */}
            <div className="pt-2 text-center border-t border-[#1E1E26]">
              <p className="text-xs text-[#7A7A85]">
                Don't have an account yet?{' '}
                <Link
                  to="/register"
                  className="font-bold text-[#FF5A36] hover:text-[#E54B28] transition-colors inline-flex items-center gap-1"
                >
                  Create free account
                  <ArrowUpRight className="h-3 w-3 inline" />
                </Link>
              </p>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default SignInForm;