import { useState } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
// fixed top-0 left-0 h-screen bg-white shadow-md
export default function Sidebar() {
  const [date, setDate] = useState(new Date());
  return (
    <aside className="hidden md:flex md:flex-col w-64 text-white p-2 fixed top-10 left-0 h-screen bg-white shadow-md">
      <div className="flex flex-col items-center mt-2">
        <div className="rounded-lg text-black">
          <Calendar
            onChange={setDate}
            value={date}
            className="border-0 shadow-none bg-transparent scale-70"
          />
        </div>
      </div>
      <div className="text-[#343A40] text-md font-semibold">Tasks</div>
      <Link
        to="/dashboard/today"
        className="w-full px-4 py-4 hover:bg-[#F8F9FA] text-black mt-2 block"
      >
        Today
      </Link>

      <div className="mt-6">
        <div className="text-[#343A40] text-md font-semibold">Lists</div>
        <div className="w-full px-4 py-4 hover:bg-[#F8F9FA] text-black mt-2">
          Daily Routine
        </div>
        <div className="w-full px-4 py-4 hover:bg-[#F8F9FA] text-black mt-2">
          Study
        </div>
      </div>
    </aside>
  );
}
