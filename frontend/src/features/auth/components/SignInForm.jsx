import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Building2, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import Cookies from 'js-cookie';

const SignInForm = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const userData = Cookies.get('user');
    if (userData) {
      const userDataObj = JSON.parse(userData);
      // Redirect based on user type
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
          break;
      }
    }

    // Prevent back navigation when logged in
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

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
    <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-orange-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Glass Card Container */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-zinc-800/80 glow-orange-sm backdrop-blur-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-md shadow-orange-500/30 text-white mb-4">
              <Building2 className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Sign in to manage your PG bookings & listings
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 inline" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 inline" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Feedback Message */}
            {message && (
              <div
                className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 border ${
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
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Register Link */}
            <div className="text-center pt-2">
              <p className="text-xs sm:text-sm text-zinc-400">
                Don't have an account yet?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-orange-400 hover:text-orange-300 transition-colors inline-flex items-center gap-1"
                >
                  Create one for free
                  <Sparkles className="h-3 w-3 inline" />
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