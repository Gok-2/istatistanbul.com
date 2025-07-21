import React, { useState } from 'react';
import { Play, Copy, Download, Settings } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onRun?: (code: string) => void;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '',
  language = 'python',
  onRun,
  className = ''
}) => {
  const [code, setCode] = useState(initialCode);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'java', label: 'Java' }
  ];

  const handleRunCode = async () => {
    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      const mockOutput = `Kod çalıştırıldı (${selectedLanguage}):\n\n` +
        `Başarıyla tamamlandı!\n` +
        `Çalışma süresi: 0.${Math.floor(Math.random() * 900 + 100)}s\n` +
        `Bellek kullanımı: ${Math.floor(Math.random() * 50 + 10)}MB`;
      
      setOutput(mockOutput);
      setIsRunning(false);
      
      if (onRun) {
        onRun(code);
      }
    }, 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `kod.${selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'c' ? 'c' : selectedLanguage}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyCode}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              title="Kopyala"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={handleDownloadCode}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              title="İndir"
            >
              <Download size={16} />
            </button>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isRunning
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              <Play size={16} />
              <span>{isRunning ? 'Çalışıyor...' : 'Çalıştır'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex">
        <div className="flex-1">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`${languages.find(l => l.value === selectedLanguage)?.label} kodunuzu buraya yazın...`}
            className="w-full h-96 p-4 font-mono text-sm text-gray-800 bg-white resize-none focus:outline-none"
            style={{ fontSize: '14px', lineHeight: '1.5' }}
          />
        </div>
        
        {/* Output Panel */}
        {output && (
          <div className="w-1/2 border-l border-gray-200">
            <div className="bg-gray-800 text-white p-3 text-sm font-medium">
              Çıktı
            </div>
            <div className="p-4 bg-gray-900 text-green-400 font-mono text-sm h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;