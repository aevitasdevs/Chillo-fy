from ..database import getDb
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status
from .. import models, schemas, utilites, oauth2
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

router= APIRouter(
    prefix="/login",
    tags=["Login"]
)

@router.post("/", response_model= schemas.LoginResponse)
def login(user: OAuth2PasswordRequestForm = Depends(), db: Session= Depends(getDb)):
    query= db.query(models.User).filter(models.User.userName == user.username).first()

    if not query:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND,
                            detail= "user not found")
    
    if not utilites.verify(user.password, query.password):
        raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED,
                            detail= "not authorized")
    
    tokenData= oauth2.createAccessToken(data= {"id": query.id})

    return {
            "token": tokenData,
            "type": "bearer"
            }