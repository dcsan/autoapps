from decouple import config
from langchain.llms import OpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.agents import AgentType, initialize_agent, load_tools

import os
os.environ["LANGCHAIN_TRACING"] = "true" # If you want to trace the execution of the program, set to "true"

llm = OpenAI(
  openai_api_key=config('OPEN_AI_KEY'),
  temperature=0.9
)

def test_prompt():
  output = llm.predict("What would be a good company name for a company that makes colorful socks?")
  print(output)

def test_chain():
  prompt = PromptTemplate.from_template("What is a good name for a company that makes {product}?")
  # prompt.format(product="colorful socks")

  chain = LLMChain(
    llm=llm,
    prompt=prompt,
  )
  # output = chain.generate()
  output = chain.run("trading card game")
  print(output)


def test_search():
  # The tools we'll give the Agent access to. Note that the 'llm-math' tool uses an LLM, so we need to pass that in.
  tools = load_tools(
    ["serpapi", "llm-math"],
    llm=llm,
    serpapi_api_key=config('SERPAPI_API_KEY')
  )

  # Finally, let's initialize an agent with the tools, the language model, and the type of agent we want to use.
  agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

  # Let's test it out!
  agent.run("What was the high temperature in SF yesterday in Fahrenheit? What is that number in celsius and fahrenheit?")



# test_chain()
test_search()
