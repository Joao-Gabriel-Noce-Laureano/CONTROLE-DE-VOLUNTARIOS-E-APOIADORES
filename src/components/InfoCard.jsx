import React from 'react';
import { FaUsers, FaBullhorn, FaChartPie } from 'react-icons/fa';

const icons = {
  voluntarios: <FaUsers />,
  apoiadores: <FaBullhorn />,
  areas: <FaChartPie />
};

export default function InfoCard({ title, value, type }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-md flex items-center justify-between">
      <div>
        <h2 className="text-gray-500 text-sm">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-2xl text-gray-400">{icons[type]}</div>
    </div>
  );
}
