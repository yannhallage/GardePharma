import { useState } from 'react';
import { useFormSubmission } from './use-form-submission';
import type { ValidationSchema } from './use-form-submission';

export interface OnCallAssignmentData {
  pharmacy_id: string;
  holder_name: string;
  date: string;
  type: 'Jour' | 'Nuit' | 'Week-end' | 'Férié';
  start_time: string;
  end_time: string;
  comment?: string;
}

export interface OnCallAssignmentResponse {
  id: string;
  pharmacy_id: string;
  pharmacy_name: string;
  holder_name: string;
  date: string;
  type: string;
  start_time: string;
  end_time: string;
  comment?: string;
  created_at: string;
  updated_at: string;
}

const onCallValidationSchema: ValidationSchema = {
  pharmacy_id: {
    required: true,
    custom: (value: string) => {
      if (!value || value === '') {
        return 'Veuillez sélectionner une pharmacie';
      }
      return null;
    },
  },
  holder_name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  date: {
    required: true,
    custom: (value: string) => {
      if (!value) return 'La date est requise';
      
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        return 'La date ne peut pas être dans le passé';
      }
      
      return null;
    },
  },
  type: {
    required: true,
    custom: (value: string) => {
      const validTypes = ['Jour', 'Nuit', 'Week-end', 'Férié'];
      if (!validTypes.includes(value)) {
        return 'Type de garde invalide';
      }
      return null;
    },
  },
  start_time: {
    required: true,
    custom: (value: string) => {
      if (!value) return 'L\'heure de début est requise';
      if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
        return 'Format d\'heure invalide';
      }
      return null;
    },
  },
  end_time: {
    required: true,
    custom: (value: string) => {
      if (!value) return 'L\'heure de fin est requise';
      if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
        return 'Format d\'heure invalide';
      }
      return null;
    },
  },
  comment: {
    maxLength: 500,
  },
};

export function useManualOnCallAssignment() {
  const [formData, setFormData] = useState<OnCallAssignmentData>({
    pharmacy_id: '',
    holder_name: '',
    date: '',
    type: 'Jour',
    start_time: '',
    end_time: '',
    comment: '',
  });

  const { loading, errors, submit, clearErrors } = useFormSubmission<OnCallAssignmentResponse>(
    onCallValidationSchema,
    {
      endpoint: '/oncall-assignments',
      method: 'POST',
      successMessage: 'Garde attribuée avec succès !',
      errorMessage: 'Erreur lors de l\'attribution de la garde',
      onSuccess: (data) => {
        // Reset form after successful submission
        setFormData({
          pharmacy_id: '',
          holder_name: '',
          date: '',
          type: 'Jour',
          start_time: '',
          end_time: '',
          comment: '',
        });
        clearErrors();
      },
    }
  );

  const handleInputChange = (field: keyof OnCallAssignmentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      clearErrors();
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    const dateString = date ? date.toISOString().split('T')[0] : '';
    setFormData(prev => ({ ...prev, date: dateString }));
    if (errors.date) {
      clearErrors();
    }
  };

  const validateTimeRange = () => {
    if (formData.start_time && formData.end_time) {
      const start = new Date(`2000-01-01T${formData.start_time}`);
      const end = new Date(`2000-01-01T${formData.end_time}`);
      
      if (end <= start) {
        return 'L\'heure de fin doit être après l\'heure de début';
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Additional validation for time range
    const timeRangeError = validateTimeRange();
    if (timeRangeError) {
      clearErrors();
      return { success: false, error: timeRangeError };
    }
    
    // Log des données de garde prêtes pour le serveur
    console.log('🏥 Données de garde prêtes pour le serveur:', {
      pharmacy_id: formData.pharmacy_id,
      holder_name: formData.holder_name,
      date: formData.date,
      type: formData.type,
      start_time: formData.start_time,
      end_time: formData.end_time,
      comment: formData.comment || 'Aucun commentaire'
    });
    
    const result = await submit(formData);
    return result;
  };

  return {
    formData,
    loading,
    errors,
    handleInputChange,
    handleDateChange,
    handleSubmit,
    clearErrors,
  };
} 