import React from 'react';

export default function RecentActivity() {
  const activities = [
    { name: "Maria Silva", role: "Nova Voluntária", area: "Desenvolvimento Web" },
    { name: "João Santos", role: "Novo Apoiador", area: "Mentoria em UX/UI" }
  ];

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Atividades Recentes</h2>
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start gap-3 mb-3">
          <div className="bg-gray-200 rounded-full p-2 text-black font-bold">👤</div>
          <div>
            <p className="font-medium text-blue-700">{activity.role}: {activity.name}</p>
            <p className="text-sm text-gray-500">{activity.area}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
