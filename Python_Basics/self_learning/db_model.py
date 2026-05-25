from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, Boolean

Base = declarative_base()

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer,primary_key=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    is_available = Column(Boolean)

