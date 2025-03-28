

import React, { useState } from 'react';
import { Clock, BookOpen,  Image as ImageIcon, ExternalLink } from 'lucide-react';


interface CourseCardProps {
  title: string;
  description: string;
  className?: string;
  imageUrl?: string;
  duration?: string;
  difficulty?: string;
  link?: string;
  platform?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  className = '',
  imageUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
  duration = '4 weeks',
  difficulty = 'Beginner',
  link,
  platform = 'Online'
}) => {
  const [imageError, setImageError] = useState(false);

  const handleCourseClick = (e: React.MouseEvent) => {
    // Prevent event from bubbling up
    e.stopPropagation();
    
    // Ensure link exists before trying to open
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-md
        transition-all
        duration-300
        hover:shadow-xl
        hover:-translate-y-2
        border
        border-gray-100
        cursor-pointer
        ${className}
      `}
    >
      {/* Course Image */}
      <div className="relative h-48 bg-gray-100">
        {!imageError ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      
      {/* Course Content */}
      <div 
        className="p-4 space-y-3"
        onClick={handleCourseClick}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {title}
          </h3>
          {link && (
            <ExternalLink size={16} className="text-indigo-500 flex-shrink-0" />
          )}
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 min-h-[40px]">
          {description}
        </p>
        
        {/* Course Meta Information */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-3 text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock size={16} className="text-purple-500" />
              <span className="text-xs">{duration}</span>
            </div>
           
            <div className="flex items-center space-x-1">
              <BookOpen size={16} className="text-purple-500" />
              <span className="text-xs">{difficulty}</span>
            </div>
          </div>
         
          <div className="flex items-center text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            <span className="text-xs font-medium">{platform}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;