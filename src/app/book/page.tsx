import React from "react";
import Image from "next/image";
import SubmissionAnimation from "../components/SubmissionAnimation";
import { cookies } from "next/headers";
import { z } from "zod";

import img from "../assets/images/book-page-food.jpeg";
import prisma from "../../../lib/prisma";

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

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}


const Book = async () => {
  const cookieStore = await cookies();
  const bookingCookie = cookieStore.get("bookingSuccess")?.value === "true";
  const successFlag = bookingCookie;

  return (
    <div className="flex h-screen">
      <div className="flex-1 relative">
        <Image
          src={img}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-3/4 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Boka ett bord</h1>
          <p className="text-gray-500 mb-6">Boka ett bord hos oss idag!</p>

          <form action={processBooking} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Namn
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-postadress
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Antal gäster (max 8) - Fler än 8? Kontakta oss för att boka
              </label>
              <input
                type="number"
                name="guests"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                min={1}
                max={8}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Välj ett datum
              </label>
              <input
                type="date"
                name="date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                min={new Date().toISOString().split("T")[0]}
                required
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Välj en tid
              </label>
              <input
                type="time"
                name="time"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                min="12:00"
                max="21:00"
                defaultValue={getCurrentTime()}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="agreeToPolicy"
                className="w-4 h-4 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label className="text-sm text-gray-500">
                Jag godkänner restaurangens regler och policy.
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-blue-200 transition duration-300 ease-in-out"
            >
              Boka bord
            </button>
          </form>

          {successFlag && <SubmissionAnimation isVisible />}
        </div>
      </div>
    </div>
  );
};

export default Book;
