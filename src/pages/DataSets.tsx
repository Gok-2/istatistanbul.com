import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/ui/SearchBar';
import CategoryTags from '../components/ui/CategoryTags';
import DataSetCard from '../components/ui/DataSetCard';
import { Star } from 'lucide-react';

const DataSets: React.FC = () => {
  const { datasets, user, toggleFavoriteDataset, searchDatasets, filterDatasetsByCategory } = useApp();
  const [filteredDatasets, setFilteredDatasets] = useState(datasets);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Tümü', 'Trafik', 'Popülasyon', 'Finans', 'Sağlık', 'Eğitim', 'Çevre', 'Araştırmalar'];

  const favoriteDatasets = datasets.filter(dataset => 
    user?.favoriteDatasets.includes(dataset.id)
  );

  useEffect(() => {
    let result = datasets;
    
    if (searchQuery) {
      result = searchDatasets(searchQuery);
    }
    
    if (selectedCategory !== 'Tümü') {
      result = result.filter(dataset => dataset.category === selectedCategory);
    }
    
    setFilteredDatasets(result);
  }, [searchQuery, selectedCategory, datasets, searchDatasets]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            placeholder="Veri setleri arasında arama yapın..."
            onSearch={handleSearch}
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* Favorite Datasets */}
        {favoriteDatasets.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="text-yellow-500" size={20} fill="currentColor" />
              <h2 className="text-xl font-semibold text-gray-800">Favorileriniz</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteDatasets.map((dataset) => (
                <DataSetCard
                  key={dataset.id}
                  {...dataset}
                  isFavorite={true}
                  onToggleFavorite={toggleFavoriteDataset}
                />
              ))}
            </div>
          </div>
        )}

        {favoriteDatasets.length === 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="text-yellow-500" size={20} fill="currentColor" />
              <h2 className="text-xl font-semibold text-gray-800">Favorileriniz</h2>
            </div>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Star className="mx-auto text-gray-400 mb-3" size={32} />
              <p className="text-gray-600">Henüz favori veri setiniz bulunmamaktadır.</p>
              <p className="text-gray-500 text-sm mt-1">Veri setlerindeki yıldız simgesine tıklayarak favorilerinize ekleyebilirsiniz.</p>
            </div>
          </div>
        )}

        {/* Category Tags */}
        <div className="mb-8">
          <CategoryTags
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        {/* All Datasets */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {selectedCategory === 'Tümü' ? 'Tüm Veri Setleri' : `${selectedCategory} Veri Setleri`}
            <span className="text-gray-500 ml-2">({filteredDatasets.length})</span>
          </h2>
          
          {filteredDatasets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDatasets.map((dataset) => (
                <DataSetCard
                  key={dataset.id}
                  {...dataset}
                  isFavorite={user?.favoriteDatasets.includes(dataset.id) || false}
                  onToggleFavorite={toggleFavoriteDataset}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <div className="text-gray-400 mb-3">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600">Arama kriterlerinize uygun veri seti bulunamadı.</p>
              <p className="text-gray-500 text-sm mt-1">Farklı anahtar kelimeler deneyin veya kategori filtresini değiştirin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSets;