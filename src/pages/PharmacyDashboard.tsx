import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar as CalendarIcon, History, User, AlertCircle, ClipboardList, LogOut } from "lucide-react";
import PlanningViewer from '../components/pharmacy/PlanningViewer';
import OnCallReportForm from '../components/pharmacy/OnCallReportForm';
import OnCallHistory from '../components/pharmacy/OnCallHistory';
import PharmacyProfileForm from '../components/pharmacy/PharmacyProfileForm';

const NAV = [
  { label: 'Planning', icon: CalendarIcon, path: '/pharmacy/planning' },
  { label: 'Signaler une garde', icon: AlertCircle, path: '/pharmacy/report' },
  { label: 'Mes gardes', icon: ClipboardList, path: '/pharmacy/guards' },
  { label: 'Historique', icon: History, path: '/pharmacy/history' },
  { label: 'Mon compte', icon: User, path: '/pharmacy/account' },
];

export default function PharmacyDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r flex flex-col py-6 px-4">
        <div className="mb-8 text-2xl font-bold text-primary">GardePharma</div>
        <nav className="flex flex-col gap-2">
          {NAV.map(item => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className="justify-start text-base"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-2 w-5 h-5" /> {item.label}
            </Button>
          ))}
        </nav>
        <Button variant="outline" className="mt-auto" onClick={() => navigate('/login')}>
          <LogOut className="mr-2" /> Déconnexion
        </Button>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-10 space-y-8">
        {location.pathname === '/pharmacy/planning' && <PlanningViewer />}
        {location.pathname === '/pharmacy/report' && <OnCallReportForm />}
        {location.pathname === '/pharmacy/guards' && (
          <Card>
            <CardHeader>
              <CardTitle>Mes gardes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">Liste de mes gardes (à implémenter)</div>
            </CardContent>
          </Card>
        )}
        {location.pathname === '/pharmacy/history' && <OnCallHistory />}
        {location.pathname === '/pharmacy/account' && <PharmacyProfileForm />}
      </main>
    </div>
  );
} 