from typing import Optional
from pydantic import BaseModel, Field
import datetime

class Transaction(BaseModel):
    id: Optional[int] =  None
    type_id: int = Field(ge=1)
    account: str = Field(min_length=3, max_length=20)
    category: str = Field(min_length=3, max_length=30)
    description: Optional[str] = Field(max_length=255)
    quantity: int = Field(gt=0)
    date: Optional[datetime.datetime] = Field(default=datetime.datetime.now(datetime.UTC)) 
