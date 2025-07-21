import React from 'react';
import { Heart, MessageCircle, User, Trophy } from 'lucide-react';

interface CodeCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  tags: string[];
  author: string;
  submissions: number;
  likes: number;
  onClick?: (id: string) => void;
}

const CodeCard: React.FC<CodeCardProps> = ({
  id,
  title,
  description,
  category,
  difficulty,
  tags,
  author,
  submissions,
  likes,
  onClick
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Kolay': return 'bg-green-100 text-green-800';
      case 'Orta': return 'bg-yellow-100 text-yellow-800';
      case 'Zor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
      onClick={() => onClick?.(id)}
    >
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1">{title}</h3>
          <span className={`ml-3 px-2 py-1 text-xs rounded-full font-medium whitespace-nowrap ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
          {category}
        </span>
        {tags.slice(0, 3).map((tag) => (
          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{tags.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <User size={14} />
          <span>{author}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Trophy size={14} />
            <span>{submissions} çözüm</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart size={14} />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeCard;