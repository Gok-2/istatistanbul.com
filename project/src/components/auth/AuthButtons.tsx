import React from 'react';
import { Chrome, Linkedin, Github } from 'lucide-react';

interface AuthButtonsProps {
  onAuth: (provider: string) => void;
  className?: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ onAuth, className = '' }) => {
  const authProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: Chrome,
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      bgColor: 'bg-gray-900 hover:bg-gray-800',
      textColor: 'text-white',
      borderColor: 'border-gray-900'
    }
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {authProviders.map((provider) => {
        const Icon = provider.icon;
        return (
          <button
            key={provider.id}
            onClick={() => onAuth(provider.id)}
            className={`w-full flex items-center justify-center space-x-3 px-4 py-3 border rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${provider.bgColor} ${provider.textColor} ${provider.borderColor} shadow-sm hover:shadow-md`}
          >
            <Icon size={20} />
            <span>{provider.name} ile Devam Et</span>
          </button>
        );
      })}
    </div>
  );
};

export default AuthButtons;