import React from 'react';
import { useApp } from '../context/AppContext';
import TrainingCard from '../components/ui/TrainingCard';
import { AlertTriangle, GraduationCap, Trophy } from 'lucide-react';

const AIModels: React.FC = () => {
  const { trainingModules, user, completeTraining } = useApp();
  
  const completedCount = user?.completedTrainings.length || 0;
  const totalCount = trainingModules.length;
  const allCompleted = completedCount === totalCount;

  const handleStartTraining = (trainingId: number) => {
    // Simulate training completion
    completeTraining(trainingId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Progress Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Yapay Zeka Eğitim Serisi</h1>
              <p className="text-gray-600">Adım adım yapay zeka ve makine öğrenimi eğitimleri</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600">{completedCount}/{totalCount}</div>
              <div className="text-sm text-gray-500">Tamamlanan</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-teal-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Başlangıç</span>
            <span>{Math.round((completedCount / totalCount) * 100)}% Tamamlandı</span>
            <span>Uzman</span>
          </div>
        </div>

        {/* Completion Warning */}
        {!allCompleted && completedCount < totalCount && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-amber-800 font-medium">Eğitimi Tamamlayın</p>
                <p className="text-amber-700 text-sm">
                  Yapay zeka içeriklerine tam anlamıyla hakim olabilmek için lütfen eğitimi tamamlayın. 
                  Her modül bir sonrakinin kilidini açar.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Completed Message */}
        {allCompleted && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-full">
                <Trophy className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800">Tebrikler! 🎉</h3>
                <p className="text-green-700">
                  Tüm yapay zeka eğitimlerini başarıyla tamamladınız. 
                  Artık gelişmiş yapay zeka araçlarına ve içeriklerine erişebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Training Modules */}
        {!allCompleted ? (
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <GraduationCap className="text-teal-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Eğitim Modülleri</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trainingModules.map((module) => (
                <TrainingCard
                  key={module.id}
                  {...module}
                  completed={user?.completedTrainings.includes(module.id) || false}
                  onStart={handleStartTraining}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Advanced AI Content for Completed Users */
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Trophy className="text-teal-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Gelişmiş Yapay Zeka İçerikleri</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Advanced Content Cards */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Brain size={20} className="text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">GPT Modelleri</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Large Language Model'ların iç işleyişi, fine-tuning teknikleri ve uygulama alanları
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">İleri Düzey</span>
                  <span className="text-xs text-gray-500">45 dakika</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Brain size={20} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Computer Vision</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  YOLO, R-CNN gibi nesne tanıma algoritmaları ve gerçek zamanlı görü uygulamaları
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">İleri Düzey</span>
                  <span className="text-xs text-gray-500">60 dakika</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Brain size={20} className="text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Reinforcement Learning</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Q-Learning, Policy Gradient ve Actor-Critic algoritmaları ile oyun AI'ları
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Uzman</span>
                  <span className="text-xs text-gray-500">90 dakika</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Brain size={20} className="text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">GAN Networks</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Generative Adversarial Networks ile yaratıcı AI, deepfake ve sanat uygulamaları
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Uzman</span>
                  <span className="text-xs text-gray-500">75 dakika</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Brain size={20} className="text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">MLOps ve Deployment</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Production ortamında AI modeli deploy etme, monitoring ve sürekli iyileştirme
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">İleri Düzey</span>
                  <span className="text-xs text-gray-500">120 dakika</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Brain size={20} className="text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Edge AI</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Mobil ve IoT cihazlarda çalışan hafif AI modelleri, TensorFlow Lite ve quantization
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">İleri Düzey</span>
                  <span className="text-xs text-gray-500">85 dakika</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIModels;