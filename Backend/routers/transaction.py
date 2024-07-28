from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from services.transaction import TransactionService
from schemas.transaction import Transaction

transaction_router = APIRouter(
    prefix="/transaction",
    tags=["transaction"],
)

service = TransactionService()

@transaction_router.post("")
def create_transaction(request: Request, transaction_data:Transaction):
    result = service.create(transaction_data)
    return JSONResponse(content=result, status_code=201)

@transaction_router.put("/{transaction_id}")
def update_transaction(request: Request, transaction: Transaction):
    result = service.update(transaction.id, transaction)
    if result == {"message": "Transaction not found"}:
        return JSONResponse(content=result, status_code=404)
    elif  result == {"message": "Transaction updated"}: 
        return JSONResponse(content=result, status_code=201)

@transaction_router.delete("/{transaction_id}")
def delete_transaction(request: Request, transaction_id: int):
    result = service.delete(transaction_id)
    if result == {"message": "Transaction not found"}:
        return JSONResponse(content=result, status_code=404)
    elif result == {"message": "Transaction deleted"}:  
        return JSONResponse(content=result, status_code=200)

@transaction_router.get("")
def get_all_transaction(request: Request):
    result = service.get_all()
    print(result)
    if result == {"message": "Transaction type not found"}:
        return JSONResponse(content=result, status_code=404)
    else:
        data = jsonable_encoder(result)
        return JSONResponse(content=data, status_code=200)

@transaction_router.get("/")
def get_some_transaction(request: Request, limit: int, offset: int):
    result = service.get_some(limit, offset)
    data = jsonable_encoder(result)
    return JSONResponse(content=data, status_code=200)
    
@transaction_router.get("/unique/accounts")
def get_unique_account_transaction(request: Request):
    result = service.get_unique_account()
    if result == {"message": "Transaction not found"}:
        return JSONResponse(content=result, status_code=404)
    else:
        data = jsonable_encoder(result)
        return JSONResponse(content=data, status_code=200)

@transaction_router.get("/unique/categorys")
def get_unique_categorys_transaction(request: Request):
    result = service.get_unique_categorys()
    print(result)
    if result == {"message": "Transaction not found"}:
        return JSONResponse(content=result, status_code=404)
    else:
        data = jsonable_encoder(result)
        return JSONResponse(content=data, status_code=200)
    
@transaction_router.get("/summary")
def get_summary_transaction(request: Request):
    result = service.get_summary_by_date_und_type()
    print(result)
    if result == {"message": "Transaction not found"}:
        return JSONResponse(content=result, status_code=404)
    else:
        return JSONResponse(content=result, status_code=200)

@transaction_router.get("/summary/total-ammount")
def get_summary_total_ammount_transaction(request: Request):
    result = service.get_summary_total_ammount_by_type()
    print(result)
    if result == {"message": "Transaction not found"}:
        return JSONResponse(content=result, status_code=404)
    else:
        return JSONResponse(content=result, status_code=200)

@transaction_router.get("/summary/avg-amount-monthly")
def get_average_monthly_transaction(request: Request):
    result = service.get_summary_avg_amount_monthly_by_type()
    print(result)
    if result == {"message": "Transaction not found"}:
        return JSONResponse(content=result, status_code=404)
    else:
        return JSONResponse(content=result, status_code=200)
    
@transaction_router.get("/{transaction_type_id}")
def get_by_id_transaction_type(request: Request, transaction_type_id: int):
    result = service.get_by_id(transaction_type_id)
    print(result)
    if result == {"message": "Transaction type not found"}:
        return JSONResponse(content=result, status_code=404)
    else:
        data = jsonable_encoder(result)
        return JSONResponse(content=data, status_code=200)
