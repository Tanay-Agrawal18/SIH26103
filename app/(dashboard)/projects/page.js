"use client";

import { projects } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectExplorerPage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-black mb-2">Project Explorer</h1>
          <p className="text-gray-500 font-medium">Search and filter infrastructure portfolio</p>
        </div>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs font-bold tracking-wide uppercase border border-gray-200">
          Illustrative Data
        </span>
      </div>

      <div className="card p-8 overflow-hidden">
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <SearchIcon
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by Project ID, Name, or Sector..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all font-medium"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-lg font-bold text-black hover:bg-gray-50 transition-colors">
            <Filter size={18} strokeWidth={2.5} /> Filters
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
              <tr>
                {[
                  "Project ID","Project Name","Sector","Orig. Cost",
                  "Rev. Cost","Progress","Risk Level","Data Conf.",
                ].map((h) => (
                  <th key={h} className="px-6 py-4 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr
                  key={proj.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => router.push(`/projects/${proj.id.substring(1)}`)}
                >
                  <td className="px-6 py-4 font-bold text-black">{proj.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800 max-w-[250px] truncate">
                    {proj.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{proj.sector}</td>
                  <td className="px-6 py-4 font-medium">{proj.originalCost}</td>
                  <td className="px-6 py-4 font-medium">{proj.revisedCost}</td>
                  <td className="px-6 py-4 min-w-[140px]">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black rounded-full"
                          style={{ width: `${proj.physicalProgress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-black">{proj.physicalProgress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded bg-gray-100 border border-gray-200 text-xs font-bold text-black">
                      {proj.projectRisk}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded bg-gray-100 border border-gray-200 text-xs font-bold text-black">
                      {proj.dataConfidence}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
