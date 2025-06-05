import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/Home/HomePage';
import Auth from './pages/Auth/Auth';
import Complaint from './pages/Complaint/Complaint';
import Admin from './pages/Admin/Admin';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; 

import './styles/App.scss';

function AppContent() {
  const location = useLocation();

  const noLayoutRoutes = ['/auth/login', '/auth/register', '/posts', '/admin' ];
  const noLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <section id="app">
      {!noLayout && <Navbar />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/:mode" element={<Auth />} />

        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Complaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!noLayout && <Footer />}
    </section>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
