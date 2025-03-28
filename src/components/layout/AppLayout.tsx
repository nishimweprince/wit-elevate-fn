import { ReactNode } from 'react';
import AppSidebar from './AppSidebar';
import { Bell, ChevronDown } from 'lucide-react';
import { Avatar } from '@radix-ui/react-avatar';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <div className="ml-64">

        <header className="h-16 border-b bg-white flex items-center justify-end px-6">
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-secondary mr-4">
              <Bell className="h-5 w-5 text-foreground/70" />
            </button>
            
            <div className="flex items-center">
              <Avatar className="h-9 w-9 bg-primary/20 text-primary">
                <span className="font-semibold">U</span>
              </Avatar>
              <ChevronDown className="h-4 w-4 ml-1 text-foreground/70" />
            </div>
          </div>
        </header>
        

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;