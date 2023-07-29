import numpy as np

def truer_stuff(query_engine):
  from trulens_eval import TruLlama, Feedback, Tru, feedback

  # Imports main tools:
  tru = Tru()

  # Initialize Huggingface-based feedback function collection class:
  hugs = feedback.Huggingface()
  openai = feedback.OpenAI()
  # Define a language match feedback function using HuggingFace.
  f_lang_match = Feedback(hugs.language_match).on_input_output()
  # By default this will check language match on the main app input and main app
  # output.

  # Question/answer relevance between overall question and answer.
  f_qa_relevance = Feedback(openai.relevance).on_input_output()

  # Question/statement relevance between question and each context chunk.
  f_qs_relevance = Feedback(openai.qs_relevance).on_input().on(
      TruLlama.select_source_nodes().node.text
  ).aggregate(np.mean)

  tru_query_engine = TruLlama(query_engine,
      app_id='LlamaIndex_App1',
      feedbacks=[f_lang_match, f_qa_relevance, f_qs_relevance])
  # Instrumented query engine can operate like the original:
  llm_response = tru_query_engine.query("What did the author do growing up?")

  print(llm_response)

  tru.get_records_and_feedback(app_ids=[])[0] # pass an empty list of app_ids to get all

