import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Building2, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck, Sparkles } from "lucide-react";
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
    <div className="relative min-h-[calc(100vh-80px)] bg-[#050505] text-white flex items-center justify-center py-16 px-4 sm:px-8 overflow-hidden select-none">
      {/* Background Cinematic Red Ambient Glows */}
      <div className="absolute top-1/4 left-1/10 w-[550px] h-[550px] bg-red-600/12 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/10 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Subtle Vignette Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.85)_100%)] pointer-events-none -z-10" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Side: Brand Context (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 hidden lg:flex">
          <div className="space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-2xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(229,9,20,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
              <span className="text-[#E50914] font-bold">VERIFIED INFRASTRUCTURE</span>
              <span className="text-white/30">|</span>
              <span>SECURE ACCESS PORTAL</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
                <span>One Account // All Properties</span>
              </div>
              <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
                One Account For <span className="text-[#E50914]">Verified Stays</span> & Management.
              </h1>
              <p className="text-sm text-neutral-400 leading-relaxed pt-2">
                Instant digital reservation logs, direct landlord communication channels, and audited property specifications.
              </p>
            </div>

            {/* Feature Preview Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-neutral-900/90 to-black/90 border border-neutral-800/80 backdrop-blur-xl space-y-3 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 rounded-full blur-xl pointer-events-none group-hover:bg-red-600/20 transition-all duration-500" />
              
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 font-mono text-[10px] font-bold border border-red-600/30">
                  VERIFIED AUDIT
                </span>
                <span className="text-neutral-500 font-mono text-[11px]">100% DIRECT</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-600/20 border border-red-600/40 flex items-center justify-center text-[#E50914]">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Instant Rental Verification</h4>
                  <p className="text-[11px] text-neutral-400">Zero brokerage & certified PG inventory</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                <div className="bg-[#E50914] h-full w-[85%] rounded-full shadow-[0_0_10px_#E50914]" />
              </div>
            </div>

          </div>

          {/* Bottom Highlights */}
          <div className="pt-6 border-t border-neutral-800/80 space-y-2.5 text-xs text-neutral-400">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
              <span className="text-neutral-300 font-medium">0% Brokerage Guarantee</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="text-neutral-300 font-medium">End-to-End Encrypted Session</span>
            </div>
          </div>
        </div>

        {/* Right Side: Glassmorphic Sign In Card (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#141414]/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-6 relative overflow-hidden">
          
          {/* Subtle Top Red Edge Highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-80" />

          <div className="space-y-1 pb-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Account Sign In
              </h2>
              <span className="text-[11px] font-mono uppercase tracking-wider text-red-500 font-bold px-2.5 py-1 rounded bg-red-600/10 border border-red-600/30">
                PORTAL ACCESS
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Enter your credentials to access your dashboard.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/15 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all duration-200"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-black/60 border border-white/15 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="h-3.5 w-3.5 inline shrink-0 text-[#E50914]" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Feedback Message */}
            {message && (
              <div
                className={`p-3.5 rounded-lg text-xs font-medium flex items-center gap-2.5 border backdrop-blur-md transition-all ${
                  message.includes('successful')
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-red-500/10 text-red-300 border-red-500/30'
                }`}
              >
                {message.includes('successful') ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 text-[#E50914]" />
                )}
                <span>{message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.email || !formData.password}
              className="w-full py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider text-white bg-[#E50914] hover:bg-[#b80710] shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_30px_rgba(229,9,20,0.7)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </button>

            {/* Register Link */}
            <div className="pt-3 text-center border-t border-white/10">
              <p className="text-xs text-neutral-400">
                Don't have an account yet?{' '}
                <Link
                  to="/register"
                  className="font-bold text-[#E50914] hover:text-red-400 transition-colors inline-flex items-center gap-1 hover:underline"
                >
                  Create free account
                  <ArrowRight className="h-3 w-3 inline" />
                </Link>
              </p>
            </div>

            <div className="text-center">
              <p className="text-[11px] text-neutral-500">
                Protected by encrypted authentication & secure session management.
              </p>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default SignInForm;