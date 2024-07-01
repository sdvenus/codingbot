import os
from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Load environment variables from .env file
load_dotenv()
api_key = os.getenv("api_key")

# Initialize the OpenAI LLM
llm = OpenAI(openai_api_key=api_key)

def generateCode(task, language):
    code_prompt = PromptTemplate(
        template="Write a {language} function that will {task}, ensuring correct indentation and structure, without comments, examples or extra text",
        input_variables=["language", "task"]
    )
    code_chain = LLMChain(prompt=code_prompt, llm=llm, output_key="generated_code")
    return code_chain

def reviewCode(generated_code):
    review_prompt = PromptTemplate(
        template="Explain this code: {generated_code}, tell me how it works, step by step",
        input_variables=["generated_code"]
    )
    review_chain = LLMChain(prompt=review_prompt, llm=llm, output_key="review")
    return review_chain

@app.route('/codebot', methods=['POST'])
def retrieve_bot():
    data = request.get_json()
    task = data.get('task')
    language = data.get('language')

    # Generate code
    code_chain = generateCode(task, language)
    generated_code_result = code_chain.invoke({"language": language, "task": task})
    generated_code = generated_code_result["generated_code"]

    # Review generated code
    review_chain = reviewCode(generated_code)
    review_result = review_chain.invoke({"generated_code": generated_code})
    review = review_result["review"]

    # Return the results as JSON response
    return jsonify({
        "generated_code": generated_code,
        "review": review
    })
@app.route('/style/<path:path>')
def serve_static(path):
    return send_from_directory('style', path)
if __name__ == '__main__':
    app.run(debug=True)
