import FullCalendarView from '../components/admin/FullCalendarView';
import ExportPlanningButton from '../components/admin/ExportPlanningButton';
import PharmacyAccountsManager from '../components/admin/PharmacyAccountsManager';
import RoleManager from '../components/admin/RoleManager';
import AccessRightsManager from '../components/admin/AccessRightsManager';
import ManualOnCallAssignment from '../components/admin/ManualOnCallAssignment';

export default function AdminDashboard() {
  return (
    <div>
      <h1>Tableau de bord Administrateur</h1>
      <FullCalendarView />
      <ExportPlanningButton />
      <PharmacyAccountsManager />
      <RoleManager />
      <AccessRightsManager />
      <ManualOnCallAssignment />
    </div>
  );
} 