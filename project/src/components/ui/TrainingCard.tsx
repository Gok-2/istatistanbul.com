import React from 'react';
import { Clock, Lock, CheckCircle, Play } from 'lucide-react';

interface TrainingCardProps {
  id: number;
  title: string;
  description: string;
  difficulty: 'Başlangıç' | 'Orta' | 'İleri';
  duration: string;
  locked: boolean;
  completed: boolean;
  onStart?: (id: number) => void;
}

const TrainingCard: React.FC<TrainingCardProps> = ({
  id,
  title,
  description,
  difficulty,
  duration,
  locked,
  completed,
  onStart
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Başlangıç': return 'bg-green-100 text-green-800';
      case 'Orta': return 'bg-yellow-100 text-yellow-800';
      case 'İleri': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleClick = () => {
    if (!locked && !completed && onStart) {
      onStart(id);
    }
  };

  return (
    <div className={`relative bg-white rounded-xl border p-6 transition-all duration-300 ${
      locked 
        ? 'opacity-50 cursor-not-allowed border-gray-200' 
        : completed
        ? 'border-green-200 bg-green-50'
        : 'border-gray-200 hover:shadow-lg hover:border-teal-300 cursor-pointer'
    }`}
    onClick={handleClick}>
      {/* Lock or Check Icon Overlay */}
      {locked && (
        <div className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full">
          <Lock size={16} className="text-gray-400" />
        </div>
      )}
      
      {completed && (
        <div className="absolute top-4 right-4 p-2 bg-green-100 rounded-full">
          <CheckCircle size={16} className="text-green-600" />
        </div>
      )}

      {!locked && !completed && (
        <div className="absolute top-4 right-4 p-2 bg-teal-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Play size={16} className="text-teal-600" />
        </div>
      )}

      <div className="mb-4">
        <h3 className={`text-lg font-semibold mb-2 ${locked ? 'text-gray-400' : completed ? 'text-green-800' : 'text-gray-800'}`}>
          {title}
        </h3>
        <p className={`text-sm line-clamp-3 ${locked ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
            locked ? 'bg-gray-100 text-gray-400' : getDifficultyColor(difficulty)
          }`}>
            {difficulty}
          </span>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
        </div>
        
        {completed && (
          <span className="text-sm text-green-600 font-medium">Tamamlandı</span>
        )}
      </div>
    </div>
  );
};

export default TrainingCard;