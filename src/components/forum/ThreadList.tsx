import React from 'react';
import { Link } from 'react-router-dom';
import { Thread } from '../../util/types';
import { Eye, MessageCircle, Pin, Lock, Calendar, Tag } from 'lucide-react';

interface ThreadListProps {
  threads: Thread[];
  categoryName?: string;
}

const ThreadList: React.FC<ThreadListProps> = ({ threads, categoryName }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">{categoryName ? `Threads in ${categoryName}` : 'Recent Threads'}</h2>
        <Link to="/threads/new" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">New Thread</Link>
      </div>
      
      <div className="divide-y divide-gray-200">
        {threads.map((thread) => (
          <div key={thread.id} className={`p-4 ${thread.isPinned ? 'bg-blue-50' : ''}`}>
            <div className="flex items-start">
              <img src="/api/placeholder/40/40" alt="Avatar" className="rounded-full h-10 w-10 mr-4 hidden sm:block" />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  {thread.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                  {thread.isLocked && <Lock className="h-4 w-4 text-red-600" />}
                  <Link to={`/threads/${thread.id}`} className="text-lg font-medium text-blue-600 hover:text-blue-800 truncate">
                    {thread.title}
                  </Link>
                </div>
                
                <div className="mt-1 flex items-center text-xs text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Link to={`/users/${thread.author.id}`} className="flex items-center hover:underline">
                      <span>{thread.author.username}</span>
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-1">
                  {thread.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="ml-4 flex flex-col items-end text-xs text-gray-500 whitespace-nowrap">
                <div className="flex items-center mb-1">
                  <Eye className="h-3 w-3 mr-1" />
                  <span>{thread.viewCount}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  <span>{thread.postCount}</span>
                </div>
                <div className="mt-2 text-right">
                  <div>Last post by</div>
                  <div className="font-medium">{thread.lastPost.author.username}</div>
                  <div>{new Date(thread.lastPost.timestamp).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center p-4 border-t border-gray-200">
        <div className="flex space-x-1">
          <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-800 text-sm">1</button>
          <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600 text-sm">2</button>
          <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600 text-sm">3</button>
          <span className="px-3 py-1 text-gray-600 text-sm">...</span>
          <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600 text-sm">10</button>
        </div>
      </div>
    </div>
  );
};

export default ThreadList;