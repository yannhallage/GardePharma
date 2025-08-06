import React, { useState } from 'react';
import { MoreVertical, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { useGetAllPharmacy } from '@/hooks/useGetAllPharmacy';
import { getSession } from '@/helpers/local-storage';
// import { userService } from '@/services/admin-ListesPharmacy';

const columns = [
  { key: 'id', label: 'Identification' },
  { key: 'nom_pharmacie', label: 'Nom pharmacie' },
  { key: 'email', label: 'Email' },
  { key: 'details', label: 'Lieu' },
  { key: 'chef_pharmacie', label: 'Chef pharmacie' },
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
        onClick={() => setOpen(v => !v)}
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
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: pharmacies, loading, error } = useGetAllPharmacy(getSession()?.userId ?? undefined);
  const pageSize = 5;

  const filteredPharmacies = pharmacies.filter(pharma =>
    Object.values(pharma).some(val =>
      typeof val === 'string' && val.toLowerCase().includes(search.toLowerCase())
    )
  );

  const paginatedPharmacies = filteredPharmacies.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredPharmacies.length / pageSize);

  const toggleColumn = (col: string) => {
    setVisibleColumns(cols =>
      cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col]
    );
  };

  const handleDelete = async (identification: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette pharmacie ?')) return;
    try {
      // await userService.deletePharmacy(identification);
      toast.success('Pharmacie supprimée avec succès.');
      setRefreshKey(k => k + 1);
    } catch (error) {
      console.error(error);
      toast.error('Échec de la suppression.');
    }
  };

  const handleEdit = (id: string) => {
    alert('Édition de la pharmacie ' + id);
  };

  return (
    <motion.div className="p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 mx-auto">
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

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm rounded-2xl overflow-hidden shadow border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map(col =>
                  visibleColumns.includes(col.key) && (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-left font-semibold text-gray-700 tracking-wide uppercase text-xs border-b border-gray-200"
                    >
                      {col.label}
                    </th>
                  )
                )}
                <th className="px-4 py-3 text-right font-semibold text-gray-700 tracking-wide uppercase text-xs border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPharmacies.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center text-gray-500 italic py-4">
                    Aucune pharmacie trouvée.
                  </td>
                </tr>
              ) : (
                paginatedPharmacies.map(pharma => (
                  <tr key={pharma.identification} className="border-b last:border-0 hover:bg-gray-100 transition group">
                    {visibleColumns.includes('id') && (
                      <td className="px-4 py-3 font-semibold text-gray-900">{pharma.identification}</td>
                    )}
                    {visibleColumns.includes('nom_pharmacie') && (
                      <td className="px-4 py-3">{pharma.nom_pharmacie}</td>
                    )}
                    {visibleColumns.includes('email') && (
                      <td className="px-4 py-3">{pharma.email}</td>
                    )}
                    {visibleColumns.includes('details') && (
                      <td className="px-4 py-3">{pharma.details || '-'}</td>
                    )}
                    {visibleColumns.includes('chef_pharmacie') && (
                      <td className="px-4 py-3">{pharma.chef_pharmacie}</td>
                    )}
                    {visibleColumns.includes('commune') && (
                      <td className="px-4 py-3">{pharma.commune}</td>
                    )}
                    {visibleColumns.includes('numero') && (
                      <td className="px-4 py-3">{pharma.numero}</td>
                    )}
                    <td className="px-4 py-3 text-right">
                      <ActionMenu
                        onEdit={() => handleEdit(pharma.identification)}
                        onDelete={() => handleDelete(pharma.identification)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-end gap-2 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium shadow-sm border border-gray-200 disabled:opacity-50 transition"
            >
              Précédent
            </button>
            <span className="text-sm text-gray-700 font-semibold">
              Page {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium shadow-sm border border-gray-200 disabled:opacity-50 transition"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
