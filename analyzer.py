import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_ad_data(data: dict) -> str:
    prompt = f"""
You are a Korean digital marketing analyst.
Analyze the ad data below and provide actionable insights in Korean.

[Ad Data]
{data}

Format:
잘된 점 (2가지)s
주의할 점 (2가지)
추천 액션 (2가지)
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    return response.choices[0].message.content