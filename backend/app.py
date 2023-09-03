import openai
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={
    r"/recommendations": {
        "origins": ["http://localhost:3000", "https://frontend-job2filter.onrender.com"]
    }
})

@app.route('/', methods=['GET'])
def home():
    return "Hello, this is the home page of your Flask app."

@app.route('/recommendations', methods=['POST'])
@cross_origin(origin=['http://localhost:3000', 'https://frontend-job2filter.onrender.com'], headers=['Content-Type', 'Authorization'])
def get_recommendations():
    job_description = request.json.get('job_description', '')
    
    # Initialize OpenAI API
    openai.api_key = "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"

    try:
        # Make API call to GPT-3 or GPT-4
        response = openai.Completion.create(
          engine="gpt-3.5-turbo",
          prompt=f"Based on the following job description, please provide a detailed list of recommended filters to use in LinkedIn Recruiter for finding the most suitable candidates. Please categorize your recommendations for all the candidate search filters that exist in the LinkedIn recruiter. The job description is as follows: {job_description}",
          max_tokens=300
        )
        recommendations = response.choices[0].text.strip().split('\n')
        return jsonify({"recommendations": recommendations})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)

