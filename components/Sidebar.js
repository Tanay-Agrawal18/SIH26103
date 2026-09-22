"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Search,
  AlertTriangle,
  ShieldCheck,
  Brain,
  Workflow,
  Activity,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { href: "/dashboard", icon: BarChart3, label: "Overview" },
  { href: "/projects", icon: Search, label: "Projects" },
  { href: "/risk", icon: Activity, label: "Risk Intelligence" },
  { href: "/early-warnings", icon: AlertTriangle, label: "Early Warnings" },
  { href: "/data-trust", icon: ShieldCheck, label: "Data Trust" },
  { href: "/analytics", icon: Workflow, label: "Analytics" },
  { href: "/assistant", icon: Brain, label: "AI Assistant" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen shrink-0 fixed top-0 left-0 z-30">
      <div className="p-8 border-b border-gray-100">
        <h2 className="text-xl font-black tracking-tight text-black mb-1">PAIMANA+</h2>
        <p className="text-xs text-gray-500 font-medium mb-3">AI Predictive Analytics</p>
        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold border border-gray-200 text-gray-800 tracking-wider uppercase">
          SIH 2026 Prototype
        </span>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                isActive
                  ? "text-black font-black"
                  : "text-gray-500 hover:text-black font-medium"
              )}
            >
              <item.icon size={18} strokeWidth={2.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
