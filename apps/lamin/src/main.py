import json
from dotenv import load_dotenv
from graph.graphy import dump_graph
from graph.linker import link_items
from neo.neolib import load_graph
from parse.indexer import get_lines, get_nodes, index_from_lines, load_index
from parse.topics import line_title, line_topics, para_summary
from test.topics import test_topics
from util.files import dump_json
from util.text import clean_end, get_intro

load_dotenv()

# just run a small part of content set to -1 to run all
SAMPLE_SIZE = -1

# logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
# logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))


def ask(query_engine, query):
    print(f"\n---------\nquery:\n{query}")
    reply = query_engine.query(query)
    # print('-- reply', reply)
    print(reply)
    return reply


# question("What did the author do growing up?")


def doc_topics():
    # index = load_index()
    lines = get_lines()
    doc_index = index_from_lines(lines)
    query_engine = doc_index.as_query_engine(
        # similarity_top_k=5,
        # response_mode='tree_summarize',
    )
    query = "Provide 10 main topics of the essay as two or three keyword phrases one topic per line with no numbers or bullet points"
    topics = []
    topic = ask(query_engine, query)
    topics.append(topic)

    print(topics)
    # print('topics', json.dumps(topics))


def make_boxes():
    lines = get_lines()
    if SAMPLE_SIZE > 0:
        lines = lines[0:SAMPLE_SIZE]  # sample

    boxes = []
    for count, line in enumerate(lines):
        id = f"node_{count}"
        box = {
            "id": id,
            "index": count,  # int
            "text": line,
            "title": line_title(line),
            "topics": line_topics(line),
            "intro": get_intro(line),
            "summary": para_summary(line),
        }
        boxes.append(box)
        print(json.dumps(box, indent=4))
    boxes = link_items(boxes)
    print("boxes", json.dumps(boxes, indent=4))
    dump_json(boxes, "boxes")


def main():
    # process content into internal structure data/boxes.json
    make_boxes()

    # convert boxes to graph data/graph.json
    dump_graph("boxes")
    # load into neo4j
    load_graph("graph")


main()
