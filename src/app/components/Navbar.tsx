"use client";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex justify-end pr-20 h-10 items-center">
      <Link
        href="/admin"
        onClick={() => {
          setClicked(true);
        }}
        className="relative group text-white mr-2"
      >
        Hantera bokningar
        <span className="absolute right-0 bottom-0 w-full h-[2px] bg-white scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300"></span>
      </Link>
      {clicked && (
        <i className="w-4 h-4 border-2 border-t-blue-500 border-t-2 border-gray-300 rounded-full animate-spin" />
      )}
    </div>
  );
};

export default Header;
