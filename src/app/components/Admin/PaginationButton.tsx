"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface PaginationButtonProps {
  currentPage: number;
  totalPages: number;
  direction: "next" | "previous";
  startDate: string;
  endDate: string;
  tab: string;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  currentPage,
  totalPages,
  direction,
  tab,
  startDate,
  endDate,
}) => {
  const router = useRouter();

  const handleNavigation = () => {
    const targetPage = direction === "next" ? currentPage + 1 : currentPage - 1;

    const params = new URLSearchParams();
    params.set("tab", tab);
    params.set("page", targetPage.toString());
    
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    router.push(`?${params.toString()}`);
  };

  const isDisabled =
    (direction === "previous" && currentPage === 1) ||
    (direction === "next" && currentPage === totalPages) ||
    totalPages === 0;

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
