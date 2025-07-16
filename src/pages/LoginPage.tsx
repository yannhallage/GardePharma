import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Eye, EyeOff, Building2, Shield } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [userType, setUserType] = useState<'pharmacy' | 'admin'>('pharmacy');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'une connexion
    setTimeout(() => {
      setIsLoading(false);
      console.log('Connexion:', { userType, email, password });
      // Ici on redirigerait vers le dashboard approprié
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">
            GardePharma
          </h1>
          <p className="text-neutral-600">
            Connectez-vous à votre espace
          </p>
        </div>

        {/* Sélecteur de type d'utilisateur */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex space-x-2">
              <Button
                variant={userType === 'pharmacy' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setUserType('pharmacy')}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Pharmacie
              </Button>
              <Button
                variant={userType === 'admin' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setUserType('admin')}
              >
                <Shield className="h-4 w-4 mr-2" />
                Administrateur
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Formulaire de connexion */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {userType === 'pharmacy' ? 'Espace Pharmacie' : 'Espace Administration'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 pr-10 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-neutral-600">
                    Se souvenir de moi
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  Mot de passe oublié ?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Connexion en cours...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-600">
                Pas encore de compte ?{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500 font-medium">
                  Contactez l'administrateur
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-500">
            {userType === 'pharmacy' 
              ? 'Accédez à votre planning de garde et gérez vos informations'
              : 'Gérez les pharmacies et les plannings de garde'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 