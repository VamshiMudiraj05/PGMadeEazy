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
    <header className="sticky top-0 z-50 w-full border-b border-[#1E1E26] bg-[#0B0B0E]/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        
        {/* Brand / Logo */}
        <NavLink
          to="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#FF5A36] text-white">
            <Building2 className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold tracking-tight text-white uppercase">
              PG Made Eazy
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A36]" />
          </div>
        </NavLink>

        {/* Center Nav Links - Editorial Typography */}
        <nav className="hidden md:flex items-center gap-8">
          {user ? (
            <NavLink
              to={getDashboardPath()}
              className={({ isActive }) =>
                `flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'text-[#FF5A36]'
                    : 'text-[#9E9EA7] hover:text-white'
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
                  `text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isActive ? 'text-[#FAFAFA]' : 'text-[#9E9EA7] hover:text-[#FAFAFA]'
                  }`
                }
              >
                Explore
              </NavLink>
              <NavLink
                to="/how-it-works"
                className={({ isActive }) =>
                  `text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isActive ? 'text-[#FAFAFA]' : 'text-[#9E9EA7] hover:text-[#FAFAFA]'
                  }`
                }
              >
                Methodology
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isActive ? 'text-[#FAFAFA]' : 'text-[#9E9EA7] hover:text-[#FAFAFA]'
                  }`
                }
              >
                Direct Desk
              </NavLink>
            </>
          )}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 py-1 px-2.5 rounded-sm bg-[#141419] border border-[#1E1E26]">
                <UserCircle className="h-4 w-4 text-[#FF5A36]" />
                <span className="text-xs font-medium text-white truncate max-w-[120px]">
                  {user.name}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#9E9EA7] bg-[#1E1E26] px-1.5 py-0.5 rounded-xs">
                  {getUserType(user.userType)}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium text-[#9E9EA7] hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all"
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
                className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#9E9EA7] hover:text-white transition-colors"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="group flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider text-white bg-[#FF5A36] hover:bg-[#E54B28] transition-all duration-150"
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
            className="p-2 rounded-sm bg-[#121217] border border-[#1E1E26] text-white hover:border-[#FF5A36]/60 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1E1E26] bg-[#0B0B0E] px-6 py-6 space-y-4">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-sm bg-[#121217] border border-[#1E1E26]">
                <UserCircle className="h-5 w-5 text-[#FF5A36]" />
                <div>
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E9EA7]">
                    {getUserType(user.userType)}
                  </span>
                </div>
              </div>

              <NavLink
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full p-2.5 rounded-sm bg-[#FF5A36] text-white font-bold text-xs uppercase tracking-wider"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Open Dashboard</span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full p-2.5 rounded-sm bg-[#121217] border border-[#1E1E26] text-red-400 text-xs font-semibold uppercase tracking-wider"
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
                className="block py-2 text-sm font-semibold uppercase tracking-wider text-[#9E9EA7] hover:text-white"
              >
                Explore
              </NavLink>
              <NavLink
                to="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold uppercase tracking-wider text-[#9E9EA7] hover:text-white"
              >
                Methodology
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold uppercase tracking-wider text-[#9E9EA7] hover:text-white"
              >
                Direct Desk
              </NavLink>
              <div className="pt-4 border-t border-[#1E1E26] flex flex-col gap-2">
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider text-white bg-[#121217] border border-[#1E1E26]"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider text-white bg-[#FF5A36]"
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