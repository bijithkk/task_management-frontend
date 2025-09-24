import { FaCalendar, FaMoon } from "react-icons/fa";
import { BsFillBellFill } from "react-icons/bs";
import { useAuthContext } from "../shared/context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Navbar({ onMenuClick }) {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    if (token) {
      navigate("/dashboard");
    }
  };
  return (
    <header className="sticky top-0 z-99 bg-white text-black border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center" onClick={handleClick}>
          <div className="relative mr-2">
            {/* Blue rounded triangular shape */}
            <div
              className="w-10 lg:w-12 h-10 lg:h-12"
              style={{
                background: "#4285F4",
                borderRadius: "20% 90% 70% 30% / 40% 50% 60% 30%",
              }}
            />

            {/* Calendar icon positioned on the shape */}
            <FaCalendar className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg" />
          </div>
          <h1 className="text-xl lg:text-4xl font-bold">Listify</h1>
        </div>

        <nav className="text-sm space-x-6 flex items-center">
          {!token ? (
            // Show links when not logged in
            <>
              <a href="#" className="hover:text-blue-400">
                About us
              </a>
              <a href="#" className="hover:text-blue-400">
                Contacts
              </a>
            </>
          ) : (
            // Show icons when logged in
            <>
              <div className="hidden md:flex items-center space-x-4">
                <FaMoon className="text-lg cursor-pointer hover:text-blue-400" />
                <BsFillBellFill className="text-lg cursor-pointer hover:text-blue-400" />
                <img
                  src="/pic.png" // public folder
                  alt="Profile"
                  className="w-8 h-8 rounded-full ml-2 object-cover cursor-pointer"
                />
              </div>

              <Button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={onMenuClick}
              >
                <GiHamburgerMenu className="text-2xl" />
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
