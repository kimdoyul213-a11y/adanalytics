"use client";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const testData = {
    날짜: "2026-03-18",
    GA4: {
      세션수: 1250,
      이탈율: "72%",
      전환수: 38,
      전환율: "3.04%",
    },
    네이버_광고: {
      총비용: "450000",
      클릭수: 890,
      CTR: "2.3%",
      상위키워드: "러닝화, 러닝화 추천",
    },
  };

  const analyze = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: testData }),
      });
      const json = await res.json();
      setResult(json.result);
    } catch {
      setResult("서버 연결 실패. 백엔드가 실행중인지 확인해주세요.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          광고 AI 분석기
        </h1>
        <p className="text-gray-500 mb-8">
          GA4 + 네이버 광고 데이터를 AI가 분석해드립니다
        </p>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">테스트 데이터</h2>
          <pre className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 overflow-auto">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>

        <button
          onClick={analyze}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition disabled:opacity-50 mb-6"
        >
          {loading ? "AI 분석 중..." : "AI 분석 시작"}
        </button>

        {result && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">분석 결과</h2>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {result}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}