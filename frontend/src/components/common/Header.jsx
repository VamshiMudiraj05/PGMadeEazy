import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, UserCircle, ArrowUpRight } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full border-b border-[#26292d] bg-[#181a1d]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.04),0_8px_18px_-12px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        
        {/* Brand / Logo - Solari Split-Flap Emblem */}
        <NavLink
          to="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-95"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-[3px] bg-[#0b0b0d] border border-[#34373c] text-[#ffb000] shadow-sm font-['Big_Shoulders_Display'] text-lg font-bold">
            PG
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-[0.14em] text-[#f2f2f2] uppercase font-['Big_Shoulders_Display']">
              PG MADE <span className="text-[#ffb000]">EAZY</span>
            </span>
          </div>
        </NavLink>

        {/* Center Nav Links - Restored Classic Options with Solari Styling */}
        <nav className="hidden md:flex items-center gap-8">
          {user ? (
            <NavLink
              to={getDashboardPath()}
              className={({ isActive }) =>
                `flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors font-['Barlow_Semi_Condensed'] ${
                  isActive
                    ? 'text-[#ffb000]'
                    : 'text-[#a7aaaf] hover:text-[#f2f2f2]'
                }`
              }
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-[#ffb000]" />
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
                  `text-xs font-semibold tracking-[0.18em] uppercase transition-colors font-['Barlow_Semi_Condensed'] ${
                    isActive ? 'text-[#ffb000]' : 'text-[#a7aaaf] hover:text-[#f2f2f2]'
                  }`
                }
              >
                Explore
              </NavLink>
              <NavLink
                to="/how-it-works"
                className={({ isActive }) =>
                  `text-xs font-semibold tracking-[0.18em] uppercase transition-colors font-['Barlow_Semi_Condensed'] ${
                    isActive ? 'text-[#ffb000]' : 'text-[#a7aaaf] hover:text-[#f2f2f2]'
                  }`
                }
              >
                How It Works
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-xs font-semibold tracking-[0.18em] uppercase transition-colors font-['Barlow_Semi_Condensed'] ${
                    isActive ? 'text-[#ffb000]' : 'text-[#a7aaaf] hover:text-[#f2f2f2]'
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
              <div className="flex items-center gap-2.5 py-1 px-3 rounded-[3px] bg-[#0b0b0d] border border-[#34373c]">
                <UserCircle className="h-4 w-4 text-[#ffb000]" />
                <span className="text-xs font-semibold text-[#f2f2f2] truncate max-w-[120px] font-['Barlow_Semi_Condensed']">
                  {user.name}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ffb000] bg-[#ffb000]/10 border border-[#ffb000]/30 px-1.5 py-0.5 rounded-[2px]">
                  {getUserType(user.userType)}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] text-xs font-semibold text-[#a7aaaf] hover:text-[#ff4b4b] border border-transparent hover:border-[#ff4b4b]/30 transition-all cursor-pointer font-['Barlow_Semi_Condensed'] uppercase tracking-wider"
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
                className="px-3 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#a7aaaf] hover:text-white transition-colors font-['Barlow_Semi_Condensed']"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="btn-solari btn-solari-amber text-xs"
              >
                <span>Get Started</span>
                <span className="chev">
                  <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-[3px] bg-[#0b0b0d] border border-[#34373c] text-[#f2f2f2] hover:border-[#ffb000]/50 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#26292d] bg-[#121316]/98 px-6 py-6 space-y-4">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-[3px] bg-[#0b0b0d] border border-[#34373c]">
                <UserCircle className="h-5 w-5 text-[#ffb000]" />
                <div>
                  <p className="text-sm font-semibold text-white font-['Barlow_Semi_Condensed']">{user.name}</p>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ffb000]">
                    {getUserType(user.userType)}
                  </span>
                </div>
              </div>

              <NavLink
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full p-2.5 rounded-[3px] bg-[#ffb000] text-[#0b0b0d] font-bold text-xs uppercase tracking-wider font-['Barlow_Semi_Condensed']"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Open Dashboard</span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full p-2.5 rounded-[3px] bg-[#0b0b0d] border border-[#34373c] text-[#ff4b4b] text-xs font-semibold uppercase tracking-wider font-['Barlow_Semi_Condensed']"
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
                className="block py-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#a7aaaf] hover:text-white font-['Barlow_Semi_Condensed']"
              >
                Explore
              </NavLink>
              <NavLink
                to="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#a7aaaf] hover:text-white font-['Barlow_Semi_Condensed']"
              >
                How It Works
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#a7aaaf] hover:text-white font-['Barlow_Semi_Condensed']"
              >
                Contact
              </NavLink>
              <div className="pt-4 border-t border-[#26292d] flex flex-col gap-2.5">
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-[3px] text-xs font-bold uppercase tracking-wider text-[#f2f2f2] bg-[#0b0b0d] border border-[#34373c] font-['Barlow_Semi_Condensed']"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-[3px] text-xs font-bold uppercase tracking-wider text-[#0b0b0d] bg-[#ffb000] font-['Barlow_Semi_Condensed']"
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