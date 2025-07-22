import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function OnCallReportForm() {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
    setDate(''); setReason(''); setComment('');
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded shadow p-6">
        <div className="flex items-center gap-2 text-green-700 font-bold text-lg mb-2">
          <AlertCircle className="w-5 h-5" /> Signaler une garde
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date de la garde</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Motif</label>
          <input type="text" value={reason} onChange={e => setReason(e.target.value)} className="border rounded px-3 py-2 w-full" placeholder="Ex: indisponibilité" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Commentaire</label>
          <textarea value={comment} onChange={e => setComment(e.target.value)} className="border rounded px-3 py-2 w-full" rows={3} />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full font-semibold">Envoyer</button>
        {success && (
          <div className="flex items-center gap-2 text-green-700 mt-2">
            <CheckCircle className="w-5 h-5" /> Signalement envoyé !
          </div>
        )}
      </form>
    </div>
  );
} 