
# LLama Index starter example from: https://gpt-index.readthedocs.io/en/latest/getting_started/starter_example.html
# In order to run this, download into data/ Paul Graham's Essay 'What I Worked On' from
# https://github.com/jerryjliu/llama_index/blob/main/examples/paul_graham_essay/data/paul_graham_essay.txt
# curl https://raw.githubusercontent.com/jerryjliu/llama_index/main/examples/paul_graham_essay/data/paul_graham_essay.txt > data/paul_graham_essay.txt

import json
from dotenv import load_dotenv
import os
import pprint

from llama_index import VectorStoreIndex, SimpleDirectoryReader
from llama_index import StorageContext, load_index_from_storage
from llama_index.node_parser import SimpleNodeParser
from llama_index.schema import TextNode, NodeRelationship, RelatedNodeInfo

load_dotenv()

pp = pprint.PrettyPrinter(indent=4).pprint

def make_index():
    print('Loading documents...')
    documents = SimpleDirectoryReader('data').load_data()
    index = VectorStoreIndex.from_documents(documents)
    index.storage_context.persist()

def load_index():
    # rebuild storage context
    storage_context = StorageContext.from_defaults(persist_dir="./storage")
    # load index
    index = load_index_from_storage(storage_context)
    return  index

def read_doc():
    with open('data/worked_on.txt') as f:
        doc = f.read()
    return doc


def get_lines():
    doc = read_doc()
    lines = []
    for line in doc.split('\n'):
        line = line.strip().strip().strip().strip()
        if len(line) == 0:
            continue
        lines.append(line)
    print('lines', json.dumps(lines, indent=2))
    return lines

# make an index from lines -> nodes -> index
def index_from_lines(lines):
    count = 0
    nodes = []
    for idx, line in enumerate(lines):
        node = TextNode(text=line, id_=idx)
        print('----\n', line)
        nodes.append(node)
    for idx, node in enumerate(nodes):
        if idx < len(nodes) - 1:
            next = nodes[idx+1]
            node.relationships[NodeRelationship.NEXT] = RelatedNodeInfo(node_id=next.node_id)
        if idx > 0:
            prev = nodes[idx-1]
            node.relationships[NodeRelationship.PREVIOUS] = RelatedNodeInfo(node_id=prev.node_id)
    index = VectorStoreIndex(nodes)
    return index


def get_nodes():
    parser = SimpleNodeParser()
    documents = SimpleDirectoryReader('data').load_data()
    nodes = parser.get_nodes_from_documents(documents)
    count = 0
    for node in nodes:
        print('\n--- node', count)
        print(vars(node))
        pp(node)
        # print(json.dumps(vars(node), indent=2))



