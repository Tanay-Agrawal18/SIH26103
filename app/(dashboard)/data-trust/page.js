"use client";

import { projects } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { ShieldCheck, Database, FileCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stats = [
  { icon: Database, label: "Records Checked", value: "1,981" },
  { icon: FileCheck, label: "Completeness", value: "98.5%" },
  { icon: CheckCircle, label: "Consistency", value: "84.2%" },
  { icon: ShieldCheck, label: "Review Required", value: "149" },
];

export default function DataTrustPage() {
  const router = useRouter();
  const watchlist = projects.filter((p) => p.dataConfidence !== "High");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-black mb-2">Data Trust & Validation</h1>
          <p className="text-gray-500 font-medium">Anomaly detection and data confidence signals</p>
        </div>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs font-bold tracking-wide uppercase border border-gray-200">
          Illustrative Data
        </span>
      </div>

      {/* Stat Bento */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map(({ icon: Icon, label, value }, i) => (
          <motion.div key={label} variants={fadeUp} className="card p-8">
            <div className="flex items-center gap-2 mb-3">
              <Icon size={16} className="text-gray-400" />
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</h4>
            </div>
            <h2 className="text-3xl font-extrabold text-black tracking-tight">{value}</h2>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="card overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
          <h4 className="text-lg font-bold text-black">Data Quality Watchlist</h4>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Validation Layer</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
              <tr>
                {["Project ID", "Data Confidence", "Signal", "Detected Pattern", "Recommended Action", "Status"].map((h) => (
                  <th key={h} className="px-8 py-4 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {watchlist.map((proj) => {
                const signal = proj.dataQualitySignals.find(
                  (s) => s.status !== "Pass" && s.status !== "NA"
                );
                return (
                  <tr
                    key={proj.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => router.push(`/projects/${proj.id.substring(1)}`)}
                  >
                    <td className="px-8 py-4 font-bold text-black">{proj.id}</td>
                    <td className="px-8 py-4">
                      <span className={`badge ${proj.dataConfidence === "Medium" ? "badge-warning" : "badge-danger"}`}>
                        {proj.dataConfidence}
                      </span>
                    </td>
                    <td className="px-8 py-4 font-bold">{signal?.type ?? "Anomaly"}</td>
                    <td className="px-8 py-4 text-gray-600 max-w-[200px]">{signal?.message}</td>
                    <td className="px-8 py-4 text-gray-600 max-w-[200px]">{proj.validationAction}</td>
                    <td className="px-8 py-4">
                      <span className="badge badge-outline">Pending Review</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
