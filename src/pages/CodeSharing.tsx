import React from 'react';

const CodeSharing: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Kod Paylaşımı</h2>
      <div>
        <input type="text" placeholder="Arama..." className="border p-2 w-full" />
      </div>
      { /* Kategoriler ve kod paylaşım kartları eklenebilir */ }
      <div className="mt-4">
        <p>Kod paylaşımı kartları burada listelenecek.</p>
      </div>
    </div>
  );
};

export default CodeSharing;