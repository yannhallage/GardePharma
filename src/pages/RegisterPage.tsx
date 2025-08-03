import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  Eye,
  EyeOff,
  Building2,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useRegisterPharmacy } from '@/hooks/register/useRegisterPharmacy';
import toast from 'react-hot-toast';

interface FormData {
  nom_pharmacie: string;
  chef_pharmacie: string;
  email: string;
  numero: string;
  commune: string;
  details: string;
  password: string;
  confirmPassword?: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nom_pharmacie: '',
    chef_pharmacie: '',
    email: '',
    numero: '',
    commune: '',
    details: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const navigate = useNavigate();

  const { register } = useRegisterPharmacy();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.nom_pharmacie.trim()) {
      newErrors.nom_pharmacie = 'Le nom de la pharmacie est requis';
    }

    if (!formData.chef_pharmacie.trim()) {
      newErrors.chef_pharmacie = 'Le nom du propriétaire est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.numero.trim()) {
      newErrors.numero = 'Le télénumero est requis';
    }

    if (!formData.commune.trim()) {
      newErrors.commune = 'L\'adresse est requise';
    }
    if (!formData.details.trim()) {
      newErrors.details = 'La description est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmez votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);
    try {
      const response: any = await register({
        nom_pharmacie: formData.nom_pharmacie,
        chef_pharmacie: formData.chef_pharmacie,
        email: formData.email,
        numero: formData.numero,
        commune: formData.commune,
        details: formData.details,
        password: formData.password,
      });

      if (response) { console.log(response) }
    } catch (error: any) {
      console.error('Erreur de connexion', error);
      toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setIsLoading(false);
    }
    setTimeout(() => {
      setIsLoading(false);

      toast.success('Connexion réussie');
      navigate('/pharmacy');
      console.log('Inscription:', formData);
    }, 2000);
    clearFormdata()
  };

  const clearFormdata = () => {
    setFormData({
      nom_pharmacie: '',
      chef_pharmacie: '',
      email: '',
      numero: '',
      commune: '',
      details: '',
      password: '',
      confirmPassword: ''
    })
  }
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

      <div className="w-full max-w-lg">
        {/* Logo et titre */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-4 shadow-md">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">
            GardePharma
          </h1>
          <p className="text-neutral-600 text-sm">
            Créez votre compte pharmacie
          </p>
        </div>

        {/* Indicateur de progression */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm ${currentStep >= 1 ? 'bg-primary-500 border-primary-500 text-white' : 'border-neutral-300 text-neutral-400'
              }`}>
              {currentStep > 1 ? <CheckCircle className="h-4 w-4" /> : '1'}
            </div>
            <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-primary-500' : 'bg-neutral-300'
              }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm ${currentStep >= 2 ? 'bg-primary-500 border-primary-500 text-white' : 'border-neutral-300 text-neutral-400'
              }`}>
              {currentStep > 2 ? <CheckCircle className="h-4 w-4" /> : '2'}
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-center text-lg">
              {currentStep === 1 ? 'Informations de la pharmacie' : 'Sécurité du compte'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {currentStep === 1 ? (
                <>
                  {/* Informations de la pharmacie */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="nom_pharmacie" className="block text-xs font-semibold text-neutral-700">
                        Nom de la pharmacie *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                        <input
                          id="nom_pharmacie"
                          type="text"
                          value={formData.nom_pharmacie}
                          onChange={(e) => handleInputChange('nom_pharmacie', e.target.value)}
                          className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white/50 text-sm ${errors.nom_pharmacie ? 'border-red-500' : 'border-neutral-300'
                            }`}
                          placeholder="Pharmacie du Centre"
                        />
                      </div>
                      {errors.nom_pharmacie && (
                        <p className="text-red-500 text-xs flex items-center">
                          <AlertCircle className="h-2.5 w-2.5 mr-1" />
                          {errors.nom_pharmacie}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="chef_pharmacie" className="block text-xs font-semibold text-neutral-700">
                        Nom du propriétaire *
                      </label>
                      <div className="relative">
                        <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                        <input
                          id="chef_pharmacie"
                          type="text"
                          value={formData.chef_pharmacie}
                          onChange={(e) => handleInputChange('chef_pharmacie', e.target.value)}
                          className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white/50 text-sm ${errors.chef_pharmacie ? 'border-red-500' : 'border-neutral-300'
                            }`}
                          placeholder="Jean Dupont"
                        />
                      </div>
                      {errors.chef_pharmacie && (
                        <p className="text-red-500 text-xs flex items-center">
                          <AlertCircle className="h-2.5 w-2.5 mr-1" />
                          {errors.chef_pharmacie}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-xs font-semibold text-neutral-700">
                        Adresse email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white/50 text-sm ${errors.email ? 'border-red-500' : 'border-neutral-300'
                            }`}
                          placeholder="contact@pharmacie.fr"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs flex items-center">
                          <AlertCircle className="h-2.5 w-2.5 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="numero" className="block text-xs font-semibold text-neutral-700">
                        Télénumero *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                        <input
                          id="numero"
                          type="tel"
                          value={formData.numero}
                          onChange={(e) => handleInputChange('numero', e.target.value)}
                          className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white/50 text-sm ${errors.numero ? 'border-red-500' : 'border-neutral-300'
                            }`}
                          placeholder="01 42 34 56 78"
                        />
                      </div>
                      {errors.numero && (
                        <p className="text-red-500 text-xs flex items-center">
                          <AlertCircle className="h-2.5 w-2.5 mr-1" />
                          {errors.numero}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label htmlFor="commune" className="block text-xs font-semibold text-neutral-700">
                        Lieu
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                        <input
                          id="commune"
                          type="text"
                          value={formData.commune}
                          onChange={(e) => handleInputChange('commune', e.target.value)}
                          className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white/50 text-sm ${errors.commune ? 'border-red-500' : 'border-neutral-300'
                            }`}
                          placeholder="123 Rue de la Paix, 75001 Paris"
                        />
                      </div>
                      {errors.commune && (
                        <p className="text-red-500 text-xs flex items-center">
                          <AlertCircle className="h-2.5 w-2.5 mr-1" />
                          {errors.commune}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label htmlFor="details" className="block text-xs font-semibold text-neutral-700">
                        Details
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                        <textarea
                          id="details"
                          type="text"
                          value={formData.details}
                          onChange={(e) => handleInputChange('details', e.target.value)}
                          className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white/50 text-sm ${errors.details ? 'border-red-500' : 'border-neutral-300'
                            }`}
                          placeholder="Description de l'emplacement"
                        />
                      </div>
                      {errors.details && (
                        <p className="text-red-500 text-xs flex items-center">
                          <AlertCircle className="h-2.5 w-2.5 mr-1" />
                          {errors.details}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="text-sm py-2 px-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md"
                    >
                      Suivant
                      <ArrowRight className="h-3.5 w-3.5 ml-2" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Sécurité du compte */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="password" className="block text-xs font-semibold text-neutral-700">
                        Mot de passe *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`w-full pl-8 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white/50 text-sm ${errors.password ? 'border-red-500' : 'border-neutral-300'
                            }`}
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
                      {errors.password && (
                        <p className="text-red-500 text-xs flex items-center">
                          <AlertCircle className="h-2.5 w-2.5 mr-1" />
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="confirmPassword" className="block text-xs font-semibold text-neutral-700">
                        Confirmer le mot de passe *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`w-full pl-8 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 bg-white/50 text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-neutral-300'
                            }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs flex items-center">
                          <AlertCircle className="h-2.5 w-2.5 mr-1" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="text-sm py-2 px-4"
                    >
                      <ArrowLeft className="h-3.5 w-3.5 mr-2" />
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      className="text-sm py-2 px-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Création en cours...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          Créer le compte
                          <ArrowRight className="h-3.5 w-3.5 ml-2" />
                        </div>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-neutral-600">
                Déjà un compte ?{' '}
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-500 font-semibold transition-colors"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-500 leading-relaxed">
            En créant un compte, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 