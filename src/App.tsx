import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
// Make sure Sidebar exists at the specified path or update the path accordingly
// import Sidebar from './components/sidebar/Sidebar'; // Update this path if Sidebar is located elsewhere
import Sidebar from './components/Sidebar'; // Adjusted path to match likely folder casing
// import Home from './pages/Home'; // Original import
import Home from './pages/Home'; // Updated import path if Home.tsx is in src/pages/Home/Home.tsx
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