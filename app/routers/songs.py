import io
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from fastapi.responses import StreamingResponse, JSONResponse
from sqlalchemy.orm import Session
from ..database import getDb
from .. import models, schemas, oauth2, utilites
from typing import List

router= APIRouter(
    prefix= "/songs", 
    tags= ["Songs"]
)

@router.get("/", response_model= List[schemas.SongResponse])
def getAllSongs(db: Session= Depends(getDb)):
    query = db.query(models.Song).all()

    return query

@router.get("/song/{id}")
def getSong(id: int, db: Session= Depends(getDb)):
    query = db.query(models.Song).filter(models.Song.id == id).first()
    if query:
        return query.content
        #return StreamingResponse(io.BytesIO(query.content), media_type="audio/mp3")
    else:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, 
                            detail= "song not found")

@router.get("/poster/{id}")
def getPoster(id: int, db: Session= Depends(getDb)):
    query = db.query(models.Song).filter(models.Song.id == id).first()
    if query:
        return StreamingResponse(io.BytesIO(query.poster), media_type="image/jpg")
    else:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, 
                            detail= "song not found")
    

@router.post("/create")
async def createSong(songName: str, song: UploadFile= File(...), poster: UploadFile= File(...),
                      db: Session= Depends(getDb)):
    
    content = await song.read()
    posterContent = await poster.read()
    newSong = models.Song(songTitle= songName, content= content, poster= posterContent, artistId= 1)
    db.add(newSong)
    db.commit()
    db.refresh(newSong)

    return {"msg": "idk fam"}