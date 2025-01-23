import Link from "next/link";
import { getBookings } from "../../../lib/bookings";
import ArchiveButton from "./archiveButton";
import PaginationButton from "./PaginationButton";
import DateFilter from "./DateFilter";
import { start } from "repl";

export async function getSearchParams(searchParams: {
  tab?: string;
  page?: string;
  startDate?: string;
  endDate?: string
}) {
  const resolvedSearchParams = await searchParams;

  return {
    tab: resolvedSearchParams.tab || "active",
    page: parseInt(resolvedSearchParams.page || "1", 10),
    startDate: resolvedSearchParams.startDate || "",
    endDate: resolvedSearchParams.endDate || "",
  };
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const { tab, page, startDate, endDate } = await getSearchParams(searchParams);
  const pageSize = 5;
  const { bookings, total } = await getBookings(tab, page, pageSize, startDate, endDate);
  const totalPages = Math.ceil(total / pageSize);

  console.log("Start date is: " + startDate)
  console.log("End date is: " + endDate)

  return (
    <div className="min-h-screen">
      <div className="flex items-center bg-white shadow justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold">Bokningar</h1>
        <p className="text-gray-500">Visa och hantera dina bokningar</p>
      </div>

      <div className="bg-white shadow mt-4">
        <div className="flex space-x-6 px-6 py-3 border-b">
          <a
            href="?tab=active"
            className={`text-sm font-medium ${
              tab === "active"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Aktiva
          </a>
          <a
            href="?tab=canceled"
            className={`text-sm font-medium ${
              tab === "canceled"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Avbokade
          </a>
          <a
            href="?tab=all"
            className={`text-sm font-medium ${
              tab === "all"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Alla
          </a>
        </div>
      </div>

      <div className="overflow-x-auto mt-4 px-6">
        <DateFilter/>

        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="text-left px-4 py-3 text-gray-600">Boknings ID</th>
              <th className="text-left px-4 py-3 text-gray-600">Namn</th>
              <th className="text-left px-4 py-3 text-gray-600">
                E-postadress
              </th>
              <th className="text-left px-4 py-3 text-gray-600">
                Antal gäster
              </th>
              <th className="text-left px-4 py-3 text-gray-600">Tid</th>
              <th className="text-left px-4 py-3 text-gray-600">Skapad</th>
              <th className="text-left px-4 py-3 text-gray-600">Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-blue-500 font-medium">
                  #{booking.id}
                </td>
                <td className="px-4 py-3 text-gray-700">{booking.name}</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-lg text-sm">
                    {booking.email}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {booking.totalGuests}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(booking.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  {booking.isArchived ? (
                    <p className="text-red-500">Avbokad</p>
                  ) : (
                    <ArchiveButton bookingId={booking.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 px-6">
        <PaginationButton
          currentPage={page}
          totalPages={totalPages}
          direction="previous"
          tab={tab}
        />
        <p>
          Sida {page} av {totalPages}
        </p>
        <PaginationButton
          currentPage={page}
          totalPages={totalPages}
          direction="next"
          tab={tab}
        />
      </div>
    </div>
  );
}
