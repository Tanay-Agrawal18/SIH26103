from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import os

# ─── Load Models ────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

try:
    risk_score_model = joblib.load(os.path.join(BASE_DIR, "risk_score_model.pkl"))
    risk_label_model = joblib.load(os.path.join(BASE_DIR, "risk_label_model.pkl"))
    delay_model      = joblib.load(os.path.join(BASE_DIR, "delay_model.pkl"))
    print("All 3 models loaded successfully!")
except Exception as e:
    print(f"Error loading models: {e}")
    raise

# ─── Encoding Maps (must match Colab training) ──────────────────────────────────
PROJECT_TYPE_MAP = {"highway": 0, "dam": 1, "school": 2, "hospital": 3, "railway": 4}
STATE_MAP        = {"UP": 5, "MP": 2, "Bihar": 0, "Gujarat": 1, "Maharashtra": 3, "Rajasthan": 4}
WEATHER_MAP      = {"low": 1, "medium": 2, "high": 0}

# ─── FastAPI App ────────────────────────────────────────────────────────────────
app = FastAPI(
    title="PAIMANA+ AI API",
    description="AI-powered Risk & Delay prediction for government infrastructure projects",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # In production, replace with your Next.js URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Request Schema ─────────────────────────────────────────────────────────────
class ProjectInput(BaseModel):
    project_type: str = Field(..., example="highway")
    budget_crore: float = Field(..., example=500.0)
    planned_duration_months: int = Field(..., example=24)
    contractor_rating: float = Field(..., example=3.2)
    state: str = Field(..., example="UP")
    current_progress_pct: int = Field(..., example=35)
    weather_risk: str = Field(..., example="high")
    supply_chain_delays: int = Field(..., example=15)
    num_past_delays: int = Field(..., example=2)

# ─── Routes ─────────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "status": "✅ PAIMANA+ AI API is running",
        "models": ["risk_score_model", "risk_label_model", "delay_model"],
        "docs": "/docs"
    }

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(data: ProjectInput):
    # Validate inputs
    if data.project_type not in PROJECT_TYPE_MAP:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid project_type. Choose from: {list(PROJECT_TYPE_MAP.keys())}"
        )
    if data.state not in STATE_MAP:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid state. Choose from: {list(STATE_MAP.keys())}"
        )
    if data.weather_risk not in WEATHER_MAP:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid weather_risk. Choose from: {list(WEATHER_MAP.keys())}"
        )

    # Encode input
    row = [[
        PROJECT_TYPE_MAP[data.project_type],
        data.budget_crore,
        data.planned_duration_months,
        data.contractor_rating,
        STATE_MAP[data.state],
        data.current_progress_pct,
        WEATHER_MAP[data.weather_risk],
        data.supply_chain_delays,
        data.num_past_delays,
    ]]

    # Predict
    risk_score  = round(float(risk_score_model.predict(row)[0]), 1)
    risk_label  = str(risk_label_model.predict(row)[0])
    delay_days  = int(delay_model.predict(row)[0])

    # Risk color for UI
    risk_color = "green" if risk_label == "Low" else "yellow" if risk_label == "Medium" else "red"

    return {
        "risk_score": risk_score,
        "risk_label": risk_label,
        "risk_color": risk_color,
        "predicted_delay_days": delay_days,
        "summary": f"Project has {risk_label} risk ({risk_score}/100) with ~{delay_days} day delay"
    }