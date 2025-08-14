import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Select, SelectItem, SelectContent } from '../../components/ui/select';
import FullCalendar from '@fullcalendar/react';
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import dayGridPlugin from '@fullcalendar/daygrid';
import { toast } from 'react-hot-toast';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { PlusCircle } from 'lucide-react';
import type { EventContentArg, DatesSetArg } from '@fullcalendar/core';
import { ReportModal } from '../PharmacyPage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { useGardes } from '@/hooks/useGardes';

import { getSession } from '@/helpers/local-storage';
import { useUpdateGarde } from '@/hooks/useUpdateGardes';
import type { UpdateGardes } from '../../types/garde';

interface PlanningPageProps {
  onAdd: () => void;
}

const PlanningPage = ({ onAdd }: PlanningPageProps) => {
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [modalOpen, setModalOpen] = useState(false);
  const { gardes, loading, error } = useGardes(getSession()?.userId ?? '', 'pharmacy');

  const { updateGarde } = useUpdateGarde()
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [eventActionModalOpen, setEventActionModalOpen] = useState(false);
  const [eventComment, setEventComment] = useState('');
  const [proposedDate, setProposedDate] = useState('');
  const [recupererID, setRecupererID] = useState('')

  const gardeEvents = gardes
    .filter((garde) => garde.statut?.toLowerCase() === 'en cours')
    .map((garde) => {
      let colors = {
        backgroundColor: '#e0e7ff',
        borderColor: '#e0e7ff',
        textColor: '#1e3a8a'
      };

      if (garde.type?.toLowerCase().includes('nuit')) {
        colors = {
          backgroundColor: '#dcfce7',
          borderColor: '#dcfce7',
          textColor: '#166534'
        };
      } else if (garde.type?.toLowerCase().includes('férié')) {
        colors = {
          backgroundColor: '#fee2e2',
          borderColor: '#fee2e2',
          textColor: '#991b1b'
        };
      } else if (garde.type?.toLowerCase().includes('week-end')) {
        colors = {
          backgroundColor: '#fef9c3',
          borderColor: '#fef9c3',
          textColor: '#a16207'
        };
      }

      return {
        id: garde._id,               // ← Important pour récupérer l'id
        title: `${garde.nom_pharmacie} - ${garde.type}`,
        start: garde.date,
        ...colors
      };
    });

  // 🔹 Application du filtre par type
  const filteredEvents =
    typeFilter === 'Tous'
      ? gardeEvents
      : gardeEvents.filter((e) => {
        if (typeFilter === 'Jour')
          return !e.title.toLowerCase().includes('nuit') &&
            !e.title.toLowerCase().includes('férié') &&
            !e.title.toLowerCase().includes('week-end');
        if (typeFilter === 'Nuit') return e.title.toLowerCase().includes('nuit');
        if (typeFilter === 'Férié') return e.title.toLowerCase().includes('férié');
        if (typeFilter === 'Week-end') return e.title.toLowerCase().includes('week-end');
        return true;
      });

  function renderEventContent(arg: EventContentArg) {
    return (
      <div
        className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-1"
        style={{ background: arg.event.backgroundColor, color: arg.event.textColor }}
      >
        <span>{arg.event.title}</span>
      </div>
    );
  }

  function handleDatesSet(arg: DatesSetArg) {
    const title = arg.view.title;
    const titleEl = document.getElementById('fc-title');
    if (titleEl) titleEl.textContent = title;
  }

  function handleEventClick(info: any) {
    setSelectedEvent(info.event);
    setEventComment('');
    setProposedDate('');
    setRecupererID(info.event.id);   // ← stocke l'id ici
    setEventActionModalOpen(true);
  }

  const EventSendingAPI = () => {
    if (!recupererID) {
      toast.error('Aucune garde sélectionnée');
      return;
    }

    if (!eventComment || !proposedDate) {
      toast.error('Veuillez renseigner la date et le commentaire');
      return;
    }

    const dataSending: UpdateGardes = {
      id_garde: recupererID,
      newDate: proposedDate + 'T00:00:00.000Z',
      comments: eventComment,
      statut: 'en attente'
    };

    let userId = getSession()?.userId ?? '';

    try {
      updateGarde(userId, dataSending).then(() => {
        setTimeout(() => {
          toast.success("Votre modification sera étudiée par l'admin");
          setEventActionModalOpen(false);
        }, 1000);
      });
    } catch (error) {
      console.error('Erreur lors de la modification de la garde:', error);
      toast.error('Une erreur s\'est produite lors de la modification de la garde');
    }
  };


  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const calendarApi = (document.querySelector('.fc') as any)?.__fullCalendar;
      document.getElementById('fc-prev')?.addEventListener('click', () => calendarApi?.prev());
      document.getElementById('fc-today')?.addEventListener('click', () => calendarApi?.today());
      document.getElementById('fc-next')?.addEventListener('click', () => calendarApi?.next());
    }, 500);
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b rounded-t-lg">
          <div className="flex items-center gap-2">
            <button id="fc-prev" className="p-2 rounded hover:bg-neutral-100" type="button">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button id="fc-today" className="px-3 py-1 rounded text-sm font-medium bg-neutral-100 hover:bg-neutral-200" type="button">
              Aujourd'hui
            </button>
            <button id="fc-next" className="p-2 rounded hover:bg-neutral-100" type="button">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span id="fc-title" className="ml-4 text-lg font-semibold text-neutral-700"></span>
            <div className="ml-6 flex items-center gap-2">
              <Label className="text-xs text-neutral-500">Filtrer par type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectContent>
                  <SelectItem value="Tous">Tous</SelectItem>
                  <SelectItem value="Jour">Jour</SelectItem>
                  <SelectItem value="Nuit">Nuit</SelectItem>
                  <SelectItem value="Week-end">Week-end</SelectItem>
                  <SelectItem value="Férié">Férié</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded bg-neutral-100 text-sm font-medium hover:bg-neutral-200" type="button">
              Exporter CSV
            </button>
            <Button
              className="ml-2 bg-primary-600 text-white hover:bg-primary-700 h-8 px-3 py-1 text-sm rounded flex items-center gap-2"
              onClick={() => setModalOpen(true)}
              type="button"
            >
              <PlusCircle className="h-4 w-4" />Ajouter une garde
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {loading && <p className="p-4 text-sm text-gray-500">Chargement en cours…</p>}
        {error && <p className="p-4 text-sm text-red-500">Erreur : {error}</p>}
        {!loading && !error && (
          <div className="p-4">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locale={frLocale}
              headerToolbar={false}
              events={filteredEvents}
              height={600}
              dayMaxEventRows={3}
              fixedWeekCount={false}
              dayCellClassNames={({ isOther }) =>
                [
                  'border',
                  'cursor-pointer',
                  'border-neutral-200',
                  'rounded-lg',
                  'bg-white',
                  isOther ? 'bg-neutral-50 text-neutral-300' : '',
                  'min-h-[96px]',
                  'relative'
                ].join(' ')
              }
              eventContent={renderEventContent}
              datesSet={handleDatesSet}
              eventClick={handleEventClick}
            />
          </div>
        )}
      </CardContent>

      <ReportModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Modal d'action sur événement */}
      <Dialog open={eventActionModalOpen} onOpenChange={setEventActionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Action sur la garde</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <form className="grid grid-cols-1 gap-4">
              <div>
                <Label>Date attribuée</Label>
                <Input type="text" value={selectedEvent.startStr} disabled />
              </div>
              <div>
                <Label>Commentaire</Label>
                <Input
                  type="text"
                  value={eventComment}
                  onChange={(e) => setEventComment(e.target.value)}
                  placeholder="Votre commentaire..."
                />
              </div>
              <div>
                <Label>Proposer une nouvelle date</Label>
                <Input
                  type="date"
                  value={proposedDate}
                  onChange={(e) => setProposedDate(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  className="ml-2 bg-primary-600 text-white hover:bg-primary-700 h-8 px-3 py-1 text-sm rounded flex items-center gap-2"
                  onClick={EventSendingAPI}
                >
                  Envoyer
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PlanningPage;
