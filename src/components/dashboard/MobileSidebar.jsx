import { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Button from "../Button";

export default function MobileSidebar({ onNavigate }) {
  const [tasksOpen, setTasksOpen] = useState(false);
  const [listsOpen, setListsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (onNavigate) onNavigate();
  };

  return (
    <div className="flex flex-col gap-4 text-black">
      {/* Calendar */}
      <Button
        onClick={() => setCalendarOpen(!calendarOpen)}
        className="flex justify-between items-center w-full px-2 py-2 hover:bg-[#8B1B1B] rounded-md"
      >
        <span>Calendar</span>
        {calendarOpen ? <FaChevronDown /> : <FaChevronRight />}
      </Button>
      {calendarOpen && (
        <div>
          <div className="rounded-lg text-black">
            <Calendar
              onChange={setDate}
              value={date}
              className="border-0 shadow-none bg-transparent w-full"
            />
          </div>
        </div>
      )}
      {/* Tasks */}
      <Button
        onClick={() => setTasksOpen(!tasksOpen)}
        className="flex justify-between items-center w-full px-2 py-2 hover:bg-[#8B1B1B] rounded-md"
      >
        <span>Tasks</span>
        {tasksOpen ? <FaChevronDown /> : <FaChevronRight />}
      </Button>
      {tasksOpen && (
        <div className="pl-4 flex flex-col gap-1">
          <Button
            onClick={() => handleNavigation("/dashboard/today")}
            className="text-left px-2 py-1 hover:bg-[#7A1515] rounded-md cursor-pointer"
          >
            Today
          </Button>
        </div>
      )}

      {/* Lists */}
      <Button
        onClick={() => setListsOpen(!listsOpen)}
        className="flex justify-between items-center w-full px-2 py-2 hover:bg-[#8B1B1B] rounded-md"
      >
        <span>Lists</span>
        {listsOpen ? <FaChevronDown /> : <FaChevronRight />}
      </Button>
      {listsOpen && (
        <div className="pl-4 flex flex-col gap-3">
          <Button className="text-left px-2 py-1 hover:bg-[#7A1515] rounded-md cursor-pointer">
            Daily Routines
          </Button>
          <Button className="text-left px-2 py-1 hover:bg-[#7A1515] rounded-md cursor-pointer">
            Study
          </Button>
        </div>
      )}
    </div>
  );
}
