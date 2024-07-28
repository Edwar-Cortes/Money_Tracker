import os
import json
import requests
from config.database import Session
from models.transaction import Transaction

url = "http://localhost:8000/"
transactions_type = ["deposit", "wihtdraw", "interest"]

for transaction_type in transactions_type:
    response = requests.post(url+"transaction_type", json={"name": transaction_type})
    print(response.json())