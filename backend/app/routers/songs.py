import io
from fastapi import APIRouter, Depends, Form, Request, UploadFile, File, HTTPException, status
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

@router.get("/", response_model= List[schemas.SongResponse])
def getSongInfo(name: str = Form(...), db: Session= Depends(getDb)):
    query = db.query(models.Song).filter(models.Song.songTitle == name)
    
    if query:
        return query
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail= "Song not found")

@router.get("/song")
def getSong(name: str, db: Session= Depends(getDb), 
            currentUser: int = Depends(oauth2.getCurrentUser)):
    query = db.query(models.Song).filter(models.Song.songTitle == name).first()

    if query:
        return StreamingResponse(io.BytesIO(query.content), media_type="audio/mp3")
    else:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, 
                            detail= "song not found")

@router.get("/poster")
def getPoster(name: str, db: Session= Depends(getDb)):
    query = db.query(models.Song).filter(models.Song.songTitle == name).first()
    if query:
        return StreamingResponse(io.BytesIO(query.poster), media_type="image/jpg")
    else:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, 
                            detail= "song not found")
    

@router.post("/create")
async def createSong(songName: str = Form(...), song: UploadFile= File(...), poster: UploadFile= File(...),
                      db: Session= Depends(getDb),
                      currentUser: schemas.TokenData =  Depends(oauth2.getCurrentUser)):
    
    content = await song.read()
    posterContent = await poster.read()
    newSong = models.Song(songTitle= songName, content= content, poster= posterContent, artistId= currentUser.id)
    db.add(newSong)
    db.commit()
    db.refresh(newSong)

    return {"msg": "idk fam"}

@router.delete("/delete")
async def deleteSong(songName: str = Form(...), 
                     currentUser: int= Depends(oauth2.getCurrentUser),
                     db: Session= Depends(getDb)):
    
    query = db.query(models.Song).filter(models.Song.songTitle == songName).first()

    if (query):
        if (query.artistId == currentUser.id):
            db.delete(query)
            db.commit()
        else:
            raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED, 
                                detail= "You haven't created this song")
    else:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, 
                                detail= "Song doesnt exist")
    
    return {f"Song {query.songTitle} removed from database."}