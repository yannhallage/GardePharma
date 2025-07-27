import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';

const COMMUNES_CI = [
  'Abobo', 'Adjamé', 'Anyama', 'Attécoubé', 'Bingerville', 'Cocody', 'Koumassi', 'Marcory', 'Plateau', 'Port-Bouët', 'Treichville', 'Yopougon',
  'Bouaké', 'Daloa', 'San Pedro', 'Korhogo', 'Man', 'Gagnoa', 'Soubré', 'Agboville', 'Divo', 'Abengourou', 'Grand-Bassam', 'Bondoukou', 'Odienné', 'Séguéla', 'Ferkessédougou', 'Sinfra', 'Issia', 'Sassandra', 'Boundiali', 'Aboisso', 'Toumodi', 'Daoukro', 'Dimbokro', 'Guiglo', 'Bouna', 'Akoupé', 'Vavoua', 'Tiassalé', 'Danané', 'Touba', 'Mankono', 'Agboville', 'Dabou', 'Tabou', 'Bangolo', 'Duékoué', 'Tanda', 'Béoumi', 'Zuénoula', 'Lakota', 'Oumé', 'Sakassou', 'Tiebissou', 'Arrah', 'Bocanda', 'Bongouanou', 'Didiévi', 'Djekanou', 'Guitry', 'Jacqueville', 'Katiola', 'Koun-Fao', 'Madinani', 'Minignan', 'Prikro', 'Sakassou', 'San-Pedro', 'Sassandra', 'Sinfra', 'Soubre', 'Tabou', 'Tanda', 'Tiassalé', 'Touba', 'Toumodi', 'Vavoua', 'Yamoussoukro'
];

function showToast(message: string, type: 'success' | 'error') {
  alert(message); // Remplace par un vrai toast si tu as un composant toast
}

export default function PharmacyAccountsManager() {
  const [form, setForm] = useState({
    nom_pharmacie: '',
    email: '',
    lieu: '',
    chef_pharmacie: '',
    commune: '',
    numero: '',
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs: { [k: string]: string } = {};
    if (!form.nom_pharmacie.trim()) errs.nom_pharmacie = 'Le nom de la pharmacie est requis';
    if (!form.email.trim()) errs.email = 'L\'email est requis';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Format d\'email invalide';
    if (!form.lieu.trim()) errs.lieu = 'Le lieu est requis';
    if (!form.chef_pharmacie.trim()) errs.chef_pharmacie = 'Le chef pharmacie est requis';
    if (!form.commune.trim()) errs.commune = 'La commune est requise';
    if (!form.numero.trim()) errs.numero = 'Le numéro est requis';
    return errs;
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      setForm({ nom_pharmacie: '', email: '', lieu: '', chef_pharmacie: '', commune: '', numero: '' });
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
        <h2 className="text-base font-semibold mb-8">Ajouter une pharmacie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="nom_pharmacie" className="block text-sm font-medium mb-1">Nom de la pharmacie</label>
            <input
              id="nom_pharmacie"
              name="nom_pharmacie"
              value={form.nom_pharmacie}
              onChange={handleInput}
              className={`w-full px-5 py-3 rounded-lg border ${errors.nom_pharmacie ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
              placeholder="Nom de la pharmacie"
              aria-invalid={!!errors.nom_pharmacie}
              aria-describedby={errors.nom_pharmacie ? 'nom_pharmacie-error' : undefined}
            />
            {errors.nom_pharmacie && <div id="nom_pharmacie-error" className="text-red-500 text-xs mt-1">{errors.nom_pharmacie}</div>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleInput}
              className={`w-full px-5 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
              placeholder="Email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <div id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</div>}
          </div>
          <div>
            <label htmlFor="lieu" className="block text-sm font-medium mb-1">Lieu</label>
            <input
              id="lieu"
              name="lieu"
              value={form.lieu}
              onChange={handleInput}
              className={`w-full px-5 py-3 rounded-lg border ${errors.lieu ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
              placeholder="Lieu"
              aria-invalid={!!errors.lieu}
              aria-describedby={errors.lieu ? 'lieu-error' : undefined}
            />
            {errors.lieu && <div id="lieu-error" className="text-red-500 text-xs mt-1">{errors.lieu}</div>}
          </div>
          <div>
            <label htmlFor="chef_pharmacie" className="block text-sm font-medium mb-1">Chef pharmacie</label>
            <input
              id="chef_pharmacie"
              name="chef_pharmacie"
              value={form.chef_pharmacie}
              onChange={handleInput}
              className={`w-full px-5 py-3 rounded-lg border ${errors.chef_pharmacie ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
              placeholder="Chef pharmacie"
              aria-invalid={!!errors.chef_pharmacie}
              aria-describedby={errors.chef_pharmacie ? 'chef_pharmacie-error' : undefined}
            />
            {errors.chef_pharmacie && <div id="chef_pharmacie-error" className="text-red-500 text-xs mt-1">{errors.chef_pharmacie}</div>}
          </div>
          <div>
            <label htmlFor="commune" className="block text-sm font-medium mb-1">Commune</label>
            <select
              id="commune"
              name="commune"
              value={form.commune}
              onChange={handleInput}
              className={`w-full px-5 py-3 rounded-lg border ${errors.commune ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
              aria-invalid={!!errors.commune}
              aria-describedby={errors.commune ? 'commune-error' : undefined}
            >
              <option value="">Sélectionner la commune</option>
              {COMMUNES_CI.map((commune) => (
                <option key={commune} value={commune}>{commune}</option>
              ))}
            </select>
            {errors.commune && <div id="commune-error" className="text-red-500 text-xs mt-1">{errors.commune}</div>}
          </div>
          <div>
            <label htmlFor="numero" className="block text-sm font-medium mb-1">Numéro</label>
            <input
              id="numero"
              name="numero"
              value={form.numero}
              onChange={handleInput}
              className={`w-full px-5 py-3 rounded-lg border ${errors.numero ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
              placeholder="Numéro"
              aria-invalid={!!errors.numero}
              aria-describedby={errors.numero ? 'numero-error' : undefined}
            />
            {errors.numero && <div id="numero-error" className="text-red-500 text-xs mt-1">{errors.numero}</div>}
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