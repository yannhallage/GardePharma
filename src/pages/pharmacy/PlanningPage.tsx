import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Select, SelectItem, SelectContent } from '../../components/ui/select';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { PlusCircle } from 'lucide-react';
import type { EventContentArg, DatesSetArg } from '@fullcalendar/core';
import { ReportModal } from '../PharmacyPage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';

const GARDE_EVENTS_FC = [
  { title: '🌙 Garde de nuit', start: '2025-07-05', backgroundColor: '#dcfce7', borderColor: '#dcfce7', textColor: '#166534' },
  { title: '🎉 Garde férié', start: '2025-07-13', backgroundColor: '#fee2e2', borderColor: '#fee2e2', textColor: '#991b1b' },
  { title: '🌙 Garde de nuit', start: '2025-07-20', backgroundColor: '#fef9c3', borderColor: '#fef9c3', textColor: '#a16207' },
];

interface PlanningPageProps {
  onAdd: () => void;
}

const PlanningPage = ({ onAdd }: PlanningPageProps) => {
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [eventActionModalOpen, setEventActionModalOpen] = useState(false);
  const [eventComment, setEventComment] = useState('');
  const [proposedDate, setProposedDate] = useState('');
  const filteredEvents = typeFilter === 'Tous'
    ? GARDE_EVENTS_FC
    : GARDE_EVENTS_FC.filter(e => {
      if (typeFilter === 'Jour') return !e.title.includes('Nuit') && !e.title.includes('Férié') && !e.title.includes('Week-end');
      if (typeFilter === 'Nuit') return e.title.includes('Nuit');
      if (typeFilter === 'Férié') return e.title.includes('Férié');
      if (typeFilter === 'Week-end') return e.title.includes('Week-end');
      return true;
    });
  function renderEventContent(arg: EventContentArg) {
    return (
      <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-1" style={{ background: arg.event.backgroundColor, color: arg.event.textColor }}>
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
    setEventActionModalOpen(true);
  }
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const calendarApi = (document.querySelector('.fc') as any)?.__fullCalendar;
      document.getElementById('fc-prev')?.addEventListener('click', () => calendarApi?.prev());
      document.getElementById('fc-next')?.addEventListener('click', () => calendarApi?.next());
      document.getElementById('fc-today')?.addEventListener('click', () => calendarApi?.today());
    }, 500);
  }
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b rounded-t-lg">
          <div className="flex items-center gap-2">
            <button id="fc-prev" className="p-2 rounded hover:bg-neutral-100">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button id="fc-today" className="px-3 py-1 rounded text-sm font-medium bg-neutral-100 hover:bg-neutral-200">Aujourd'hui</button>
            <button id="fc-next" className="p-2 rounded hover:bg-neutral-100">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
            <button className="px-3 py-1 rounded bg-neutral-100 text-sm font-medium hover:bg-neutral-200">Exporter CSV</button>
            <Button className="ml-2 bg-primary-600 text-white hover:bg-primary-700 h-8 px-3 py-1 text-sm rounded flex items-center gap-2" onClick={() => setModalOpen(true)}><PlusCircle className="h-4 w-4" />Ajouter une garde</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
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
            dayCellClassNames={({ date, isOther }) => [
              'border',
              'cursor-pointer',
              'border-neutral-200',
              'rounded-lg',
              'bg-white',
              isOther ? 'bg-neutral-50 text-neutral-300' : '',
              'min-h-[96px]',
              'relative',
            ].join(' ')}
            eventContent={renderEventContent}
            datesSet={handleDatesSet}
            eventClick={handleEventClick}
          />
        </div>
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
                <Input type="text" value={eventComment} onChange={e => setEventComment(e.target.value)} placeholder="Votre commentaire..." />
              </div>
              <div>
                <Label>Proposer une nouvelle date</Label>
                <Input type="date" value={proposedDate} onChange={e => setProposedDate(e.target.value)} />
              </div>
              <DialogFooter>
                <Button type="button"
                  className='"ml-2 bg-primary-600 text-white hover:bg-primary-700 h-8 px-3 py-1 text-sm rounded flex items-center gap-2"'
                  onClick={() => setEventActionModalOpen(false)}>Envoyer</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PlanningPage; 