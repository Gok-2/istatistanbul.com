import React from 'react';
import { Home, Database, Brain, Settings, Code, BarChart3, Plus, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ElementType;
  locked?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { id: 'welcome', name: 'Hoş Geldiniz', icon: Home },
  { id: 'datasets', name: 'Veri Setleri', icon: Database },
  { id: 'ai-models', name: 'Yapay Zeka Modelleri', icon: Brain },
  { id: 'preprocessing', name: 'Veri Ön İşleme', icon: Settings },
  { id: 'code', name: 'Kod', icon: Code },
  { id: 'live-stats', name: 'Canlı İstatistikler', icon: BarChart3, locked: true }
];

const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, isAuthenticated } = useApp();

  const handleItemClick = (itemId: string, locked?: boolean) => {
    if (locked) return;
    if (!isAuthenticated && itemId !== 'welcome') return;
    setCurrentPage(itemId);
  };

  const handleUploadClick = () => {
    if (!isAuthenticated) return;
    setCurrentPage('upload');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 h-screen fixed left-0 top-0 z-40 shadow-2xl">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white mb-1">
          ist<span className="text-teal-400">atistanbul</span>
        </h1>
        <p className="text-slate-400 text-sm">Veri Bilimi Platformu</p>
      </div>

      {/* Upload Button */}
      <div className="p-4 border-b border-slate-700">
        <button
          onClick={handleUploadClick}
          disabled={!isAuthenticated}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
            isAuthenticated 
              ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Plus size={18} />
          <span className="font-medium">Yükle</span>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4">
        <ul className="space-y-2 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const isDisabled = (!isAuthenticated && item.id !== 'welcome') || item.locked;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id, item.locked)}
                  disabled={isDisabled}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-lg'
                      : isDisabled
                      ? 'text-slate-500 cursor-not-allowed'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <div className="relative">
                    <Icon size={20} />
                    {item.locked && (
                      <Lock size={12} className="absolute -top-1 -right-1 text-slate-400" />
                    )}
                  </div>
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-500 text-center">
          © 2024 İstatistanbul Platform
        </p>
      </div>
    </div>
  );
};

export default Sidebar;