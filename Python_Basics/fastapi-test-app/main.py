from fastapi import FastAPI

app = FastAPI()

# In-memory storage
items = []

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/items")
def get_items():
    return {"items": items}

@app.post("/items")
def create_item(item: dict):
    items.append(item)
    return {"message": "Item added", "item": item}