"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/mockData";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";
import {
  ShieldCheck, AlertTriangle, Info, TrendingUp,
  IndianRupee, Clock, CheckCircle, ArrowLeft,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProjectProfilePage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const project = projects.find((p) => p.id === `#${id}`) || projects[0];

  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runPrediction = async () => {
    setLoading(true);
    setError(null);
    try {
      const sectorMap = {
        "Transport & Logistics": "highway",
        "Energy": "dam",
        "Water & Sanitation": "hospital"
      };
      const stateMap = {
        "Multiple": "UP",
        "Rajasthan": "Rajasthan",
        "Gujarat": "Gujarat"
      };
      
      const payload = {
        project_type: sectorMap[project.sector] || "highway",
        budget_crore: parseInt(project.originalCost.replace(/[^0-9]/g, ''), 10) || 500,
        planned_duration_months: 36,
        contractor_rating: 3.5,
        state: stateMap[project.state] || "UP",
        current_progress_pct: project.physicalProgress,
        weather_risk: "medium",
        supply_chain_delays: 10,
        num_past_delays: 1
      };

      const res = await fetch("https://sih26103.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error("Failed to fetch prediction");
      
      const data = await res.json();
      setAiResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const trajectoryData = [
    { month: "Jan", planned: 10, actual: 10, expenditure: 8 },
    { month: "Feb", planned: 25, actual: 20, expenditure: 18 },
    { month: "Mar", planned: 40, actual: 32, expenditure: 30 },
    { month: "Apr", planned: 55, actual: 45, expenditure: 50 },
    { month: "May", planned: 70, actual: 55, expenditure: 65 },
    { month: "Jun", planned: 85, actual: project.physicalProgress, expenditure: 75 },
  ];

  const riskColor = project.physicalProgress < project.plannedProgress ? "text-red-600" : "text-emerald-600";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <button
            onClick={() => router.push("/projects")}
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-medium mb-3"
          >
            <ArrowLeft size={16} /> Back to Projects
          </button>
          <h1 className="text-5xl font-black tracking-tighter text-black mb-2">{project.name}</h1>
          <div className="flex gap-4 items-center">
            <span className="font-bold text-sm text-black">{project.id}</span>
            <span className="text-sm text-gray-500">{project.ministry}</span>
            <span className="text-sm text-gray-500">{project.sector}</span>
          </div>
        </div>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs font-bold tracking-wide uppercase border border-gray-200">
          Illustrative Data
        </span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div variants={fadeUp} className="card p-10">
          <div className="flex items-center gap-2 mb-4">
            <IndianRupee size={16} className="text-gray-400" />
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Financial</h4>
          </div>
          <div className="flex justify-between">
            {[
              { label: "Original", value: project.originalCost },
              { label: "Revised", value: project.revisedCost },
              { label: "Spent", value: project.expenditure },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">{label}</span>
                <span className="font-bold text-black text-sm">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="card p-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-gray-400" />
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Progress</h4>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">Planned</span>
              <span className="font-extrabold text-black text-2xl">{project.plannedProgress}%</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">Actual</span>
              <span className={`font-extrabold text-2xl ${riskColor}`}>{project.physicalProgress}%</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="card p-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-gray-400" />
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Status</h4>
          </div>
          <span className={`badge ${project.status === "Delayed" ? "badge-danger" : "badge-info"}`}>
            {project.status}
          </span>
        </motion.div>
      </div>

      {/* Risk + Data Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div variants={fadeUp} className="card p-10">
          <h4 className="text-lg font-bold text-black mb-6">Risk Intelligence</h4>
          
          {/* AI Live Prediction Section */}
          <div className="p-8 mb-8 rounded-xl border border-gray-200 bg-white">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h5 className="font-black text-black tracking-tight text-xl flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse"></span>
                  PAIMANA+ AI Prediction
                </h5>
                <p className="text-sm text-gray-500 font-medium mt-1">Real-time risk & delay forecasting</p>
              </div>
              <button 
                onClick={runPrediction}
                disabled={loading}
                className="px-6 py-3 bg-black hover:bg-gray-800 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Run AI Analysis"}
              </button>
            </div>
            
            {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
            
            {aiResult && (
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100 mt-2">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">AI Risk Label</span>
                  <span className={`font-black text-2xl tracking-tight ${aiResult.risk_color === "red" ? "text-red-600" : aiResult.risk_color === "yellow" ? "text-amber-500" : "text-emerald-600"}`}>
                    {aiResult.risk_label}
                  </span>
                </div>
                <div className="flex flex-col border-l border-gray-100 pl-6">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Risk Score</span>
                  <span className="font-black text-black text-2xl tracking-tight">{aiResult.risk_score} <span className="text-sm text-gray-400 font-medium">/ 100</span></span>
                </div>
                <div className="flex flex-col border-l border-gray-100 pl-6">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Est. Delay</span>
                  <span className="font-black text-black text-2xl tracking-tight">{aiResult.predicted_delay_days} <span className="text-sm text-gray-400 font-medium">days</span></span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between py-4 mb-4 border-b border-gray-100">
            <span className="font-bold">Composite Risk</span>
            <span className={`badge ${project.projectRisk === "High" ? "badge-danger" : project.projectRisk === "Medium" ? "badge-warning" : "badge-success"}`}>
              {project.projectRisk} — Score {project.riskScore}
            </span>
          </div>
          <div className="flex flex-col gap-3 mb-6">
            {[
              { label: "Cost Risk", value: project.costRisk },
              { label: "Time Risk", value: project.timeRisk },
              { label: "Implementation Risk", value: project.implementationRisk },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm font-medium text-gray-600">{label}</span>
                <span className={`text-sm font-bold ${value === "High" ? "text-red-600" : "text-gray-700"}`}>{value}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-black">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Primary Driver</p>
            <p className="font-bold text-black">{project.primaryDriver}</p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="card p-10">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck size={20} className="text-black" />
            <h4 className="text-lg font-bold text-black">Data Quality & Confidence</h4>
          </div>
          <div className="flex items-center justify-between py-4 mb-4 border-b border-gray-100">
            <span className="font-bold">Data Confidence</span>
            <span className={`badge ${project.dataConfidence === "High" ? "badge-success" : project.dataConfidence === "Medium" ? "badge-warning" : "badge-danger"}`}>
              {project.dataConfidence}
            </span>
          </div>
          <div className="flex flex-col gap-3 mb-6">
            {project.dataQualitySignals.map((sig, idx) => (
              <div key={idx} className="flex items-start gap-3">
                {sig.status === "Pass" ? (
                  <CheckCircle size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                ) : sig.status === "Fail" ? (
                  <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
                ) : sig.status === "Warning" ? (
                  <AlertTriangle size={14} className="text-orange-500 mt-0.5 shrink-0" />
                ) : (
                  <Info size={14} className="text-gray-400 mt-0.5 shrink-0" />
                )}
                <span className="text-sm font-medium text-gray-700">{sig.message}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-black">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Action Required</p>
            <p className="text-sm font-medium text-black">{project.validationAction}</p>
          </div>
        </motion.div>
      </div>

      {/* S-Curve Chart */}
      <motion.div variants={fadeUp} className="card p-10">
        <h4 className="text-lg font-bold text-black mb-6">Project Trajectory (S-Curve)</h4>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trajectoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
              <Tooltip contentStyle={{ border: "1px solid #e5e7eb", borderRadius: "8px" }} />
              <Legend />
              <Line type="monotone" dataKey="planned" name="Planned %" stroke="#9ca3af" strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="actual" name="Actual %" stroke="#000000" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="expenditure" name="Expenditure %" stroke="#6b7280" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
}
