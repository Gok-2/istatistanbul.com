import React from 'react';

interface CategoryTagsProps {
  categories: string[];
  selectedCategory?: string;
  onCategorySelect: (category: string) => void;
  className?: string;
}

const CategoryTags: React.FC<CategoryTagsProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  className = ''
}) => {
  return (
    <div className={`flex space-x-3 overflow-x-auto pb-2 scrollbar-hide ${className}`}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-teal-600 text-white shadow-lg transform scale-105'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTags;