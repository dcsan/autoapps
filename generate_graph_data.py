import json

import weaviate
from langchain.retrievers.weaviate_hybrid_search import WeaviateHybridSearchRetriever
from langchain.schema import Document


WEAVIATE_URL = "http://localhost:8080"
client = weaviate.Client(
    url=WEAVIATE_URL,
)
class WeaviateHybridSearchTransformersRetriever(WeaviateHybridSearchRetriever):
    def _create_schema_if_missing(self) -> None:
        class_obj = {
            "class": self._index_name,
            "properties": [{"name": self._text_key, "dataType": ["text"]}],
            "vectorizer": "text2vec-transformers",
        }

        if not self._client.schema.exists(self._index_name):
            self._client.schema.create_class(class_obj)

if __name__ == "__main__":
    with open("./data/readwise_database_KnowledgeAgent.json") as g:
        all_highlights = json.load(g)

    with open("./all_generations.json") as g:
        all_generatoins = json.load(g)


    class_name = "P2842eba01fcfb2f997160fc4e1af4898"
    class_properties = ["content", "cfiRange", "chapterIndex", "paragraphIndex"]

    # retriever = WeaviateHybridSearchTransformersRetriever(
    #     client, class_name, text_key="topic"
    # )

    retriever = WeaviateHybridSearchTransformersRetriever(
        client=client, index_name="P2842eba01fcfb2f997160fc4e1af4898", text_key="content",
        attributes=["paragraphIndex", "chapterIndex", "cfiRange"], create_schema_if_missing=True
    )

    best_results = retriever.get_relevant_documents("""Dry""")

    print(best_results)