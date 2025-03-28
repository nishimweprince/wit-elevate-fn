import React from 'react';
import { Search, Bell, MessageSquare, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [unreadNotifications, setUnreadNotifications] = React.useState(3);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-blue-600">ForumApp</Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/categories" className="text-gray-700 hover:text-blue-600">Categories</Link>
              <Link to="/members" className="text-gray-700 hover:text-blue-600">Members</Link>
              <Link to="/search" className="text-gray-700 hover:text-blue-600">Search</Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
            </div>
            
            <div className="relative">
              <button 
                className="relative p-2 rounded-full hover:bg-gray-100"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell className="h-6 w-6 text-gray-600" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 border border-gray-200 py-1">
                  <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-semibold">Notifications</h3>
                    <button className="text-xs text-blue-600 hover:underline">Mark all as read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 bg-blue-50">
                      <div className="flex items-start">
                        <img src="/api/placeholder/32/32" alt="Avatar" className="rounded-full h-8 w-8 mr-3" />
                        <div>
                          <p className="text-sm"><span className="font-semibold">JohnDoe</span> replied to your thread "Getting started with React"</p>
                          <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                      <div className="flex items-start">
                        <img src="/api/placeholder/32/32" alt="Avatar" className="rounded-full h-8 w-8 mr-3" />
                        <div>
                          <p className="text-sm"><span className="font-semibold">JaneSmith</span> mentioned you in "TypeScript best practices"</p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start">
                        <img src="/api/placeholder/32/32" alt="Avatar" className="rounded-full h-8 w-8 mr-3" />
                        <div>
                          <p className="text-sm"><span className="font-semibold">RobertJones</span> liked your post in "Database optimization"</p>
                          <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <Link to="/notifications" className="text-sm text-blue-600 hover:underline block text-center">View all notifications</Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link to="/messages">
              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <MessageSquare className="h-6 w-6 text-gray-600" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
              </button>
            </Link>
            
            <Link to="/profile">
              <div className="flex items-center space-x-2 cursor-pointer">
                <img src="/api/placeholder/32/32" alt="User" className="rounded-full h-8 w-8" />
                <span className="text-sm font-medium hidden lg:inline">CurrentUser</span>
              </div>
            </Link>
          </div>
          
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 py-2 px-3 hover:bg-gray-100 rounded-md">Home</Link>
              <Link to="/categories" className="text-gray-700 py-2 px-3 hover:bg-gray-100 rounded-md">Categories</Link>
              <Link to="/members" className="text-gray-700 py-2 px-3 hover:bg-gray-100 rounded-md">Members</Link>
              <Link to="/search" className="text-gray-700 py-2 px-3 hover:bg-gray-100 rounded-md">Search</Link>
              <div className="relative mt-2">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;