"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis,
} from "recharts";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const costData = [
  { name: "Transport", original: 15000, revised: 18500 },
  { name: "Energy", original: 12000, revised: 12500 },
  { name: "Water", original: 8000, revised: 9200 },
  { name: "Urban", original: 5000, revised: 5500 },
];

const benchmarkData = [
  { x: 10, y: 15, z: 200, name: "Transport" },
  { x: 5, y: 5, z: 150, name: "Energy" },
  { x: 12, y: 8, z: 100, name: "Water" },
  { x: 8, y: 12, z: 80, name: "Urban" },
];

const metrics = [
  { label: "MAE / RMSE", desc: "Error in cost/time" },
  { label: "Precision@K / Recall", desc: "High-risk identification" },
  { label: "Calibration", desc: "Risk score reliability" },
  { label: "Lead Time", desc: "Early warning capability" },
];

export default function AnalyticsPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-black mb-2">Analytics & Benchmarking</h1>
          <p className="text-gray-500 font-medium">Sector-level analysis and model evaluation framework</p>
        </div>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs font-bold tracking-wide uppercase border border-gray-200">
          Illustrative Data
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div variants={fadeUp} className="card p-8">
          <h4 className="text-lg font-bold text-black mb-6">Cost Escalation by Sector (₹ Cr)</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip contentStyle={{ border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Legend />
                <Bar dataKey="original" name="Original Cost" fill="#d1d5db" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revised" name="Revised Cost" fill="#000000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="card p-8">
          <h4 className="text-lg font-bold text-black mb-2">Sector Benchmarking</h4>
          <p className="text-sm text-gray-500 mb-4">X: Delay Index (Months) | Y: Cost Escalation (%) | Bubble: Project Count</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis type="number" dataKey="x" name="Delay Index" unit="m" tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis type="number" dataKey="y" name="Cost Escalation" unit="%" tick={{ fill: "#6b7280", fontSize: 12 }} />
                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Projects" />
                <Tooltip contentStyle={{ border: "1px solid #e5e7eb", borderRadius: "8px" }} cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Sectors" data={benchmarkData} fill="#000000" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Data Quality Analytics */}
      <motion.div variants={fadeUp} className="card p-8 mb-8">
        <h4 className="text-lg font-bold text-black mb-6">Data Quality Analytics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 border border-gray-100 rounded-xl">
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Missing Field Frequency</h5>
            {[
              { label: "Monthly Progress", level: "High", badge: "badge-warning" },
              { label: "Milestone Dates", level: "Medium", badge: "badge-warning" },
              { label: "Expenditure Details", level: "Low", badge: "badge-success" },
            ].map(({ label, level, badge }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm font-bold text-black">{label}</span>
                <span className={`badge ${badge}`}>{level}</span>
              </div>
            ))}
          </div>
          <div className="p-6 bg-gray-50 border border-gray-100 rounded-xl">
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Anomaly Signals (Trailing 6M)</h5>
            {[
              { label: "Progress Jumps", value: "+14%", color: "text-red-600" },
              { label: "Expenditure Divergence", value: "+5%", color: "text-orange-600" },
              { label: "Schedule Consistency", value: "Stable", color: "text-emerald-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm font-bold text-black">{label}</span>
                <span className={`text-sm font-bold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
          <div className="p-6 bg-gray-50 border border-gray-100 rounded-xl">
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Proposed Variable Extensions</h5>
            <ul className="text-sm text-gray-700 space-y-2">
              {[
                "Historical revision frequency",
                "Milestone slippage velocity",
                "Progress-expenditure divergence",
                "Sector peer deviation",
                "Implementation bottleneck indicators",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Model Evaluation */}
      <motion.div variants={fadeUp} className="card p-8">
        <h4 className="text-lg font-bold text-black mb-6">Model Evaluation Framework</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {[
            { title: "1. Statistical Baselines", items: ["Earned Value Analysis (EVA)", "Reference Class Forecasting (RCF)"] },
            { title: "2. ML Candidates", items: ["Gradient Boosting (GBM)", "XGBoost", "LightGBM"] },
          ].map(({ title, items }) => (
            <div key={title} className="p-6 bg-gray-50 border border-gray-100 rounded-xl">
              <h5 className="text-sm font-extrabold text-black mb-3">{title}</h5>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <span className="w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="p-6 border border-gray-200 rounded-xl">
          <h5 className="text-sm font-extrabold text-black mb-4">3. Target Evaluation Metrics</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map(({ label, desc }) => (
              <div key={label} className="text-center p-4 bg-gray-50 border border-gray-100 rounded-xl">
                <span className="text-sm font-bold text-black">{label}</span>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-center mt-6 text-gray-500">
            Actual model performance metrics will be populated after empirical time-based validation on historical MoSPI project records.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
