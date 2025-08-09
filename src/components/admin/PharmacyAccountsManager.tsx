import React, { useState } from 'react';
import { useAddPharmacyUser } from '../../hooks/useAddPharmacyUser';

import toast from 'react-hot-toast';
import { getSession } from '@/helpers/local-storage';

const COMMUNES_CI = [
  'Abobo', 'Adjamé', 'Anyama', 'Attécoubé', 'Bingerville', 'Cocody', 'Koumassi', 'Marcory', 'Plateau', 'Port-Bouët', 'Treichville', 'Yopougon',
  'Bouaké', 'Daloa', 'San Pedro', 'Korhogo', 'Man', 'Gagnoa', 'Soubré', 'Agboville', 'Divo', 'Abengourou', 'Grand-Bassam', 'Bondoukou', 'Odienné', 'Séguéla', 'Ferkessédougou', 'Sinfra', 'Issia', 'Sassandra', 'Boundiali', 'Aboisso', 'Toumodi', 'Daoukro', 'Dimbokro', 'Guiglo', 'Bouna', 'Akoupé', 'Vavoua', 'Tiassalé', 'Danané', 'Touba', 'Mankono', 'Agboville', 'Dabou', 'Tabou', 'Bangolo', 'Duékoué', 'Tanda', 'Béoumi', 'Zuénoula', 'Lakota', 'Oumé', 'Sakassou', 'Tiebissou', 'Arrah', 'Bocanda', 'Bongouanou', 'Didiévi', 'Djekanou', 'Guitry', 'Jacqueville', 'Katiola', 'Koun-Fao', 'Madinani', 'Minignan', 'Prikro', 'San-Pedro', 'Sassandra', 'Sinfra', 'Soubre', 'Tabou', 'Tanda', 'Tiassalé', 'Touba', 'Toumodi', 'Vavoua', 'Yamoussoukro'
];

export default function PharmacyAccountsManager() {
  const [formData, setFormData] = useState({
    // identification: '',
    nom_pharmacie: '',
    email: '',
    chef_pharmacie: '',
    commune: '',
    numero: '',
  });

  const [errors, setErrors] = useState({
    // identification: '',
    nom_pharmacie: '',
    email: '',
    chef_pharmacie: '',
    commune: '',
    numero: '',
  });

  const { add, loading } = useAddPharmacyUser();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {
      // identification: !formData.identification ? 'L\'identifiant est requis' : '',
      nom_pharmacie: !formData.nom_pharmacie ? 'Le nom est requis' : '',
      email: !formData.email ? 'L\'email est requis' : '',
      chef_pharmacie: !formData.chef_pharmacie ? 'Le chef pharmacie est requis' : '',
      commune: !formData.commune ? 'La commune est requise' : '',
      numero: !formData.numero ? 'Le numéro est requis' : '',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(err => err === '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    const session = getSession()?.userId ?? undefined;
    if (!session) return console.log('Session non valide. Veuillez vous connecter.');

    try {
      await add(formData, session);
      setFormData({
        // identification: '',
        nom_pharmacie: '',
        email: '',
        chef_pharmacie: '',
        commune: '',
        numero: ''
      });
      toast.success("Pharmacie ajoutée avec succès !");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la pharmacie.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      <form
        className="bg-white rounded-xl shadow-lg p-10 border w-full max-w-2xl"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="text-base font-semibold mb-8">Ajouter une pharmacie</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {['nom_pharmacie', 'email', 'chef_pharmacie', 'numero'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium mb-1">
                {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>
              <input
                id={field}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleInput}
                className={`w-full px-5 py-3 rounded-lg border ${errors[field as keyof typeof errors] ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
                placeholder={field.replace('_', ' ')}
              />
              {errors[field as keyof typeof errors] && (
                <div className="text-red-500 text-xs mt-1">
                  {errors[field as keyof typeof errors]}
                </div>
              )}
            </div>
          ))}

          <div>
            <label htmlFor="commune" className="block text-sm font-medium mb-1">
              Commune
            </label>
            <select
              id="commune"
              name="commune"
              value={formData.commune}
              onChange={handleInput}
              className={`w-full px-5 py-3 rounded-lg border ${errors.commune ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
            >
              <option value="">Sélectionner la commune</option>
              {[...new Set(COMMUNES_CI)].map((commune) => (
                <option key={commune} value={commune}>
                  {commune}
                </option>
              ))}
            </select>
            {errors.commune && (
              <div className="text-red-500 text-xs mt-1">{errors.commune}</div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold shadow transition text-sm"
            disabled={loading}
          >
            {loading ? 'Ajout...' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>

  );
}
