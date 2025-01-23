"use server";

import prisma from "../../../lib/prisma";
import { redirect } from "next/navigation";


export async function archiveBooking(bookingId: number) {
  try {
    const updatedBooking = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        isArchived: true,
      },
    });
    console.log("Booking upated; ", updatedBooking);
    return updatedBooking;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw new Error("Failed to update booking");
  }
}

export async function filterByDates(formData: FormData) {
  // Extract the form data
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const tab = formData.get("tab") || "active"; // Default to "active" if not provided
  const page = formData.get("page") || "1"; // Default to page 1

  // Construct search params
  const searchParams = new URLSearchParams();
  if (startDate) searchParams.set("startDate", startDate);
  if (endDate) searchParams.set("endDate", endDate);
  searchParams.set("tab", tab.toString());
  searchParams.set("page", page.toString());

  // Log or use the searchParams
  console.log(searchParams.toString()); // Outputs the query string

  // Optionally redirect with the updated search params
  redirect(`/admin?${searchParams.toString()}`);
}
