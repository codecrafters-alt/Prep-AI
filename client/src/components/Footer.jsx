import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative border-t border-purple-500/20 bg-[#0a0118]/80 backdrop-blur-xl mt-32 overflow-hidden">
      {/* GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full top-[-200px] left-[-200px]"></div>

      <div className="max-w-6xl mx-auto px-6 py-14 relative z-10">
        <div className="grid md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <h2 className="text-lg text-gray-200 hover:text-white font-semibold mb-3">
              PrepAI
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              AI-powered mock interview platform helping developers practice
              real interview scenarios.
            </p>

            <div className="flex gap-4 text-gray-400">
              <FaGithub className="hover:scale-125 hover:text-emerald-400 transition-all duration-300 cursor-pointer" />
              <FaLinkedin className="hover:scale-125 hover:text-emerald-400 transition-all duration-300 cursor-pointer" />
              <FaTwitter className="hover:scale-125 hover:text-emerald-400 transition-all duration-300 cursor-pointer" />
            </div>
          </div>

          {/* LINK SECTIONS */}
          {["Product"].map((section, i) => (
            <div key={i}>
              <h3 className="text-gray-200 font-semibold mb-4 text-lg">
                {section}
              </h3>

              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  "Features",
                  "Interview Modes",
                  "AI Capabilities",
                  "Pricing",
                ].map((item, j) => (
                  <li
                    key={j}
                    className="relative group cursor-pointer hover:text-emerald-400 transition"
                  >
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-emerald-400 transition-all group-hover:w-full"></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {["Resources"].map((section, i) => (
            <div key={i}>
              <h3 className="text-gray-200 font-semibold mb-4 text-lg">
                {section}
              </h3>

              <ul className="space-y-2 text-sm text-gray-400">
                {["Interview Tips", "Blog", "Documentation", "FAQS"].map(
                  (item, j) => (
                    <li
                      key={j}
                      className="relative group cursor-pointer hover:text-emerald-400 transition"
                    >
                      {item}
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-emerald-400 transition-all group-hover:w-full"></span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}

          {["Company"].map((section, i) => (
            <div key={i}>
              <h3 className="text-gray-200 font-semibold mb-4 text-lg">
                {section}
              </h3>

              <ul className="space-y-2 text-sm text-gray-400">
                {["About", "Contact", "Privacy Policy", "Terms of Service"].map(
                  (item, j) => (
                    <li
                      key={j}
                      className="relative group cursor-pointer hover:text-emerald-400 transition"
                    >
                      {item}
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-emerald-400 transition-all group-hover:w-full"></span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="border-t border-purple-500/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 PrepAI. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Built with AI-powered interview technology.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
