import { getBookings } from "../../../lib/bookings";
import BookingsList from "../components/Admin/BookingsList";

type SearchParams = {
  tab?: string;
  page?: string;
  startDate?: string;
  endDate?: string;
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { tab = "active", page = "1", startDate = "", endDate = "" } = await searchParams;

  const resolvedPage = parseInt(page, 10);
  const pageSize = 5;

  const { bookings, total } = await getBookings({
    tab,
    page: resolvedPage,
    pageSize,
    startDate,
    endDate,
  });
    
  const totalPages = Math.ceil(total / pageSize);

  return (
    <BookingsList
      tab={tab}
      bookings={bookings}
      startDate={startDate}
      endDate={endDate}
      page={resolvedPage}
      totalPages={totalPages}
    />
  );
}
