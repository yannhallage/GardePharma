import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Eye, EyeOff, Building2, Shield, Mail, Lock, ArrowRight } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [userType, setUserType] = useState<'pharmacy' | 'admin'>('pharmacy');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'une connexion
    setTimeout(() => {
      setIsLoading(false);
      console.log('Connexion:', { userType, email, password, rememberMe });
      // Ici on redirigerait vers le dashboard approprié
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-3">
      <style>{`
        /* Réduction globale des tailles de police pour le zoom 100% */
        .text-xs {
          font-size: 11px;
          line-height: 14px;
        }
        
        .text-sm {
          font-size: 13px;
          line-height: 16px;
        }
        
        .text-base {
          font-size: 14px;
          line-height: 18px;
        }
        
        .text-lg {
          font-size: 16px;
          line-height: 20px;
        }
        
        .text-xl {
          font-size: 18px;
          line-height: 22px;
        }
        
        .text-2xl {
          font-size: 20px;
          line-height: 24px;
        }
        
        .text-3xl {
          font-size: 24px;
          line-height: 28px;
        }
      `}</style>
      
      <div className="w-full max-w-sm">
        {/* Logo et titre */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-4 shadow-md">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">
            GardePharma
          </h1>
          <p className="text-neutral-600 text-sm">
            Connectez-vous à votre espace
          </p>
        </div>

        {/* Sélecteur de type d'utilisateur */}
        <Card className="mb-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-4">
            <div className="flex space-x-1 p-1 bg-neutral-100 rounded-lg">
              <Button
                variant={userType === 'pharmacy' ? 'default' : 'ghost'}
                size="sm"
                className={`flex-1 transition-all duration-200 text-xs h-8 ${
                  userType === 'pharmacy' 
                    ? 'bg-white shadow-sm text-primary-600' 
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
                onClick={() => setUserType('pharmacy')}
              >
                <Building2 className="h-3 w-3 mr-1" />
                Pharmacie
              </Button>
              <Button
                variant={userType === 'admin' ? 'default' : 'ghost'}
                size="sm"
                className={`flex-1 transition-all duration-200 text-xs h-8 ${
                  userType === 'admin' 
                    ? 'bg-white shadow-sm text-primary-600' 
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
                onClick={() => setUserType('admin')}
              >
                <Shield className="h-3 w-3 mr-1" />
                Administrateur
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Formulaire de connexion */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-center text-lg">
              {userType === 'pharmacy' ? 'Espace Pharmacie' : 'Espace Administration'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="email" className="block text-xs font-semibold text-neutral-700">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-8 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/50 text-sm"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="block text-xs font-semibold text-neutral-700">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-8 pr-10 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/50 text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-xs text-neutral-600">
                    Se souvenir de moi
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary-600 hover:text-primary-500 font-medium transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full py-2 text-sm font-semibold bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Connexion en cours...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Se connecter
                    <ArrowRight className="h-3.5 w-3.5 ml-2" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-neutral-600">
                Pas encore de compte ?{' '}
                <Link 
                  to="/register" 
                  className="text-primary-600 hover:text-primary-500 font-semibold transition-colors"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-500 leading-relaxed">
            {userType === 'pharmacy' 
              ? 'Accédez à votre planning de garde, gérez vos informations et consultez l\'historique de vos gardes'
              : 'Gérez les pharmacies, les plannings de garde et les droits d\'accès du système'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 