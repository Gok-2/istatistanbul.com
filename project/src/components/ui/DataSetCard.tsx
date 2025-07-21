import React from 'react';
import { Star, Download, Calendar, User } from 'lucide-react';

interface DataSetCardProps {
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
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const DataSetCard: React.FC<DataSetCardProps> = ({
  id,
  name,
  description,
  category,
  tags,
  size,
  uploadDate,
  author,
  downloads,
  rating,
  isFavorite,
  onToggleFavorite
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{name}</h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">{description}</p>
        </div>
        <button
          onClick={() => onToggleFavorite(id)}
          className={`ml-4 p-2 rounded-full transition-all duration-200 ${
            isFavorite 
              ? 'text-yellow-500 hover:bg-yellow-50' 
              : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50'
          }`}
        >
          <Star size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full font-medium">
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
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span>{author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{uploadDate}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Download size={14} />
            <span>{downloads.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={14} fill="currentColor" className="text-yellow-500" />
            <span>{rating}</span>
          </div>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{size}</span>
        </div>
      </div>
    </div>
  );
};

export default DataSetCard;