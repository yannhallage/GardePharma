// @ts-nocheck
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, ClipboardList, Settings, LogOut, PlusCircle, MapPin, Home, Bell } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import DashboardPage from './pharmacy/DashboardPage';
import PlanningPage from './pharmacy/PlanningPage';
import MesGardesPage from './pharmacy/MesGardesPage';
// import { setStorageItem } from "@/helpers/storageEvents";


import ProfilPage from './pharmacy/ProfilPage';
import History from '../components/pharmacy/History';
import toast from 'react-hot-toast';

import { useCreateGarde } from '@/hooks/useCreerGarde';
import { removeSession } from '@/helpers/local-storage';
import { getSession } from '@/helpers/local-storage';
import { NotificationsDialogExample } from './AdminDashboard';
// import { useNotifications } from '@/hooks/sockets/useNotifications';

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: Home, label: 'Accueil', key: 'Accueil' },
  { icon: CalendarIcon, label: 'Planning', key: 'Planning' },
  { icon: ClipboardList, label: `Mes Gardes`, key: 'Mes Gardes', showBadge: true },
  { icon: ClipboardList, label: 'Historique', key: 'Historique' },
  { icon: Settings, label: 'Modifier mon compte', key: 'Profil' },
];



const GARDE_EVENTS_FC = [
  {
    title: '🌙 Garde de nuit',
    start: '2025-07-05',
    display: 'list',
    backgroundColor: '#dcfce7',
    borderColor: '#dcfce7',
    textColor: '#166534',
  },
  {
    title: '🎉 Garde férié',
    start: '2025-07-13',
    backgroundColor: '#fee2e2',
    borderColor: '#fee2e2',
    textColor: '#991b1b',
  },
  {
    title: '🌙 Garde de nuit',
    start: '2025-07-20',
    backgroundColor: '#fef9c3',
    borderColor: '#fef9c3',
    textColor: '#a16207',
  },
];

const QuickStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <Card>
      <CardContent className="py-4">
        <div className="text-2xl font-bold text-blue-700">3</div>
        <div className="text-sm text-blue-700">Gardes prévues ce mois</div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="py-4">
        <div className="text-lg font-semibold text-green-700">12 juillet</div>
        <div className="text-sm text-green-700">Dernière garde</div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="py-4">
        <div className="text-lg font-semibold text-purple-700">26 juillet</div>
        <div className="text-sm text-purple-700">Prochaine garde</div>
      </CardContent>
    </Card>
  </div>
);

// const AccueilPage = () => {
//   const [pharmacyName, setPharmacyName] = useState(getSession()?.userNom ?? '')
//   return (
//     <div className="flex flex-col gap-8">
//       <Card>
//         <CardHeader>
//           <CardTitle>Bonjour, {pharmacyName}. Voici un résumé de vos prochaines gardes.</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <QuickStats />
//         </CardContent>
//       </Card>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Gardes à venir</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-600">
//                   <th className="py-2">Date</th>
//                   <th>Type</th>
//                   <th>État</th>
//                   <th>Observations</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {GARDE_EVENTS_FC.map((garde, i) => (
//                   <tr key={i} className="border-b last:border-0">
//                     <td className="py-2">{garde.start}</td>
//                     <td>{garde.title.includes('🌙') ? 'Nuit' : 'Férié'}</td>
//                     <td><span className={`px-2 py-1 rounded text-xs font-semibold ${garde.backgroundColor}`}>{garde.title.includes('🌙') ? 'En attente' : 'Refusée'}</span></td>
//                     <td>-</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle><MapPin className="mr-2 text-primary-600 inline" /> Pharmacies en garde aujourd'hui</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ul className="text-sm text-gray-700 space-y-2">
//               <li>Pharmacie du Centre</li>
//               <li>Pharmacie de la Gare</li>
//             </ul>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

const CustomToolbar = ({ label, onNavigate }) => (
  <div className="flex items-center justify-between px-4 py-2 bg-white border-b rounded-t-lg">
    <div className="flex items-center gap-2">
      <button onClick={() => onNavigate('PREV')} className="p-2 rounded hover:bg-neutral-100">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button onClick={() => onNavigate('TODAY')} className="px-3 py-1 rounded text-sm font-medium bg-neutral-100 hover:bg-neutral-200">Aujourd'hui</button>
      <button onClick={() => onNavigate('NEXT')} className="p-2 rounded hover:bg-neutral-100">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <span className="ml-4 text-lg font-semibold text-neutral-700">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <button className="px-3 py-1 rounded bg-neutral-100 text-sm font-medium hover:bg-neutral-200">Exporter CSV</button>
      <Button className="ml-2 bg-primary-600 text-white hover:bg-primary-700 h-8 px-3 py-1 text-sm rounded flex items-center gap-2"><PlusCircle className="h-4 w-4" />Ajouter une garde</Button>
    </div>
  </div>
);

