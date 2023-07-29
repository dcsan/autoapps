
# link next/previous
# assumes a field 'id'
def link_items(nodes):
    for idx, node in enumerate(nodes):
        if idx < len(nodes) - 1:
            next = nodes[idx+1]
            node['next'] = next['id']
        if idx > 0:
            prev = nodes[idx-1]
            node['prev'] = prev['id']
    return nodes
