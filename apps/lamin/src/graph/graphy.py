import json

from util.files import dump_json


# convert boxes data to graph
def dump_graph(fname="boxes"):
    fpath = f"data/{fname}.json"
    with open(fpath, "r") as f:
        boxes = json.loads(f.read())
    # print('boxes', json.dumps(boxes, indent=4))
    # print('boxes', boxes)
    nodes = []
    edges = []
    # basic nodes
    for box in boxes:
        boxid = box["id"]
        node = {
            "id": boxid,
            "type": "box",
            **box,
            # "label": box["intro"],
            # "title": box["title"],
            # "intro": box.get("intro", ""),
            # "text": box["text"],
            # "summary": box.get("summary", ""),
        }
        nodes.append(node)

        # not the last node
        if box.get("next"):
            next = {
                "from": boxid,
                "to": box["next"],
                "type": "next-link",
                "label": "next",
            }
            edges.append(next)

        # add nodes for each topic
        for topicname in box["topics"]:
            # TODO check dupe topics and merge links from that node
            node = {
                "id": topicname,  # later merge duplicates
                "label": topicname,
                "title": topicname,
                "summary": "",  # topics dont have a summary
                "type": "topic",
            }
            nodes.append(node)

            edge = {
                "from": boxid,
                "to": topicname,
                "type": "topic-link",
                "label": f"{topicname}-{box['title']}",
            }
            edges.append(edge)
            # print('edge', edge)

            # TODO add prev/next links
    graph = {
        "nodes": nodes,
        "edges": edges,
    }

    # print('graph', json.dumps(graph, indent=4))
    dump_json(graph, "graph")
