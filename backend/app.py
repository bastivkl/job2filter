import openai
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)
CORS(app, resources={
    r"/recommendations": {
        "origins": ["http://localhost:3000", "https://frontend-job2filter.onrender.com"]
    }
})

@app.route('/', methods=['GET'])
def home():
    return "Hello, this is the home page of your Flask app."

@app.route('/scrape', methods=['POST'])
def scrape_job_ad():
    url = request.json.get('url', '')
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Assuming job description is in a tag with id='jobDescription'
    job_description = soup.find(id='jobDescription').text if soup.find(id='jobDescription') else "Not found"
    
    return jsonify({"job_description": job_description})

@app.route('/recommendations', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def get_recommendations():
    job_description = request.json.get('job_description', '')
    
    # Initialize OpenAI API
    openai.api_key = "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"

    try:
        # Make API call to GPT-3 or GPT-4
        response = openai.Completion.create(
          engine="text-davinci-003",
          prompt=f"Generate LinkedIn Recruiter filters and keywords based on the following job description: {job_description}",
          max_tokens=100
        )
        recommendations = response.choices[0].text.strip()
        return jsonify({"recommendations": recommendations})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)

