### Ingest Book to Vector Databse
```bash
python apps/vecsim/book_to_vdatabse.py
```

### Load Vector Databse Query
```python
from apps.vecsim.utils import load_vdatabase

vdb = load_vdatabase()
question = "It all starts with the universally applicable premise that people want to be understood and accepted. Listening is the cheapest, yet most effective concession we can make to get there. By listening intensely, a negotiator demonstrates empathy and shows a sincere desire to better understand what the other side is experiencing."
docs = vdb.similarity_search(question)
print(question)
print(len(docs))
for doc in docs:
    print(doc)
    print("\n")
```