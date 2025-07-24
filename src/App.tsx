import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import PresentationPage from './pages/PresentationPage';
import PlanningViewer from './components/pharmacy/PlanningViewer';
import OnCallReportForm from './components/pharmacy/OnCallReportForm';
import OnCallHistory from './components/pharmacy/OnCallHistory';
import PharmacyProfileForm from './components/pharmacy/PharmacyProfileForm';
import PharmacyPage from './pages/PharmacyPage'; // Added import for PharmacyPage
import AdminDashboard from './pages/AdminDashboard';
import { Toaster } from 'react-hot-toast';

// Pages pour les pharmacies (à créer)
// const PharmacyDashboard = () => (
//   <div className="space-y-6">
//     <h1 className="text-3xl font-bold text-neutral-800">Espace Pharmacie</h1>
//     <p className="text-neutral-600">Gérez votre planning de garde</p>
//     {/* Contenu à développer */}
//   </div>
// );

// Page mot de passe oublié (à créer)
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
  // État simulé pour l'authentification
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState<'user' | 'pharmacy' | 'admin'>('user');

  // Fonction pour simuler la connexion
  const handleLogin = (role: 'pharmacy' | 'admin') => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  // Fonction pour la déconnexion
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('user');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route de présentation */}
          <Route 
            path="/" 
            element={<PresentationPage />} 
          />

          {/* Route du dashboard utilisateur */}
          <Route 
            path="/localisation" 
            element={<UserDashboard />} 
          />

          {/* Route du dashboard pharmacie (nouvelle interface) */}
          <Route 
            path="/pharmacy" 
            element={<PharmacyPage />} 
          />

          {/* Route de connexion */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to={userRole === 'pharmacy' ? '/pharmacy' : '/admin'} replace />
              ) : (
                <LoginPage />
              )
            } 
          />

          {/* Route d'inscription */}
          <Route 
            path="/register" 
            element={
              isAuthenticated ? (
                <Navigate to={userRole === 'pharmacy' ? '/pharmacy' : '/admin'} replace />
              ) : (
                <RegisterPage />
              )
            } 
          />

          {/* Route mot de passe oublié */}
          <Route 
            path="/forgot-password" 
            element={<ForgotPasswordPage />} 
          />

          {/* Routes pour les pharmacies (sous-routes dédiées, cohérence AppLayout) */}
          {/* <Route 
            path="/pharmacy/*" 
            element={
              <AppLayout userRole="pharmacy" userName="Pharmacie">
                <Routes>
                  <Route path="planning" element={<PlanningViewer />} />
                  <Route path="report" element={<OnCallReportForm />} />
                  <Route path="guards" element={<div>Liste de mes gardes (à implémenter)</div>} />
                  <Route path="history" element={<OnCallHistory />} />
                  <Route path="account" element={<PharmacyProfileForm />} />
                  <Route path="*" element={<Navigate to="planning" replace />} />
                </Routes>
              </AppLayout>
            }
          /> */}

          {/* Routes pour les administrateurs (sans protection) */}
          <Route 
            path="/administrateur" 
            element={
                <AdminDashboard />
              // isAuthenticated && userRole === 'admin' ? (
              // ) : (
              //   <Navigate to="/login" replace />
              // )
            } 
          />

          {/* Route par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="bottom-center" />
      </div>
    </Router>
  );
};

export default App;
