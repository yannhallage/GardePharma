# Hooks Documentation

Ce dossier contient tous les hooks personnalisés utilisés dans l'application GardePharma.

## Hooks Génériques

### `useToast`
Hook pour gérer les notifications toast dans l'application.

### `useFormSubmission`
Hook générique pour la soumission de formulaires avec validation et gestion d'erreurs.

### `usePharmacyAccounts`
Hook pour la gestion des comptes pharmacie (création, modification).

### `useManualOnCallAssignment`
Hook pour la gestion des assignations manuelles de garde.

### `useProfileForm`
Hook pour la gestion des formulaires de profil.

## Hooks Spécifiques à la Pharmacie

### `usePharmacyDashboard`
Hook pour gérer les données du tableau de bord de la pharmacie.

**Fonctionnalités :**
- Récupération des statistiques du tableau de bord
- Récupération des gardes à venir
- Récupération des pharmacies en garde aujourd'hui
- Rafraîchissement automatique des données

**Utilisation :**
```typescript
import { usePharmacyDashboard } from '../hooks';

const DashboardPage = () => {
  const { 
    stats, 
    gardeEvents, 
    pharmaciesEnGarde, 
    loading, 
    error, 
    refreshDashboard 
  } = usePharmacyDashboard();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <h1>Tableau de bord</h1>
      <p>Gardes prévues ce mois: {stats?.gardes_prevues_mois}</p>
      {/* Afficher les données */}
    </div>
  );
};
```

### `usePharmacyGardes`
Hook pour la gestion complète des gardes de pharmacie.

**Fonctionnalités :**
- CRUD complet des gardes (Création, Lecture, Mise à jour, Suppression)
- Validation des données de garde
- Gestion des statuts (en attente, en cours, terminée, refusée)
- Ajout de commentaires
- Acceptation/refus de gardes

**Utilisation :**
```typescript
import { usePharmacyGardes } from '../hooks';

const GardesPage = () => {
  const { 
    gardes, 
    loading, 
    createGarde, 
    updateGarde, 
    deleteGarde,
    acceptGarde,
    refuseGarde 
  } = usePharmacyGardes();

  const handleCreateGarde = async (gardeData) => {
    const result = await createGarde({
      date: '2024-07-15',
      type: 'jour',
      commentaire: 'Garde exceptionnelle'
    });
    
    if (result.success) {
      console.log('Garde créée avec succès');
    }
  };

  return (
    <div>
      {gardes.map(garde => (
        <div key={garde.id}>
          <span>{garde.date} - {garde.type}</span>
          <button onClick={() => acceptGarde(garde.id)}>Accepter</button>
          <button onClick={() => refuseGarde(garde.id)}>Refuser</button>
        </div>
      ))}
    </div>
  );
};
```

### `usePharmacyProfile`
Hook pour la gestion du profil de la pharmacie.

**Fonctionnalités :**
- Récupération et mise à jour du profil
- Changement de mot de passe
- Changement d'email
- Gestion de l'authentification à deux facteurs
- Gestion de l'accès support
- Upload d'avatar
- Déconnexion de tous les appareils
- Suppression de compte

**Utilisation :**
```typescript
import { usePharmacyProfile } from '../hooks';

const ProfilePage = () => {
  const { 
    profile, 
    loading, 
    updateProfileData, 
    updatePassword,
    toggleTwoFactor,
    uploadAvatar 
  } = usePharmacyProfile();

  const handleUpdateProfile = async (data) => {
    const result = await updateProfileData({
      nom_pharmacie: 'Nouveau nom',
      lieu: 'Nouveau lieu'
    });
  };

  const handlePasswordChange = async (data) => {
    const result = await updatePassword({
      current_password: 'ancien',
      new_password: 'nouveau',
      confirm_password: 'nouveau'
    });
  };

  return (
    <div>
      <h1>Profil de {profile?.nom_pharmacie}</h1>
      {/* Formulaire de mise à jour */}
    </div>
  );
};
```

### `usePharmacyPlanning`
Hook pour la gestion du planning des gardes.

**Fonctionnalités :**
- Récupération des événements du planning
- Filtrage par type, statut, date, pharmacie
- Statistiques du planning
- Export en CSV/PDF
- Recherche d'événements par date/mois
- Événements à venir/passés

**Utilisation :**
```typescript
import { usePharmacyPlanning } from '../hooks';

const PlanningPage = () => {
  const { 
    events, 
    loading, 
    filters, 
    updateFilters,
    exportPlanning,
    getUpcomingEvents 
  } = usePharmacyPlanning();

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleExport = async () => {
    await exportPlanning('csv');
  };

  const upcomingEvents = getUpcomingEvents(5);

  return (
    <div>
      <select onChange={(e) => updateFilters({ type: e.target.value })}>
        <option value="Tous">Tous les types</option>
        <option value="Jour">Jour</option>
        <option value="Nuit">Nuit</option>
      </select>
      
      {events.map(event => (
        <div key={event.id}>
          {event.title} - {event.start}
        </div>
      ))}
    </div>
  );
};
```

## Types Exportés

Tous les types TypeScript sont exportés depuis le fichier `index.ts` pour faciliter l'importation :

```typescript
import { 
  GardeEvent, 
  DashboardStats, 
  GardeData, 
  PharmacyProfile,
  PlanningEvent 
} from '../hooks';
```

## Endpoints API Utilisés

Les hooks utilisent les endpoints suivants :

### Dashboard
- `GET /pharmacy/dashboard/stats` - Statistiques du tableau de bord
- `GET /pharmacy/gardes/upcoming` - Gardes à venir
- `GET /pharmacy/gardes/today` - Pharmacies en garde aujourd'hui

### Gardes
- `GET /pharmacy/gardes` - Liste des gardes
- `POST /pharmacy/gardes` - Créer une garde
- `PUT /pharmacy/gardes/:id` - Mettre à jour une garde
- `DELETE /pharmacy/gardes/:id` - Supprimer une garde

### Profil
- `GET /pharmacy/profile` - Récupérer le profil
- `PUT /pharmacy/profile` - Mettre à jour le profil
- `PUT /pharmacy/profile/password` - Changer le mot de passe
- `PUT /pharmacy/profile/email` - Changer l'email
- `PUT /pharmacy/profile/2fa` - Toggle 2FA
- `PUT /pharmacy/profile/support-access` - Toggle accès support
- `POST /pharmacy/profile/logout-all` - Déconnexion de tous les appareils
- `DELETE /pharmacy/profile` - Supprimer le compte
- `PUT /pharmacy/profile/avatar` - Upload avatar

### Planning
- `GET /pharmacy/planning/events` - Événements du planning
- `GET /pharmacy/planning/stats` - Statistiques du planning
- `GET /pharmacy/planning/export` - Export du planning

## Gestion d'Erreurs

Tous les hooks incluent une gestion d'erreurs robuste avec :
- Messages d'erreur localisés
- Logs détaillés pour le débogage
- États de chargement
- Retry automatique dans certains cas

## Validation

Les hooks utilisent des schémas de validation TypeScript pour :
- Validation des données d'entrée
- Messages d'erreur personnalisés
- Validation côté client avant envoi au serveur 