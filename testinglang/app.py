import os
from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.chains.sequential import SequentialChain
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()
api_key = os.getenv("api_key")

# Initialize the OpenAI LLM
llm = OpenAI(openai_api_key=api_key)

def generateCode(task, language):
    code_prompt = PromptTemplate(
        template="Write a {language} function that will {task}",
        input_variables=["language", "task"]
    )
    code_chain = LLMChain(prompt=code_prompt, llm=llm, output_key="generated_code")
    return code_chain

def reviewCode(generated_code):
    review_prompt = PromptTemplate(
        template="Review this code:\n\n{generated_code}\n\n, tell me if there is any error and if yes, how to fix it",
        input_variables=["generated_code"]
    )
    review_chain = LLMChain(prompt=review_prompt, llm=llm, output_key="review")
    return review_chain

@app.route('/codebot', methods=['GET', 'POST'])
def retrieve_bot():
    if request.method == 'GET':
        # Fetch task and language from query parameters or use defaults
        task = request.args.get('task')
        language = request.args.get('language')
    elif request.method == 'POST':
        # Fetch task and language from JSON data in the request body
        request_data = request.get_json()
        task = request_data.get('task')
        language = request_data.get('language')

    # Generate code
    code_chain = generateCode(task, language)
    generated_code_result = code_chain({"language": language, "task": task})
    generated_code = generated_code_result["generated_code"]

    # Review generated code
    review_chain = reviewCode(generated_code)
    review_result = review_chain({"generated_code": generated_code})
    review = review_result["review"]

    # Return the results as JSON response
    return jsonify({
        "generated_code": generated_code,
        "review": review
    })

if __name__ == '__main__':
    app.run(debug=True)
