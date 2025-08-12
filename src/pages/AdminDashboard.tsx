import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Info, Calendar } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, ClipboardList, Settings, LogOut, PlusCircle, Users, Bell, UserCog, Home, History, BellDot } from 'lucide-react';
import { Button } from '../components/ui/button';
import FullCalendarView from '../components/admin/FullCalendarView';
import ExportPlanningButton from '../components/admin/ExportPlanningButton';
import PharmacyAccountsManager from '../components/admin/PharmacyAccountsManager';
import RoleManager from '../components/admin/RoleManager';
// import AccessRightsManager from '../components/admin/AccessRightsManager';
import ManualOnCallAssignment from '../components/admin/ManualOnCallAssignment';
import GuardsSection from '../components/admin/GuardsSection';

import { motion } from 'framer-motion';
import AdminHistory from '../components/admin/AdminHistory';
import ProfileForm from '../components/admin/ProfileForm';
import { getSession, removeSession } from '@/helpers/local-storage';
import toast from 'react-hot-toast';
import { useNotifications } from '@/hooks/useNotifications';
// import { Label } from '@/components/ui/label';

const adminName = 'Administrateur';
const navItems = [
  { icon: Home, label: 'Dashboard', key: 'Dashboard' },
  { icon: CalendarIcon, label: 'Calendrier', key: 'Calendrier' },
  { icon: Users, label: 'Pharmacies', key: 'Pharmacies' },
  { icon: ClipboardList, label: 'Gardes', key: 'Gardes' },
  { icon: UserCog, label: 'Rôles', key: 'Rôles' },
  { icon: CalendarIcon, label: 'Attribution', key: 'Attribution' },
  // { icon: Bell, label: 'Notification', key: 'Notification' },
  { icon: History, label: 'Historique', key: 'Historique' },
  { icon: Settings, label: 'Profil', key: 'Profil' },
];

interface NotificationsDialogExampleProps {
  open: boolean;
  onClose: () => void;
}

const logoUrl = "https://media.designrush.com/inspiration_images/549120/conversions/Pharma_ee5626592827-desktop.jpg";

const AdminLayout: React.FC<{ tab: string; setTab: (t: string) => void; children: React.ReactNode }> = ({ tab, setTab, children }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <img src={logoUrl} alt="GardePharma" className="w-10 h-10 rounded-lg object-cover shadow" />
              <h1 className="text-xl font-bold text-green-600 tracking-tight">GardePharma Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-700 font-semibold">{adminName}</span>
              <img src={logoUrl} alt="Admin" className="w-10 h-10 rounded-full border-2 border-green-200" />
              <span className="font-semibold cursor-pointer"
                onClick={() => {
                  setOpenModal(true)
                }}
              ><Bell /></span>
              <Button variant="outline" size="sm" className="flex items-center gap-2"
                onClick={() => {
                  removeSession()
                  navigate('/login')
                  
                }}
              >
                <LogOut className="h-4 w-4 mr-2" /> Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Navigation */}
      <nav className="bg-white border-b border-green-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => setTab(item.key)}
                whileHover={{ scale: 1.08 }}
                className={`flex items-center px-3 py-4 text-sm font-medium transition-colors border-b-2 ${tab === item.key ? 'text-green-700 border-green-600 bg-green-50' : 'text-neutral-600 border-transparent hover:text-green-700 hover:border-green-400'}`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <NotificationsDialogExample
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
      {/* <NotificationsDialogExample /> */}
    </div>
  );
}


const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AdminDashboard() {
  const [tab, setTab] = useState('Dashboard');
  // const [openModal, setOpenModal] = useState(false);


  let content = null;
  if (tab === 'Dashboard') content = (
    <motion.div {...sectionMotion}>
      <h2 className="text-2xl font-bold text-green-800 mb-6">Bienvenue sur le dashboard administrateur</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Pharmacies actives" value="12" />
        <StatCard label="Gardes à venir" value="8" />
        <StatCard label="Demandes en attente" value="3" />
      </div>
      <div className="flex gap-4 mb-8">
        <ExportPlanningButton />
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded shadow font-semibold transition text-sm">
          <PlusCircle className="h-4 w-4" /> Ajouter une garde
        </Button>
      </div>
    </motion.div>
  );
  else if (tab === 'Calendrier') content = (
    <motion.div {...sectionMotion}>
      <FullCalendarView />
    </motion.div>
  );
  else if (tab === 'Pharmacies') content = (
    <motion.div {...sectionMotion}>
      <PharmacyAccountsManager />
    </motion.div>
  );
  else if (tab === 'Gardes') content = (
    <motion.div {...sectionMotion}>
      <GuardsSection />
    </motion.div>
  );
  else if (tab === 'Rôles') content = (
    <motion.div {...sectionMotion}>
      <RoleManager />
    </motion.div>
  );
  else if (tab === 'Attribution') content = (
    <motion.div {...sectionMotion}>
      <ManualOnCallAssignment />
    </motion.div>
  );
  else if (tab === 'Historique') content = (
    <motion.div {...sectionMotion}>
      <AdminHistory />
    </motion.div>
  );
  else if (tab === 'Profil') content = (
    <motion.div {...sectionMotion}>
      <ProfileFormSection />
    </motion.div>
  );

  return (
    <AdminLayout tab={tab} setTab={setTab}>
      {content}
    </AdminLayout>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-green-100"
    >
      <div className="text-2xl font-bold text-green-700 mb-2">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </motion.div>
  );
}

