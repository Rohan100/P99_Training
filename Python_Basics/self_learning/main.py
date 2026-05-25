from fastapi import FastAPI,Depends
from models import Product
from db_config import session,engine
import db_model
from sqlalchemy.orm import Session

app = FastAPI()

db_model.Base.metadata.create_all(bind=engine)

products = [
    Product(id=1,name="",description="",price=0,is_available=True),
    Product(id=2,name="",description="",price=0,is_available=True),
    Product(id=3,name="",description="",price=0,is_available=True),
    Product(id=4,name="",description="",price=0,is_available=True),
    Product(id=5,name="",description="",price=0,is_available=True),
]

def init_db():
    db = session()
    count = db.query(db_model.Product).count()
    if count == 0:
        for product in products:
            db.add(db_model.Product(**product.model_dump()))
        db.commit()


init_db()

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/products")
async def get_products(db:Session = Depends(get_db)):
    products = db.query(db_model.Product).all()
    return products


@app.get("/products/{id}")
async def get_product(id:int):
    for product in products:
        if product.id == id:
            return product
    return {"message": "Product not found"}


@app.post("/products")
async def add_product(product:Product,db:Session = Depends(get_db)):
    db.add(db_model.Product(**product.model_dump()))
    db.commit()
    return product


@app.put("/products/{id}")
async def update_product(id:int,product:Product,db:Session = Depends(get_db)):
    products = db.query(db_model.Product).filter(db_model.Product.id == id).first()
    if not products:
        return {"message": "Product not found"}
    products.name = product.name
    products.description = product.description
    products.price = product.price
    products.is_available = product.is_available
    db.commit()
    return products



@app.delete("/products/{id}")
async def delete_product(id:int,db:Session = Depends(get_db)):
    products = db.query(db_model.Product).filter(db_model.Product.id == id).first()
    if not products:
        return {"message": "Product not found"}
    db.delete(products)
    db.commit()


