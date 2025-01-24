import prisma from "./prisma";

type Props = {
  tab: string,
  page: number,
  pageSize: number,
  startDate?: string,
  endDate?: string,
}

export async function getBookings({tab, page, pageSize, startDate, endDate} : Props) {
  const skip = (page - 1) * pageSize; 
  const filters: Record<string, any> = {};


  if (tab === "active") filters.isArchived = false;
  if (tab === "canceled") filters.isArchived = true;

  if (startDate && endDate) {
    filters.date = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  const bookings = await prisma.booking.findMany({
    where: filters,
    orderBy: { createdAt: "asc" },
    skip,
    take: pageSize,
  });

  const total = await prisma.booking.count({
    where: filters,
  });

  return { bookings, total };
}