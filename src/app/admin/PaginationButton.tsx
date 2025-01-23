"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface PaginationButtonProps {
  currentPage: number;
  totalPages: number;
  direction: "next" | "previous"; // Specify the direction for the button
  tab: string; // The current tab (active, canceled, all)
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  currentPage,
  totalPages,
  direction,
  tab,
}) => {
  const router = useRouter(); // Get the Next.js router instance

  const handleNavigation = () => {
    const targetPage =
      direction === "next" ? currentPage + 1 : currentPage - 1;

    // Navigate to the updated URL
    router.push(`?tab=${tab}&page=${targetPage}`);
    router.refresh(); // Refresh the page to revalidate data
  };

  // Disable the button if it's out of bounds
  const isDisabled =
    (direction === "previous" && currentPage === 1) ||
    (direction === "next" && currentPage === totalPages);

  return (
    <button
      onClick={handleNavigation}
      disabled={isDisabled}
      className={`px-4 py-2 rounded-lg ${
        isDisabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {direction === "next" ? "Nästa" : "Föregående"}
    </button>
  );
};

export default PaginationButton;
