
import { PiHouseSimpleThin } from "react-icons/pi";
import SideBarButton from "../ui/SideBarButton";
import { MdOutlineForum, MdOutlineQuiz } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { BsBook } from "react-icons/bs";

const PortalSideBar = ({ isOpen, closeSidebar }) => {
  const handleNavigation = () => {

    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <>

      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={closeSidebar}
        ></div>
      )}
      
      <aside 
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          fixed md:sticky top-0 h-screen overflow-y-auto
          z-20 w-64 bg-white border-r border-gray-100 
          transition-transform duration-300 ease-in-out
          md:h-[calc(100vh-73px)] md:top-[73px]
        `}
      >
        <div className="p-6">
          <div className="flex flex-col gap-2">
            <SideBarButton 
              text="Overview" 
              icon={<PiHouseSimpleThin className="w-5 h-5" />} 
              path="/portal"
              onClick={handleNavigation}
              end
            />
            <SideBarButton 
              text="Profile" 
              icon={<CgProfile className="w-5 h-5" />} 
              path="/portal/profile"
              onClick={handleNavigation}
            />
            <SideBarButton 
              text="Assessments" 
              icon={<MdOutlineQuiz className="w-5 h-5" />} 
              path="/portal/assessment"
              onClick={handleNavigation}
            />
            <SideBarButton 
              text="Courses" 
              icon={<BsBook className="w-5 h-5" />} 
              path="/portal/courses"
              onClick={handleNavigation}
            />
            <SideBarButton 
              text="Forum" 
              icon={<MdOutlineForum className="w-5 h-5" />} 
              path="/portal/forum"
              onClick={handleNavigation}
            />
            <SideBarButton 
              text="Projects" 
              icon={<GoProjectSymlink className="w-5 h-5" />} 
              path="/portal/projects"
              onClick={handleNavigation}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default PortalSideBar;
