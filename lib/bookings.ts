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


  // Add the isArchived filter
  if (tab === "active") filters.isArchived = false;
  if (tab === "canceled") filters.isArchived = true;

  // Add the date range filter
  if (startDate && endDate) {
    filters.date = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  // Fetch the filtered and paginated bookings
  const bookings = await prisma.booking.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
    skip,
    take: pageSize,
  });

  // Count total filtered records for accurate total pages
  const total = await prisma.booking.count({
    where: filters,
  });

  return { bookings, total };
}