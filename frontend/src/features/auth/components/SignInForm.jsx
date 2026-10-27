import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Building2, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import Cookies from 'js-cookie';

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

const SignInForm = () => {
  const navigate = useNavigate();
  const { login, loading, user } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      setMessage("Authenticating terminal credentials...");
      
      const result = await login(formData.email, formData.password);
      
      if (result) {
        setMessage("Authentication approved. Transferring to terminal hub...");
        
        const userData = Cookies.get('user');
        if (!userData) {
          throw new Error('User data not found');
        }

        const userDataObj = JSON.parse(userData);
        
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
        }, 1000);
      } else {
        setMessage("Invalid credentials. Please verify your email and password.");
      }

    } catch (err) {
      setMessage(err.message || "Authentication failed. Please verify credentials.");
    }
  };

  return (
    <div className="bg-[#1f2226] text-[#f2f2f2] min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-8 relative font-['Barlow_Semi_Condensed']">
      <div className="w-full max-w-5xl space-y-8">
        
        {/* Top Split-Flap Board Header */}
        <div className="board">
          <div className="board-head">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-none bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                TERMINAL GATEWAY // AUTHENTICATION
              </h2>
            </div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[#a7aaaf]">
              <span>PROTOCOL: <b className="text-emerald-400">ENCRYPTED</b></span>
              <span>NETWORK: <b className="text-[#ffb000]">DIRECT PG DISPATCH</b></span>
            </div>
          </div>

          <div className="py-4 sm:py-6">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <FlapWord text="SIGN" size="clamp(24px, 3.8vw, 44px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="IN." size="clamp(24px, 3.8vw, 44px)" colorClass="text-[#ffb000]" />
            </div>
          </div>
        </div>

        {/* Main Two-Column Gateway Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Context Casing (5 cols) */}
          <div className="lg:col-span-5 board flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="pb-3 border-b border-[#202226]">
                <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#ffb000] font-semibold">
                  ACCESS CREDENTIALS
                </span>
                <h3 className="text-2xl font-bold tracking-[0.08em] uppercase text-white font-['Big_Shoulders_Display'] mt-1">
                  STUDENT & HOST PORTAL
                </h3>
                <p className="text-xs text-[#a7aaaf] mt-1 leading-relaxed">
                  Single verified access point for paying guest reservations, mess food meal subscriptions, and hostel operations.
                </p>
              </div>

              {/* Status Spec Readouts */}
              <div className="space-y-3">
                <div className="p-3 bg-[#0e0f11] border border-[#2a2d31] rounded-[2px] flex items-center justify-between text-xs">
                  <span className="text-[#a7aaaf] uppercase tracking-wider">Brokerage Rate</span>
                  <span className="font-bold text-[#ffb000] font-mono">0.00% GUARANTEED</span>
                </div>
                <div className="p-3 bg-[#0e0f11] border border-[#2a2d31] rounded-[2px] flex items-center justify-between text-xs">
                  <span className="text-[#a7aaaf] uppercase tracking-wider">Deposit Escrow</span>
                  <span className="font-bold text-white font-mono">1-MONTH STANDARD</span>
                </div>
                <div className="p-3 bg-[#0e0f11] border border-[#2a2d31] rounded-[2px] flex items-center justify-between text-xs">
                  <span className="text-[#a7aaaf] uppercase tracking-wider">Mess & WiFi Audit</span>
                  <span className="font-bold text-emerald-400 font-mono">100% VERIFIED</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#202226] text-xs uppercase tracking-[0.14em] text-[#a7aaaf] flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <span>SECURE SESSION</span>
              </span>
              <span className="font-mono text-[#5b5e63]">PORT 5173</span>
            </div>
          </div>

          {/* Right Form Console (7 cols) */}
          <div className="lg:col-span-7 board">
            <div className="board-head">
              <h3 className="text-xl font-bold tracking-[0.14em] uppercase text-white font-['Big_Shoulders_Display']">
                ENTER ACCOUNT IDENTIFIERS
              </h3>
              <span className="text-xs uppercase tracking-[0.14em] text-[#ffb000] font-mono">
                GATE // LOGIN
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 pt-3">
              
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#a7aaaf]">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5b5e63] pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="STUDENT@COLLEGE.EDU"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#0e0f11] border border-[#34373c] rounded-[2px] text-xs text-white placeholder-[#5b5e63] focus:outline-none focus:border-[#ffb000] font-mono uppercase"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1 font-mono">
                    <AlertCircle className="h-3.5 w-3.5 inline shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#a7aaaf]">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5b5e63] pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 bg-[#0e0f11] border border-[#34373c] rounded-[2px] text-xs text-white placeholder-[#5b5e63] focus:outline-none focus:border-[#ffb000] font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5b5e63] hover:text-white transition-colors cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1 font-mono">
                    <AlertCircle className="h-3.5 w-3.5 inline shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Feedback Message */}
              {message && (
                <div
                  className={`p-3 rounded-[2px] text-xs font-mono uppercase tracking-wider flex items-center gap-2 border ${
                    message.includes('approved') || message.includes('successful')
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-red-500/10 text-red-300 border-red-500/30'
                  }`}
                >
                  {message.includes('approved') || message.includes('successful') ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  )}
                  <span>{message}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.email || !formData.password}
                className="w-full btn-solari btn-solari-amber justify-center text-center py-3 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span>AUTHENTICATING CREDENTIALS...</span>
                ) : (
                  <>
                    <span>SIGN IN TO DASHBOARD</span>
                    <span className="chev">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </>
                )}
              </button>

              {/* Register Callout */}
              <div className="pt-3 text-center border-t border-[#202226]">
                <p className="text-xs text-[#a7aaaf] uppercase tracking-wider">
                  Don't have an active account yet?{' '}
                  <Link
                    to="/register"
                    className="font-bold text-[#ffb000] hover:text-[#ffc233] transition-colors ml-1"
                  >
                    REGISTER FREE // STUDENT & HOST →
                  </Link>
                </p>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SignInForm;