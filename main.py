from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from analyzer import analyze_ad_data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AdData(BaseModel):
    data: dict

@app.get("/")
def read_root():
    return {"status": "ok"}

@app.post("/analyze")
def analyze(ad_data: AdData):
    result = analyze_ad_data(ad_data.data)
    return {"result": result}