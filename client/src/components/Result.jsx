import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function Result({
  overall_level,
  summary,
  best_roles,
  company_types,
  apply_links,
  skill_gaps,
  improvements,
}) {
  // sort roles
  const sortedRoles = [...(best_roles || [])].sort((a, b) => b.match - a.match);

  const topRole = sortedRoles[0];

  const navigate = useNavigate();

  return (
    <div className="w-[90vw] lg:w-[70vw] mx-auto mt-10 text-white">
      {/* 🧠 TOP SUMMARY */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold text-emerald-400 text-3xl">
          🧠 {overall_level}
        </h1>
        <p className="text-gray-300 mt-3 max-w-3xl mx-auto text-lg">
          {summary}
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 🎯 BEST ROLES */}
        <div
          className="bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl 
              border border-purple-500/20 
              p-8 rounded-3xl 
              shadow-lg shadow-purple-600/10 p-8 "
        >
          <h3 className="text-lg font-semibold mb-3 text-emerald-400 ">
            🎯 Best Roles
          </h3>
          <ul className="space-y-2 text-gray-300 list-disc list-inside">
            {sortedRoles.map((role, index) => (
              <li key={index}>
                {role.role} ({role.match}%)
              </li>
            ))}
          </ul>
        </div>

        {/* 🚀 COMPANY TYPES */}
        <div
          className="bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl 
              border border-purple-500/20 
              p-8 rounded-3xl 
              shadow-lg shadow-purple-600/10 p-8 "
        >
          <h3 className="text-lg font-semibold mb-3 text-purple-400 ">
            🚀 Company Types
          </h3>
          <ul className="space-y-2 text-gray-300 list-disc list-inside">
            {company_types.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        {/* 🔗 APPLY LINKS */}
        <div
          className="bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl 
              border border-purple-500/20 
              p-8 rounded-3xl 
              shadow-lg shadow-purple-600/10 p-8"
        >
          <h3 className="text-lg font-semibold mb-3 text-blue-400">
            🔗 Apply Links
          </h3>
          <ul className="space-y-2 text-gray-300 list-disc list-inside">
            {apply_links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  {link.platform} → {link.role}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ⚠️ SKILL GAPS */}
        <div
          className="bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl 
              border border-purple-500/20 
              p-8 rounded-3xl 
              shadow-lg shadow-purple-600/10 p-8 "
        >
          <h3 className="text-lg font-semibold mb-3 text-red-400">
            ⚠️ Skill Gaps
          </h3>
          <ul className="space-y-2 text-gray-300 list-disc list-inside">
            {skill_gaps.map((gap, i) => (
              <li key={i}>{gap}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 💡 IMPROVEMENTS */}
      <div
        className="mt-6 bg-gradient-to-br from-white/20 via-transparent to-transparent backdrop-blur-xl 
              border border-purple-500/20 
              p-8 rounded-3xl 
              shadow-lg shadow-purple-600/10 p-8 "
      >
        <h3 className="text-lg font-semibold mb-3 text-yellow-400">
          💡 Improvements
        </h3>
        <ul className="space-y-2 text-gray-300 list-disc list-inside">
          {improvements.map((imp, i) => (
            <li key={i}>{imp}</li>
          ))}
        </ul>
      </div>

      {/* 🚀 CTA BUTTON */}
      {topRole && (
        <div className="mt-10 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              navigate(`/interview?role=${encodeURIComponent(topRole.role)}`)
            }
            className="px-8 py-4 rounded-xl 
                       bg-gradient-to-r from-emerald-400 to-teal-400 
                       text-black font-semibold text-lg
                       shadow-lg shadow-emerald-500/30"
          >
            Start Interview for {topRole.role} ({topRole.match}% match)
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default Result;
