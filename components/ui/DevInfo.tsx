"use dom";

import "@/global.css";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export default function DeveloperInfo({
  dom,
}: {
  dom: import("expo/dom").DOMProps;
}) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (colorScheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [colorScheme]);

  const handleBack = () => router.back();

  const handleLinkedInClick = () =>
    window.open("https://www.linkedin.com/in/mfaizhussain7", "_blank");

  const handleGitHubClick = () =>
    window.open("https://github.com/faizhussain7", "_blank");

  return (
    <div className="min-h-screen transition-all duration-500 p-6 font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 select-none">
      <div className="flex items-center mb-10 max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 px-4 py-2 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:scale-110 transition-transform duration-300"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="rounded-3xl p-10 shadow-xl border transition-all duration-500 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-2xl animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="relative w-28 h-28">
              {!imgLoaded && (
                <div className="absolute inset-0 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none" />
              )}
              <img
                src="https://github.com/faizhussain7.png"
                alt="Mohammed Faiz Hussain"
                className={`w-28 h-28 rounded-full object-cover transition-opacity duration-500 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                } ring-4 ring-blue-200 dark:ring-blue-800 select-none`}
                onLoad={() => setImgLoaded(true)}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              {!imgLoaded ? (
                <>
                  <div className="w-48 h-7 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none" />
                  <div className="w-32 h-5 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none" />
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent transition-all duration-300 hover:scale-105 select-none">
                    Mohammed Faiz Hussain
                  </h1>
                  <p className="text-xl font-medium text-gray-500 dark:text-gray-400 select-none">
                    Full Stack Mobile Engineer
                  </p>
                </>
              )}
            </div>
            {!imgLoaded ? (
              <div className="flex flex-col gap-2 w-full max-w-lg">
                <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none" />
                <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none" />
                <div className="h-5 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none" />
              </div>
            ) : (
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg transition-all duration-300 animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none">
                Passionate mobile developer crafting innovative solutions with
                React Native, Expo, and modern web technologies. Building
                user-centric applications that bridge the gap between design and
                functionality.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-3xl p-8 shadow-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 select-none">
            Connect with me
          </h2>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
            <button
              onClick={handleLinkedInClick}
              className="flex items-center gap-3 px-6 py-4 rounded-xl font-medium text-white bg-gradient-to-r from-[#0077b5] to-[#005885] hover:scale-105 hover:shadow-xl transition-all duration-300 animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="hover:scale-110 transition-transform duration-300"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
              LinkedIn Profile
            </button>
            <button
              onClick={handleGitHubClick}
              className="flex items-center gap-3 px-6 py-4 rounded-xl font-medium text-white bg-gradient-to-r from-gray-900 to-gray-800 hover:scale-105 hover:shadow-xl transition-all duration-300 animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="hover:scale-110 transition-transform duration-300"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub Profile
            </button>
          </div>
        </div>

        <div className="rounded-3xl p-8 shadow-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 select-none">
            Technologies & Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "React Native",
              "Expo",
              "TypeScript",
              "JavaScript",
              "React",
              "Node.js",
              "Mobile Development",
              "Cross-platform",
              "UI/UX Design",
              "Git",
            ].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full text-sm font-medium border bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 animate-shimmer bg-shimmer-light dark:bg-shimmer-dark select-none"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
