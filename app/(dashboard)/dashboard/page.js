"use client";

import { portfolioBaseline, projects } from "@/lib/mockData";
import { ShieldCheck, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardPage() {
  const router = useRouter();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-black mb-2">
            Portfolio Dashboard
          </h1>
          <p className="text-gray-500 font-medium">Overview of infrastructure projects</p>
        </div>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs font-bold tracking-wide uppercase border border-gray-200">
          {portfolioBaseline.tier}
        </span>
      </div>

      {/* Baseline Stats — Bento Grid */}
      <motion.div variants={fadeUp} className="card p-10 mb-8">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
          {portfolioBaseline.context}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {[
            { label: "Ongoing Projects", value: portfolioBaseline.projects },
            { label: "Original Cost", value: portfolioBaseline.originalCost },
            { label: "Revised Cost", value: portfolioBaseline.revisedCost },
            { label: "Total Exp.", value: portfolioBaseline.cumulativeExpenditure },
            { label: "Ministries", value: portfolioBaseline.ministries },
            { label: "Sectors", value: portfolioBaseline.sectors },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
              <h2 className="text-2xl font-extrabold text-black tracking-tight">{stat.value}</h2>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Two-col cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Data Trust */}
        <motion.div variants={fadeUp} className="card p-10 flex flex-col">
          <h4 className="text-lg font-bold text-black mb-6">Data Trust Validation</h4>
          <div className="flex flex-col gap-3 flex-1">
            {[
              { icon: CheckCircle, label: "High Confidence", value: "1,420" },
              { icon: ShieldCheck, label: "Medium Confidence", value: "412" },
              { icon: AlertTriangle, label: "Review Required", value: "149" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-black" />
                  <span className="font-semibold text-gray-800">{label}</span>
                </div>
                <span className="font-bold text-black text-lg">{value}</span>
              </div>
            ))}
          </div>
          <button
            className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            onClick={() => router.push("/data-trust")}
          >
            View Data Trust Center <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* Risk Overview */}
        <motion.div variants={fadeUp} className="card p-10 flex flex-col">
          <h4 className="text-lg font-bold text-black mb-6">Portfolio Risk</h4>
          <div className="flex flex-col gap-5 flex-1 justify-center">
            {[
              { label: "Critical Risk", pct: 15 },
              { label: "High Risk", pct: 25 },
              { label: "Medium Risk", pct: 35 },
              { label: "Low Risk", pct: 25 },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-600 w-28">{r.label}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-500"
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-black w-8 text-right">{r.pct}%</span>
              </div>
            ))}
          </div>
          <button
            className="mt-6 flex items-center justify-center gap-2 w-full py-3 border-2 border-black text-black rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            onClick={() => router.push("/projects")}
          >
            Explore Projects
          </button>
        </motion.div>
      </div>

      {/* Priority Watchlist */}
      <motion.div variants={fadeUp} className="card overflow-hidden">
        <div className="p-10 border-b border-gray-100 flex justify-between items-center">
          <h4 className="text-lg font-bold text-black">Priority Watchlist</h4>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Illustrative Demo Data
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-400 font-bold uppercase tracking-wider text-xs border-b border-gray-200">
              <tr>
                {["Project ID", "Sector", "Risk Level", "Data Confidence", "Primary Driver", "Action"].map((h) => (
                  <th key={h} className="px-10 py-5 font-semibold">{h}</th>
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
                  <td className="px-10 py-5 font-bold text-black">{proj.id}</td>
                  <td className="px-10 py-5 text-gray-600 font-medium">{proj.sector}</td>
                  <td className="px-10 py-5">
                    <span className="px-2.5 py-1 rounded bg-gray-100 border border-gray-200 text-xs font-bold text-black">
                      {proj.projectRisk}
                    </span>
                  </td>
                  <td className="px-10 py-5">
                    <span className="px-2.5 py-1 rounded bg-gray-100 border border-gray-200 text-xs font-bold text-black">
                      {proj.dataConfidence}
                    </span>
                  </td>
                  <td className="px-10 py-5 text-gray-500">{proj.primaryDriver}</td>
                  <td className="px-10 py-5 font-bold text-black text-xs uppercase tracking-wide">
                    {proj.projectRisk === "High" && proj.dataConfidence === "Medium"
                      ? "Verify"
                      : "Review"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
