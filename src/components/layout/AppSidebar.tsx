import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { 
  Home, 
  User, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  FolderKanban,
  ChevronRight
} from "lucide-react";

const sidebarItems = [
  { 
    name: "Overview", 
    path: "/", 
    icon: Home 
  },
  { 
    name: "Profile", 
    path: "/profile", 
    icon: User 
  },
  { 
    name: "Assessments", 
    path: "/assessments", 
    icon: FileText 
  },
  { 
    name: "Courses", 
    path: "/courses", 
    icon: BookOpen 
  },
  { 
    name: "Forum", 
    path: "/forum", 
    icon: MessageSquare 
  },
  { 
    name: "Projects", 
    path: "/projects", 
    icon: FolderKanban 
  },
];

const AppSidebar = () => {
  const location = useLocation();
  
  return (
    <div className="w-64 h-screen bg-white shadow-md fixed left-0 top-0">
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-xl">WIT</span>
          <span className="font-bold text-xl text-primary"> Elevate</span>
        </Link>
      </div>
      
      <div className="py-6">
        <nav>
          <ul className="space-y-2 px-3">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== "/" && location.pathname.startsWith(item.path));
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center p-3 rounded-lg text-sm transition-colors",
                      "hover:bg-secondary group",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-foreground/80"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 mr-3",
                      isActive ? "text-primary-foreground" : "text-foreground/60"
                    )} />
                    <span>{item.name}</span>
                    <ChevronRight className={cn(
                      "ml-auto h-4 w-4 opacity-60",
                      isActive ? "text-primary-foreground" : "text-foreground/60"
                    )} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AppSidebar;
