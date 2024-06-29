# import os
# from dotenv import load_dotenv
# from langchain_openai import OpenAI
# from langchain.prompts import PromptTemplate
# from langchain.chains import LLMChain
# from langchain.chains.sequential import SequentialChain
# import argparse

# # Set up argument parsing
# parser = argparse.ArgumentParser()
# parser.add_argument("--task", default="return a list of numbers")
# parser.add_argument("--language", default="python")
# args = parser.parse_args()

# # Load environment variables from .env file
# load_dotenv()
# api_key = os.getenv("api_key")

# # Initialize the OpenAI LLM
# llm = OpenAI(openai_api_key=api_key)

# # Define the code generation prompt template
# code_prompt = PromptTemplate(
#     template="Write a very short {language} function that will {task}",
#     input_variables=["language", "task"]
# )

# # Define the code review prompt template
# review_prompt = PromptTemplate(
#     template="Review this code:\n\n{generated_code}\n\nand tell me if there is any error",
#     input_variables=["generated_code"]
# )

# # Create LLMChain for code generation
# code_chain = LLMChain(prompt=code_prompt, llm=llm, output_key="generated_code")

# # Create LLMChain for code review
# review_chain = LLMChain(prompt=review_prompt, llm=llm, output_key="review")

# # Create a SequentialChain that uses the code_chain and review_chain
# chain = SequentialChain(
#     chains=[code_chain, review_chain],
#     input_variables=["language", "task"],
#     output_variables=["generated_code", "review"]
# )

# # Invoke the chain with the input data
# result = chain({
#     "language": args.language,
#     "task": args.task
# })

# # Print the results
# print("Generated Code:", result["generated_code"])
# print("Review:", result["review"])
