import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import PresentationPage from './pages/PresentationPage';
import PharmacyPage from './pages/PharmacyPage';
import AdminDashboard from './pages/AdminDashboard';

import { getSession } from '@/helpers/local-storage';
// import { PharmaciesMap } from './components/map/PharmaciesMap';
// import MapComponent from './components/map/MapComponent';

// Page mot de passe oublié
const ForgotPasswordPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
    <div className="w-full max-w-md text-center">
      <h1 className="text-3xl font-bold text-neutral-800 mb-4">Mot de passe oublié</h1>
      <p className="text-neutral-600 mb-8">Cette fonctionnalité sera bientôt disponible</p>
      <a href="/login" className="text-primary-600 hover:text-primary-500 font-semibold">
        Retour à la connexion
      </a>
    </div>
  </div>
);

const App: React.FC = () => {
  const session = getSession();

  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/" element={<PresentationPage />} />
          <Route path="/localisation" element={<UserDashboard />} />
          {/* <Route path="/map" element={<PharmaciesMap />} /> */}

          {/* Pharmacy Dashboard protégé */}
          <Route
            path="/pharmacy"
            element={
              <ProtectedRoute allowedRoles={['pharmacy']}>
                <PharmacyPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard protégé */}
          <Route
            path="/administrateur"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Page de login avec redirection si déjà connecté */}
          <Route
            path="/login"
            element={
              session ? (
                <Navigate to={session.userType === 'pharmacy' ? '/pharmacy' : '/administrateur'} replace />
              ) : (
                <LoginPage />
              )
            }
          />

          {/* Page de register avec redirection si déjà connecté */}
          <Route
            path="/register"
            element={
              session ? (
                <Navigate to={session.userType === 'pharmacy' ? '/pharmacy' : '/administrateur'} replace />
              ) : (
                <RegisterPage />
              )
            }
          />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        <Toaster position="bottom-center" />
      </div>
    </Router>
  );
};

export default App;
