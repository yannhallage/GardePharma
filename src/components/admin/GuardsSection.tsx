import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

import { MoreVertical, Trash2 } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { toast } from 'react-hot-toast';
import { useGardes } from '@/hooks/useGardes';
import { getSession } from '@/helpers/local-storage';

import { GardeService } from '@/services/gardeService';




interface ReportModalProps {
  open: boolean;
  onClose: () => void;
}

function statusLabel(status: string) {
  switch (status) {
    case 'en cours':
      return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">En cours</span>;
    case 'en attente':
      return <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1 rounded-full text-xs font-semibold">En attente</span>;
    default:
      return null;
  }
}

export default function GuardsSection() {
  // const [refreshKey, setRefreshKey] = useState(0);
  const { gardes, loading, error } = useGardes(getSession()?.userId ?? undefined, 'admin');

  const handleDelete = async (id: string, idGuard: string) => {
    try {

      const userSession = getSession()?.userId;
      if (!userSession) {
        toast.error("Utilisateur non identifié");
        return;
      }
      await GardeService.updateOrDeleteGarde({
        id_garde: idGuard,
        action: "delete",
        userId: id
      });

      toast.success('Garde supprimée');
    } catch (err) {
      toast.error('Erreur acceptation.');
    }
  };

  const handleAccept = async (id: string, idGuard: string) => {
    try {

      const userId = getSession()?.userId;
      if (!userId) {
        toast.error("Utilisateur non identifié");
        return;
      }

      await GardeService.updateOrDeleteGarde({
        id_garde: idGuard,
        action: "update",
        userId: id,
      });
      toast.success('Garde acceptée.');
    } catch (err) {
      toast.error('Erreur acceptation.');
    }
  };


  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Gestion des gardes</h2>

      {loading && (
        <div className="text-gray-500 text-sm py-8 text-center">Chargement des gardes...</div>
      )}

      {error && (
        <div className="text-red-500 text-sm py-8 text-center">Un probleme au niveau du serveur  : {error}</div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-2xl overflow-hidden shadow border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Pharmacie</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Titulaire</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Commentaire</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {gardes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-gray-400 py-8">
                    Aucune garde à afficher.
                  </td>
                </tr>
              ) : (
                gardes.map(guard => (
                  <tr key={guard._id} className={`border-b last:border-0 hover:bg-gray-100 transition group ${guard._id}`}>
                    <td className="px-4 py-3 font-medium text-gray-900">{guard.nom_pharmacie}</td>
                    <td className="px-4 py-3 text-gray-700">{guard.responsable}</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(guard.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-gray-600">{guard.type}</td>
                    <td className="px-4 py-3">{statusLabel(guard.statut)}</td>
                    <td className="px-4 py-3 text-gray-500 italic">{guard.commentaire || ''}</td>
                    <td className="px-4 py-3 relative">
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <button
                            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            aria-label="Actions"
                          >
                            <MoreVertical className="h-5 w-5 text-gray-700" />
                          </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content
                          align="end"
                          sideOffset={5}
                          className="bg-white border border-gray-200 rounded-xl shadow-lg min-w-[140px] z-50 py-1"
                        >
                          <DropdownMenu.Item
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 gap-2 cursor-pointer"
                            onSelect={() => handleDelete(guard.userId, guard._id || '')}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Supprimer
                          </DropdownMenu.Item>
                          {guard.statut === 'en attente' && (
                            <DropdownMenu.Item
                              className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-gray-100 gap-2 cursor-pointer"
                              onSelect={() => handleAccept(guard.userId, guard._id || '')}
                            >
                              <span className="h-4 w-4 mr-2 inline-block">✔️</span> Accepter <br />
                              {/* <span className="h-4 w-4 mr-2 inline-block">📝</span> Modifier */}
                            </DropdownMenu.Item>
                          )}
                          {guard.statut === 'en attente' && (
                            <DropdownMenu.Item
                              className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-gray-100 gap-2 cursor-pointer"
                              onSelect={() => handleAccept(guard.userId, guard._id || '')}
                            >
                              {/* <span className="h-4 w-4 mr-2 inline-block">✔️</span> Accepter <br /> */}
                              <span className="h-4 w-4 mr-2 inline-block">📝</span> Modifier
                            </DropdownMenu.Item>
                          )}
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const ReportModal = ({ open, onClose }: ReportModalProps) => {
  const [dateGarde, setDateGarde] = useState("");
  const [type, setType] = useState("Jour");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dateGarde || !type) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // const gardeData = {
    //   date: dateGarde,
    //   type,
    //   nom_pharmacie: "",
    //   responsable: "",
    //   commune: "",
    //   statut: "En attente", // majuscule cohérent avec ton back
    //   commentaire: comment,
    // };

    try {
      // await create(gardeData);
      toast.success("Garde signalée avec succès !");
      onClose();
      setDateGarde("");
      setType("Jour");
      setComment("");
    } catch {
      toast.error("Une erreur est survenue lors de la création de la garde");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Signaler une garde</DialogTitle>
        </DialogHeader>

        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <div>
            <Label>Date de garde</Label>
            <Input type="date" value={dateGarde} onChange={(e) => setDateGarde(e.target.value)} />
          </div>

          <div>
            <Label>Type de garde</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Jour">Jour</SelectItem>
                <SelectItem value="Nuit">Nuit</SelectItem>
                <SelectItem value="Week-end">Week-end</SelectItem>
                <SelectItem value="Férié">Férié</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Commentaire (optionnel)</Label>
            <Input
              type="text"
              placeholder="Commentaire"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-primary-600 text-white hover:bg-primary-700 h-8 px-3 py-1 text-sm rounded"
            >
              Soumettre ma demande
            </Button>
          </DialogFooter>
        </form>

        <div className="mt-6 text-yellow-700 bg-yellow-50 border border-yellow-100 rounded px-4 py-2 text-sm">
          En attente de validation de l’administrateur
        </div>
      </DialogContent>
    </Dialog>
  );
};