from fastapi import FastAPI
from models import Product

app = FastAPI()

products = [
    Product(id=1,name="",description="",price=0,is_available=True),
    Product(id=2,name="",description="",price=0,is_available=True),
    Product(id=3,name="",description="",price=0,is_available=True),
    Product(id=4,name="",description="",price=0,is_available=True),
    Product(id=5,name="",description="",price=0,is_available=True),
]

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/products")
async def get_products():
    return products


@app.get("/products/{id}")
async def get_product(id:int):
    for product in products:
        if product.id == id:
            return product
    return {"message": "Product not found"}


@app.post("/products")
async def add_product(product:Product):
    products.append(product)
    return product


@app.put("/products/{id}")
async def update_product(id:int,product:Product):
    for i,p in enumerate(products):
        if p.id == id:
            p.name = product.name
            p.description = product.description
            p.price = product.price
            p.is_available = product.is_available
            return product
    return {"message": "Product not found"}

