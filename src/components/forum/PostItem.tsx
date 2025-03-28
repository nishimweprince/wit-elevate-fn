import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../util/types';
import { ThumbsUp, Reply, Flag, Edit, Trash, MoreHorizontal } from 'lucide-react';

interface PostItemProps {
  post: Post;
  isOriginalPost?: boolean;
  onReply: (postId: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, isOriginalPost = false, onReply }) => {
  const [showActions, setShowActions] = useState(false);
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className={`p-4 md:p-6 border-b border-gray-200 ${isOriginalPost ? 'bg-blue-50' : ''}`}>
      <div className="flex">
        <div className="hidden md:block w-36 flex-shrink-0 pr-6">
          <div className="flex flex-col items-center text-center">
            <img src="/api/placeholder/80/80" alt="Avatar" className="rounded-full h-20 w-20" />
            <Link to={`/users/${post.author.id}`} className="mt-2 font-medium text-blue-600 hover:underline">
              {post.author.username}
            </Link>
            <div className={`mt-1 px-2 py-1 rounded-full text-xs ${post.author.role === 'admin' ? 'bg-red-100 text-red-800' : post.author.role === 'moderator' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
              {post.author.role.charAt(0).toUpperCase() + post.author.role.slice(1)}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <div>Posts: {post.author.postCount}</div>
              <div>Joined: {new Date(post.author.joinDate).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img src="/api/placeholder/32/32" alt="Avatar" className="md:hidden rounded-full h-8 w-8 mr-2" />
              <div>
                <div className="flex items-center">
                  <Link to={`/users/${post.author.id}`} className="md:hidden font-medium text-blue-600 hover:underline">
                    {post.author.username}
                  </Link>
                  <span className={`md:hidden ml-2 px-2 py-0.5 rounded-full text-xs ${post.author.role === 'admin' ? 'bg-red-100 text-red-800' : post.author.role === 'moderator' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                    {post.author.role.charAt(0).toUpperCase() + post.author.role.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <span>{new Date(post.createdAt).toLocaleString()}</span>
                  {post.updatedAt && (
                    <span className="ml-2">(Edited: {new Date(post.updatedAt).toLocaleString()})</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={() => setShowActions(!showActions)}
              >
                <MoreHorizontal className="h-5 w-5 text-gray-500" />
              </button>
              
              {showActions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="prose max-w-none">
            <p>{post.content}</p>
          </div>
          
          {post.attachments && post.attachments.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Attachments:</h4>
              <div className="flex flex-wrap gap-2">
                {post.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center p-2 bg-gray-100 rounded-md text-sm">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <a href="#" className="text-blue-600 hover:underline">{attachment}</a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
className={`flex items-center space-x-1 px-3 py-1 rounded-md ${liked ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
onClick={handleLike}
>

</button>

<button 
className="flex items-center space-x-1 px-3 py-1 rounded-md text-gray-500 hover:bg-gray-100"
onClick={() => onReply(post.id)}
>
<Reply className="h-4 w-4" />
<span>Reply</span>
</button>
</div>

<div className="text-xs text-gray-500">
Post #{post.id}
</div>
</div>
</div>
</div>
</div>
);
};

export default PostItem;