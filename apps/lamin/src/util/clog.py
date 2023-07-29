import pprint
pp = pprint.PrettyPrinter(indent=4).pprint

# pp('hello')

def clog(name, val):
    print(name)
    pp(val)

