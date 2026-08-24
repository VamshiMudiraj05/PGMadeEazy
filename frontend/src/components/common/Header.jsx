import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Building2, Menu, X, LogOut, LayoutDashboard, UserCircle, ArrowUpRight } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#050505]/90 backdrop-blur-2xl transition-colors">
      <div className="max-w-7xl mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-8">
        
        {/* Brand / Logo */}
        <NavLink
          to="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E50914] shadow-[0_0_15px_rgba(229,9,20,0.5)] text-white">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white uppercase">
              PG Made <span className="text-[#E50914]">Eazy</span>
            </span>
            <span className="h-2 w-2 rounded-full bg-[#E50914] animate-ping" />
          </div>
        </NavLink>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {user ? (
            <NavLink
              to={getDashboardPath()}
              className={({ isActive }) =>
                `flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'text-[#E50914]'
                    : 'text-neutral-400 hover:text-white'
                }`
              }
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-[#E50914]" />
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
                  `text-xs font-bold tracking-wider uppercase transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`
                }
              >
                Explore
              </NavLink>
              <NavLink
                to="/how-it-works"
                className={({ isActive }) =>
                  `text-xs font-bold tracking-wider uppercase transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`
                }
              >
                How It Works
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-xs font-bold tracking-wider uppercase transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`
                }
              >
                Contact
              </NavLink>
            </>
          )}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 py-1.5 px-3 rounded-full bg-[#141414] border border-white/10">
                <UserCircle className="h-4 w-4 text-[#E50914]" />
                <span className="text-xs font-semibold text-white truncate max-w-[120px]">
                  {user.name}
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-600/15 border border-red-600/30 px-1.5 py-0.5 rounded">
                  {getUserType(user.userType)}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-400 hover:text-red-400 border border-transparent hover:border-red-500/30 transition-all cursor-pointer"
                title="Log out"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Exit</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="group flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#E50914] hover:bg-[#b80710] shadow-[0_0_15px_rgba(229,9,20,0.4)] hover:shadow-[0_0_25px_rgba(229,9,20,0.7)] transition-all duration-300"
              >
                <span>Get Started</span>
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#141414] border border-white/10 text-white hover:border-red-600/40 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#050505]/95 backdrop-blur-2xl px-6 py-6 space-y-4">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#141414] border border-white/10">
                <UserCircle className="h-5 w-5 text-[#E50914]" />
                <div>
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                    {getUserType(user.userType)}
                  </span>
                </div>
              </div>

              <NavLink
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-[#E50914] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(229,9,20,0.4)]"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Open Dashboard</span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-[#141414] border border-white/10 text-red-400 text-xs font-semibold uppercase tracking-wider"
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
                className="block py-2 text-sm font-semibold uppercase tracking-wider text-neutral-300 hover:text-white"
              >
                Explore
              </NavLink>
              <NavLink
                to="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold uppercase tracking-wider text-neutral-300 hover:text-white"
              >
                How It Works
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold uppercase tracking-wider text-neutral-300 hover:text-white"
              >
                Contact
              </NavLink>
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#141414] border border-white/10"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#E50914] shadow-[0_0_15px_rgba(229,9,20,0.4)]"
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