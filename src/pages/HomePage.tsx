import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/forum/Header';
import Footer from '../components/forum/Footer';
import CategoryList from '../components/forum/CategoryList';
import ThreadList from '../components/forum/ThreadList';
import { Category, Thread } from '../util/types';

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCategories([
        {
          id: '1',
          name: 'General Discussion',
          description: 'General topics and discussions about anything related to our community.',
          threadCount: 245,
          postCount: 1253,
          lastPost: {
            threadId: '101',
            threadTitle: 'Welcome to our new forum!',
            timestamp: '2025-02-25T14:22:00Z',
            author: {
              id: 'user1',
              username: 'AdminUser',
              avatar: '',
              joinDate: '2024-01-15T00:00:00Z',
              postCount: 156,
              role: 'admin'
            }
          }
        },
        {
          id: '2',
          name: 'Development & Programming',
          description: 'Discuss development related topics, programming languages, frameworks, and tools.',
          threadCount: 189,
          postCount: 976,
          lastPost: {
            threadId: '102',
            threadTitle: 'React vs. Vue in 2025',
            timestamp: '2025-02-26T09:15:00Z',
            author: {
              id: 'user2',
              username: 'DevGuru',
              avatar: '',
              joinDate: '2024-02-20T00:00:00Z',
              postCount: 87,
              role: 'user'
            }
          }
        },
        {
          id: '3',
          name: 'Design & UI/UX',
          description: 'Share design ideas, discuss UI/UX principles, and showcase your work.',
          threadCount: 142,
          postCount: 734,
          lastPost: {
            threadId: '103',
            threadTitle: 'Design Systems in 2025',
            timestamp: '2025-02-26T11:45:00Z',
            author: {
              id: 'user3',
              username: 'DesignPro',
              avatar: '',
              joinDate: '2024-03-10T00:00:00Z',
              postCount: 56,
              role: 'user'
            }
          }
        }
      ]);
      
      setThreads([
        {
          id: '101',
          title: 'Welcome to our new forum!',
          createdAt: '2025-02-25T14:22:00Z',
          author: {
            id: 'user1',
            username: 'AdminUser',
            avatar: '',
            joinDate: '2024-01-15T00:00:00Z',
            postCount: 156,
            role: 'admin'
          },
          postCount: 12,
          viewCount: 234,
          lastPost: {
            timestamp: '2025-02-26T18:30:00Z',
            author: {
              id: 'user4',
              username: 'NewMember',
              avatar: '',
              joinDate: '2025-02-24T00:00:00Z',
              postCount: 3,
              role: 'user'
            }
          },
          isPinned: true,
          isLocked: false,
          tags: ['announcement', 'welcome']
        },
        {
          id: '102',
          title: 'React vs. Vue in 2025',
          createdAt: '2025-02-26T09:15:00Z',
          author: {
            id: 'user2',
            username: 'DevGuru',
            avatar: '',
            joinDate: '2024-02-20T00:00:00Z',
            postCount: 87,
            role: 'user'
          },
          postCount: 28,
          viewCount: 312,
          lastPost: {
            timestamp: '2025-02-27T10:45:00Z',
            author: {
              id: 'user5',
              username: 'FrontendDev',
              avatar: '',
              joinDate: '2024-05-18T00:00:00Z',
              postCount: 42,
              role: 'user'
            }
          },
          isPinned: false,
          isLocked: false,
          tags: ['react', 'vue', 'frontend']
        },
        {
          id: '103',
          title: 'Design Systems in 2025',
          createdAt: '2025-02-26T11:45:00Z',
          author: {
            id: 'user3',
            username: 'DesignPro',
            avatar: '',
            joinDate: '2024-03-10T00:00:00Z',
            postCount: 56,
            role: 'user'
          },
          postCount: 15,
          viewCount: 187,
          lastPost: {
            timestamp: '2025-02-27T09:20:00Z',
            author: {
              id: 'user3',
              username: 'DesignPro',
              avatar: '',
              joinDate: '2024-03-10T00:00:00Z',
              postCount: 56,
              role: 'user'
            }
          },
          isPinned: false,
          isLocked: false,
          tags: ['design', 'ui', 'ux']
        }
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Forum Home</h1>
          <div className="flex space-x-2">
            <Link to="/threads/new" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">New Thread</Link>
            <Link to="/search" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300">Advanced Search</Link>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <CategoryList categories={categories} />
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Recent Discussions</h2>
              <ThreadList threads={threads} />
            </section>
            
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Forum Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-800">Members</h3>
                  <p className="text-3xl font-bold mt-2">1,256</p>
                  <p className="text-sm text-gray-600 mt-1">24 new members this week</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="text-lg font-medium text-green-800">Threads</h3>
                  <p className="text-3xl font-bold mt-2">576</p>
                  <p className="text-sm text-gray-600 mt-1">32 new threads this week</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h3 className="text-lg font-medium text-purple-800">Posts</h3>
                  <p className="text-3xl font-bold mt-2">2,963</p>
                  <p className="text-sm text-gray-600 mt-1">128 new posts this week</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
