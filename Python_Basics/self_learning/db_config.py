from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://postgres:rohankbt@localhost:5432/postgres')

session = sessionmaker(bind=engine)

