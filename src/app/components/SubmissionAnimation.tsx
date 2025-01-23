"use client";

import React from "react";
import animation from "../assets/animations/smile.json";
import LottieAnimation from "../components/LottieAnimation";
import { useRouter } from "next/navigation";

interface AnimationProps {
  isVisible: boolean;
}

const SubmissionAnimation = ({ isVisible }: AnimationProps) => {
  if (!isVisible) return;
  const router = useRouter();

  const returnToStartPage = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div
        className={`p-6 bg-white rounded-lg shadow-lg text-center transform transition-transform duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-xl font-bold text-blue-500">Bokning bekräftad!</h2>
        <div className="flex justify-center mt-4">
          <LottieAnimation
            animationData={animation}
            className="w-32 h-32"
            autoplay
            loop={true}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Tack för din bokning! Vi ses snart!
        </p>
        <button
          onClick={returnToStartPage}
          className="inline-block bg-blue-500 text-white font-medium py-2 px-4 rounded-lg mt-2 shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition duration-300 ease-in-out"
        >
          Återgå till startsidan
        </button>
      </div>
    </div>
  );
};

export default SubmissionAnimation;
