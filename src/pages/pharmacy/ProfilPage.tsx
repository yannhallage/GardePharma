
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useUserProfilePharmacy, useUpdateUserProfilePharmacy } from '@/hook/useUpdateProfilPharmacy';
import type { UserProfile } from '@/types/UserProfilePharmacy'
import toast from 'react-hot-toast';

const ProfilPage = () => {
  const { getProfilePharmacy } = useUserProfilePharmacy();
  const { updateProfilePharmacy } = useUpdateUserProfilePharmacy();

  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getProfilePharmacy();
      setFormData(data);
    };
    loadProfile();
  }, []);

  const handleSubmit = async () => {
    try {
      const updated = await updateProfilePharmacy(formData);
      toast.success('Profil mis à jour avec succès');
      setFormData(updated);
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="w-full flex justify-center bg-neutral-50 py-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-8">Account Settings</h2>
        {/* My Profile */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">My Profile</h3>
          <div className="flex items-center gap-6 mb-4">
            <img src="https://media.designrush.com/inspiration_images/549120/conversions/Pharma_ee5626592827-desktop.jpg" alt="avatar" className="w-16 h-16 rounded-full object-cover border" />
            <div className="flex gap-2">
              <Button type="button" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 px-3 py-1 text-sm">+ Change Image</Button>
              <Button type="button" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 px-3 py-1 text-sm">Remove Image</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nom de la pharmacie</Label>
              <Input type="text" defaultValue={formData.firstName} />
            </div>
            <div>
              <Label>Nom du responsable</Label>
              <Input type="text" defaultValue={formData.lastName} />
            </div>
            <div>
              <Label>Commune</Label>
              <Input type="text" defaultValue={formData.lastName} />
            </div>
          </div>
        </div>
        {/* Account Security */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Account Security</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <Label>Email</Label>
              <Input type="email" value="brianfrederin@email.com" readOnly className="bg-neutral-100" />
            </div>
            <div className="items-end h-full hidden">
              <Button type="button" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 px-3 py-1 text-sm">Change email</Button>
            </div>
            <div>
              <Label>Mot de passe</Label>
              <Input type="password" value="********" readOnly className="bg-neutral-100" />
            </div>
            <div>
              <Label>Numero de téléphone</Label>
              <Input type="text" value="+225 0747170370" readOnly className="bg-neutral-100" />
            </div>
            <div className="flex items-end h-full">
              <Button type="button" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 px-3 py-1 text-sm"
                onClick={handleSubmit}
              >Save changements</Button>
            </div>
          </div>
        </div>
        {/* 2-Step Verifications */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">2-Step Verifications</h3>
          <div className="flex items-center gap-4">
            <span>Add an additional layer of security to your account during login.</span>
            <label className="inline-flex items-center cursor-pointer ml-auto">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-neutral-200 rounded-full peer peer-checked:bg-primary-600 transition-all"></div>
              <div className="absolute ml-1 mt-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all"></div>
            </label>
          </div>
        </div>
        {/* Support Access */}
        <div className="mb-8">
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
      </div>
    </div>
  );
}

export default ProfilPage; 