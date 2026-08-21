import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Building2, Menu, X, LogOut, LayoutDashboard, UserCircle, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getUserType = (userType) => {
    return userType?.replace('ROLE_', '').toLowerCase();
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    const type = getUserType(user.userType);
    if (type === 'seeker') return '/seeker-dashboard';
    if (type === 'provider') return '/provider-dashboard';
    return '/admin-dashboard';
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1c1c21] bg-black/90 backdrop-blur-2xl transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
        
        {/* Brand / Logo */}
        <NavLink
          to="/"
          className="group flex items-center gap-3.5 transition-transform duration-200 hover:opacity-90"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF6100] text-black shadow-lg shadow-[#FF6100]/25 transition-transform duration-200 group-hover:scale-105">
            <Building2 className="h-5 w-5 text-black stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white uppercase">
                PG Made Eazy
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6100] animate-ping" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888]">
              Verified 360° Network
            </span>
          </div>
        </NavLink>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0d0d10] p-1.5 rounded-full border border-[#1f1f25]">
          {user ? (
            <NavLink
              to={getDashboardPath()}
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-[#FF6100] text-black shadow-md shadow-[#FF6100]/30'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[#1a1a20]'
                }`
              }
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>
                {getUserType(user.userType) === 'seeker'
                  ? 'Seeker Hub'
                  : getUserType(user.userType) === 'provider'
                  ? 'Host Suite'
                  : 'Admin Command'}
              </span>
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#18181c] text-[#FF6100]'
                      : 'text-[#9e9ea7] hover:text-white hover:bg-[#141417]'
                  }`
                }
              >
                Explore
              </NavLink>
              <NavLink
                to="/how-it-works"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#18181c] text-[#FF6100]'
                      : 'text-[#9e9ea7] hover:text-white hover:bg-[#141417]'
                  }`
                }
              >
                How It Works
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#18181c] text-[#FF6100]'
                      : 'text-[#9e9ea7] hover:text-white hover:bg-[#141417]'
                  }`
                }
              >
                Contact
              </NavLink>
            </>
          )}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 bg-[#0d0d10] py-1.5 px-3 rounded-lg border border-[#1f1f24]">
                <div className="h-7 w-7 rounded bg-[#FF6100]/20 flex items-center justify-center text-[#FF6100]">
                  <UserCircle className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white truncate max-w-[110px]">
                    {user.name}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#FF6100]">
                    {getUserType(user.userType)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-[#a1a1aa] hover:text-red-400 bg-[#0d0d10] hover:bg-red-500/10 border border-[#1f1f24] hover:border-red-500/30 transition-all duration-200"
                title="Log out"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Exit</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider text-[#e4e4e7] hover:text-white hover:bg-[#111114] border border-transparent hover:border-[#222227] transition-all duration-200"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="group flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider text-black bg-[#FF6100] hover:bg-[#ff7722] shadow-lg shadow-[#FF6100]/25 hover:shadow-[#FF6100]/40 transition-all duration-200 active:scale-[0.98]"
              >
                <span>Get Started</span>
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#0d0d10] border border-[#1f1f24] text-white hover:border-[#FF6100]/60 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1c1c21] bg-black px-5 py-6 space-y-4">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0d0d10] border border-[#1f1f24]">
                <div className="h-9 w-9 rounded bg-[#FF6100]/20 flex items-center justify-center text-[#FF6100]">
                  <UserCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{user.name}</p>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6100]">
                    {getUserType(user.userType)}
                  </span>
                </div>
              </div>

              <NavLink
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-[#FF6100] text-black font-black text-xs uppercase tracking-wider shadow-md shadow-[#FF6100]/25"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Open Portal</span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-[#0d0d10] border border-[#1f1f24] text-red-400 text-xs font-bold uppercase tracking-wider"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#FF6100] hover:bg-[#0d0d10]"
              >
                Explore
              </NavLink>
              <NavLink
                to="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#FF6100] hover:bg-[#0d0d10]"
              >
                How It Works
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#FF6100] hover:bg-[#0d0d10]"
              >
                Contact
              </NavLink>
              <div className="pt-3 border-t border-[#1c1c21] flex flex-col gap-2">
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-lg text-xs font-black uppercase tracking-wider text-white bg-[#0d0d10] border border-[#1f1f24]"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-lg text-xs font-black uppercase tracking-wider text-black bg-[#FF6100] shadow-md shadow-[#FF6100]/25"
                >
                  Get Started
                </NavLink>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}