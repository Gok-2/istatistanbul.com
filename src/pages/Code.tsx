import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/ui/SearchBar';
import CategoryTags from '../components/ui/CategoryTags';
import CodeCard from '../components/ui/CodeCard';
import CodeEditor from '../components/ui/CodeEditor';
import { ArrowLeft, MessageCircle, Heart, User, Calendar } from 'lucide-react';

const Code: React.FC = () => {
  const { codeChallenges, searchCodeChallenges, filterCodeByCategory } = useApp();
  const [filteredChallenges, setFilteredChallenges] = useState(codeChallenges);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [comments] = useState([
    {
      id: 1,
      author: 'Mehmet Kaya',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'Bu algoritma gerçekten çok iyi optimize edilmiş. Özellikle O(n) time complexity kısmı harika!',
      timestamp: '2 saat önce',
      likes: 5
    },
    {
      id: 2,
      author: 'Ayşe Demir',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'Edge case\'leri nasıl handle ettiğini merak ediyorum. Negatif sayılar için test ettin mi?',
      timestamp: '4 saat önce',
      likes: 3
    },
    {
      id: 3,
      author: 'Ali Yılmaz',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'Dynamic programming yaklaşımını da deneyebilirsin. Belki daha efficient olabilir.',
      timestamp: '1 gün önce',
      likes: 8
    }
  ]);

  const categories = ['Tümü', 'Matematik', 'Web Geliştirme', 'Algoritmalar', 'Veri Analizi', 'Makine Öğrenimi', 'Mobil', 'Oyun'];

  const challenge = codeChallenges.find(c => c.id === selectedChallenge);

  const sampleCode = `# Matematiksel Nüfus Hesabı
# Bu kod gelecekteki nüfusu tahmin eder

def calculate_future_population(current_pop, growth_rate, years):
    """
    Gelecekteki nüfusu hesaplar
    
    Args:
        current_pop (int): Mevcut nüfus
        growth_rate (float): Yıllık büyüme oranı (%)
        years (int): Yıl sayısı
    
    Returns:
        int: Gelecekteki tahmini nüfus
    """
    
    # Compound growth formülü: P = P0 * (1 + r)^t
    future_pop = current_pop * ((1 + growth_rate/100) ** years)
    
    return int(future_pop)

# Örnek kullanım
istanbul_pop_2024 = 15500000  # İstanbul nüfusu
growth_rate = 1.2  # %1.2 yıllık artış
years = 10  # 10 yıl sonra

future_istanbul = calculate_future_population(
    istanbul_pop_2024, 
    growth_rate, 
    years
)

print(f"İstanbul'un 2034 tahmini nüfusu: {future_istanbul:,}")
print(f"Nüfus artışı: {future_istanbul - istanbul_pop_2024:,}")

# Farklı senaryolar
scenarios = [
    ("Düşük büyüme", 0.8),
    ("Normal büyüme", 1.2),
    ("Yüksek büyüme", 2.0)
]

print("\\n=== Nüfus Senaryoları ===")
for name, rate in scenarios:
    pop = calculate_future_population(istanbul_pop_2024, rate, 10)
    print(f"{name}: {pop:,} ({((pop/istanbul_pop_2024-1)*100):.1f}% artış)")`;

  useEffect(() => {
    let result = codeChallenges;
    
    if (searchQuery) {
      result = searchCodeChallenges(searchQuery);
    }
    
    if (selectedCategory !== 'Tümü') {
      result = result.filter(challenge => challenge.category === selectedCategory);
    }
    
    setFilteredChallenges(result);
  }, [searchQuery, selectedCategory, codeChallenges, searchCodeChallenges]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleChallengeClick = (challengeId: string) => {
    setSelectedChallenge(challengeId);
  };

  const handleBackToList = () => {
    setSelectedChallenge(null);
  };

  if (selectedChallenge && challenge) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackToList}
            className="flex items-center space-x-2 mb-6 text-teal-600 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Kod Listesine Dön</span>
          </button>

          {/* Challenge Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{challenge.title}</h1>
                <p className="text-gray-600 mb-4">{challenge.description}</p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    challenge.difficulty === 'Kolay' ? 'bg-green-100 text-green-800' :
                    challenge.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {challenge.category}
                  </span>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span>{challenge.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={14} />
                      <span>{challenge.submissions} çözüm</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart size={14} />
                      <span>{challenge.likes} beğeni</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {challenge.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Kod Editörü</h2>
            <CodeEditor
              initialCode={sampleCode}
              language="python"
              onRun={(code) => console.log('Kod çalıştırıldı:', code)}
            />
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Yorumlar ({comments.length})
            </h3>
            
            {/* Add Comment */}
            <div className="mb-6 p-4 border border-gray-200 rounded-lg">
              <textarea
                placeholder="Yorumunuzu yazın..."
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows={3}
              />
              <div className="flex justify-end mt-3">
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  Yorum Yap
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3 p-4 border border-gray-100 rounded-lg">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-800">{comment.author}</span>
                      <span className="text-gray-500 text-sm">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart size={14} />
                        <span className="text-sm">{comment.likes}</span>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
                        Yanıtla
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            placeholder="Kod projeleri arasında arama yapın..."
            onSearch={handleSearch}
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* Category Tags */}
        <div className="mb-8">
          <CategoryTags
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        {/* Code Challenges */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {selectedCategory === 'Tümü' ? 'Tüm Kod Projeleri' : `${selectedCategory} Projeleri`}
            <span className="text-gray-500 ml-2">({filteredChallenges.length})</span>
          </h2>
          
          {filteredChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => (
                <CodeCard
                  key={challenge.id}
                  {...challenge}
                  onClick={handleChallengeClick}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <div className="text-gray-400 mb-3">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <p className="text-gray-600">Arama kriterlerinize uygun kod projesi bulunamadı.</p>
              <p className="text-gray-500 text-sm mt-1">Farklı anahtar kelimeler deneyin veya kategori filtresini değiştirin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Code;