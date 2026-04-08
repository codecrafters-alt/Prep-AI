import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import { FaArrowLeft } from "react-icons/fa";
function InterviewHistory() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        const result = await axios.get(
          ServerUrl + "/api/interview/get-interview",
          { withCredentials: true },
        );
        console.log(result.data);
        setInterviews([...result.data]);
      } catch (error) {
        console.log(error);
      }
    };

    getMyInterviews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0220] via-[#140633] to-[#02010a] py-10">
      <div className="w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto">
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
        {/* HEADER */}
        <div className="mb-10 w-full flex items-start gap-4 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="z-5 mt-1 p-3 rounded-full 
           bg-gradient-to-br from-white/20 via-transparent to-transparent 
          shadow-lg hover:bg-white/20 transition"
          >
            <FaArrowLeft className="text-gray-300" />
          </button>

          <div>
            <h1 className="text-3xl font-semibold text-gray-200">
              Interview History
            </h1>

            <p className="text-gray-400 mt-2">
              Track your past interviews and performance insights
            </p>
          </div>
        </div>

        {/* EMPTY STATE */}
        {interviews.length === 0 ? (
          <div
            className="bg-[#0f172a]/60 backdrop-blur-xl 
        border border-purple-500/20 
        p-10 rounded-2xl shadow-lg text-center"
          >
            <p className="text-gray-400">
              No interviews found. Start your first AI interview.
            </p>
          </div>
        ) : (
          /* LIST */
          <div className="grid gap-6">
            {interviews.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/report/${item._id}`)}
                className="bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl 
              border border-purple-500/20 
              p-6 rounded-2xl 
              shadow-lg shadow-purple-600/10 
              hover:shadow-emerald-500/20 
              hover:-translate-y-1 
              transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* LEFT INFO */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200">
                      {item.role}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      • {item.experience}
                    </p>

                    <p className="text-gray-400 text-sm mt-1">• {item.mode}</p>

                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex items-center gap-6">
                    {/* SCORE */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-400">
                        {item.finalScore.toFixed(1) || 0}/10
                      </p>

                      <p className="text-xs text-gray-500">Overall Score</p>
                    </div>

                    {/* STATUS */}
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-medium 
                    ${
                      item.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
                    }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewHistory;
