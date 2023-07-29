import json
import os
from time import sleep
from neo4j import GraphDatabase
from dotenv import load_dotenv
from util.clog import clog
import traceback
import sys


from util.files import load_json

load_dotenv()

NEO_URI = os.environ.get("NEO_URI")
NEO_USER = os.environ.get("NEO_USER", "neo4j")
NEO_PASS = os.environ.get("NEO_PASS")

neo_config = [NEO_URI, NEO_USER, NEO_PASS]

driver = GraphDatabase.driver(NEO_URI, auth=(NEO_USER, NEO_PASS))


def connect():
    driver.verify_connectivity()
    return driver


def write(name):
    print("neo_config", neo_config)

    with connect() as driver:
        driver.verify_connectivity()
        summary = driver.execute_query(
            "MERGE (:Person {name: $name})",
            name=name,
            # database_="neo4j",
        ).summary
        print("summary", summary)
        print(
            "Created {nodes_created} nodes in {time} ms.".format(
                nodes_created=summary.counters.nodes_created,
                time=summary.result_available_after,
            )
        )


def add_topic(topic):
    with GraphDatabase.driver(NEO_URI, auth=(NEO_USER, NEO_PASS)) as driver:
        driver.verify_connectivity()


def add_node(node, model="Topic"):
    cmd = (
        f"MERGE (:{model} "
        + """{
                id: $id,
                title: $title,
                text: $text,
                type: $type,
                summary: $summary,
                intro: $intro
            })
            """
    )
    print("cmd", cmd)
    result = driver.execute_query(
        cmd,
        # **node
        id=node["id"],
        title=node.get("title", ""),
        text=node.get("text", ""),
        type=node.get("type", ""),
        intro=node.get("intro", ""),
        summary=node.get("summary", ""),
    )
    print("\n-- added node", node, result)


# topic links go from box to topic
def add_topic_link(edge):
    cmd = f"""
MATCH (b:Box),(t:Topic)
WHERE b.id = "{edge['from']}"
AND t.id = "{edge['to']}"
CREATE (b)-[r:ABOUT]->(t)
RETURN r
    """
    result = driver.execute_query(cmd)
    print("add edge", cmd, result)


# topic links go from box to box
def add_next_link(edge):
    cmd = f"""
MATCH (b1:Box),(b2:Box)
WHERE b1.id = "{edge['from']}"
AND b2.id = "{edge['to']}"
CREATE (b1)-[r:NEXT]->(b2)
RETURN r
    """
    result = driver.execute_query(cmd)
    print("add edge", cmd, result)


def delete_all():
    cmd = " MATCH (n) DETACH DELETE n"
    result = driver.execute_query(cmd)
    print("delete_all", cmd, result)


# write('Bob')
# write('Chuck')
# write('Dan')
# write('Eve')


def load_graph(fname):
    delete_all()
    graph_data = load_json(fname)
    clog("graph_data", graph_data)

    boxes = [n for n in graph_data["nodes"] if n["type"] == "box"]
    topics = [n for n in graph_data["nodes"] if n["type"] == "topic"]
    topic_links = [n for n in graph_data["edges"] if n["type"] == "topic-link"]
    next_links = [n for n in graph_data["edges"] if n["type"] == "next-link"]

    try:
        for node in topics:
            add_node(node, "Topic")

        for node in boxes:
            add_node(node, "Box")

        for edge in topic_links:
            add_topic_link(edge)

        for edge in next_links:
            add_next_link(edge)

    except Exception as e:
        print("neo error:", e)
        print(traceback.format_exc())
        raise e

    # gradural shutdown
    driver.close()
    sleep(2)
