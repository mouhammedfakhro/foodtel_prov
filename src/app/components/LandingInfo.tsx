import Link from "next/link";
import React from "react";

const LandingInfo = () => {
  return (
    <div className="relative text-white py-20 px-8 flex flex-col items-center text-center space-y-8">
      <h1 className="text-5xl font-bold">Välkommen till Foodtels restaurang</h1>
      <p className="text-lg max-w-3xl">
        Upplev en fantastisk kulinarisk resa hos oss! Vårt team av experter
        skapar magi med färska ingredienser och unika smaker för att ge dig en
        minnesvärd matupplevelse.
      </p>
      <Link
        href="/book"
        className="bg-white text-blue-500 font-medium py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 hover:text-indigo-600 transition duration-300"
      >
        Boka Bord
      </Link>
    </div>
  );
};

export default LandingInfo;
