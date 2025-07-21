import React from 'react';
import { useApp } from '../../context/AppContext';
import Sidebar from './Sidebar';
import Welcome from '../../pages/Welcome';
import DataSets from '../../pages/DataSets';
import AIModels from '../../pages/AIModels';
import DataPreprocessing from '../../pages/DataPreprocessing';
import Code from '../../pages/Code';
import Upload from '../../pages/Upload';
import { User, LogOut } from 'lucide-react';

const Layout: React.FC = () => {
  const { currentPage, user, logout, isAuthenticated } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <Welcome />;
      case 'datasets':
        return <DataSets />;
      case 'ai-models':
        return <AIModels />;
      case 'preprocessing':
        return <DataPreprocessing />;
      case 'code':
        return <Code />;
      case 'upload':
        return <Upload />;
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        {/* Top Header */}
        {isAuthenticated && (
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 capitalize">
                  {currentPage === 'welcome' && 'Hoş Geldiniz'}
                  {currentPage === 'datasets' && 'Veri Setleri'}
                  {currentPage === 'ai-models' && 'Yapay Zeka Modelleri'}
                  {currentPage === 'preprocessing' && 'Veri Ön İşleme'}
                  {currentPage === 'code' && 'Kod Paylaşımı'}
                  {currentPage === 'upload' && 'İçerik Yükle'}
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                {user && (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                      )}
                      <span className="text-gray-700 font-medium">{user.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      title="Çıkış Yap"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>
        )}
        
        <main className="flex-1">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Layout;