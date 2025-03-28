import { Link, useLocation } from "react-router-dom"

interface SideBarButtonProps {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const SideBarButton = ({ text, icon, path }: SideBarButtonProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </Link>
  );
};

export default SideBarButton