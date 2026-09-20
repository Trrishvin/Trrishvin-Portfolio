import React, { useState } from "react";
import type { FormEvent } from "react";
import { Send, Mail, ExternalLink, GitBranch, Globe } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [result, setResult] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");

    const formData = new FormData(event.currentTarget);

    const accessKey = (import.meta.env.VITE_PUBLIC_WEB3FORMS_ACCESS_KEY || "1fdab3db-0a73-43cd-b1b5-389292558a01") as string;
    formData.append("access_key", accessKey.trim());
    console.log("Key being sent:", formData.get("access_key"));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        (event.target as HTMLFormElement).reset();
      } else {
        setResult(data.message || "Error submitting message.");
      }
    } catch {
      setResult("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 border-t border-[#05668d]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#16c172] mb-2">
              Connect
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6">
              Get In Touch
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              Interested in collaborating or discussing full-stack roles? Send a
              message directly.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#05668d]/20 text-[#16c172] flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email Direct</p>
                  <a
                    href="mailto:trrishvin120923@gmail.com"
                    className="text-sm font-bold text-white hover:text-[#16c172]"
                  >
                    trrishvin120923@gmail.com[cite: 1]
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#05668d]/20 text-[#16c172] flex items-center justify-center">
                  <ExternalLink size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="text-sm font-bold text-white">
                    Mira Road, Thane, Mumbai[cite: 1]
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <p className="text-xs text-gray-400 mb-3">Professional Profiles</p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Trrishvin"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-[#05668d]/30 bg-[#000009] text-gray-300 hover:text-white hover:border-[#16c172] transition-colors"
                aria-label="GitHub Profile"
              >
                <GitBranch size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-[#05668d]/30 bg-[#000009] text-gray-300 hover:text-white hover:border-[#16c172] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            className="p-8 rounded-2xl border border-[#05668d]/40 bg-[#000009] space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-[#000009] border border-[#05668d]/40 text-sm text-white focus:outline-none focus:border-[#16c172] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#000009] border border-[#05668d]/40 text-sm text-white focus:outline-none focus:border-[#16c172] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">
                YOUR MESSAGE
              </label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-xl bg-[#000009] border border-[#05668d]/40 text-sm text-white focus:outline-none focus:border-[#16c172] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-[#05668d] to-[#16c172] text-white hover:opacity-95 shadow-xl shadow-[#05668d]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Submit"} <Send size={16} />
            </button>

            {result && (
              <p className="text-center text-xs font-semibold text-[#16c172]">
                {result}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
