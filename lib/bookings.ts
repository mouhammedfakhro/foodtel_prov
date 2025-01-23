import prisma from "./prisma";

export async function getBookings(tab: string, page: number, pageSize: number, startDate?: string, endDate?: string) {
  const skip = (page - 1) * pageSize; 
  let bookings;

  const filters: any = {
    isArchived: tab === "canceled" ? true : tab === "active" ? false : undefined,
  };

  if (startDate && endDate) {
    filters.date = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    }
  }

  if (tab === "active") {
    bookings = await prisma.booking.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize, 
    });
  } else if (tab === "canceled") {
    bookings = await prisma.booking.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    });
  } else {
    bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    });
  }

  const total = await prisma.booking.count({
    where:
      tab === "active"
        ? { isArchived: false }
        : tab === "canceled"
        ? { isArchived: true }
        : undefined,
  });

  return { bookings, total };
}
