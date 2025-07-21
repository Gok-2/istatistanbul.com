import React, { useState } from 'react';
import FileUpload from '../components/ui/FileUpload';
import { BarChart3, PieChart, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const DataPreprocessing: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsAnalyzing(true);

    // Simulate analysis process
    setTimeout(() => {
      const mockAnalysis = {
        fileName: file.name,
        fileSize: (file.size / 1024 / 1024).toFixed(2),
        rowCount: Math.floor(Math.random() * 10000) + 1000,
        columnCount: Math.floor(Math.random() * 50) + 5,
        missingValues: Math.floor(Math.random() * 100),
        duplicates: Math.floor(Math.random() * 50),
        dataTypes: {
          numeric: Math.floor(Math.random() * 10) + 3,
          categorical: Math.floor(Math.random() * 8) + 2,
          datetime: Math.floor(Math.random() * 3) + 1
        },
        statistics: {
          meanAge: (Math.random() * 50 + 20).toFixed(1),
          medianIncome: (Math.random() * 50000 + 30000).toFixed(0),
          maxValue: (Math.random() * 1000).toFixed(2)
        },
        recommendations: [
          'Eksik değerlerin %15\'i yaş kolonunda bulunmaktadır. Mean imputation önerilir.',
          'Gelir verilerinde 3 aykırı değer tespit edildi. IQR yöntemi ile temizleme yapılabilir.',
          'Kategorial değerlerde tutarsızlık var (örn: "Erkek", "E", "M"). Standardizasyon gerekli.',
          'Tarih formatları farklı. ISO format\'a dönüştürme önerilir.'
        ],
        charts: [
          {
            type: 'distribution',
            title: 'Yaş Dağılımı',
            description: 'Veri setindeki yaş değerlerinin histogramı'
          },
          {
            type: 'correlation',
            title: 'Korelasyon Matrisi',
            description: 'Numerik değişkenler arası ilişki analizi'
          },
          {
            type: 'missing',
            title: 'Eksik Değer Analizi',
            description: 'Kolonlara göre eksik veri oranları'
          }
        ]
      };

      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-5xl mx-auto">
        {!uploadedFile ? (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Veri Ön İşleme</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Veri setinizi yükleyin ve otomatik analiz ile ön işleme önerilerini alın. 
                Platformumuz CSV, Excel ve SQL dosyalarını desteklemektedir.
              </p>
            </div>
            
            <FileUpload 
              onFileUpload={handleFileUpload}
              acceptedTypes={['.csv', '.xlsx', '.sql']}
              maxSize={50}
              className="max-w-2xl mx-auto"
            />
          </div>
        ) : isAnalyzing ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="animate-spin mx-auto mb-4 w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Veri Analiz Ediliyor...</h2>
            <p className="text-gray-600">
              Dosyanız işleniyor ve detaylı analiz raporu hazırlanıyor. Lütfen bekleyin.
            </p>
            <div className="mt-4">
              <div className="text-sm text-gray-500">
                Dosya: {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            </div>
          </div>
        ) : analysisResult ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">Analiz Raporu</h1>
                  <p className="text-gray-600">
                    {analysisResult.fileName} • {analysisResult.fileSize} MB
                  </p>
                </div>
                <button
                  onClick={resetAnalysis}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Yeni Dosya Yükle
                </button>
              </div>
            </div>

            {/* Data Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{analysisResult.rowCount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Satır</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <PieChart size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{analysisResult.columnCount}</div>
                    <div className="text-sm text-gray-600">Sütun</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <AlertTriangle size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{analysisResult.missingValues}</div>
                    <div className="text-sm text-gray-600">Eksik Değer</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <TrendingUp size={20} className="text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{analysisResult.duplicates}</div>
                    <div className="text-sm text-gray-600">Duplikat</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Types */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Veri Tipleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-800">Sayısal</span>
                  <span className="text-blue-600 font-bold">{analysisResult.dataTypes.numeric}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-800">Kategorial</span>
                  <span className="text-green-600 font-bold">{analysisResult.dataTypes.categorical}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-purple-800">Tarih/Saat</span>
                  <span className="text-purple-600 font-bold">{analysisResult.dataTypes.datetime}</span>
                </div>
              </div>
            </div>

            {/* Statistical Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">İstatistiksel Özet</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-sm text-gray-600">Ortalama Yaş</div>
                  <div className="text-xl font-bold text-gray-800">{analysisResult.statistics.meanAge}</div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-sm text-gray-600">Medyan Gelir</div>
                  <div className="text-xl font-bold text-gray-800">₺{Number(analysisResult.statistics.medianIncome).toLocaleString()}</div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-sm text-gray-600">Maksimum Değer</div>
                  <div className="text-xl font-bold text-gray-800">{analysisResult.statistics.maxValue}</div>
                </div>
              </div>
            </div>

            {/* Visualizations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Görselleştirmeler</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysisResult.charts.map((chart: any, index: number) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="h-32 bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-3 flex items-center justify-center">
                      <BarChart3 size={32} className="text-teal-600" />
                    </div>
                    <h4 className="font-medium text-gray-800 mb-1">{chart.title}</h4>
                    <p className="text-sm text-gray-600">{chart.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Öneriler</h3>
              <div className="space-y-3">
                {analysisResult.recommendations.map((recommendation: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                    <CheckCircle size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-amber-800 text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DataPreprocessing;