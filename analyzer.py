import os
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def analyze_ad_data(data: dict) -> str:
    prompt = f"""
너는 한국 디지털 마케팅 전문 분석가야.
아래 광고 데이터를 보고 마케터가 바로 액션할 수 있는 인사이트를 한국어로 작성해줘.

[광고 데이터]
{data}

아래 형식으로 작성해:
✅ 잘된 점 (2가지)
⚠️ 주의할 점 (2가지)
💡 추천 액션 (2가지)
"""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )

    return message.content[0].text


if __name__ == "__main__":
    test_data = {
        "날짜": "2026-03-18",
        "GA4": {
            "세션수": 1250,
            "이탈율": "72%",
            "전환수": 38,
            "전환율": "3.04%"
        },
        "네이버_광고": {
            "총비용": "450000",
            "클릭수": 890,
            "CTR": "2.3%",
            "상위키워드": "러닝화, 러닝화 추천"
        }
    }

    result = analyze_ad_data(test_data)
    print(result)