from pydantic import BaseModel
from pydantic_settings import SettingsConfigDict

class UserInputSchema(BaseModel):
    email: str
    userName: str
    password: str
    

class UserOutputSchema(BaseModel):
    userName: str
    email: str
    
    model_config= SettingsConfigDict(from_attributes=True)

class TokenData(BaseModel):
    id: int

class LoginResponse(BaseModel):
    token: str
    type: str

    model_config= SettingsConfigDict(from_attributes=True)

class LoginInput(BaseModel):
    username: str
    password: str

class SongResponse(BaseModel):
    songTitle: str

    model_config= SettingsConfigDict(from_attributes=True)

