"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DateFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const addFilter = () => {
    if (startDate === "" || endDate === "") return;
    const params = new URLSearchParams(searchParams.toString());

    console.log(startDate, endDate);
    params.set("startDate", startDate);
    params.set("endDate", endDate);
    console.log(params);
    router.push(`/admin?${params.toString()}`);
  };

  const removeFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("startDate");
    params.delete("endDate");
    router.push(`/admin?${params.toString()}`);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  return (
    <div>
      <div className="flex space-x-4 px-6 py-3 bg-white shadow mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Från
          </label>
          <input
            type="date"
            name="startDate"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue={new Date().toISOString().split("T")[0]}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Till
          </label>
          <input
            type="date"
            name="endDate"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue={new Date().toISOString().split("T")[0]}
            onChange={handleEndDateChange}
          />
        </div>
        <button
          onClick={addFilter}
          className="px-4  bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none mt-5"
        >
          Filtrera
        </button>
        <button
          onClick={removeFilter}
          type="submit"
          className="px-4  bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none mt-5"
        >
          Rensa filter
        </button>
      </div>
    </div>
  );
}
