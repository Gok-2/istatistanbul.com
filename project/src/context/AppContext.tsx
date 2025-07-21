import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  completedTrainings: number[];
  favoriteDatasets: string[];
}

interface Dataset {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  size: string;
  uploadDate: string;
  author: string;
  downloads: number;
  rating: number;
}

interface TrainingModule {
  id: number;
  title: string;
  description: string;
  difficulty: 'Başlangıç' | 'Orta' | 'İleri';
  duration: string;
  locked: boolean;
  completed: boolean;
}

interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  tags: string[];
  author: string;
  submissions: number;
  likes: number;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  currentPage: string;
  datasets: Dataset[];
  trainingModules: TrainingModule[];
  codeChallenges: CodeChallenge[];
  login: (provider: string) => void;
  logout: () => void;
  setCurrentPage: (page: string) => void;
  toggleFavoriteDataset: (datasetId: string) => void;
  completeTraining: (trainingId: number) => void;
  searchDatasets: (query: string) => Dataset[];
  filterDatasetsByCategory: (category: string) => Dataset[];
  searchCodeChallenges: (query: string) => CodeChallenge[];
  filterCodeByCategory: (category: string) => CodeChallenge[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const mockDatasets: Dataset[] = [
  {
    id: '1',
    name: 'İstanbul Trafik Yoğunluğu 2024',
    description: 'İstanbul\'daki ana arter ve köprülerin saatlik trafik akış verileri',
    category: 'Trafik',
    tags: ['istanbul', 'trafik', 'ulaşım', 'analitik'],
    size: '2.3 MB',
    uploadDate: '2024-03-15',
    author: 'İBB Açık Veri',
    downloads: 1250,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Türkiye Nüfus İstatistikleri',
    description: 'İl ve ilçe bazında demografik veriler, yaş grupları ve cinsiyet dağılımı',
    category: 'Popülasyon',
    tags: ['demografik', 'nüfus', 'istatistik', 'türkiye'],
    size: '5.7 MB',
    uploadDate: '2024-03-10',
    author: 'TÜİK',
    downloads: 2100,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Finansal Piyasa Verileri 2023',
    description: 'BIST 100 şirketlerinin günlük kapanış fiyatları ve hacim bilgileri',
    category: 'Finans',
    tags: ['borsa', 'finans', 'yatırım', 'analiz'],
    size: '12.4 MB',
    uploadDate: '2024-03-08',
    author: 'Borsa İstanbul',
    downloads: 890,
    rating: 4.6
  },
  {
    id: '4',
    name: 'Sağlık Sistemı Performans Göstergeleri',
    description: 'Hastane doluluk oranları, tedavi süreleri ve hasta memnuniyeti anketi sonuçları',
    category: 'Sağlık',
    tags: ['sağlık', 'hastane', 'memnuniyet', 'performans'],
    size: '8.1 MB',
    uploadDate: '2024-03-05',
    author: 'Sağlık Bakanlığı',
    downloads: 675,
    rating: 4.7
  }
];

const mockTrainingModules: TrainingModule[] = [
  {
    id: 1,
    title: 'Veri Bilimi\'ne Giriş',
    description: 'Veri biliminin temel kavramları, araçları ve metodolojileri',
    difficulty: 'Başlangıç',
    duration: '45 dakika',
    locked: false,
    completed: false
  },
  {
    id: 2,
    title: 'Python ile Veri Analizi',
    description: 'Pandas, NumPy ve Matplotlib kütüphaneleri ile veri manipülasyonu',
    difficulty: 'Başlangıç',
    duration: '60 dakika',
    locked: true,
    completed: false
  },
  {
    id: 3,
    title: 'İstatistiksel Analiz Yöntemleri',
    description: 'Hipotez testleri, korelasyon analizi ve regresyon modelleri',
    difficulty: 'Orta',
    duration: '75 dakika',
    locked: true,
    completed: false
  },
  {
    id: 4,
    title: 'Makine Öğrenimi Temelleri',
    description: 'Denetimli ve denetimsiz öğrenme algoritmaları',
    difficulty: 'Orta',
    duration: '90 dakika',
    locked: true,
    completed: false
  },
  {
    id: 5,
    title: 'Derin Öğrenme ve Sinir Ağları',
    description: 'Neural network mimarileri ve backpropagation algoritması',
    difficulty: 'İleri',
    duration: '120 dakika',
    locked: true,
    completed: false
  },
  {
    id: 6,
    title: 'Doğal Dil İşleme (NLP)',
    description: 'Metin madenciliği, sentiment analizi ve dil modelleri',
    difficulty: 'İleri',
    duration: '105 dakika',
    locked: true,
    completed: false
  },
  {
    id: 7,
    title: 'Bilgisayarlı Görü',
    description: 'Görüntü işleme, özellik çıkarımı ve konvolüsyonel ağlar',
    difficulty: 'İleri',
    duration: '110 dakika',
    locked: true,
    completed: false
  },
  {
    id: 8,
    title: 'Büyük Veri Analizi',
    description: 'Apache Spark, Hadoop ve dağıtık sistemler',
    difficulty: 'İleri',
    duration: '95 dakika',
    locked: true,
    completed: false
  },
  {
    id: 9,
    title: 'Model Değerlendirme ve Optimizasyon',
    description: 'Cross-validation, hyperparameter tuning ve model selection',
    difficulty: 'Orta',
    duration: '80 dakika',
    locked: true,
    completed: false
  },
  {
    id: 10,
    title: 'Yapay Zeka Projesi Geliştirme',
    description: 'End-to-end ML pipeline oluşturma ve deployment stratejileri',
    difficulty: 'İleri',
    duration: '150 dakika',
    locked: true,
    completed: false
  }
];

const mockCodeChallenges: CodeChallenge[] = [
  {
    id: '1',
    title: 'Matematiksel Nüfus Hesabı İçin Kod Yazma',
    description: 'Verilen parametrelere göre bir bölgenin gelecekteki nüfusunu hesaplayan algoritma geliştirin',
    category: 'Matematik',
    difficulty: 'Orta',
    tags: ['matematik', 'algoritma', 'nüfus', 'hesaplama'],
    author: 'Dr. Mehmet Öz',
    submissions: 234,
    likes: 89
  },
  {
    id: '2',
    title: 'Web Scraping ile Veri Toplama',
    description: 'Python BeautifulSoup kullanarak bir web sitesinden veri çekme uygulaması',
    category: 'Web Geliştirme',
    difficulty: 'Kolay',
    tags: ['python', 'webscraping', 'veri', 'beautifulsoup'],
    author: 'Ayşe Kara',
    submissions: 456,
    likes: 156
  },
  {
    id: '3',
    title: 'Optimum Rota Bulma Algoritması',
    description: 'Graf teorisi kullanarak en kısa yol problemini çözen algoritma',
    category: 'Algoritmalar',
    difficulty: 'Zor',
    tags: ['graf', 'algoritma', 'optimizasyon', 'dijkstra'],
    author: 'Prof. Ali Veli',
    submissions: 123,
    likes: 67
  },
  {
    id: '4',
    title: 'Zaman Serisi Analizi ve Tahminleme',
    description: 'ARIMA modeli kullanarak finansal verilerin gelecek değerlerini tahmin etme',
    category: 'Veri Analizi',
    difficulty: 'Orta',
    tags: ['timeseries', 'arima', 'tahminleme', 'finans'],
    author: 'Fatma Demir',
    submissions: 178,
    likes: 92
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('welcome');
  const [datasets] = useState<Dataset[]>(mockDatasets);
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>(mockTrainingModules);
  const [codeChallenges] = useState<CodeChallenge[]>(mockCodeChallenges);

  const isAuthenticated = user !== null;

  const login = (provider: string) => {
    // Simulate login process
    const mockUser: User = {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@email.com',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      completedTrainings: [],
      favoriteDatasets: []
    };
    setUser(mockUser);
    setCurrentPage('datasets');
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('welcome');
  };

  const toggleFavoriteDataset = (datasetId: string) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return prev;
      const favorites = prev.favoriteDatasets.includes(datasetId)
        ? prev.favoriteDatasets.filter(id => id !== datasetId)
        : [...prev.favoriteDatasets, datasetId];
      
      return { ...prev, favoriteDatasets: favorites };
    });
  };

  const completeTraining = (trainingId: number) => {
    if (!user) return;

    setUser(prev => {
      if (!prev) return prev;
      const completedTrainings = [...prev.completedTrainings, trainingId];
      return { ...prev, completedTrainings };
    });

    setTrainingModules(prev => prev.map((module, index) => ({
      ...module,
      completed: module.id === trainingId ? true : module.completed,
      locked: index === trainingId ? false : module.locked // Next module unlocks
    })));
  };

  const searchDatasets = (query: string): Dataset[] => {
    if (!query.trim()) return datasets;
    return datasets.filter(dataset => 
      dataset.name.toLowerCase().includes(query.toLowerCase()) ||
      dataset.description.toLowerCase().includes(query.toLowerCase()) ||
      dataset.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const filterDatasetsByCategory = (category: string): Dataset[] => {
    if (category === 'Tümü') return datasets;
    return datasets.filter(dataset => dataset.category === category);
  };

  const searchCodeChallenges = (query: string): CodeChallenge[] => {
    if (!query.trim()) return codeChallenges;
    return codeChallenges.filter(challenge => 
      challenge.title.toLowerCase().includes(query.toLowerCase()) ||
      challenge.description.toLowerCase().includes(query.toLowerCase()) ||
      challenge.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const filterCodeByCategory = (category: string): CodeChallenge[] => {
    if (category === 'Tümü') return codeChallenges;
    return codeChallenges.filter(challenge => challenge.category === category);
  };

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated,
      currentPage,
      datasets,
      trainingModules,
      codeChallenges,
      login,
      logout,
      setCurrentPage,
      toggleFavoriteDataset,
      completeTraining,
      searchDatasets,
      filterDatasetsByCategory,
      searchCodeChallenges,
      filterCodeByCategory
    }}>
      {children}
    </AppContext.Provider>
  );
};