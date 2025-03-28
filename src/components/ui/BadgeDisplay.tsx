import React from 'react';
import { motion } from 'framer-motion';

interface Badge {
  _id: string;
  name: string;
  description: string;
  category: string;
  level: string;
  image: string;
  earnedAt: string;
}

interface BadgeDisplayProps {
  badges: Badge[];
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badges }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <motion.div
          key={badge._id}
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
        >
          <img
            src={badge.image}
            alt={badge.name}
            className="w-24 h-24 object-contain mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">{badge.name}</h3>
          <p className="text-sm text-gray-600 text-center mb-2">{badge.description}</p>
          <div className="flex space-x-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {badge.category}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              {badge.level}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Earned on {new Date(badge.earnedAt).toLocaleDateString()}
          </p>
        </motion.div>
      ))}
    </div>
  );
}; 