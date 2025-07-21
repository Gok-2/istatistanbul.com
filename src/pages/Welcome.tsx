import React from 'react';
import { useApp } from '../context/AppContext';
import AuthButtons from '../components/auth/AuthButtons';
import { BarChart3, Brain, Database, Code } from 'lucide-react';

const Welcome: React.FC = () => {
  const { login } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ist<span className="text-teal-600">atistanbul</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Veri Bilimi ve Yapay Zeka Platformu
          </p>
          <p className="text-gray-500">
            Türkiye'nin en kapsamlı veri bilimi eğitim ve uygulama platformuna hoş geldiniz
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Features Showcase */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-teal-100 rounded-xl">
                <Database className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Zengin Veri Seti Koleksiyonu</h3>
                <p className="text-gray-600">Türkiye'nin en kapsamlı açık veri seti arşivine erişin</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">İnteraktif AI Eğitimleri</h3>
                <p className="text-gray-600">Adım adım yapay zeka ve makine öğrenimi eğitimleri</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Code className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Kod Paylaşım Merkezi</h3>
                <p className="text-gray-600">Projelerinizi paylaşın, diğer geliştiricilerle işbirliği yapın</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <BarChart3 className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Otomatik Veri Analizi</h3>
                <p className="text-gray-600">Verilerinizi yükleyin, anında analiz ve görselleştirme alın</p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Platforma Katılın</h2>
              <p className="text-gray-600">
                Hemen başlayın ve veri bilimi yolculuğunuza devam edin
              </p>
            </div>

            <AuthButtons onAuth={login} />

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Devam ederek{' '}
                <a href="#" className="text-teal-600 hover:underline">
                  Kullanıcı Sözleşmesi
                </a>{' '}
                ve{' '}
                <a href="#" className="text-teal-600 hover:underline">
                  Gizlilik Politikası
                </a>
                'nı kabul etmiş olursunuz.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-teal-600">10K+</div>
            <div className="text-gray-600">Aktif Kullanıcı</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-600">500+</div>
            <div className="text-gray-600">Veri Seti</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-600">1K+</div>
            <div className="text-gray-600">Kod Projesi</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-600">50+</div>
            <div className="text-gray-600">Eğitim Modülü</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;