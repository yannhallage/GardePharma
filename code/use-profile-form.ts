import { useState } from 'react';
import { useFormSubmission } from '../src/hooks/use-form-submission';
import type { ValidationSchema } from '../src/hooks/use-form-submission';

export interface ProfileFormData {
  nom: string;
  prenom: string;
  email: string;
  avatar?: File;
}

export interface ProfileResponse {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  avatar_url?: string;
  role: string;
  updated_at: string;
}

const profileValidationSchema: ValidationSchema = {
  nom: {
    required: true,
    minLength: 2,
    maxLength: 50,
    custom: (value: string) => {
      if (!value) return null;
      if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
        return 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes';
      }
      return null;
    },
  },
  prenom: {
    required: true,
    minLength: 2,
    maxLength: 50,
    custom: (value: string) => {
      if (!value) return null;
      if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
        return 'Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes';
      }
      return null;
    },
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
};

export function useProfileForm(initialData?: Partial<ProfileFormData>) {
  const [formData, setFormData] = useState<ProfileFormData>({
    nom: initialData?.nom || '',
    prenom: initialData?.prenom || '',
    email: initialData?.email || '',
    avatar: undefined,
  });

  const { loading, errors, submit, clearErrors } = useFormSubmission<ProfileResponse>(
    profileValidationSchema,
    {
      endpoint: '/profile',
      method: 'PUT',
      successMessage: 'Profil mis à jour avec succès !',
      errorMessage: 'Erreur lors de la mise à jour du profil',
      onSuccess: (data) => {
        // Don't reset form on success for profile updates
        clearErrors();
      },
    }
  );

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      clearErrors();
    }
  };

  const handleFileChange = (file: File | undefined) => {
    setFormData(prev => ({ ...prev, avatar: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append('nom', formData.nom);
    submitData.append('prenom', formData.prenom);
    submitData.append('email', formData.email);
    
    if (formData.avatar) {
      submitData.append('avatar', formData.avatar);
    }
    
    // Log des données FormData prêtes pour le serveur
    console.log('👤 Données profil prêtes pour le serveur:', {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      avatar: formData.avatar ? `${formData.avatar.name} (${formData.avatar.size} bytes)` : 'Aucun fichier'
    });
    
    const result = await submit(submitData);
    return result;
  };

  const updateFormData = (newData: Partial<ProfileFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  return {
    formData,
    loading,
    errors,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    updateFormData,
    clearErrors,
  };
} 