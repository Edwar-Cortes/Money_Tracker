from datetime import datetime
from sqlalchemy import func
from sqlalchemy.orm import joinedload
from sqlalchemy.exc import NoResultFound
from fastapi import HTTPException

from schemas.transaction_type import TransactionType
from schemas.transaction import Transaction
from models.transaction import Transaction as TransactionModel
from models.transaction_type import TransactionType as TransactionTypeModel

from config.database import Session

class TransactionService:
    def __init__(self):
        self.database_session = Session()

    def create(self, transaction_data: Transaction):
        print(transaction_data)
        new_transaction = TransactionModel(**transaction_data.model_dump())
        self.database_session.add(new_transaction)
        self.database_session.commit()
        return {"message":"Transaction created"}
    
    def update(self, transaction_id: int, transaction_data: Transaction):
        exist_id = self.database_session.query(TransactionModel).filter(TransactionModel.id == transaction_id).first()
        if exist_id == None:
            return {"message": "Transaction not found"}
        self.database_session.query(TransactionModel).filter(TransactionModel.id == transaction_id).update(transaction_data.model_dump())
        self.database_session.commit()
        return {"message":"Transaction updated"}
    
    def delete(self, transaction_id:int):
        exist_id = self.database_session.query(TransactionModel).filter(TransactionModel.id == transaction_id).first()
        if exist_id == None:
            return {"message": "Transaction not found"}
        self.database_session.query(TransactionModel).filter(TransactionModel.id == transaction_id).delete()
        self.database_session.commit()
        return {"message":"Transaction deleted"}
     
    def get_all(self):
        exist_id = self.database_session.query(TransactionModel).filter(TransactionModel.id == 1).first()
        if exist_id == None:
            return {"message": "Transaction not found"}
        transaction = self.database_session.query(TransactionModel).join(TransactionTypeModel).order_by(TransactionModel.date.desc()).all()
        return transaction   

    def get_some(self, limit: int, offset:int):
        transaction = self.database_session.query(TransactionModel).limit(limit).offset(offset).all()
        return transaction

    def get_by_id(self, transaction_id:int):
        exist_id = self.database_session.query(TransactionModel).filter(TransactionModel.id == transaction_id).first()
        if exist_id == None:
            return {"message": "Transaction not found"}
        transaction = self.database_session.query(TransactionModel).filter(TransactionModel.id == transaction_id).first()
        return transaction 

    def get_unique_account(self):
        accounts = self.database_session.query(TransactionModel.account).distinct().all()
        return [element[0] for element in accounts]
    
    def get_unique_categorys(self):
        category = self.database_session.query(TransactionModel.category).distinct().all()
        return [element[0] for element in category]
    
    def get_summary_by_date_und_type(self):
        Transaction_summary = self.database_session.query( 
            func.date(TransactionModel.date).label('date'),
            TransactionTypeModel.name, 
            func.sum(TransactionModel.quantity).label('total_amount')
            ).join (
                TransactionTypeModel,
                TransactionModel.type_id == TransactionTypeModel.id
            ).group_by(
                func.date(TransactionModel.date), TransactionTypeModel.name
            ).order_by(
                func.date(TransactionModel.date).desc()
            ).all()
        
        summary = [
            {
                "date": transaction.date,
                "type": transaction.name,
                "total_amount": transaction.total_amount
            } for transaction in Transaction_summary
        ]
        return summary
    
    def get_summary_total_ammount_by_type(self):
        Transaction_summary = self.database_session.query(
            TransactionTypeModel.name,
            func.sum(TransactionModel.quantity).label('total_amount')
            ).join (
                TransactionTypeModel,
                TransactionModel.type_id == TransactionTypeModel.id
            ).group_by(
                TransactionTypeModel.name
            ).all()
        
        total = self.database_session.query(func.sum(TransactionModel.quantity)).scalar()
        
        summary = [
            {
                "type": transaction.name,
                "total_amount": transaction.total_amount,
                "percentage": round((transaction.total_amount*100)/total,2)
            } for transaction in Transaction_summary
        ]
        return summary
    
    def get_summary_avg_amount_monthly_by_type(self):
        monthly_sums = self.database_session.query(
            TransactionTypeModel.name,
            func.extract("year", TransactionModel.date).label('year'),
            func.extract("month", TransactionModel.date).label('month'),
            func.sum(TransactionModel.quantity).label('total_amount')
        ).join(
            TransactionTypeModel,
            TransactionModel.type_id == TransactionTypeModel.id
        ).group_by(
            TransactionTypeModel.name,
            func.extract('year',TransactionModel.date),
            func.extract('month', TransactionModel.date)
        )

        type_monthly_totals = {}
        for record in monthly_sums:
            type_name = record.name
            if type_name not in type_monthly_totals:
                type_monthly_totals[type_name] = []
            type_monthly_totals[type_name].append(record.total_amount)

        aux = [
            {
                type_name:
                sum(amounts)/len(amounts)
            }for type_name, amounts in type_monthly_totals.items()
        ]

        amount_depo = aux[0]
        amount_int = aux[1]
        amount_whit = aux[2]

        acum = amount_depo['deposit'] + amount_int['interest'] + amount_whit['wihtdraw']

        summary = [
            {
                "type": type_name,
                "average_monthly_amount": round(sum(amounts)/len(amounts),2),
                "percentage": round((sum(amounts)/len(amounts)*100)/acum,2),
            }for type_name, amounts in type_monthly_totals.items()
        ]

        return summary
