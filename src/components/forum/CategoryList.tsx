import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../util/types';
import { MessageSquare, Users } from 'lucide-react';

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 md:p-6">
            <Link to={`/categories/${category.id}`}>
              <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800">{category.name}</h3>
            </Link>
            <p className="text-gray-600 mt-1 text-sm">{category.description}</p>
            
            <div className="flex flex-wrap mt-4 justify-between">
              <div className="flex space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{category.threadCount} Threads</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{category.postCount} Posts</span>
                </div>
              </div>
              
              {category.lastPost && (
                <div className="mt-2 md:mt-0 flex items-center text-xs">
                  <img src="/api/placeholder/24/24" alt="User" className="rounded-full h-6 w-6 mr-2" />
                  <div>
                    <Link to={`/threads/${category.lastPost.threadId}`} className="text-blue-600 hover:underline font-medium">{category.lastPost.threadTitle}</Link>
                    <div className="text-gray-500 mt-0.5">
                      <span>by </span>
                      <Link to={`/users/${category.lastPost.author.id}`} className="hover:underline">{category.lastPost.author.username}</Link>
                      <span> • {new Date(category.lastPost.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;