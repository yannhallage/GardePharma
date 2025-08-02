import { useState } from 'react';
import { useFormSubmission } from './use-form-submission';
import type { ValidationSchema } from './use-form-submission';

export interface PharmacyFormData {
  nom_pharmacie: string;
  email: string;
  lieu: string;
  chef_pharmacie: string;
  commune: string;
  numero: string;
}

export interface PharmacyResponse {
  id: string;
  nom_pharmacie: string;
  email: string;
  lieu: string;
  chef_pharmacie: string;
  commune: string;
  numero: string;
  created_at: string;
  updated_at: string;
}

const pharmacyValidationSchema: ValidationSchema = {
  nom_pharmacie: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  email: {
    required: true,
    pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
    custom: (value: string) => {
      if (!value) return null;
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
        return 'Format d\'email invalide';
      }
      return null;
    },
  },
  lieu: {
    required: true,
    minLength: 2,
    maxLength: 200,
  },
  chef_pharmacie: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  commune: {
    required: true,
  },
  numero: {
    required: true,
    minLength: 8,
    maxLength: 15,
    pattern: /^[\d\s\+\-\(\)]+$/,
    custom: (value: string) => {
      if (!value) return null;
      if (!/^[\d\s\+\-\(\)]+$/.test(value)) {
        return 'Format de numéro invalide';
      }
      return null;
    },
  },
};

export function usePharmacyAccounts() {
  const [formData, setFormData] = useState<PharmacyFormData>({
    nom_pharmacie: '',
    email: '',
    lieu: '',
    chef_pharmacie: '',
    commune: '',
    numero: '',
  });

  const { loading, errors, submit, clearErrors } = useFormSubmission<PharmacyResponse>(
    pharmacyValidationSchema,
    {
      endpoint: '/pharmacies',
      method: 'POST',
      successMessage: 'Pharmacie ajoutée avec succès !',
      errorMessage: 'Erreur lors de l\'ajout de la pharmacie',
      onSuccess: (data) => {
        // Reset form after successful submission
        setFormData({
          nom_pharmacie: '',
          email: '',
          lieu: '',
          chef_pharmacie: '',
          commune: '',
          numero: '',
        });
        clearErrors();
      },
    }
  );

  const handleInputChange = (field: keyof PharmacyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      clearErrors();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log des données de pharmacie prêtes pour le serveur
    console.log('💊 Données de pharmacie prêtes pour le serveur:', {
      nom_pharmacie: formData.nom_pharmacie,
      email: formData.email,
      lieu: formData.lieu,
      chef_pharmacie: formData.chef_pharmacie,
      commune: formData.commune,
      numero: formData.numero
    });
    
    const result = await submit(formData);
    return result;
  };

  return {
    formData,
    loading,
    errors,
    handleInputChange,
    handleSubmit,
    clearErrors,
  };
} 