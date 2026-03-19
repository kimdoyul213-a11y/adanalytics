"use client";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const testData = {
    date: "2026-03-18",
    GA4: {
      sessions: 1250,
      bounceRate: "72%",
      conversions: 38,
      conversionRate: "3.04%",
    },
    naver_ads: {
      totalCost: "450000",
      clicks: 890,
      CTR: "2.3%",
      topKeywords: "running shoes",
    },
  };

  const analyze = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("https://adanalytics-production.up.railway.app/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: testData }),
      });
      const json = await res.json();
      setResult(json.result);
    } catch {
      setResult("서버 연결 실패.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          AD Analytics AI
        </h1>
        <p className="text-gray-500 mb-8">
          GA4 + Naver Ads AI Analysis
        </p>
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Test Data</h2>
          <pre className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 overflow-auto">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>
        <button
          onClick={analyze}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition disabled:opacity-50 mb-6"
        >
          {loading ? "Analyzing..." : "Start AI Analysis"}
        </button>
        {result && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Analysis Result</h2>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {result}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}