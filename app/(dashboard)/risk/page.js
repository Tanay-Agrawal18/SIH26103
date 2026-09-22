"use client";

import { projects } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { AlertTriangle, Activity, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const riskData = [
  { name: "High Risk", value: 25, color: "#000000" },
  { name: "Medium Risk", value: 35, color: "#6b7280" },
  { name: "Low Risk", value: 25, color: "#d1d5db" },
  { name: "Critical", value: 15, color: "#dc2626" },
];

const drivers = [
  { name: "Milestone Slippage", impact: "45%", w: "45%" },
  { name: "Progress Below Plan", impact: "30%", w: "30%" },
  { name: "Expenditure Deviation", impact: "15%", w: "15%" },
  { name: "Repeated Revisions", impact: "10%", w: "10%" },
];

export default function RiskPage() {
  const router = useRouter();
  const highRisk = projects.filter((p) => p.projectRisk === "High" || p.projectRisk === "Critical");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-black mb-2">Risk Intelligence</h1>
          <p className="text-gray-500 font-medium">Portfolio-wide predictive risk distribution and drivers</p>
        </div>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs font-bold tracking-wide uppercase border border-gray-200">
          Illustrative Data
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div variants={fadeUp} className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity size={22} className="text-black" />
            <h4 className="text-xl font-bold text-black">Portfolio Risk Distribution</h4>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                  {riskData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={22} className="text-black" />
            <h4 className="text-xl font-bold text-black">Primary Risk Drivers</h4>
          </div>
          <div className="flex flex-col gap-6">
            {drivers.map((d) => (
              <div key={d.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-black">{d.name}</span>
                  <span className="text-gray-500 font-semibold">{d.impact}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-black rounded-full" style={{ width: d.w }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={fadeUp} className="card overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center gap-3">
          <AlertTriangle size={22} className="text-black" />
          <h4 className="text-xl font-bold text-black">High Risk Projects Watchlist</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
              <tr>
                {["Project ID", "Project Name", "Sector", "Risk Score", "Primary Driver", "Action"].map((h) => (
                  <th key={h} className="px-8 py-4 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {highRisk.map((proj) => (
                <tr
                  key={proj.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => router.push(`/projects/${proj.id.substring(1)}`)}
                >
                  <td className="px-8 py-4 font-bold text-black">{proj.id}</td>
                  <td className="px-8 py-4 font-medium text-gray-800">{proj.name}</td>
                  <td className="px-8 py-4 text-gray-600">{proj.sector}</td>
                  <td className="px-8 py-4">
                    <span className="px-2.5 py-1 rounded bg-red-50 border border-red-100 text-xs font-bold text-red-700">
                      {proj.riskScore}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-gray-500">{proj.primaryDriver}</td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1.5 rounded-lg border-2 border-black text-xs font-bold text-black hover:bg-black hover:text-white transition-colors cursor-pointer">
                      Review Details
                    </span>
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
