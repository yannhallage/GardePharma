import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';

function showToast(message: string, type: 'success' | 'error') {
  alert(message); // Remplace par un vrai toast si tu as un composant toast
}

export default function PharmacyAccountsManager() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    sex: '',
    file: null as File | null,
    website: '',
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs: { [k: string]: string } = {};
    if (!form.name.trim()) errs.name = 'Le nom est requis';
    if (!form.email.trim()) errs.email = 'L\'email est requis';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Format d\'email invalide';
    if (!form.phone.trim()) errs.phone = 'Le téléphone est requis';
    return errs;
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, file: e.target.files?.[0] || null });
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast('Veuillez corriger les erreurs du formulaire', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Pharmacie ajoutée avec succès !', 'success');
      setForm({ name: '', email: '', address: '', phone: '', sex: '', file: null, website: '' });
      setErrors({});
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      <form
        className="bg-white rounded-xl shadow-lg p-10 border w-full max-w-2xl"
        onSubmit={handleAdd}
        noValidate
      >
        <h2 className="text-xl font-semibold mb-8">Ajouter une pharmacie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Nom de la pharmacie</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleInput}
              className={`w-full px-5 py-3 rounded-lg border ${errors.name ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-base`}
              placeholder="Nom"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <div id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</div>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Téléphone</label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleInput}
              className={`w-full px-5 py-3 rounded-lg border ${errors.phone ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-base`}
              placeholder="Téléphone"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && <div id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone}</div>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleInput}
              className={`w-full px-5 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-base`}
              placeholder="Email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <div id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</div>}
          </div>
          <div>
            <label htmlFor="sex" className="block text-sm font-medium mb-1">Sexe</label>
            <select
              id="sex"
              name="sex"
              value={form.sex}
              onChange={handleInput}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-base"
            >
              <option value="">Sélectionner le sexe</option>
              <option value="F">Féminin</option>
              <option value="M">Masculin</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium mb-1">Adresse complète</label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleInput}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-base"
              placeholder="Adresse complète"
              rows={2}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="file" className="block text-sm font-medium mb-1">Fichier (facultatif)</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg py-6 cursor-pointer hover:border-green-400 transition">
              <UploadCloud className="w-8 h-8 text-green-400 mb-2" />
              <span className="text-gray-500 text-sm">Cliquez pour uploader ou glissez-déposez<br />PDF, JPG, PNG</span>
              <input id="file" type="file" className="hidden" onChange={handleFile} />
              {form.file && <span className="mt-2 text-green-700 font-medium">{form.file.name}</span>}
            </label>
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium mb-1">Site web (optionnel)</label>
            <input
              id="website"
              name="website"
              value={form.website}
              onChange={handleInput}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition text-base"
              placeholder="ex: www.pharmacie.com"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold shadow transition text-base"
            disabled={loading}
          >
            {loading ? 'Ajout...' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>
  );
} 