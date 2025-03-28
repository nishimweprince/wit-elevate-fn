import { linkProps } from "../../util/types";
import { links } from "../../util/data";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState} from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "";
  const token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="py-4 md:py-6 lg:py-10">
      <div className="flex items-center justify-between">

        <Link
          to="/"
          className="text-black text-xl md:text-2xl leading-10 font-extrabold"
        >
          WIT <span className="text-primary">Elevate</span>
        </Link>


        <button
          className="md:hidden text-grey"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>


        <div className="hidden md:flex md:items-center md:gap-8 lg:gap-14">
          <div className="flex items-center gap-4 lg:gap-8 text-grey text-sm lg:text-base font-medium leading-6">
            {links.map(({ link, path }: linkProps) => {
              return <Link key={path} to={path}>{link}</Link>;
            })}
          </div>
        </div>


        <div className="hidden md:flex md:items-center md:gap-4 lg:gap-5">
          {["admin", "partner"].includes(role) && (
            <Link
              to="dashboard"
              className="border border-primary px-4 lg:px-6 py-2 text-secondary rounded-lg text-sm lg:text-base"
            >
              Dashboard
            </Link>
          )}
          {token ? (
            <button
              onClick={logout}
              className="text-sm lg:text-base font-medium leading-6 bg-secondary text-white px-4 lg:px-6 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <Link
              to="logIn"
              className="text-grey text-sm lg:text-base font-medium leading-6"
            >
              Log in
            </Link>
          )}
        </div>
      </div>


      {isMenuOpen && (
        <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col space-y-4 px-4">
            {links.map(({ link, path }: linkProps) => {
              return (
                <Link 
                  key={path} 
                  to={path}
                  className="text-grey text-base font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </Link>
              );
            })}
            
            <div className="pt-4 border-t border-gray-200">
              {["admin", "partner"].includes(role) && (
                <Link
                  to="dashboard"
                  className="block w-full text-center border border-primary px-6 py-2 text-secondary rounded-lg mb-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              {token ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-base font-medium leading-6 bg-secondary text-white px-6 py-2 rounded-lg"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="logIn"
                  className="block w-full text-center text-base font-medium leading-6 bg-secondary text-white px-6 py-2 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default NavBar;