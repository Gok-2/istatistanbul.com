import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Hoşgeldiniz</h2>
      <p>Lütfen aşağıdaki seçeneklerden birini kullanarak giriş yapınız.</p>
      { /* Google, LinkedIn, GitHub gibi SSO butonlarını entegre edebilirsiniz */ }
    </div>
  );
};

export default Home;