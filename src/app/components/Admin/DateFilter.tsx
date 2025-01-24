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
    params.set("page", "1");
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
      <div className="flex flex-wrap gap-4 px-6 py-3 bg-white shadow mt-4">
        <div className="w-full sm:w-auto flex-1">
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
        <div className="w-full sm:w-auto flex-1">
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
        <div className="w-full sm:w-auto mt-[1.3rem] flex-1">
          <button
            onClick={addFilter}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Filtrera
          </button>
        </div>
        <div className="w-full sm:w-auto mt-[1.3rem] flex-1">
          <button
            onClick={removeFilter}
            type="submit"
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
          >
            Rensa filter
          </button>
        </div>
      </div>
    </div>
  );
}
