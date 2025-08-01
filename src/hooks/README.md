# Hooks de Validation et Soumission de Formulaires

Ce dossier contient des hooks personnalisés pour gérer la validation et la soumission de formulaires avec envoi au backend.

## Structure

```
hooks/
├── use-form-submission.ts     # Hook générique pour la soumission de formulaires
├── use-pharmacy-accounts.ts   # Hook spécifique pour l'ajout de pharmacies
├── use-manual-oncall.ts      # Hook spécifique pour l'attribution de gardes
├── use-profile-form.ts        # Hook spécifique pour la mise à jour de profil
├── use-toast.ts              # Hook pour les notifications toast
└── index.ts                  # Export centralisé de tous les hooks
```

## Hook Générique : useFormSubmission

Hook de base pour gérer la validation et l'envoi de données au backend.

### Utilisation

```typescript
import { useFormSubmission } from '../hooks/use-form-submission';

const validationSchema = {
  email: {
    required: true,
    pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
  },
  name: {
    required: true,
    minLength: 2,
  },
};

const { loading, errors, submit, clearErrors } = useFormSubmission(
  validationSchema,
  {
    endpoint: '/api/users',
    method: 'POST',
    successMessage: 'Utilisateur créé avec succès !',
    errorMessage: 'Erreur lors de la création',
  }
);
```

### Options de validation

- `required`: Champ obligatoire
- `minLength`: Longueur minimale
- `maxLength`: Longueur maximale
- `pattern`: Expression régulière
- `custom`: Fonction de validation personnalisée

## Hooks Spécifiques

### usePharmacyAccounts

Gère l'ajout de pharmacies avec validation complète.

```typescript
import { usePharmacyAccounts } from '../hooks/use-pharmacy-accounts';

const { formData, loading, errors, handleInputChange, handleSubmit } = usePharmacyAccounts();
```

### useManualOnCallAssignment

Gère l'attribution manuelle de gardes avec validation des dates et heures.

```typescript
import { useManualOnCallAssignment } from '../hooks/use-manual-oncall';

const { formData, loading, errors, handleInputChange, handleDateChange, handleSubmit } = useManualOnCallAssignment();
```

### useProfileForm

Gère la mise à jour de profil avec support des fichiers.

```typescript
import { useProfileForm } from '../hooks/use-profile-form';

const { formData, loading, errors, handleInputChange, handleFileChange, handleSubmit } = useProfileForm(initialData);
```

## Configuration API

Les hooks utilisent le fichier `lib/api.ts` pour les appels HTTP. Configurez l'URL de base avec la variable d'environnement `VITE_API_URL`.

## Gestion des Erreurs

Tous les hooks gèrent automatiquement :
- Validation côté client
- Affichage des erreurs de validation
- Messages de succès/erreur via toast
- États de chargement
- Réinitialisation des formulaires après succès

## Types TypeScript

Tous les hooks sont entièrement typés avec TypeScript pour une meilleure expérience de développement. 