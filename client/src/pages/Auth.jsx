import React from "react";
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { ServerUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
function Auth({ isModel = false }) {
  const dispatch = useDispatch(); //agar new user login hota hai to bhi data ko set karana padega store ke andar

  const handleGoogleAuth = async () => {
    try {
      //in res we will get the email user details and all the information related to the user
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      //after getting the user details we will send it to the backend to create a new user or login the user if already exists
      const result = await axios.post(
        ServerUrl + "/api/auth/google",
        {
          name: name,
          email: email,
        },
        { withCredentials: true },
      ); //withCredentials is used to send the cookie from browser to the backend
      dispatch(setUserData(result.data.user)); //setting the user data in the redux store
    } catch (error) {
      dispatch(setUserData(null)); // If there's an error, set user data to null
      console.log("Error during Google authentication:", error);
    }
  };
  return (
    <div
      className={`w-full ${
        isModel
          ? ""
          : "min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0f0a1f] to-[#1a103d] text-white px-6 py-20"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.05 }}
        className={`bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-900/20 w-full ${
          isModel ? "max-w-md p-8 rounded-3xl" : "max-w-md p-8 rounded-2xl"
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-black text-white p-2 rounded-lg">
            <BsRobot className="text-xl" />
          </div>
          <h2 className="font-semibold text-lg">AI Interview Agent</h2>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4">
          Continue with
          <span className="bg-gradient-to-br from-white/20 via-transparent to-transparent text-lg text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2 border border-green-600/20 ">
            <IoSparkles size={16} />
            AI Smart Interview
          </span>
        </h1>
        <p className="text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8">
          Sign in to start AI-powered mock interviews, track your progress, and
          unlock detailed performance insights.
        </p>
        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.85 }}
          className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-gray-500 py-3 px-4 rounded-full font-medium transition duration-200 flex items-center
            justify-center gap-2"
        >
          <FcGoogle size={20} />
          continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Auth;
