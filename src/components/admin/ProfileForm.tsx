
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProfileFormProps {
  initialData?: {
    nom: string;
    prenom: string;
    email: string;
    avatar_url?: string;
  };
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    nom: initialData?.nom || '',
    prenom: initialData?.prenom || '',
    email: initialData?.email || '',
  });

  const [errors, setErrors] = useState({
    nom: '',
    prenom: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatar(file);
  };

  const validate = () => {
    const newErrors = {
      nom: !formData.nom ? 'Le nom est requis' : '',
      prenom: !formData.prenom ? 'Le prénom est requis' : '',
      email: !formData.email ? 'L’email est requis' : '',
    };
    setErrors(newErrors);
    return !newErrors.nom && !newErrors.prenom && !newErrors.email;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      console.log("Données envoyées :", formData);
      if (avatar) {
        console.log("Fichier avatar :", avatar.name);
      }
      // success
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[400px] flex items-center justify-center bg-gray-50 py-10"
    >
      <form
        className="bg-white rounded-xl shadow-lg p-10 border w-full max-w-2xl"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="text-base font-semibold mb-8">Mon profil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs font-medium mb-1">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInput}
              placeholder="Nom"
              className={`w-full px-5 py-3 rounded-lg border ${errors.nom ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
            />
            {errors.nom && <div className="text-red-500 text-xs mt-1">{errors.nom}</div>}
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInput}
              placeholder="Prénom"
              className={`w-full px-5 py-3 rounded-lg border ${errors.prenom ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
            />
            {errors.prenom && <div className="text-red-500 text-xs mt-1">{errors.prenom}</div>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              placeholder="Email"
              className={`w-full px-5 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-200'} bg-gray-50 focus:border-green-500 focus:bg-white transition text-sm`}
            />
            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={initialData?.avatar_url || "/default-avatar.png"}
              alt="Avatar"
              className="w-16 h-16 rounded-full border-2 border-green-200 object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div>
            <div className="font-semibold text-green-700 text-sm">Administrateur</div>
            <div className="text-xs text-gray-500">{formData.email}</div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white rounded px-8 py-3 font-semibold shadow transition text-sm"
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
