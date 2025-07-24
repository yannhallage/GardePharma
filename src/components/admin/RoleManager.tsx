import React, { useState } from 'react';
import { MoreVertical, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const initialRoles = [
  { id: 1, name: 'Pharmacie', users: 12 },
  { id: 2, name: 'Administrateur', users: 3 },
  { id: 3, name: 'Test', users: 1 },
  { id: 4, name: 'Manager', users: 2 },
  { id: 5, name: 'Assistant', users: 4 },
  { id: 6, name: 'Viewer', users: 7 },
];

const columns = [
  { key: 'name', label: 'Rôle' },
  { key: 'users', label: 'Utilisateurs' },
];

function showToast(message: string, type: 'success' | 'error') {
  alert(message); // Remplace par un vrai toast si tu as un composant toast
}

export default function RoleManager() {
  const [search, setSearch] = useState('');
  const [visibleColumns, setVisibleColumns] = useState(['name', 'users']);
  const [roles, setRoles] = useState(initialRoles);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedRoles = filteredRoles.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredRoles.length / pageSize);

  function toggleColumn(col: string) {
    setVisibleColumns(cols =>
      cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col]
    );
  }

  function handleDelete(id: number) {
    if (window.confirm('Voulez-vous vraiment supprimer ce rôle ?')) {
      setRoles(roles.filter(r => r.id !== id));
      showToast('Rôle supprimé', 'success');
    }
  }

  return (
    <motion.div className="p-4 md:p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}  
    >
      <div className="bg-white rounded-xl shadow-lg p-6 border max-w-3xl mx-auto">
        {/* Barre de recherche et filtres */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un rôle..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-green-50 transition">
                <Filter className="w-4 h-4" /> Filtres
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg p-3 z-10 hidden group-hover:block">
                {columns.map(col => (
                  <label key={col.key} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(col.key)}
                      onChange={() => toggleColumn(col.key)}
                    />
                    {col.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Tableau */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-green-50">
              <tr>
                {columns.map(
                  col =>
                    visibleColumns.includes(col.key) && (
                      <th key={col.key} className="px-4 py-2 text-left">{col.label}</th>
                    )
                )}
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRoles.map(role => (
                <tr key={role.id} className="border-b last:border-0 hover:bg-green-50 transition">
                  {visibleColumns.includes('name') && (
                    <td className="px-4 py-2">{role.name}</td>
                  )}
                  {visibleColumns.includes('users') && (
                    <td className="px-4 py-2">{role.users}</td>
                  )}
                  <td className="px-4 py-2 text-right">
                    <button aria-label="Modifier le rôle" className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs mr-2">Modifier</button>
                    <button aria-label="Supprimer le rôle" className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs mr-2" onClick={() => handleDelete(role.id)}>Supprimer</button>
                    <button aria-label="Plus d'actions" className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-xs">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end gap-2 mt-4">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 rounded bg-gray-100 hover:bg-green-50 disabled:opacity-50">Précédent</button>
            <span className="text-sm text-gray-600">Page {page} / {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 rounded bg-gray-100 hover:bg-green-50 disabled:opacity-50">Suivant</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
