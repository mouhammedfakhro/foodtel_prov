"use server";

import prisma from "../../../lib/prisma";
import z from "zod";
import { cookies } from "next/headers";

const bookingSchema = z.object({
  name: z.string().min(1, "Namn är ett krav").max(100, "Namnet är för långt"),
  email: z.string().email("Ogiltig mejladress"),
  guests: z
    .number()
    .int()
    .min(1, "Minimum 1 gäst krävs")
    .max(8, "Endast 8 gäster är tillåtna"),
  date: z.string().refine((date) => {
    const today = new Date().toISOString().split("T")[0];
    return date >= today;
  }, "Datumet måste vara idag eller senare"),
  agreeToPolicy: z.boolean(),
});

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

export async function processBooking(formData: FormData) {
  "use server";

  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    guests: parseInt(formData.get("guests") as string, 10),
    date: formData.get("date") as string,
    agreeToPolicy: formData.get("agreeToPolicy") === "on",
  };

  const result = bookingSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation failed:", result.error.flatten());
    throw new Error("Invalid booking data");
  }

  console.log("Validated booking data:", result.data);

  const booking = await prisma.booking.create({
    data: {
        name: result.data.name,
        email: result.data.email,
        totalGuests: result.data.guests,
        date: new Date(result.data.date),
    },
  })

  console.log("Booking created:", booking);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const cookieStore = await cookies();
  cookieStore.set("bookingSuccess", "true", { path: "/", maxAge: 1 });
}