
import { FaBell } from "react-icons/fa"
import { RiArrowDropDownLine } from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react" 
import { signOutAction } from "../../store/users/actions"
import { HiMenu, HiX } from "react-icons/hi"

const PortalNavBar = ({ toggleSidebar, sidebarOpen }) => {
  const { user } = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSignOut = async () => {
    const res = await signOutAction()(dispatch)
    if (res?.type) {
      navigate("/login")
    }
  }

  return (
    <nav className={`
      bg-white 
      ${isScrolled ? 'shadow-md' : 'shadow-sm'} 
      sticky top-0 z-30 
      transition-all duration-200
    `}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
      
          <button 
            className="md:hidden mr-4 text-gray-600 hover:text-gray-900"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
          
          <Link to="/" className="flex items-center">
            <span className="text-xl sm:text-2xl font-bold text-gray-800">
              WIT <span className="text-blue-600">Elevate</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <FaBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <div 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {user?.data?.firstName?.[0] || 'U'}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <h2 className="font-medium text-gray-800">{user?.data?.firstName}</h2>
                <p className="text-sm text-gray-500">{user?.data?.email}</p>
              </div>
              <RiArrowDropDownLine className={`w-5 h-5 text-gray-400 transform transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default PortalNavBar