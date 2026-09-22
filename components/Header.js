"use client";

import { usePathname } from "next/navigation";
import { CircleAlert } from "lucide-react";

const pageTitles = {
  "/dashboard": "Portfolio Dashboard",
  "/projects": "Project Explorer",
  "/risk": "Risk Intelligence",
  "/early-warnings": "Early Warning Center",
  "/data-trust": "Data Trust & Validation",
  "/analytics": "Analytics & Benchmarking",
  "/assistant": "Project Intelligence",
};

export default function Header() {
  const pathname = usePathname();

  const getTitle = () => {
    if (!pathname) return "PAIMANA+";
    if (pathname.startsWith("/projects/")) return "Project Risk Profile";
    return pageTitles[pathname] ?? "PAIMANA+";
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 sticky top-0 z-20">
      <h2 className="text-xl font-bold tracking-tight text-black">{getTitle()}</h2>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 cursor-pointer text-gray-600 hover:text-black transition-colors">
          <CircleAlert size={14} className="text-current" />
          <span className="text-xs font-bold uppercase tracking-wider text-current">2 Alerts</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs select-none">
          DI
        </div>
      </div>
    </header>
  );
}
