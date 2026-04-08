//onStart call is used to fetch the questions api

import React from "react";
import { motion } from "motion/react";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Step1SetUp({ onStart }) {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");

  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;
    setAnalyzing(true);

    const formdata = new FormData();
    formdata.append("resume", resumeFile);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/resume",
        formdata,
        { withCredentials: true },
      );

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");

      setAnalysisDone(true);
      setAnalyzing(false);
    } catch (error) {
      console.log(error);
      setAnalyzing(false);
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/generate-questions",
        { role, experience, mode, resumeText, projects, skills },
        { withCredentials: true },
      );

      if (userData) {
        dispatch(
          setUserData({ ...userData, credits: result.data.creditsLeft }),
        );
      }

      setLoading(false);
      console.log(result.data);
      onStart(result.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#0b0220] via-[#140633] to-[#02010a]"
    >
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 
    bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),
    linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
    bg-[size:40px_40px] pointer-events-none"
      />

      {/* PURPLE GLOW */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] 
    bg-purple-600/20 rounded-full blur-[120px]"
      />

      {/* BLUE / TEAL GLOW */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] 
    bg-emerald-500/10 rounded-full blur-[120px]"
      />

      <div
        className="w-full max-w-6xl 
        bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl 
              border border-purple-500/20 
               rounded-3xl 
              shadow-lg shadow-purple-600/10
        grid md:grid-cols-2 overflow-hidden"
      >
        {/* LEFT SIDE */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="p-12 flex flex-col justify-center
          bg-[#0f172a]/40 border-r border-purple-500/20"
        >
          <h2 className="text-4xl font-semibold text-gray-200 mb-6">
            Start Your AI Interview
          </h2>

          <p className="text-gray-400 mb-10">
            Practice realistic interview conversations powered by AI. Improve
            communication, technical clarity, and confidence.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: <FaUserTie className="text-emerald-400 text-xl" />,
                text: "Select Role & Experience",
              },
              {
                icon: <FaMicrophoneAlt className="text-emerald-400 text-xl" />,
                text: "AI Voice Interview Simulation",
              },
              {
                icon: <FaChartLine className="text-emerald-400 text-xl" />,
                text: "Performance Analytics",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="flex items-center space-x-4
                bg-gradient-to-br from-white/0 via-transparent to-transparent border border-purple-500/20
                p-4 rounded-xl shadow-lg
                hover:shadow-emerald-500/20 transition-all"
              >
                {item.icon}
                <span className="text-gray-300 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="p-12"
        >
          <h2 className="text-3xl font-semibold text-gray-200 mb-8">
            Interview Setup
          </h2>

          <div className="space-y-6">
            {/* ROLE */}
            <div className="relative">
              <FaUserTie className="absolute top-4 left-4 text-gray-500" />

              <input
                type="text"
                placeholder="Enter role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-12 pr-4 py-3
                 bg-gradient-to-br from-white/0 via-transparent to-transparent  border border-purple-500/20
                rounded-xl text-gray-200
                focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>

            {/* EXPERIENCE */}
            <div className="relative">
              <FaBriefcase className="absolute top-4 left-4 text-gray-500" />

              <input
                type="text"
                placeholder="Experience (e.g. 2 years)"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full pl-12 pr-4 py-3
                bg-gradient-to-br from-white/0 via-transparent to-transparent border border-purple-500/20
                rounded-xl text-gray-200
                focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>

            {/* MODE */}
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full py-3 px-4
              bg-gradient-to-br from-white/0 via-transparent to-transparent border border-purple-500/20
              rounded-xl text-gray-200
              focus:ring-2 focus:ring-emerald-400 outline-none"
            >
              <option className="bg-[#0f172a]" value="Technical">
                Technical Interview
              </option>
              <option className="bg-[#0f172a]" value="HR">
                HR Interview
              </option>
            </select>

            {/* RESUME UPLOAD */}
            {!analysisDone && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => document.getElementById("resumeUpload").click()}
                className="border-2 border-dashed border-purple-500/20
                rounded-xl p-8 text-center cursor-pointer
                hover:border-emerald-400 hover: bg-gradient-to-br from-white/0 via-transparent to-transparent  transition"
              >
                <FaFileUpload className="text-4xl mx-auto text-emerald-400 mb-3" />

                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="hidden"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />

                <p className="text-gray-400 font-medium">
                  {resumeFile
                    ? resumeFile.name
                    : "Click to upload resume (Optional)"}
                </p>

                {resumeFile && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadResume();
                    }}
                    className="mt-4 bg-emerald-500 text-black
                    px-5 py-2 rounded-lg
                    hover:bg-emerald-400 transition"
                  >
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* RESUME RESULT */}
            {analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0f172a]/70 border border-purple-500/20
                rounded-xl p-5 space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-200">
                  Resume Analysis Result
                </h3>

                {projects.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-300 mb-1">Projects:</p>

                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {projects.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-300 mb-1">Skills:</p>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((s, i) => (
                        <span
                          key={i}
                          className="bg-emerald-500/20 text-emerald-400
                          px-3 py-1 rounded-full text-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* START BUTTON */}
            <motion.button
              onClick={handleStart}
              disabled={!role || !experience || loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full disabled:bg-emerald-500/40 disabled:shadow-none disabled:cursor-not-allowed
              bg-emerald-500 hover:bg-emerald-400 transition duration-300
              text-black py-3 rounded-full text-lg font-semibold
               shadow-lg shadow-emerald-500/30"
            >
              {loading ? "Starting..." : "Start Interview"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Step1SetUp;
