
// import { NavLink } from "react-router-dom";

// const SideBarButton = ({ text, icon, path, onClick }: any) => {
//   return (
//     <NavLink
//       to={path}
//       onClick={onClick}
//       className={({ isActive }) =>
//         `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//           isActive
//             ? "bg-blue-50 text-blue-600"
//             : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//         }`
//       }
//     >
//       {icon}
//       <span>{text}</span>
//     </NavLink>
//   );
// };

// export default SideBarButton;
import { NavLink } from "react-router-dom";

interface SideBarButtonProps {
  text: string;
  icon: React.ReactNode;
  path: string;
  onClick?: () => void;
  end?: boolean; // Add this if you want to conditionally apply 'end' for certain links
}

const SideBarButton = ({ text, icon, path, onClick, end }: SideBarButtonProps) => {
  return (
    <NavLink
      to={path}
      end={end} // This will enforce an exact match if true
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
};

export default SideBarButton;

