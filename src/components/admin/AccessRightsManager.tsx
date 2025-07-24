import React from 'react';

const rights = [
  { id: 1, name: 'Lecture', description: 'Peut consulter les plannings' },
  { id: 2, name: 'Écriture', description: 'Peut modifier les plannings' },
];

export default function AccessRightsManager() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded shadow text-sm">
        <thead className="bg-green-50">
          <tr>
            <th className="px-4 py-2 text-left">Droit</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rights.map(right => (
            <tr key={right.id} className="border-b last:border-0">
              <td className="px-4 py-2">{right.name}</td>
              <td className="px-4 py-2">{right.description}</td>
              <td className="px-4 py-2 flex gap-2">
                <button className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs">Modifier</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 