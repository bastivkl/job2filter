import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/recommendations": {"origins": "http://localhost:3000"}})

@app.route('/', methods=['GET'])
def home():
    return "Hello, this is the home page of your Flask app."

@app.route('/recommendations', methods=['POST'])
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
