import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFileUpload } from "react-icons/fa";
import { ServerUrl } from "../App";
import { FaArrowLeft } from "react-icons/fa";
import Result from "../components/Result";
function CareerCopilot() {
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();
  const [overall_level, setOverallLevel] = useState("");
  const [summary, setSummary] = useState("");
  const [best_roles, setBestRoles] = useState([]);
  const [company_types, setCompanyTypes] = useState([]);
  const [apply_links, setApplyLinks] = useState([]);
  const [skill_gaps, setSkillGaps] = useState([]);
  const [improvements, setImprovements] = useState([]);

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;
    setAnalyzing(true);

    const formdata = new FormData();
    formdata.append("resume", resumeFile);
    try {
      const response = await axios.post(
        ServerUrl + "/api/career/copilot",
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Career Copilot response:", response.data);
      setOverallLevel(response.data.overall_level);
      setSummary(response.data.summary);
      setBestRoles(response.data.best_roles);
      setCompanyTypes(response.data.company_types);
      setApplyLinks(response.data.apply_links);
      setSkillGaps(response.data.skill_gaps);
      setImprovements(response.data.improvements);

      setAnalysisDone(true);
      setAnalyzing(false);
    } catch (err) {
      console.error("Error uploading resume:", err);
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0220] via-[#140633] to-[#02010a] py-10">
      <div className="w-[100vw] lg:w-[70vw] max-w-[90%] mx-auto">
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
      </div>
      <div className="flex flex-start ml-20">
        <button
          onClick={() => navigate("/")}
          className="z-5 mt-1 p-3 rounded-full 
                   bg-gradient-to-br from-white/20 via-transparent to-transparent 
                  shadow-lg hover:bg-white/20 transition"
        >
          <FaArrowLeft className="text-gray-300" />
        </button>
      </div>

      {/* HEADER */}
      {!analysisDone && (
        <div className="mb-14 w-full flex items-center justify-center flex-col text-center">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Career Copilot
          </h1>

          <p className="text-gray-400 mt-3 text-lg max-w-xl">
            Analyze your resume and discover the best roles, companies, and
            opportunities tailored for you.
          </p>
        </div>
      )}

      {/* UPLOAD CARD */}
      {!analysisDone && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative w-[90%] sm:w-[420px] mx-auto 
               p-[1px] rounded-2xl 
               bg-gradient-to-r from-purple-500/30 via-emerald-400/20 to-transparent"
        >
          {/* INNER CARD */}
          <div
            onClick={() => document.getElementById("resumeUpload").click()}
            className="cursor-pointer rounded-2xl p-10 text-center
                 bg-[#0b0220]/80 backdrop-blur-xl
                 border border-white/10 hover:border-emerald-400/40
                 transition-all duration-300"
          >
            {/* ICON */}
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-emerald-400/10">
                <FaFileUpload className="text-3xl text-emerald-400" />
              </div>
            </div>

            {/* TEXT */}
            <p className="text-gray-300 font-medium text-lg">
              {resumeFile ? (
                <span className="text-emerald-400">{resumeFile.name}</span>
              ) : (
                "Upload your resume (PDF)"
              )}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Drag & drop or click to upload
            </p>

            {/* INPUT */}
            <input
              type="file"
              accept="application/pdf"
              id="resumeUpload"
              className="hidden"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />

            {/* BUTTON */}
            {resumeFile && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUploadResume();
                }}
                className="mt-6 w-full py-3 rounded-xl
                     bg-gradient-to-r from-emerald-400 to-teal-400
                     text-black font-semibold
                     hover:opacity-90 transition
                     shadow-lg shadow-emerald-500/20"
              >
                {analyzing ? "Analyzing resume..." : "Analyze Resume"}
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
      {analysisDone && (
        <Result
          overall_level={overall_level}
          summary={summary}
          best_roles={best_roles}
          company_types={company_types}
          apply_links={apply_links}
          skill_gaps={skill_gaps}
          improvements={improvements}
        />
      )}
    </div>
  );
}

export default CareerCopilot;