function ProfileFormSection() {
  return (
    <ProfileForm
      initialData={{
        nom: "Dupont",
        prenom: "Jean",
        email: "admin@gardepharma.com",
        avatar_url: logoUrl
      }}
    />
  );
}



// const NotificationAdmin = ({ open, onClose }: ReportModalProps) => {
//   const [dateGarde, setDateGarde] = useState("");
//   const [type, setType] = useState("Jour");
//   const [comment, setComment] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!dateGarde || !type) {
//       toast.error("Veuillez remplir tous les champs obligatoires");
//       return;
//     }

//     try {
//       // await create(gardeData);
//       toast.success("Garde signalée avec succès !");
//       onClose();
//       setDateGarde("");
//       setType("Jour");
//       setComment("");
//     } catch {
//       toast.error("Une erreur est survenue lors de la création de la garde");
//       onClose();
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Notification</DialogTitle>
//         </DialogHeader>

//         <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
//           <div>
//             <Label>Date de garde</Label>
//             <Input type="date" value={dateGarde} onChange={(e) => setDateGarde(e.target.value)} />
//           </div>

//           <div>
//             <Label>Type de garde</Label>
//             <Select value={type} onValueChange={setType}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Sélectionner un type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Jour">Jour</SelectItem>
//                 <SelectItem value="Nuit">Nuit</SelectItem>
//                 <SelectItem value="Week-end">Week-end</SelectItem>
//                 <SelectItem value="Férié">Férié</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label>Commentaire (optionnel)</Label>
//             <Input
//               type="text"
//               placeholder="Commentaire"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//             />
//           </div>

//           <DialogFooter>
//             <Button
//               type="submit"
//               className="bg-primary-600 text-white hover:bg-primary-700 h-8 px-3 py-1 text-sm rounded"
//             >
//               Soumettre ma demande
//             </Button>
//           </DialogFooter>
//         </form>

//         <div className="mt-6 text-yellow-700 bg-yellow-50 border border-yellow-100 rounded px-4 py-2 text-sm">
//           En attente de validation de l’administrateur
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };



export function NotificationsDialogExample({ open, onClose }: NotificationsDialogExampleProps) {
  const { notifications, loading } = useNotifications();

  return (
    <div className="p-6">
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-2 min-h-[100px]">
            {loading && <p className="text-center text-gray-500">Chargement des notifications...</p>}

            {!loading && notifications.length === 0 && (
              <p className="text-center text-gray-400 italic">Aucune notification pour le moment.</p>
            )}

            {!loading && notifications.length > 0 && notifications.map((notif, index) => {
              // Déterminer le titre en fonction du message (exemple)
              let title = 'Information';
              if (/validation/i.test(notif.message)) title = 'Validation';
              else if (/alerte/i.test(notif.message)) title = 'Alerte';
              else if (/rappel/i.test(notif.message)) title = 'Rappel';

              // Icônes et couleurs selon le titre
              let icon, bgColor, textColor;
              switch (title) {
                case 'Validation':
                  icon = <CheckCircle className="text-green-600 w-5 h-5" />;
                  bgColor = "bg-green-50";
                  textColor = "text-green-800";
                  break;
                case 'Alerte':
                  icon = <AlertTriangle className="text-red-600 w-5 h-5" />;
                  bgColor = "bg-red-50";
                  textColor = "text-red-800";
                  break;
                case 'Rappel':
                  icon = <Calendar className="text-blue-600 w-5 h-5" />;
                  bgColor = "bg-blue-50";
                  textColor = "text-blue-800";
                  break;
                default:
                  icon = <Info className="text-yellow-600 w-5 h-5" />;
                  bgColor = "bg-yellow-50";
                  textColor = "text-yellow-800";
              }

              return (
                <div
                  key={index}
                  className={`p-4 border border-gray-200 rounded-lg ${bgColor} hover:shadow-md transition`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className={`font-semibold ${textColor}`}>{title}</h3>
                        <span className="text-xs text-gray-500 bg-white border border-gray-200 rounded-full px-2 py-0.5">
                          {new Date(notif.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{notif.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <DialogFooter>
            <Button
              onClick={onClose}
              className="bg-primary-600 text-white hover:bg-primary-700"
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
