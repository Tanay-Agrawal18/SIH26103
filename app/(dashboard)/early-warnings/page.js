"use client";

import { alerts } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { AlertTriangle, ShieldCheck, Filter } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function EarlyWarningsPage() {
  const router = useRouter();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-black mb-2">Early Warning Center</h1>
          <p className="text-gray-500 font-medium">Predictive risk signals and data quality alerts</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3 mb-8">
        {["All Alerts", "Critical", "High", "Medium"].map((tab, i) => (
          <button
            key={tab}
            className={`px-5 py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${
              i === 0
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-200 hover:border-black"
            }`}
          >
            {tab}
          </button>
        ))}
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold bg-white text-black border-2 border-gray-200 hover:border-black transition-colors">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Alert cards */}
      <div className="flex flex-col gap-6">
        {alerts.map((alert) => (
          <motion.div variants={fadeUp} key={alert.id} className="card p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start gap-4">
                {alert.type === "DATA QUALITY SIGNAL" ? (
                  <ShieldCheck size={24} className="text-black mt-1 shrink-0" />
                ) : (
                  <AlertTriangle size={24} className="text-black mt-1 shrink-0" />
                )}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`badge ${alert.type === "DATA QUALITY SIGNAL" ? "badge-warning" : "badge-danger"}`} style={{ fontSize: "0.65rem" }}>
                      {alert.type}
                    </span>
                    <span className={`badge ${alert.severity === "High" ? "badge-danger" : "badge-warning"}`} style={{ fontSize: "0.65rem" }}>
                      {alert.severity} Severity
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-black">{alert.signal}</h3>
                </div>
              </div>
              <button
                onClick={() => router.push(`/projects/${alert.project.substring(1)}`)}
                className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                View {alert.project}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 border border-gray-100 rounded-xl mb-6">
              {[
                { label: "Affected Parameter", value: alert.parameter },
                { label: "Detection Context", value: alert.context },
                { label: "Recommended Review", value: alert.review },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm font-bold text-black">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">
                Target lead time to be evaluated empirically through temporal validation.
              </span>
              <button className="text-sm font-bold text-black hover:text-gray-600 transition-colors">
                Mark as Reviewed
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
