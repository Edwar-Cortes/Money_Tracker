from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from config.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

from routers.transaction import transaction_router
from routers.transaction_type import transaction_type_router
from middlewares.error_handler import ErrorHandler


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.title = "Data Transaction VTWIN"
app.description = "Aplicacion de solicitud de servicio tecnico"
app.version = "0.0.1 - Beta"

white_list = ['http://localhost:5173']
app.add_middleware(CORSMiddleware, allow_origins = white_list, )
app.add_middleware(ErrorHandler)

app.include_router(transaction_type_router)
app.include_router(transaction_router)

@app.get("/", tags=["home"])

def home():
    return HTMLResponse(content="<h1>Mi primeta App</h1>")

@app.get("/inyect", tags = ["home"])
def inyect():
    import os
    import json
    from datetime import datetime
    from config.database import Session
    from models.transaction import Transaction

    url = "http://localhost:8000/"
    data_path = os.path.join(os.path.dirname(__file__),"data", "MOCK_DATA.json")

    with open(data_path, "r") as file:
        data =  json.load(file)
        db = Session()
        for transaction in data:
            try:
                if 'date' in transaction:
                    print(transaction['date'])
                    transaction['date'] = datetime.strptime(transaction['date'],'%Y-%m-%dT%H:%M:%SZ')
                new_transaction = Transaction(**transaction)
                db.add(new_transaction)
            except Exception as e:
                print(f"Error with transaction: {transaction}")
                print(e)
        db.commit()
        db.close()
                                                            
