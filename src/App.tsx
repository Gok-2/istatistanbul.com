import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import DataSets from './pages/DataSets';
import AIModels from './pages/AIModels';
import DataPreprocessing from './pages/DataPreprocessing';
import CodeSharing from './pages/CodeSharing';
import LiveStatistics from './pages/LiveStatistics';

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data-sets" element={<DataSets />} />
            <Route path="/ai-models" element={<AIModels />} />
            <Route path="/data-preprocessing" element={<DataPreprocessing />} />
            <Route path="/code-sharing" element={<CodeSharing />} />
            <Route path="/live-statistics" element={<LiveStatistics />} />
          </Routes>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;