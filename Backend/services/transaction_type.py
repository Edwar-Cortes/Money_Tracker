from config.database import Session
from schemas.transaction_type import TransactionType
from models.transaction_type import TransactionType as TransactionTypeModel
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

class TransactionTypeService:
    def __init__(self):
        self.database_session = Session()
    
    def create(self, transaction_type_data: TransactionType):
        transaction_type = TransactionTypeModel(**transaction_type_data.model_dump())
        self.database_session.add(transaction_type)
        self.database_session.commit()
        return {"message":"Transaction type created"}
    
    def get_all(self):
        exist_id = self.database_session.query(TransactionTypeModel).filter(TransactionTypeModel.id == 0).first()
        if exist_id == None:
            return {"message": "Transaction type not found"}
        transaction_types = self.database_session.query(TransactionTypeModel).all()
        return transaction_types
    
    def get_by_id(self, transaction_type_id:int):
        exist_id = self.database_session.query(TransactionTypeModel).filter(TransactionTypeModel.id == transaction_type_id).first()
        if exist_id == None:
            return {"message": "Transaction type not found"}
        transaction_type = self.database_session.query(TransactionTypeModel).filter(TransactionTypeModel.id == transaction_type_id).first()
        return transaction_type

    def get_some(self, limit: int, offset:int):
        transaction_types = self.database_session.query(TransactionTypeModel).limit(limit).offset(offset).all()
        return transaction_types
    
    def update(self, transaction_type_id: int, transaction_type_data: TransactionType):
        exist_id = self.database_session.query(TransactionTypeModel).filter(TransactionTypeModel.id == transaction_type_id).first()
        if exist_id == None:
            return {"message": "Transaction type not found"}
        self.database_session.query(TransactionTypeModel).filter(TransactionTypeModel.id == transaction_type_id).update(transaction_type_data.model_dump())
        self.database_session.commit()
        return {"message":"Transaction type updated"}
    
    def delete(self, transaction_type_id:int):
        exist_id = self.database_session.query(TransactionTypeModel).filter(TransactionTypeModel.id == transaction_type_id).first()
        if exist_id == None:
            return {"message": "Transaction type not found"}
        self.database_session.query(TransactionTypeModel).filter(TransactionTypeModel.id == transaction_type_id).delete()
        self.database_session.commit()
        return {"message":"Transaction type deleted"}

