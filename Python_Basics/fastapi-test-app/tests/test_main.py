from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}


def test_get_items_empty():
    response = client.get("/items")
    assert response.status_code == 200
    assert response.json() == {"items": []}


def test_create_item():
    data = {"name": "Laptop"}
    response = client.post("/items", json=data)
    
    assert response.status_code == 200
    assert response.json()["item"] == data


def test_get_items_after_insert():
    response = client.get("/items")
    assert response.status_code == 200
    assert len(response.json()["items"]) > 0