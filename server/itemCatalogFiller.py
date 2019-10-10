import random
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from catalogDBSetup import Category, CatalogItem, Base

engine = create_engine('sqlite:///itemCatalog.db')
# Bind the engine to the metadata of the Base class so that the
# declarative can be accessed through a DBSession instance
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
# A DBSession() instance establishes all conversations with the database
# and represents a "staging zone" for all the objects loaded into the
# database session object. Any change made against the objects in the
# session won't be persisted into the database until you call
# session.commit(). If you're not happy about the changes, you can
# revert all of them back to the last commit by calling
# session.rollback()
session = DBSession()

cats = ['Sports', 'Mechanical Tools', 'Books', 'Groceries', 'Electronics']

for category in cats:
    catDescription = "This category takes care of all the items that are related to " + category
    dbCatEntry = Category(name=category, description=catDescription)
    session.add(dbCatEntry)
    session.commit()
    for i in range(random.randint(10, 20)):
        itemName = category + " - Item " + str(i)
        itemDescription = "This item belongs to category " + category
        dbItemEntry = CatalogItem(name=itemName, description=itemDescription, category=dbCatEntry)
        session.add(dbItemEntry)
        session.commit()

print("added menu items!")
