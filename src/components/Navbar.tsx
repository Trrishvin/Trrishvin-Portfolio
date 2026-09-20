import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  setIsDarkMode,
}) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#000009]/80 backdrop-blur-md border-b border-[#05668d]/30 py-3 shadow-xl"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#top"
          className="text-2xl font-black tracking-wider flex items-center gap-2 group"
        >
          <span className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#05668d] to-[#16c172] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-[#16c172]/20 group-hover:scale-105 transition-transform">
            TB
          </span>
          <span className="font-extrabold tracking-tight text-white">
            TRRISHVIN<span className="text-[#16c172]">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 bg-[#000009]/60 border border-[#05668d]/30 px-6 py-2 rounded-full backdrop-blur-lg">
          {["about", "projects", "experience", "skills", "contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm font-medium text-gray-300 hover:text-[#16c172] capitalize transition-colors"
              >
                {item}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-full border border-[#05668d]/40 hover:border-[#16c172] text-[#16c172] bg-[#05668d]/10 transition-all"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href="#contact"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider bg-gradient-to-r from-[#05668d] to-[#16c172] text-white hover:opacity-90 shadow-lg shadow-[#05668d]/20 transition-all hover:-translate-y-0.5"
          >
            Let's Talk <ArrowUpRight size={16} />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 border-b bg-[#000009] border-[#05668d]/30">
          <nav className="flex flex-col gap-4 text-center">
            {["about", "projects", "experience", "skills", "contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-gray-300 hover:text-[#16c172] font-medium capitalize"
                >
                  {item}
                </a>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
