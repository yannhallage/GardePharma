import React, { useState } from 'react';
import { UserCircle, CheckCircle } from 'lucide-react';

export default function PharmacyProfileForm() {
  const [name, setName] = useState('Pharmacie du Centre');
  const [address, setAddress] = useState('123 Rue de la Paix, Paris');
  const [phone, setPhone] = useState('01 23 45 67 89');
  const [email, setEmail] = useState('contact@pharmacie.fr');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <UserCircle className="w-12 h-12 text-green-600" />
          <div>
            <div className="text-lg font-bold text-green-800">{name}</div>
            <div className="text-green-600 text-sm">{email}</div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nom de la pharmacie</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Adresse</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Téléphone</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="border rounded px-3 py-2 w-full" required />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full font-semibold">Enregistrer</button>
        {success && (
          <div className="flex items-center gap-2 text-green-700 mt-2">
            <CheckCircle className="w-5 h-5" /> Profil mis à jour !
          </div>
        )}
      </form>
    </div>
  );
} 