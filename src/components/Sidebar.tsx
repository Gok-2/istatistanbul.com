import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">istatistanbul.com</h1>
      </div>
      <nav className="space-y-4">
        <NavLink to="/" className="block hover:text-gray-400" end>
          <span role="img" aria-label="home">🏠</span> Ana Sayfa
        </NavLink>
        <NavLink to="/data-sets" className="block hover:text-gray-400">
          <span role="img" aria-label="data sets">📊</span> Veri Setleri
        </NavLink>
        <NavLink to="/ai-models" className="block hover:text-gray-400">
          <span role="img" aria-label="ai models">🧠</span> Yapay Zeka Modelleri
        </NavLink>
        <NavLink to="/data-preprocessing" className="block hover:text-gray-400">
          <span role="img" aria-label="data preprocessing">⚙️</span> Veri Ön İşleme
        </NavLink>
        <NavLink to="/code-sharing" className="block hover:text-gray-400">
          <span role="img" aria-label="code">💻</span> Kod
        </NavLink>
        <NavLink to="/live-statistics" className="block hover:text-gray-400 pointer-events-none opacity-50">
          <span role="img" aria-label="live statistics">🔒</span> Canlı İstatistikler
        </NavLink>
      </nav>
      <div className="mt-8">
        <button className="bg-blue-600 p-2 rounded-full w-10 h-10">+</button>
      </div>
    </div>
  );
};

export default Sidebar;