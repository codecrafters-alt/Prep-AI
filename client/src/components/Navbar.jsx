import React from "react";
import { useSelector } from "react-redux"; //useSelector is used to get the data from the redux store
import { motion } from "motion/react";
import { setUserData } from "../redux/userSlice";
import { BsRobot } from "react-icons/bs";
import { FaBrain } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";
import { GiBrain } from "react-icons/gi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch } from "react-redux";

function Navbar({ openAuth }) {
  const { userData } = useSelector((state) => state.user); //getting the user data from the redux store
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null)); // Clear user data from Redux store on logout
      setShowUserPopup(false); // Close the user popup after logout
      setShowCreditPopup(false); // Close the credit popup if it's open
      navigate("/"); // Redirect to the authentication page after logout
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };
  return (
    <div className="bg-black/30 backdrop-blur-lg flex justify-center px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-gradient-to-b from-white/10 via-transparent to-transparent backdrop-blur-lg rounded-[18px] border border-purple-500/20 shadow-lg shadow-purple-500/20 px-8 py-4 flex justify-between items-center relative"
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="text-purple-300 bg-purple-900/20 border border-purple-500/20 hover:bg-purple-600/20 hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-200 p-2 rounded-lg">
            <FaBrain className="text-lg" />
          </div>
          <h1 className="text-gray-200 hover:text-white font-semibold hidden md:block text-lg ">
            PrepAi
          </h1>
        </div>

        <div className="flex items-center gap-6 relative">
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) {
                  openAuth(); // Show the authentication modal if user is not logged in
                  return;
                }
                navigate("/career-copilot");
              }}
              className=" text-sm flex items-center gap-2 px-5 py-2 rounded-full 
bg-gradient-to-tr from-white/20 via-transparent to-transparent backdrop-blur-md border border-white/20 
hover:bg-white/10 transition-all duration-300"
            >
              <GiBrain
                size={20}
                className="w-4 h-4 md:w-5 md:h-5 text-purple-400 text-lg"
              />
              <span
                className="hidden md:inline bg-gradient-to-r from-gray-200 via-purple-300 to-purple-400 
  bg-clip-text text-transparent font-medium"
              >
                Career Copilot
              </span>
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => {
                if (!userData) {
                  openAuth(); // Show the authentication modal if user is not logged in
                  return;
                }
                setShowCreditPopup(!showCreditPopup);
                setShowUserPopup(false);
              }}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent border border-white/20 hover:bg-white/10 transition-all duration-200"
            >
              <BsCoin size={20} className="text-yellow-400" />
              <span>{userData?.credits ? userData.credits : 0}</span>
              {/* Display user credits or 0 if userData is null */}
            </button>
            {showCreditPopup && (
              <div className="absolute mt-2 right-[-50px] w-64 bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-lg border border-purple-500/20 rounded-xl shadow-sm shadow-purple-600/20 p-4 z-50">
                <p className="text-sm mb-4 text-gray-300">
                  Need more credits to continue?
                </p>

                <button
                  onClick={() => navigate("/pricing")}
                  className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 
text-black font-semibold py-2 px-4 rounded-lg 
hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] 
transition duration-300"
                >
                  Buy more Credits
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) {
                  openAuth(); // Show the authentication modal if user is not logged in
                  return;
                }
                setShowUserPopup(!showUserPopup);
                setShowCreditPopup(false);
              }}
              className={`w-9 h-9 flex items-center justify-center rounded-full 
bg-purple-700/50 border border-gray-800 
hover:ring-2 hover:ring-white 
focus:outline-none 
transition-all duration-200 gap-1 font-semibold
${
  !showUserPopup
    ? "focus:ring-0 focus:ring-offset-0"
    : "focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#05010f]"
}`}
            >
              {userData?.name ? (
                userData.name.charAt(0).toUpperCase()
              ) : (
                <FaUserAstronaut size={16} />
              )}
            </button>
            {showUserPopup && (
              <div className="absolute mt-2 right-[-50px] w-64 bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-lg border border-purple-500/20 rounded-xl shadow-sm shadow-purple-600/20 p-4 z-50">
                <p className="text-sm mb-4 text-gray-300">{userData?.name}</p>
                <button
                  onClick={() => navigate("/history")}
                  className="w-full text-left text-sm py-2 text-gray-300 "
                >
                  Interview History
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm py-2 flex items-center gap-2 text-red-400 hover:text-red-300 "
                >
                  <HiOutlineLogout size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Navbar;
