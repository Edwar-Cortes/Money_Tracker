from config.database import Base
from sqlalchemy import Column,  Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
import datetime  

class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, index=True)
    account = Column(String, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)  
    date = Column(DateTime, default=datetime.datetime.now(datetime.UTC)) 
    type_id = Column(Integer, ForeignKey("transaction_type.id"))
    
    type = relationship("TransactionType", back_populates="transactions")