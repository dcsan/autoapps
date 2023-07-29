import json


def dump_json(data, fname):
    fpath = f'data/{fname}.json'
    with open(fpath, 'w') as f:
        f.write(json.dumps(data, indent=4))

def load_json(fname):
    fpath = f'data/{fname}.json'
    # f = open(fpath)

    with open(fpath, 'r') as f:
        # raw = f.read()
        blob = json.load(f)
    print('blob', blob)
    return blob
