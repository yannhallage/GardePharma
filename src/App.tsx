import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';

// Pages pour les pharmacies (à créer)
const PharmacyDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-neutral-800">Espace Pharmacie</h1>
    <p className="text-neutral-600">Gérez votre planning de garde</p>
    {/* Contenu à développer */}
  </div>
);

// Pages pour les administrateurs (à créer)
const AdminDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-neutral-800">Espace Administration</h1>
    <p className="text-neutral-600">Gérez les pharmacies et les plannings</p>
    {/* Contenu à développer */}
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
          {/* Route publique pour les utilisateurs */}
          <Route 
            path="/" 
            element={
              <AppLayout userRole="user" userName="Visiteur">
                <UserDashboard />
              </AppLayout>
            } 
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

          {/* Routes protégées pour les pharmacies */}
          <Route 
            path="/pharmacy/*" 
            element={
              isAuthenticated && userRole === 'pharmacy' ? (
                <AppLayout userRole="pharmacy" userName="Pharmacie">
                  <Routes>
                    <Route path="/" element={<PharmacyDashboard />} />
                    <Route path="/planning" element={<div>Planning des gardes</div>} />
                    <Route path="/guards" element={<div>Mes gardes</div>} />
                    <Route path="/profile" element={<div>Profil pharmacie</div>} />
                  </Routes>
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Routes protégées pour les administrateurs */}
          <Route 
            path="/admin/*" 
            element={
              isAuthenticated && userRole === 'admin' ? (
                <AppLayout userRole="admin" userName="Administrateur">
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/calendar" element={<div>Calendrier complet</div>} />
                    <Route path="/management" element={<div>Gestion des pharmacies</div>} />
                    <Route path="/settings" element={<div>Paramètres</div>} />
                  </Routes>
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Route par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
