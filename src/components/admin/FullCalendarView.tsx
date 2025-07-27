import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const GARDE_EVENTS_INIT = [
  { id: '1', title: '🌙 Garde de nuit', start: '2025-07-05', backgroundColor: '#dcfce7', borderColor: '#dcfce7', textColor: '#166534', pharmacy: 'Pharmacie du Centre' },
  { id: '2', title: '🎉 Garde férié', start: '2025-07-13', backgroundColor: '#fee2e2', borderColor: '#fee2e2', textColor: '#991b1b', pharmacy: 'Pharmacie Saint-Michel' },
  { id: '3', title: '🌙 Garde de nuit', start: '2025-07-20', backgroundColor: '#fef9c3', borderColor: '#fef9c3', textColor: '#a16207', pharmacy: 'Pharmacie du Centre' },
];

export default function FullCalendarView() {
  const [events, setEvents] = React.useState(GARDE_EVENTS_INIT);

  function renderEventContent(arg: any) {
    return (
      <div className="flex flex-col gap-0 px-2 py-1 rounded-full text-xs font-medium mb-1" style={{ background: arg.event.backgroundColor, color: arg.event.textColor }}>
        <div className="flex items-center gap-1">
          <span>{arg.event.title}</span>
          <button
            className="ml-2 p-1 rounded hover:bg-red-100"
            title="Supprimer"
            onClick={e => {
              e.stopPropagation();
              setEvents((prev: any[]) => prev.filter(ev => ev.id !== arg.event.id));
              toast.success('Garde supprimée avec succès.');
            }}
          >
            <Trash2 className="h-3 w-3 text-red-500" />
          </button>
        </div>
        <span className="text-[10px] text-gray-500 lowercase font-normal mt-0.5">{arg.event.extendedProps.pharmacy?.toLowerCase() || ''}</span>
      </div>
    );
  }

  function handleDatesSet(arg: any) {
    const title = arg.view.title;
    const titleEl = document.getElementById('fc-title-admin');
    if (titleEl) titleEl.textContent = title;
  }
  React.useEffect(() => {
    setTimeout(() => {
      const calendarApi = (document.querySelector('.fc-admin') as any)?.__fullCalendar;
      document.getElementById('fc-prev-admin')?.addEventListener('click', () => calendarApi?.prev());
      document.getElementById('fc-next-admin')?.addEventListener('click', () => calendarApi?.next());
      document.getElementById('fc-today-admin')?.addEventListener('click', () => calendarApi?.today());
    }, 500);
  }, []);
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b rounded-t-lg">
          <div className="flex items-center gap-2">
            <button id="fc-prev-admin" className="p-2 rounded hover:bg-neutral-100">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button id="fc-today-admin" className="px-3 py-1 rounded text-sm font-medium bg-neutral-100 hover:bg-neutral-200">Aujourd'hui</button>
            <button id="fc-next-admin" className="p-2 rounded hover:bg-neutral-100">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span id="fc-title-admin" className="ml-4 text-base font-semibold text-neutral-700"></span>
          </div>
          <div className="flex items-center gap-2">
            <Button className="ml-2 bg-green-600 text-white hover:bg-green-700 h-8 px-3 py-1 text-sm rounded flex items-center gap-2"><PlusCircle className="h-4 w-4" />Ajouter une garde</Button>
          </div>
        </div>
      </CardHeader>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardContent className="p-0">
          <div
            className="p-4">
            <div className="fc-admin">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={frLocale}
                headerToolbar={false}
                events={events}
                height={600}
                dayMaxEventRows={3}
                fixedWeekCount={false}
                dayCellClassNames={({ date, isOther }) => [
                  'border',
                  'border-neutral-200',
                  'rounded-lg',
                  'bg-white',
                  isOther ? 'bg-neutral-50 text-neutral-300' : '',
                  'min-h-[96px]',
                  'relative',
                ].join(' ')}
                eventContent={renderEventContent}
                datesSet={handleDatesSet}
              />
            </div>
          </div>
        </CardContent>
      </motion.div>
    </Card>
  );
} 