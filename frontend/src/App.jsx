import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <div className="min-h-screen bg-[#1f2226] text-[#f2f2f2] flex flex-col justify-between selection:bg-[#ffb000] selection:text-[#0b0b0d]">
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;