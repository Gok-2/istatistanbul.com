import React, { useState } from 'react';
import { ArrowLeft, Upload, Database, Code, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

const UploadPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [uploadType, setUploadType] = useState<'dataset' | 'code' | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    file: null as File | null
  });

  const datasetCategories = ['Finans', 'Trafik', 'Popülasyon', 'Sağlık', 'Eğitim', 'Çevre', 'Araştırmalar'];
  const codeCategories = ['Matematik', 'Web Geliştirme', 'Algoritmalar', 'Veri Analizi', 'Makine Öğrenimi', 'Mobil', 'Oyun'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate upload
    alert(`${uploadType === 'dataset' ? 'Veri seti' : 'Kod projesi'} başarıyla yüklendi!`);
    setCurrentPage(uploadType === 'dataset' ? 'datasets' : 'code');
  };

  const resetForm = () => {
    setUploadType(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      tags: '',
      file: null
    });
  };

  if (!uploadType) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">İçerik Yükle</h1>
            <p className="text-gray-600">
              Veri seti veya kod projenizi toplulukla paylaşın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dataset Upload */}
            <div 
              onClick={() => setUploadType('dataset')}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 cursor-pointer hover:shadow-lg hover:border-teal-300 transition-all duration-300 group"
            >
              <div className="text-center">
                <div className="p-4 bg-teal-100 rounded-full inline-block mb-4 group-hover:bg-teal-200 transition-colors">
                  <Database size={32} className="text-teal-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Veri Seti Yükle</h2>
                <p className="text-gray-600 mb-4">
                  CSV, Excel veya SQL dosyalarınızı yükleyin ve toplulukla paylaşın
                </p>
                <ul className="text-left text-sm text-gray-500 space-y-1">
                  <li>• Desteklenen formatlar: CSV, XLSX, SQL</li>
                  <li>• Maksimum dosya boyutu: 50MB</li>
                  <li>• Açık ve temiz veri setleri</li>
                  <li>• Detaylı açıklama ve etiketleme</li>
                </ul>
              </div>
            </div>

            {/* Code Upload */}
            <div 
              onClick={() => setUploadType('code')}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
            >
              <div className="text-center">
                <div className="p-4 bg-blue-100 rounded-full inline-block mb-4 group-hover:bg-blue-200 transition-colors">
                  <Code size={32} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Kod Projesi Yükle</h2>
                <p className="text-gray-600 mb-4">
                  Algoritmalarınızı, çözümlerinizi ve kod projelerinizi paylaşın
                </p>
                <ul className="text-left text-sm text-gray-500 space-y-1">
                  <li>• Python, JavaScript, C++, Java destekli</li>
                  <li>• Açık kaynak kod paylaşımı</li>
                  <li>• Algoritma ve çözüm odaklı</li>
                  <li>• Topluluk ile etkileşim</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={resetForm}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {uploadType === 'dataset' ? 'Veri Seti Yükle' : 'Kod Projesi Yükle'}
            </h1>
            <p className="text-gray-600">
              {uploadType === 'dataset' 
                ? 'Veri setinizi yükleyin ve toplulukla paylaşın'
                : 'Kod projenizi yükleyin ve diğer geliştiricilerle paylaşın'
              }
            </p>
          </div>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Başlık *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder={uploadType === 'dataset' ? 'Veri seti başlığı' : 'Kod projesi başlığı'}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder={uploadType === 'dataset' 
                  ? 'Veri setinin içeriği, kaynağı ve kullanım alanları hakkında detaylar...'
                  : 'Kod projesinin amacı, kullanılan teknolojiler ve çözülen problem hakkında detaylar...'
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Kategori seçin</option>
                {(uploadType === 'dataset' ? datasetCategories : codeCategories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Etiketler
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Etiketleri virgülle ayırın (örn: python, analiz, makine öğrenimi)"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                İçeriğinizin daha kolay bulunması için ilgili etiketler ekleyin
              </p>
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                Dosya {uploadType === 'dataset' ? '*' : '(Opsiyonel)'}
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  accept={uploadType === 'dataset' ? '.csv,.xlsx,.sql' : '.py,.js,.cpp,.c,.java,.txt'}
                  required={uploadType === 'dataset'}
                  className="hidden"
                />
                <label htmlFor="file" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-gray-100 rounded-full">
                      <Upload size={24} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">
                        {formData.file ? formData.file.name : 'Dosya seçin veya sürükleyin'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {uploadType === 'dataset' 
                          ? 'CSV, XLSX, SQL (max 50MB)'
                          : 'Python, JavaScript, C++, Java dosyaları'
                        }
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Save size={18} />
                <span>Yükle</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;