"use server";

import prisma from "../../../lib/prisma";

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
