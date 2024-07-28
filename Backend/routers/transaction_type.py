from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from schemas.transaction_type import TransactionType
from services.transaction_type import TransactionTypeService
from fastapi.encoders import jsonable_encoder

transaction_type_router = APIRouter(
    prefix="/transaction_type",
    tags=["transaction_type"],
)

service = TransactionTypeService()

@transaction_type_router.post("")
def create_transaction_type(request: Request, transaction_type: TransactionType):
    result = service.create(transaction_type)
    return JSONResponse(content=result, status_code=201)

@transaction_type_router.get("")
def get_all_transaction_type(request: Request):
    result = service.get_all()
    print(result)
    if result == {"message": "Transaction type not found"}:
        return JSONResponse(content=result, status_code=404)
    else:
        data = jsonable_encoder(result)
        return JSONResponse(content=data, status_code=200)
    
@transaction_type_router.get("/")
def get_some_transaction_type(request: Request, limit: int, offset: int):
    result = service.get_some(limit, offset)
    data = jsonable_encoder(result)
    return JSONResponse(content=data, status_code=200)

@transaction_type_router.get("/{transaction_type_id}")
def get_by_id_transaction_type(transaction_type_id: int):
    result = service.get_by_id(transaction_type_id)
    print(result)
    if result == {"message": "Transaction type not found"}:
        return JSONResponse(content=result, status_code=404)
    else:
        data = jsonable_encoder(result)
        return JSONResponse(content=data, status_code=200)

@transaction_type_router.put("/{transaction_type_id}")
def update_transaction_type(request: Request, transaction_type: TransactionType):
    result = service.update(transaction_type.id, transaction_type)
    if result == {"message": "Transaction type not found"}:
        return JSONResponse(content=result, status_code=404)
    elif  result == {"message": "Transaction type updated"}: 
        return JSONResponse(content=result, status_code=201)

@transaction_type_router.delete("/{transaction_type_id}")
def delete_transaction_type(request: Request, transaction_type_id: int):
    result = service.delete(transaction_type_id)
    if result == {"message": "Transaction type not found"}:
        return JSONResponse(content=result, status_code=404)
    elif result == {"message": "Transaction type deleted"}:  
        return JSONResponse(content=result, status_code=200)

