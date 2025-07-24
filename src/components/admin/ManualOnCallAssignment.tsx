import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DatePicker } from '../ui/date-picker';

const pharmacies = [
  { id: 1, name: 'Pharmacie du Centre' },
  { id: 2, name: 'Pharmacie Saint-Michel' },
];

export default function ManualOnCallAssignment() {
  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [type, setType] = useState('Jour');
  const [holder, setHolder] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [comment, setComment] = useState('');
  const [file, setFile] = useState<File | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] || null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // ... logique d'attribution
  }

  return (
    <motion.div className="min-h-[400px] flex items-center justify-center bg-gray-50 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        className="bg-white rounded-xl shadow-lg p-10 border w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-8">Attribuer une garde manuellement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1">Pharmacie</label>
            <select
              value={selectedPharmacy}
              onChange={e => setSelectedPharmacy(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-base"
            >
              <option value="">Sélectionner une pharmacie</option>
              {pharmacies.map(pharma => (
                <option key={pharma.id} value={pharma.id}>{pharma.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nom du titulaire</label>
            <input
              type="text"
              value={holder}
              onChange={e => setHolder(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-base"
              placeholder="Nom du titulaire"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type de garde</label>
            <select 
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-base"
            >
              <option value="Jour">Jour</option>
              <option value="Nuit">Nuit</option>
              <option value="Week-end">Week-end</option>
              <option value="Férié">Férié</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Heure de début</label>
            <input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Heure de fin</label>
            <input
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-base"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Commentaire (optionnel)</label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-base"
              placeholder="Ajouter un commentaire..."
              rows={2}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Pièce jointe (facultatif)</label>
            <input
              type="file"
              onChange={handleFile}
              className="w-full"
            />
            {file && <span className="mt-2 text-green-700 font-medium block">{file.name}</span>}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold shadow transition text-base"
          >
            Attribuer la garde
          </button>
        </div>
      </form>
    </motion.div>
  );
} 