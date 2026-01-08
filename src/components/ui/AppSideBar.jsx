// components/AppSidebar.jsx
import {
    Home,
    LayoutDashboard,
    FileText,
    LogOut,
    HandHelping,
    Blocks,
    ChartColumnBig,
    Gauge,
    NotepadText,
    School,
    University,
    Building2,
    Users,
    UsersRound,
    PersonStanding,
  } from "lucide-react";
  import { Link, useLocation } from "react-router-dom";
  import { cn } from "@/lib/utils";
  
  const navItems = [
    { label: "Analytics", icon: <ChartColumnBig size={18} />, href: "/" },
    { label: "Donors", icon: <HandHelping size={18} />, href: "/donors" },
    { label: "Projects", icon: <Blocks size={18} />, href: "/projects" },
    { label: "Activities", icon: <PersonStanding size={18} />, href: "/activities" },
    { label: "Surveys", icon: <NotepadText size={18} />, href: "/surveys" },
    { label: "Schools", icon: <School size={18} />, href: "/schools" },
    { label: "Universities", icon: <University size={18} />, href: "/universities" },
    { label: "Centers", icon: <Building2 size={18} />, href: "/centers" },
    { label: "Volunteers", icon: <Users size={18} />, href: "/volunteers" },
    { label: "Ambassadors", icon: <UsersRound size={18} />, href: "/ambassadors" },
    { label: "Logout", icon: <LogOut size={18} />, href: "/logout" },
  ];
  
  const AppSidebar = () => {
    const location = useLocation();
  
    return (
      <aside className="w-64 h-screen bg-white border-r shadow-sm fixed top-0 left-0">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">📦 Combobox</h1>
        </div>
        <nav className="mt-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-3 text-sm text-gray-700 hover:bg-gray-100 transition",
                location.pathname === item.href && "bg-gray-100 font-semibold"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    );
  };
  
  export default AppSidebar;
  