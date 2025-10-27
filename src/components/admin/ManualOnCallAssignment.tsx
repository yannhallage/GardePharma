import React, { useState, useEffect } from 'react';
import { useCreateGarde } from '@/hooks/useCreerGarde';
import { motion } from 'framer-motion';
import { DatePicker } from '../ui/date-picker';
import { useGetAllPharmacy } from '@/hooks/useGetAllPharmacy';
import { getSession } from '@/helpers/local-storage';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

export default function ManualOnCallAssignment() {
  const [formData, setFormData] = useState({
    pharmacy_id: '',
    holder_name: '',
    date: '',
    type: 'Jour',
    comment: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { create, loading, error: createError, success } = useCreateGarde();
  const { data: pharmacies = [], error: pharmaciesError } = useGetAllPharmacy(getSession()?.userId ?? undefined);

  // Lorsqu'on change la pharmacie sélectionnée, on met à jour holder_name avec chef_pharmacie
  useEffect(() => {
    if (formData.pharmacy_id) {
      const selectedPharmacy = pharmacies.find(p => p.identification === formData.pharmacy_id);
      if (selectedPharmacy) {
        setFormData(prev => ({ ...prev, holder_name: selectedPharmacy.chef_pharmacie || '' }));
        setErrors(prev => ({ ...prev, holder_name: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, holder_name: '' }));
    }
  }, [formData.pharmacy_id, pharmacies]);

  // Reset formulaire après succès
  useEffect(() => {
    if (success) {
      setFormData({
        pharmacy_id: '',
        holder_name: '',
        date: '',
        type: 'Jour',
        comment: '',
      });
    }
  }, [success]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleDateChange = (date: Date | undefined) => {
    const formatted = date ? date.toISOString().split('T')[0] : '';
    handleInputChange('date', formatted);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.pharmacy_id) newErrors.pharmacy_id = 'La pharmacie est requise';
    if (!formData.holder_name) newErrors.holder_name = 'Le nom du titulaire est requis';
    if (!formData.date) newErrors.date = 'La date est requise';
    if (!formData.type) newErrors.type = 'Le type de garde est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [chargement, setChargement] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedPharmacy = pharmacies.find(p => p.identification === formData.pharmacy_id);
    if (!selectedPharmacy) {
      alert("Pharmacie introuvable");
      return;
    }

    const userId = getSession()?.userId;
    if (!userId) {
      alert("Utilisateur non authentifié");
      return;
    }

    setChargement(true);

    console.log(selectedPharmacy)
    try {
      await create(
        {
          reference: uuidv4(),
          date: new Date(`${formData.date}T00:00:00.000Z`).toISOString(),
          type: formData.type,
          nom_pharmacie: selectedPharmacy.nom_pharmacie,
          responsable: `${selectedPharmacy.nom_pharmacie}. ${formData.holder_name}`,
          commune: selectedPharmacy.commune,
          userId: selectedPharmacy.id,
          identification_pharma: selectedPharmacy.identification ?? '',
          statut: 'en cours',
          commentaire:
            formData.comment ||
            `Garde de ${formData.type.toLowerCase()} attribuée pour la ${selectedPharmacy.nom_pharmacie}.`,
        },
        userId
      );

      toast.success("La garde a été créée avec succès");

      setFormData({
        pharmacy_id: '',
        holder_name: '',
        date: '',
        type: 'Jour',
        comment: '',
      });

    } catch {
      toast.error('Un problème a été rencontré lors de la création de la garde ❌');
    } finally {
      setChargement(false);
    }
  };


  return (
    <motion.div className="min-h-[400px] flex items-center justify-center bg-gray-50 py-10">
      <form
        className="bg-white rounded-xl shadow-lg p-10 border w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-base font-semibold mb-8">Attribuer une garde manuellement</h2>

        {pharmaciesError && (
          <div className="mb-4 text-red-600 text-sm">Erreur chargement des pharmacies : {pharmaciesError}</div>
        )}

        {success && (
          <div className="mb-4 text-green-600 text-sm">Garde attribuée avec succès !</div>
        )}

        {createError && (
          <div className="mb-4 text-red-600 text-sm">Erreur : {createError}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <div>
            <label className="block text-sm font-medium mb-1">Pharmacie</label>
            <select
              name="pharmacy_id"
              value={formData.pharmacy_id}
              onChange={e => handleInputChange('pharmacy_id', e.target.value)}
              className={`w-full px-5 py-3 rounded-lg border ${errors.pharmacy_id ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
            >
              <option value="">Sélectionner une pharmacie</option>
              {pharmacies.map(pharma => (
                <option key={pharma.identification} value={pharma.identification}>
                  {pharma.nom_pharmacie} - Responsable: {pharma.chef_pharmacie}
                </option>
              ))}
            </select>
            {errors.pharmacy_id && <div className="text-red-500 text-xs mt-1">{errors.pharmacy_id}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <DatePicker
              value={formData.date ? new Date(formData.date) : undefined}
              onChange={handleDateChange}
              placeholder="Choisir une date"
            />
            {errors.date && <div className="text-red-500 text-xs mt-1">{errors.date}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type de garde</label>
            <select
              name="type"
              value={formData.type}
              onChange={e => handleInputChange('type', e.target.value)}
              className={`w-full px-5 py-3 rounded-lg border ${errors.type ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
            >
              <option value="Jour">Jour</option>
              <option value="Nuit">Nuit</option>
              <option value="Week-end">Week-end</option>
              <option value="Férié">Férié</option>
            </select>
            {errors.type && <div className="text-red-500 text-xs mt-1">{errors.type}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nom du titulaire</label>
            <input
              type="text"
              name="holder_name"
              value={formData.holder_name}
              onChange={e => handleInputChange('holder_name', e.target.value)}
              className={`w-full px-5 py-3 rounded-lg border ${errors.holder_name ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
            />
            {errors.holder_name && <div className="text-red-500 text-xs mt-1">{errors.holder_name}</div>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Commentaire (optionnel)</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={e => handleInputChange('comment', e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm"
              placeholder="Ajouter un commentaire..."
              rows={2}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold shadow transition text-sm"
            disabled={loading}
          >
            {loading ? 'Attribution...' : 'Attribuer la garde'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