const CustomEvent = ({ event }) => (
  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-1 ${event.color}`}
    style={{ background: event.color.includes('green') ? '#dcfce7' : event.color.includes('red') ? '#fee2e2' : '#fef9c3', color: event.color.includes('green') ? '#166534' : event.color.includes('red') ? '#991b1b' : '#a16207' }}>
    {event.type === 'Nuit' && <span>🌙</span>}
    {event.type === 'Férié' && <span>🎉</span>}
    <span>{event.title}</span>
  </div>
);

const CustomMonthDateCell = ({ children, value, currentMonth }) => (
  <div className={`h-24 min-h-[96px] p-1 border border-neutral-200 rounded-lg bg-white relative ${value.getMonth() !== currentMonth ? 'bg-neutral-50 text-neutral-300' : ''}`}>{children}</div>
);

// Supprimer la définition locale de PlanningPage (ligne 161 à ~ligne 210)

export const ReportModal = ({ open, onClose }: ReportModalProps) => {
  const [dateGarde, setDateGarde] = useState('');
  const [type, setType] = useState('Jour');
  const [comment, setComment] = useState('');

  const { create, loading } = useCreateGarde();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dateGarde || !type || !getSession()?.userId) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    const userId = getSession()?.userId;
    const userCommune = getSession()?.userCommune;
    const userResponsable = getSession()?.userPrenom;
    const userNom = getSession()?.userNom;
    const userIdentification = getSession().userIdentification

    const gardeData = {
      reference: uuidv4(),
      // date: dateGarde,
      date: new Date(`${dateGarde}T00:00:00.000Z`).toISOString(),
      type: type,
      nom_pharmacie: userNom,
      userId: userId,
      identification_pharma: userIdentification,
      responsable: userResponsable,
      commune: userCommune,
      statut: "en attente",
      commentaire: comment,
    };

    console.log(gardeData)
    try {

      await create(gardeData, getSession()?.userId);
      toast.success("Garde!");
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
            <Button type="submit" className="bg-primary-600 text-white hover:bg-primary-700 h-8 px-3 py-1 text-sm rounded">
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

const AppLayoutPharmacy: React.FC<{ tab: string; setTab: (t: string) => void; onReport: () => void; children: React.ReactNode }> = ({ tab, setTab, onReport, children }) => {
  // const [dateGarde, setDateGarde] = useState('');
  // const [type, setType] = useState('');
  // const [comment, setComment] = useState('');
  // const [openReportModal, setOpenReportModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pharmacyName, setPharmacyName] = useState(getSession()?.userNom ?? '')
  // const [pharmacyId, setPharmacyId] = useState(getSession()?.userId ?? '')

  // console.log(pharmacyId)
  // if (pharmacyId) {
  //   useNotifications(pharmacyId);
  // }


  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary-600">GardePharma</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={onReport}
              >
                <PlusCircle className="h-4 w-4" />
                Signaler une garde
              </Button>
              <span className="text-sm text-neutral-600">{pharmacyName}</span>
              <span className='cursor-pointer'
                onClick={() => {
                  setOpenModal(true)
                }}
              >
                <div className="relative inline-block">
                  {/* Icône de cloche */}
                  <Bell className="w-6 h-6 text-gray-700" />

                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                    {localStorage.getItem('nombreDeNotifications') ? localStorage.getItem('nombreDeNotifications') : '0'}
                  </span>
                </div>
              </span>
              <Button variant="outline" size="sm"
                onClick={() => {
                  removeSession()
                  navigate("/login")
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`flex items-center px-3 py-4 text-sm font-medium transition-colors border-b-2 ${tab === item.key ? 'text-primary-600 border-primary-600' : 'text-neutral-600 border-transparent hover:text-primary-600 hover:border-primary-600'}`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </button>
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
    </div>
  );
}

const PharmacyPage: React.FC = () => {
  const [tab, setTab] = useState('Accueil');
  const [reportOpen, setReportOpen] = useState(false);

  let content = null;
  if (tab === 'Accueil') content = <DashboardPage />;
  else if (tab === 'Planning') content = <PlanningPage onAdd={() => setReportOpen(true)} />;
  else if (tab === 'Mes Gardes') content = <MesGardesPage />;
  else if (tab === 'Historique') content = <History />;
  else if (tab === 'Profil') content = <ProfilPage />;

  return (
    <>
      <AppLayoutPharmacy tab={tab} setTab={setTab} onReport={() => setReportOpen(true)}>
        {content}
      </AppLayoutPharmacy>
      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} />
    </>
  );
};

export default PharmacyPage; 