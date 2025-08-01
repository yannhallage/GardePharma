import React, { useState } from 'react';
import { MoreVertical, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockPharmacies = [
  { id: 'PH-001', name: 'Pharmacie du Centre', email: 'centre@pharma.com', lieu: '12 rue de Paris', chef: 'Dr. Martin', commune: 'Paris', numero: '01 23 45 67 89' },
  { id: 'PH-002', name: 'Pharmacie Saint-Michel', email: 'stm@pharma.com', lieu: '34 avenue Saint-Michel', chef: 'Dr. Dupuis', commune: 'Paris', numero: '01 98 76 54 32' },
  { id: 'PH-003', name: 'Pharmacie de la Gare', email: 'gare@pharma.com', lieu: '1 place de la Gare', chef: 'Dr. Bernard', commune: 'Lyon', numero: '04 56 78 90 12' },
];

const columns = [
  { key: 'id', label: 'Identification' },
  { key: 'name', label: 'Nom pharmacie' },
  { key: 'email', label: 'Email' },
  { key: 'lieu', label: 'Lieu' },
  { key: 'chef', label: 'Chef pharmacie' },
  { key: 'commune', label: 'Commune' },
  { key: 'numero', label: 'Numéro' },
];

function ActionMenu({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <button
        aria-label="Actions"
        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm border border-gray-200"
        onClick={() => setOpen((v) => !v)}
        tabIndex={0}
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-2xl z-20 overflow-hidden"
          >
            <button
              className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-100 font-medium transition-colors text-gray-700"
              onClick={() => { setOpen(false); onEdit(); }}
            >
              Modifier
            </button>
            <div className="border-t border-gray-200" />
            <button
              className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
              onClick={() => { setOpen(false); onDelete(); }}
            >
              Supprimer
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RoleManager() {
  const [search, setSearch] = useState('');
  const [visibleColumns, setVisibleColumns] = useState(columns.map(c => c.key));
  const [pharmacies, setPharmacies] = useState(mockPharmacies);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredPharmacies = pharmacies.filter(pharma =>
    pharma.name.toLowerCase().includes(search.toLowerCase()) ||
    pharma.email.toLowerCase().includes(search.toLowerCase()) ||
    pharma.lieu.toLowerCase().includes(search.toLowerCase()) ||
    pharma.chef.toLowerCase().includes(search.toLowerCase()) ||
    pharma.commune.toLowerCase().includes(search.toLowerCase()) ||
    pharma.numero.toLowerCase().includes(search.toLowerCase()) ||
    pharma.id.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedPharmacies = filteredPharmacies.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredPharmacies.length / pageSize);

  function toggleColumn(col: string) {
    setVisibleColumns(cols =>
      cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col]
    );
  }

  function handleDelete(id: string) {
    if (window.confirm('Voulez-vous vraiment supprimer cette pharmacie ?')) {
      setPharmacies(pharmacies.filter(p => p.id !== id));
      alert('Pharmacie supprimée');
    }
  }

  function handleEdit(id: string) {
    alert('Édition de la pharmacie ' + id);
  }

  return (
    <motion.div className="p-4 md:p-6"
      // initial={{ opacity: 0, y: 30 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.5 }}  
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 max-w-5xl mx-auto">
        {/* Barre de recherche et filtres */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une pharmacie..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-gray-400 focus:bg-white transition text-gray-800 placeholder:text-gray-400 font-medium shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition text-gray-700 font-medium shadow-sm">
                <Filter className="w-4 h-4" /> Filtres
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-10 hidden group-hover:block">
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
          <table className="min-w-full bg-white text-sm rounded-2xl overflow-hidden shadow border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map(
                  col =>
                    visibleColumns.includes(col.key) && (
                      <th key={col.key} className="px-4 py-3 text-left font-semibold text-gray-700 bg-gray-50 first:rounded-tl-2xl last:rounded-tr-2xl tracking-wide uppercase text-xs border-b border-gray-200">{col.label}</th>
                    )
                )}
                <th className="px-4 py-3 text-right font-semibold text-gray-700 bg-gray-50 last:rounded-tr-2xl tracking-wide uppercase text-xs border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPharmacies.map((pharma, idx) => (
                <motion.tr
                  key={pharma.id}
                  className="border-b last:border-0 hover:bg-gray-100 transition group"
                  whileHover={{ y: -2, boxShadow: '0 4px 24px 0 rgba(100, 116, 139, 0.08)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {visibleColumns.includes('id') && (
                    <td className="px-4 py-3 font-semibold text-gray-900 bg-white group-hover:bg-gray-50 transition rounded-l-xl">{pharma.id}</td>
                  )}
                  {visibleColumns.includes('name') && (
                    <td className="px-4 py-3 text-gray-800 bg-white group-hover:bg-gray-50 transition">{pharma.name}</td>
                  )}
                  {visibleColumns.includes('email') && (
                    <td className="px-4 py-3 text-gray-800 bg-white group-hover:bg-gray-50 transition">{pharma.email}</td>
                  )}
                  {visibleColumns.includes('lieu') && (
                    <td className="px-4 py-3 text-gray-800 bg-white group-hover:bg-gray-50 transition">{pharma.lieu}</td>
                  )}
                  {visibleColumns.includes('chef') && (
                    <td className="px-4 py-3 text-gray-800 bg-white group-hover:bg-gray-50 transition">{pharma.chef}</td>
                  )}
                  {visibleColumns.includes('commune') && (
                    <td className="px-4 py-3 text-gray-800 bg-white group-hover:bg-gray-50 transition">{pharma.commune}</td>
                  )}
                  {visibleColumns.includes('numero') && (
                    <td className="px-4 py-3 text-gray-800 bg-white group-hover:bg-gray-50 transition rounded-r-xl">{pharma.numero}</td>
                  )}
                  <td className="px-4 py-3 text-right bg-white group-hover:bg-gray-50 transition rounded-r-xl">
                    <ActionMenu onEdit={() => handleEdit(pharma.id)} onDelete={() => handleDelete(pharma.id)} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end gap-2 mt-6">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium shadow-sm border border-gray-200 disabled:opacity-50 transition">Précédent</button>
            <span className="text-sm text-gray-700 font-semibold">Page {page} / {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium shadow-sm border border-gray-200 disabled:opacity-50 transition">Suivant</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
