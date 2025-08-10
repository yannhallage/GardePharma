import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { getSession, updateSessionValue } from '@/helpers/local-storage';
import { useUpdateUserProfilePharmacy } from '@/hooks/useUpdateProfilPharmacy';
import toast from 'react-hot-toast';

const ProfilPage = () => {
  const session = getSession();
  const { updateProfilePharmacy } = useUpdateUserProfilePharmacy();

  const [textChange, setTextChange] = useState("Save changements")
  const [formData, setFormData] = useState({
    nom_pharmacie: session?.userNom || '',
    chef_pharmacie: session?.userPrenom || '',
    email: session?.userEmail || '',
    numero: session?.userNumero || '',
    password: 'motdepasse',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    try {
      // Mise à jour du localStorage
      updateSessionValue('userNom', formData.nom_pharmacie);
      updateSessionValue('userPrenom', formData.chef_pharmacie);
      updateSessionValue('userEmail', formData.email);
      updateSessionValue('userNumero', formData.numero);

      // Appel de la fonction de mise à jour du profil
      updateProfilePharmacy(formData, session?.userId || '');

      setTextChange('Save changements..')
      setTimeout(() => {
        setTextChange('Save changements')
        toast.success('Profil mis à jour avec succès');
      }, 700)
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="w-full flex justify-center bg-neutral-50 py-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-8">Account Settings</h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">My Profile</h3>
          <div className="flex items-center gap-6 mb-4">
            <img
              src="https://media.designrush.com/inspiration_images/549120/conversions/Pharma_ee5626592827-desktop.jpg"
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div className="flex gap-2">
              <Button type="button" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 px-3 py-1 text-sm">
                + Change Image
              </Button>
              <Button type="button" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 px-3 py-1 text-sm">
                Remove Image
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nom de la pharmacie</Label>
              <Input
                type="text"
                name="nom"
                value={formData.nom_pharmacie}
                onChange={handleChange}
                placeholder="Nom de la pharmacie"
              />
            </div>
            <div>
              <Label>Nom du responsable</Label>
              <Input
                type="text"
                name="prenom"
                value={formData.chef_pharmacie}
                onChange={handleChange}
                placeholder="Nom du responsable"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Account Security</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <Label>Email</Label>
              <Input type="email" name="email" value={formData.email} className="bg-neutral-100" />
            </div>
            <div className="items-end h-full hidden">
              <Button
                type="button"
                className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 px-3 py-1 text-sm"
              >
                Change email
              </Button>
            </div>
            <div>
              <Label>Mot de passe</Label>
              <Input type="password" value={formData.password} className="bg-neutral-100" />
            </div>
            <div>
              <Label>Numéro de téléphone</Label>
              <Input type="text" name="numero" value={formData.numero} className="bg-neutral-100" />
            </div>
            <div className="flex items-end h-full">
              <Button
                type="button"
                className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 px-3 py-1 text-sm"
                onClick={handleSubmit}
              >
                {
                  textChange
                }
              </Button>
            </div>
          </div>
        </div>


        <h3 className="text-lg font-semibold mb-4">Support Access</h3>
        <div className="flex items-center gap-4 mb-4">
          <span>Support access</span>
          <label className="inline-flex items-center cursor-pointer ml-auto">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-neutral-200 rounded-full peer peer-checked:bg-primary-600 transition-all"></div>
            <div className="absolute ml-1 mt-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all"></div>
          </label>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span>Log out of all devices</span>
          <Button type="button" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 px-3 py-1 text-sm">Log out</Button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-red-600">Delete my account</span>
          <Button type="button" className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 text-sm">Delete Account</Button>
        </div>
      </div>
    </div >
  );
};

export default ProfilPage;
