import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AuthModel from "../components/AuthModel";
import { useSelector } from "react-redux"; //useSelector is used to get the data from the redux store
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from "../components/Footer";
function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen text-white flex flex-col overflow-hidden bg-[#05010f]">
      {/* 🌌 GLOBAL GLOW */}
      <div className="absolute w-[700px] h-[700px] bg-purple-600/30 blur-[160px] rounded-full top-[-200px] left-[-200px]"></div>
      <div className="absolute w-[600px] h-[600px] bg-emerald-500/20 blur-[140px] rounded-full bottom-[-200px] right-[-200px]"></div>

      {/* 🔲 GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* ✨ RANDOM PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(270)].map((_, i) => {
          const size = Math.random() * 2 + 1; // 1px → 3px

          return (
            <div
              key={i}
              className="absolute rounded-full bg-white/30 shadow-[0_0_6px_rgba(255,255,255,0.6)] animate-[float_6s_ease-in-out_infinite]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: Math.random() * 0.5 + 0.3,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          );
        })}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar openAuth={() => setShowAuth(true)} />

        <div className="flex-1 px-6 py-20">
          <div className="max-w-6xl mx-auto">
            {/* BADGE */}
            <div className="flex justify-center mb-6">
              <div className="bg-[#0f172a]/60 backdrop-blur-md border border-purple-500/20 text-gray-300 text-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-purple-200/20 transition duration-300 cursor-default">
                <HiSparkles size={16} className="text-emerald-400" />
                AI Powered Smart Interview Platform
              </div>
            </div>

            {/* HERO */}
            <div className="text-center mb-28 relative">
              {/* glow */}
              <div className="absolute w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full left-1/2 -translate-x-1/2 top-10"></div>

              {/* glass box */}
              <div className="w-full md:w-[85%] inline-block p-[1px] rounded-2xl bg-gradient-to-r from-purple-700/10 via-white/20 to-emerald-500/30">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl px-10 py-12 shadow-[0_0_40px_rgba(139,92,246,0.15)]">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-semibold leading-tight bg-gradient-to-r from-gray-100 via-purple-300 to-emerald-400 
bg-clip-text text-transparent  max-w-4xl mx-auto"
                  >
                    Shape Your Future with AI{" "}
                    <span className="relative inline-block mt-1.5">
                      <span
                        className="text-2xl md:text-6xl mt-3 inline-block px-10 py-4 rounded-full 
bg-emerald-500/20 backdrop-blur-lg border border-white/20 
text-emerald-400/80  font-semibold
shadow-[0_0_25px_rgba(16,185,129,0.4)] 
hover:scale-105 transition-all duration-300"
                      >
                        AI Intelligence
                      </span>
                    </span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-gray-200 mt-6 max-w-2xl mx-auto text-lg"
                  >
                    Simulate real interview experiences, analyze and enhance
                    your resume, discover the best-fit roles, and receive
                    personalized AI-driven insights to guide your career journey
                    — all powered by AI.
                  </motion.p>

                  <div className="flex flex-wrap justify-center gap-6 mt-10">
                    {/* START */}
                    <motion.button
                      onClick={() => {
                        if (!userData) {
                          setShowAuth(true);
                          return;
                        }
                        navigate("/interview");
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-6 py-3 rounded-full font-semibold 
bg-gradient-to-r from-emerald-400 to-emerald-600 
text-black shadow-md shadow-emerald-500/40 border border-emerald-400/30
hover:scale-105 hover:shadow-emerald-400/60 transition-all duration-300"
                    >
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 hover:text-black transition"></span>
                      Start AI Interview
                    </motion.button>

                    {/* HISTORY */}
                    <motion.button
                      onClick={() => {
                        if (!userData) {
                          setShowAuth(true);
                          return;
                        }
                        navigate("/history");
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="border border-purple-500/30 text-white/70 px-10 py-3 rounded-full bg-gradient-to-br from-white/50 via-transparent to-transparent backdrop-blur-md shadow-lg shadow-purple-500/10 hover:border-purple-400 hover:shadow-purple-500/30 transition"
                    >
                      View History
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent my-20"></div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-28">
              {[
                {
                  icon: <BsRobot size={24} />,
                  step: "STEP 1",
                  title: "Role & Experience Selection",
                  desc: "AI adjusts difficulty based on selected job role.",
                },
                {
                  icon: <BsMic size={24} />,
                  step: "STEP 2",
                  title: "Smart Voice Interview",
                  desc: "Dynamic follow-up questions based on your answers.",
                },
                {
                  icon: <BsClock size={24} />,
                  step: "STEP 3",
                  title: "Timer Based Simulation",
                  desc: "Real interview pressure with time tracking.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 + index * 0.2 }}
                  whileHover={{ rotate: 0, scale: 1.06 }}
                  className={`
        relative bg-gradient-to-br from-white/20 via-transparent to-transparent 
backdrop-blur-xl
border border-white/20 rounded-3xl p-10 w-80 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]
transition-all duration-300  ]
        ${index === 0 ? "rotate-[-4deg]" : ""}
        ${index === 1 ? "rotate-[3deg] md:-mt-6 shadow-xl" : ""}
        ${index === 2 ? "rotate-[-3deg]" : ""}
      `}
                >
                  {/* Icon */}
                  <div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 
      bg-[#0f172a] border border-emerald-400/40
      text-emerald-400 w-16 h-16 rounded-2xl
      flex items-center justify-center
      shadow-lg shadow-emerald-500/20"
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="pt-10 text-center">
                    <div className="text-md text-emerald-400 font-bold mb-2 tracking-wider">
                      {item.step}
                    </div>

                    <h3 className="font-semibold mb-3 text-lg text-gray-200">
                      {item.title}
                    </h3>

                    <p className="text-sm text-white/70 font-semibold leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Features */}

            <div className="mb-32">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-semibold text-center mb-16 text-gray-200"
              >
                Advanced AI{" "}
                <span className="text-emerald-400">Capabilities</span>
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-10">
                {[
                  {
                    image: evalImg,
                    icon: <BsBarChart size={20} />,
                    title: "AI Response Evaluation",
                    desc: "Our AI analyzes your answers for clarity, accuracy and confidence to simulate real interviewer feedback.",
                  },
                  {
                    image: resumeImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Resume-Driven Interviews",
                    desc: "Generate tailored interview questions based on your resume, projects and technical background.",
                  },
                  {
                    image: pdfImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Smart Performance Reports",
                    desc: "Receive downloadable reports highlighting strengths, weaknesses and improvement areas.",
                  },
                  {
                    image: analyticsImg,
                    icon: <BsBarChart size={20} />,
                    title: "Progress Analytics",
                    desc: "Visualize your interview progress with AI-powered analytics and performance tracking.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl border border-purple-500/20 
        rounded-3xl p-8 shadow-lg shadow-purple-600/10 
        hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-emerald-400/10
 hover:-translate-y-1 transition-all duration-300
        "
                  >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* IMAGE */}
                      <div className="w-full md:w-1/2 flex justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-auto object-contain max-h-64"
                        />
                      </div>

                      {/* TEXT */}
                      <div className="w-full md:w-1/2">
                        <div className="bg-emerald-500/20 text-emerald-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-emerald-400/30">
                          {item.icon}
                        </div>

                        <h3 className="font-semibold mb-3 text-xl text-gray-200">
                          {item.title}
                        </h3>

                        <p className="text-white/70 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* INTERVIEW MODES */}

            <div className="mb-32">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-semibold text-center mb-16 text-gray-200"
              >
                Multiple Interview{" "}
                <span className="text-emerald-400">Modes</span>
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-10">
                {[
                  {
                    img: hrImg,
                    title: "HR Interview Mode",
                    desc: "Practice HR-style interviews focusing on communication, personality and real workplace scenarios.",
                  },
                  {
                    img: techImg,
                    title: "Technical Interview Mode",
                    desc: "Answer role-specific technical questions generated by AI based on your selected domain.",
                  },
                  {
                    img: confidenceImg,
                    title: "Voice & Confidence Analysis",
                    desc: "AI analyzes tone, pace and confidence level during your responses.",
                  },
                  {
                    img: creditImg,
                    title: "Flexible Credit System",
                    desc: "Use credits to unlock premium interviews and advanced AI evaluation sessions.",
                  },
                ].map((mode, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl border border-purple-500/20
        rounded-3xl p-8 shadow-lg shadow-purple-600/10
      hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-emerald-400/10 hover:-translate-y-1
        transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div className="w-1/2">
                        <h3 className="font-semibold text-xl mb-3 text-gray-200">
                          {mode.title}
                        </h3>

                        <p className="text-white/70 text-sm leading-relaxed">
                          {mode.desc}
                        </p>
                      </div>

                      <div className="w-1/2 flex justify-end">
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="w-28 h-28 object-contain"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        <Footer />
      </div>
    </div>
  );
}

export default Home;
