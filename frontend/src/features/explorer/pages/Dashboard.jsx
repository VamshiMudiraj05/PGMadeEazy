import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SearchFilters } from '../components/SearchFilters';
import { PGListingCard } from '../components/PGListingCard';
import { BookingForm } from '../components/BookingForm';
import { useApi } from '../../../hooks/useApi';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const api = useApi();
  const [pgs, setPGs] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedPG, setSelectedPG] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSearch = async (newFilters) => {
    setFilters(newFilters);
    try {
      const response = await api.pgApi.searchPGs(newFilters);
      setPGs(response.data);
    } catch (error) {
      console.error('Error searching PGs:', error);
    }
  };

  const handlePGSelect = (pg) => {
    setSelectedPG(pg);
  };

  const handleCloseBooking = () => {
    setSelectedPG(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-10 relative select-none">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[#141414] p-8 rounded-2xl shadow-2xl border border-white/10">
          <h1 className="text-3xl font-extrabold text-white mb-6">Welcome, {user?.name}</h1>
          
          <div className="mb-8">
            <SearchFilters onSearch={handleSearch} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {pgs.map((pg) => (
              <PGListingCard
                key={pg.id}
                pg={pg}
                onSelect={() => handlePGSelect(pg)}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/60 p-6 rounded-xl border border-white/10 space-y-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">Quick Actions</h2>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li>• Find PG</li>
                <li>• View Bookings</li>
                <li>• Update Profile</li>
                <li>• Messages</li>
              </ul>
            </div>
            <div className="bg-black/60 p-6 rounded-xl border border-white/10 space-y-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">Recent Activity</h2>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>• No recent activity</li>
              </ul>
            </div>
          </div>

          {selectedPG && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
              <div className="bg-[#141414] p-8 rounded-2xl shadow-2xl border border-white/10 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Book PG</h2>
                  <button
                    onClick={handleCloseBooking}
                    className="text-[#E50914] hover:text-[#B80710] font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                <BookingForm pg={selectedPG} onClose={handleCloseBooking} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

