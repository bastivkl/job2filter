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
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def get_recommendations():
    job_description = request.json.get('job_description', '')
    
    # Initialize OpenAI API
    openai.api_key = "key"

    try:
        # Make API call to GPT-3 or GPT-4
        response = openai.ChatCompletion.create(
          model="gpt-3.5-turbo",
           messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Based on the following job description, please provide a detailed list of recommendations for all possible Linkedin recruiter filters for the candidate search for finding the most suitable candidate. Split it by semicolons. The job description is as follows: {job_description}"}
            ]
        )
        recommendations = response['choices'][0]['message']['content'].strip()

        # Convert the recommendations string into a list of objects
        recommendations_objects = [{"filterName": rec.split(":")[0].strip(), "recommendation": rec.split(":")[1].strip()} for rec in recommendations.split(';') if ":" in rec]

        return jsonify({"recommendations": recommendations_objects})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
