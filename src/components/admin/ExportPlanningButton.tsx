import React from 'react';
import { Download } from 'lucide-react';

export default function ExportPlanningButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow font-semibold transition">
      <Download className="w-5 h-5" />
      Exporter le planning
    </button>
  );
} 