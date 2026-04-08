import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Step3Report({ report }) {
  const navigate = useNavigate();
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Report...</p>
      </div>
    );
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  //data for graph
  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0,
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score.toFixed(1) / 10) * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    // ================= TITLE =================
    doc.setFont("helvetica", "bold");
    doc.setTextColor(16, 185, 129);
    doc.setFontSize(18);
    doc.text("PrepAI • Interview Report", pageWidth / 2, currentY - 7, {
      align: "center",
    });

    currentY += 5;

    // underline
    doc.setDrawColor(34, 197, 94);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

    currentY += 15;

    // ================= FINAL SCORE BOX =================
    doc.setFillColor(16, 185, 129);
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Final Score: ${finalScore.toFixed(1)}/10`,
      pageWidth / 2,
      currentY + 12,
      {
        align: "center",
      },
    );
    currentY += 30;

    // ================= SKILLS BOX =================
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");

    doc.setFontSize(12);

    doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
    doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
    doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);

    currentY += 45;

    // ================= ADVICE =================
    let advice = "";

    if (finalScore >= 8) {
      advice =
        "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    } else if (finalScore >= 5) {
      advice =
        "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    } else {
      advice =
        "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

    doc.setFont("helvetica", "bold");
    doc.text("Professional Advice", margin + 10, currentY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 20);

    currentY += 50;

    // ================= QUESTION TABLE =================
    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [
        `${i + 1}`,
        q.question,
        `${q.score}/10`,
        q.feedback,
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 5,
        valign: "top",
      },
      headStyles: {
        fillColor: [16, 185, 129],
        textColor: 255,
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" }, // index
        1: { cellWidth: 55 }, // question
        2: { cellWidth: 20, halign: "center" }, // score
        3: { cellWidth: "auto" }, // feedback
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    //footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      "Generated by PrepAI • AI Interview Platform",
      pageWidth / 2,
      290,
      { align: "center" },
    );

    doc.save("AI_Interview_Report.pdf");
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden 
bg-gradient-to-br from-[#0b0220] via-[#140633] to-[#02010a] text-white px-6 py-10"
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
      {/* HEADER */}
      <div className="mb-10 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/history")}
            className="p-3 rounded-full  bg-gradient-to-br from-white/20 via-transparent to-transparent  hover:bg-white/20 transition"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Interview Analytics Dashboard
            </h1>
            <p className="text-gray-400">AI-powered performance insights</p>
          </div>
        </div>

        <button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Download PDF
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* LEFT */}
        <div className="space-y-6">
          {/* PERFORMANCE CARD */}
          <motion.div
            className="bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl 
              border border-purple-500/20 
              p-8 rounded-3xl 
              shadow-lg shadow-purple-600/10 p-8 text-center  "
          >
            <h3 className="text-gray-400 mb-6">Overall Performance</h3>

            <div className="w-24 h-24 mx-auto">
              <CircularProgressbar
                value={percentage}
                text={`${score.toFixed(1)}/10`}
                styles={buildStyles({
                  pathColor: "#10b981",
                  textColor: "#fff",
                  trailColor: "rgba(255,255,255,0.1)",
                })}
              />
            </div>

            <p className="text-gray-400 mt-3 text-sm">Out of 10</p>

            {/* ✅ LOGIC PRESERVED HERE */}
            <div className="mt-4">
              <p className="font-semibold text-white">{performanceText}</p>
              <p className="text-gray-400 text-sm mt-1">{shortTagline}</p>
            </div>
          </motion.div>

          {/* SKILLS */}
          <motion.div
            className="bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl 
              border border-purple-500/20 
              p-6 rounded-3xl 
              shadow-lg shadow-purple-600/10"
          >
            <h3 className="mb-6 text-lg">Skill Evaluation</h3>

            {skills.map((s, i) => (
              <div key={i} className="mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <span>{s.label}</span>
                  <span className="text-emerald-400 font-semibold">
                    {s.value}
                  </span>
                </div>

                <div className="bg-white/10 h-2 rounded-full">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                    style={{ width: `${s.value * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">
          {/* CHART */}
          <motion.div
            className="bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl 
              border border-purple-500/20 
              p-8 rounded-3xl 
              shadow-lg shadow-purple-600/10"
          >
            <h3 className="mb-6 text-lg">Performance Trend</h3>

            <div className="h-72">
              <ResponsiveContainer>
                <AreaChart data={questionScoreData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.08)"
                  />
                  <XAxis stroke="#9ca3af" dataKey="name" />
                  <YAxis stroke="#9ca3af" domain={[0, 10]} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.8)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#cbd5f5" }}
                    itemStyle={{ color: "#10b981" }}
                    cursor={{ stroke: "#10b981", strokeWidth: 1 }}
                  />

                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    fill="#10b98133"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* QUESTIONS */}
          <motion.div
            className="bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl 
              border border-purple-500/20 
              p-8 rounded-3xl 
              shadow-lg shadow-purple-600/10"
          >
            <h3 className="mb-6 text-lg">Question Breakdown</h3>

            <div className="space-y-6">
              {questionWiseScore.map((q, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:scale-[1.02] transition"
                >
                  <div className="flex justify-between mb-3">
                    <p className="text-sm text-gray-400">Question {i + 1}</p>

                    <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                      {q.score || 0}/10
                    </span>
                  </div>

                  <p className="font-semibold mb-3 text-white">
                    {q.question || "Question not available"}
                  </p>

                  <div className="bg-emerald-500/10 border border-emerald-400/20 p-4 rounded-lg">
                    <p className="text-xs text-emerald-400 mb-1">AI Feedback</p>
                    <p className="text-sm text-gray-300">
                      {q.feedback && q.feedback.trim() !== ""
                        ? q.feedback
                        : "No feedback available for this question."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Step3Report;
