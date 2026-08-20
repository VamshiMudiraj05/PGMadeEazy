import { Route, Routes, Link } from 'react-router-dom';
import { Bookmark, MessageSquare, Search, PlusCircle, ArrowRight } from 'lucide-react';
import LandingPage from '../features/landing/Hero';
import Footer from '../components/common/Footer';
import MultiStepRegistration from '../features/auth/components/SignUpForm';
import SignInForm from '../features/auth/components/SignInForm';
import ProtectedRoute from '../context/ProtectedRoute';
import ProviderDashboard from '../features/provider/components/ProviderDashboard';
import AddProperty from '../features/provider/components/AddProperty';
import MyProperties from '../features/provider/components/MyProperties';
import TenantsPage from '../features/provider/components/TenantsPage';
import PaymentsPage from '../features/provider/components/PaymentsPage';
import AdminDashboard from '../features/admin/components/AdminDashboard';
import Profile from '../features/seeker/components/Profile';
import ProviderProfile from '../features/provider/components/ProviderProfile';
import PropertyApproval from '../features/admin/components/PropertyApproval';
import RejectedProperties from '../features/provider/components/RejectedProperties';
import AdminRejectedProperties from '../features/admin/components/RejectedProperties';
import AvailableProperties from '../features/admin/components/AvailableProperties';
import Providers from '../features/admin/components/Providers';
import Seekers from '../features/admin/components/Seekers';
import SeekerDashboard from '../features/seeker/components/SeekerDashboard';
import FindPG from '../features/seeker/components/FindPG';
import MyBookings from '../features/seeker/components/MyBookings';
import PayPalSuccess from '../features/seeker/components/PayPalSuccess';
import PayPalCancel from '../features/seeker/components/PayPalCancel';
import HowItWorks from '../pages/HowItWorks';
import Contact from '../pages/Contact';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<MultiStepRegistration />} />
      <Route path="/login" element={<SignInForm />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Seeker Routes */}
      <Route path="/seeker-dashboard" element={
        <ProtectedRoute>
          <SeekerDashboard />
        </ProtectedRoute>
      } />

      <Route path="/seeker-dashboard/find-pg" element={
        <ProtectedRoute>
          <FindPG />
        </ProtectedRoute>
      } />

      <Route path="/seeker-dashboard/bookings" element={
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
      } />
      <Route path="/seeker/my-bookings" element={
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
      } />
      <Route path="/seeker/bookings" element={
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
      } />

      {/* PayPal & Booking Redirection Routes */}
      <Route path="/seeker/paypal-success" element={
        <ProtectedRoute>
          <PayPalSuccess />
        </ProtectedRoute>
      } />

      <Route path="/seeker/paypal-cancel" element={
        <ProtectedRoute>
          <PayPalCancel />
        </ProtectedRoute>
      } />
      <Route path="/seeker/cancel" element={
        <ProtectedRoute>
          <PayPalCancel />
        </ProtectedRoute>
      } />
      <Route path="/seeker/booking-failed" element={
        <ProtectedRoute>
          <PayPalCancel />
        </ProtectedRoute>
      } />

      <Route path="/seeker-dashboard/saved-pgs" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 flex items-center justify-center">
            <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-zinc-800 text-center glow-orange-sm">
              <div className="h-14 w-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto mb-4">
                <Bookmark className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-extrabold text-white mb-2">Saved Properties</h1>
              <p className="text-xs text-zinc-400 mb-6">
                You haven't bookmarked any PG stays yet. Explore verified listings and click the save button to keep track of your favorites.
              </p>
              <Link
                to="/seeker-dashboard/find-pg"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs transition-all shadow-md shadow-orange-500/25"
              >
                <span>Browse Accommodations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ProtectedRoute>
      } />

      <Route path="/seeker-dashboard/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      <Route path="/seeker-dashboard/messages" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 flex items-center justify-center">
            <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-zinc-800 text-center glow-orange-sm">
              <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-4">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-extrabold text-white mb-2">Direct Host Inquiries</h1>
              <p className="text-xs text-zinc-400 mb-6">
                No active conversations yet. When you request a room or contact a host provider, chat threads will be organized here.
              </p>
              <Link
                to="/seeker-dashboard/find-pg"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 text-zinc-300 hover:text-white font-bold text-xs transition-all"
              >
                <span>Find Accommodations</span>
              </Link>
            </div>
          </div>
        </ProtectedRoute>
      } />

      {/* Provider Routes */}
      <Route path="/provider-dashboard" element={
        <ProtectedRoute>
          <ProviderDashboard />
        </ProtectedRoute>
      } />

      <Route path="/provider-dashboard/add-property" element={
        <ProtectedRoute>
          <AddProperty />
        </ProtectedRoute>
      } />

      <Route path="/provider-dashboard/my-properties" element={
        <ProtectedRoute>
          <MyProperties />
        </ProtectedRoute>
      } />

      <Route path="/provider-dashboard/tenants" element={
        <ProtectedRoute>
          <TenantsPage />
        </ProtectedRoute>
      } />

      <Route path="/provider-dashboard/payments" element={
        <ProtectedRoute>
          <PaymentsPage />
        </ProtectedRoute>
      } />

      <Route path="/provider-dashboard/profile" element={
        <ProtectedRoute>
          <ProviderProfile />
        </ProtectedRoute>
      } />

      <Route path="/provider-dashboard/rejected-properties" element={
        <ProtectedRoute>
          <RejectedProperties />
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="/admin-dashboard/approvals" element={
        <ProtectedRoute>
          <PropertyApproval />
        </ProtectedRoute>
      } />

      <Route path="/admin-dashboard/rejected-pgs" element={
        <ProtectedRoute>
          <AdminRejectedProperties />
        </ProtectedRoute>
      } />

      <Route path="/admin-dashboard/available-pgs" element={
        <ProtectedRoute>
          <AvailableProperties />
        </ProtectedRoute>
      } />

      <Route path="/admin-dashboard/providers" element={
        <ProtectedRoute>
          <Providers />
        </ProtectedRoute>
      } />

      <Route path="/admin-dashboard/seekers" element={
        <ProtectedRoute>
          <Seekers />
        </ProtectedRoute>
      } />
      
      <Route path="/find-pg" element={
        <ProtectedRoute>
          <FindPG />
        </ProtectedRoute>
      } />
      
      <Route path="/list-property" element={
        <ProtectedRoute>
          <AddProperty />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;

