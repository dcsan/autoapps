from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings

# load from disk
def load_vdatabase(path="./chroma_store"):
    vdb = Chroma(
        persist_directory=path, 
        embedding_function=HuggingFaceEmbeddings()
    )
    return vdb

# How to load vdb and similarity search

# vdb = load_vdatabase()
# question = "It all starts with the universally applicable premise that people want to be understood and accepted. Listening is the cheapest, yet most effective concession we can make to get there. By listening intensely, a negotiator demonstrates empathy and shows a sincere desire to better understand what the other side is experiencing."
# docs = vdb.similarity_search(question)
# print(question)
# print(len(docs))
# for doc in docs:
#     print(doc)
#     print("\n")