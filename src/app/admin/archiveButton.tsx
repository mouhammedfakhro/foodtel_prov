"use client";

import React from "react";
import { archiveBooking } from "../actions/bookings";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ArchiveButtonProps {
  bookingId: number;
}

const ArchiveButton = ({ bookingId } : ArchiveButtonProps) => {
  const router = useRouter();

  const handleArchive = async () => {
    try {
      await archiveBooking(bookingId);
      router.refresh();
      toast.success(`Order #${bookingId} har nu avbokats.`);
    } catch (error) {
      console.error("Failed to archive booking:", error);
    }
  };

  return (
    <button
      onClick={handleArchive}
      className="bg-red-100 text-red-500 px-2 py-1 rounded-lg text-sm hover:bg-red-200"
    >
      Avboka
    </button>
  );
};

export default ArchiveButton;
