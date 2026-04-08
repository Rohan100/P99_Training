from fastapi import FastAPI
from app.routes import items

app = FastAPI(title="FastAPI CRUD", version="1.0.0")

app.include_router(items.router)


@app.get("/health")
def health():
    return {"status": "ok"}
