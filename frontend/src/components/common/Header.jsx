import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Building2, Menu, X, LogOut, LayoutDashboard, UserCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Helper function to get user type without ROLE_ prefix
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

  const getRoleBadgeStyle = (userType) => {
    const type = getUserType(userType);
    if (type === 'seeker') {
      return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
    }
    if (type === 'provider') {
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    }
    return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto flex h-18 items-center justify-between px-4 sm:px-6">
        {/* Logo Section */}
        <NavLink
          to="/"
          className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-md shadow-orange-500/25 transition-all duration-300 group-hover:shadow-orange-500/40 group-hover:glow-orange-sm">
            <Building2 className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-orange-400 bg-clip-text text-transparent">
              PG Made Eazy
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">
              Verified Accommodations
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80 backdrop-blur-md">
          {user ? (
            <NavLink
              to={getDashboardPath()}
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                }`
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>
                {getUserType(user.userType) === 'seeker'
                  ? 'Seeker Portal'
                  : getUserType(user.userType) === 'provider'
                  ? 'Provider Portal'
                  : 'Admin Command'}
              </span>
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-zinc-800 text-orange-400 font-semibold shadow-inner'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/how-it-works"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-zinc-800 text-orange-400 font-semibold shadow-inner'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                  }`
                }
              >
                How It Works
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-zinc-800 text-orange-400 font-semibold shadow-inner'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                  }`
                }
              >
                Contact
              </NavLink>
            </>
          )}
        </nav>

        {/* Right User Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 pl-2">
              <div className="flex items-center gap-2.5 bg-zinc-900/80 py-1.5 px-3 rounded-xl border border-zinc-800">
                <div className="h-8 w-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <UserCircle className="h-5 w-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-zinc-200 truncate max-w-[120px]">
                    {user.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${getRoleBadgeStyle(
                      user.userType
                    )}`}
                  >
                    {getUserType(user.userType)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:text-red-400 bg-zinc-900/60 hover:bg-red-500/10 border border-zinc-800 hover:border-red-500/30 transition-all duration-300"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all duration-300"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="relative group overflow-hidden px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-1.5"
              >
                <Sparkles className="h-4 w-4 text-orange-200 animate-pulse" />
                <span>Get Started</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-2xl px-4 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="h-10 w-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <UserCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border mt-0.5 ${getRoleBadgeStyle(
                      user.userType
                    )}`}
                  >
                    {getUserType(user.userType)}
                  </span>
                </div>
              </div>

              <NavLink
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-md shadow-orange-500/25"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Open Dashboard</span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-zinc-200 hover:bg-zinc-900 hover:text-orange-400 font-medium transition-colors"
              >
                Home
              </NavLink>
              <NavLink
                to="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-zinc-200 hover:bg-zinc-900 hover:text-orange-400 font-medium transition-colors"
              >
                How It Works
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-zinc-200 hover:bg-zinc-900 hover:text-orange-400 font-medium transition-colors"
              >
                Contact Us
              </NavLink>
              <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2.5">
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl text-sm font-semibold text-zinc-200 bg-zinc-900 border border-zinc-800 hover:border-zinc-700"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md shadow-orange-500/25"
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