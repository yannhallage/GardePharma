import React, { useState } from 'react';
import { useCreateGarde } from '@/hooks/useCreerGarde';
import { motion } from 'framer-motion';
import { DatePicker } from '../ui/date-picker';

const pharmacies = [
  { id: '1', name: 'Pharmacie du Centre', commune: 'Abobo' },
  { id: '2', name: 'Pharmacie Saint-Michel', commune: 'Cocody' },
];

export default function ManualOnCallAssignment() {
  const [formData, setFormData] = useState({
    pharmacy_id: '',
    holder_name: '',
    date: '',
    type: 'Jour',
    start_time: '',
    end_time: '',
    comment: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { create, loading } = useCreateGarde();

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
    if (!formData.start_time) newErrors.start_time = 'L’heure de début est requise';
    if (!formData.end_time) newErrors.end_time = 'L’heure de fin est requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedPharmacy = pharmacies.find(p => p.id === formData.pharmacy_id);
    if (!selectedPharmacy) {
      alert("Pharmacie introuvable");
      return;
    }

    try {
      await create({
        date: formData.date,
        type: formData.type as 'Jour' | 'Nuit' | 'Week-end' | 'Férié',
        nom_pharmacie: selectedPharmacy.name,
        responsable: formData.holder_name,
        commune: selectedPharmacy.commune,
        statut: 'En attente',
        commentaire: formData.comment,
      });

      alert("Garde attribuée avec succès !");
      setFormData({
        pharmacy_id: '',
        holder_name: '',
        date: '',
        type: 'Jour',
        start_time: '',
        end_time: '',
        comment: '',
      });
    } catch (error) {
      alert("Erreur lors de l’attribution de la garde.");
    }
  };

  return (
    <motion.div className="min-h-[400px] flex items-center justify-center bg-gray-50 py-10">
      <form
        className="bg-white rounded-xl shadow-lg p-10 border w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-base font-semibold mb-8">Attribuer une garde manuellement</h2>
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
                <option key={pharma.id} value={pharma.id}>{pharma.name}</option>
              ))}
            </select>
            {errors.pharmacy_id && <div className="text-red-500 text-xs mt-1">{errors.pharmacy_id}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nom du titulaire</label>
            <input
              type="text"
              name="holder_name"
              value={formData.holder_name}
              onChange={e => handleInputChange('holder_name', e.target.value)}
              className={`w-full px-5 py-3 rounded-lg border ${errors.holder_name ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
              placeholder="Nom du titulaire"
            />
            {errors.holder_name && <div className="text-red-500 text-xs mt-1">{errors.holder_name}</div>}
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
            <label className="block text-sm font-medium mb-1">Heure de début</label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={e => handleInputChange('start_time', e.target.value)}
              className={`w-full px-5 py-3 rounded-lg border ${errors.start_time ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
            />
            {errors.start_time && <div className="text-red-500 text-xs mt-1">{errors.start_time}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Heure de fin</label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={e => handleInputChange('end_time', e.target.value)}
              className={`w-full px-5 py-3 rounded-lg border ${errors.end_time ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
            />
            {errors.end_time && <div className="text-red-500 text-xs mt-1">{errors.end_time}</div>}
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
