from fastapi import APIRouter, Depends, HTTPException, status
from .. import models, schemas, utilites
from ..database import getDb
from sqlalchemy.orm import Session

router= APIRouter(
    prefix="/user",
    tags=["User"]
)

@router.get("/{username}", response_model= schemas.UserOutputSchema)
def getUser(username: str, db: Session=Depends(getDb)):
    query= db.query(models.User).filter(models.User.userName.contains(username))

    userWithId= query.first()
    print(query)

    if userWithId:
        return userWithId
    else:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND,
                            detail= f"user with id {id} doesn't exist")


@router.post("/create", response_model= schemas.UserOutputSchema)
def createUser(user: schemas.UserInputSchema, db: Session= Depends(getDb)):
    
    hashedPassword= utilites.hash(user.password)
    user.password= hashedPassword
    newUser= models.User(**user.model_dump())

    db.add(newUser)
    db.commit()
    db.refresh(newUser)

    return newUser


