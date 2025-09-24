import "react-calendar/dist/Calendar.css";
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom"; 
import MobileSidebar from "../components/dashboard/MobileSidebar";

export default function Dashboard({ mobileSidebarOpen, toggleSidebar  }) {
  console.log("Dashboard:-",mobileSidebarOpen)
  return (
    <div className="flex bg-white h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-transparent backdrop-blur-xs" onClick={toggleSidebar}>
          <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#F8F9FACC] text-white p-4 shadow-lg overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <MobileSidebar onNavigate={toggleSidebar}/>
          </div>
        </div>
      )}

      <main className="flex-1 p-6 overflow-y-auto md:ml-64">
        <Outlet />
      </main>
    </div>
  );
}
