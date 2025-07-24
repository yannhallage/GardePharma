import React from 'react';

export default function WidgetCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 border border-green-100">
      <h2 className="text-lg font-semibold text-green-700 mb-2">{title}</h2>
      {children}
    </div>
  );
} 