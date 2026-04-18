def test_create_item(client):
    response = client.post("/items/", json={
        "name": "Test Item",
        "description": "Test Description",
        "price": 100
    })

    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Item"
    assert "id" in data

def test_list_items(client):
    response = client.get("/items/")

    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_item(client):
    # First create item
    res = client.post("/items/", json={
        "name": "Item 1",
        "description": "Desc",
        "price": 50
    })

    item_id = res.json()["id"]

    response = client.get(f"/items/{item_id}")

    assert response.status_code == 200
    assert response.json()["id"] == item_id

def test_get_item_not_found(client):
    response = client.get("/items/9999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"

def test_update_item(client):
    res = client.post("/items/", json={
        "name": "Old Name",
        "description": "Old",
        "price": 10
    })

    item_id = res.json()["id"]

    response = client.patch(f"/items/{item_id}", json={
        "name": "Updated Name"
    })

    assert response.status_code == 200
    assert response.json()["name"] == "Updated Name"

def test_delete_item(client):
    res = client.post("/items/", json={
        "name": "Delete Me",
        "description": "temp",
        "price": 20
    })

    item_id = res.json()["id"]

    response = client.delete(f"/items/{item_id}")

    assert response.status_code == 204

def test_delete_item_not_found(client):
    response = client.delete("/items/9999")

    assert response.status_code == 404