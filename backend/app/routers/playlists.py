from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import getDb
from .. import models, schemas, oauth2

router= APIRouter(
    prefix= "/playlist",
    tags= ["playlist"]
)


@router.get("/")
def getAllPlaylists(db: Session= Depends(getDb), currentUser= Depends(oauth2.getCurrentUser)):
    query= db.query(models.Playlist).filter(models.Playlist.creatorId == currentUser.id)

    queryResult= query.all()

    return queryResult

@router.post("/create/{playlist}")
def createPlaylist(playlist: str, db: Session= Depends(getDb), currentUser= Depends(oauth2.getCurrentUser)):
    newPlaylist= models.Playlist(playlistName= playlist, creatorId= currentUser.id)
    db.add(newPlaylist)
    db.commit()
    db.refresh(newPlaylist)

    return {"message": "playlist created"}

@router.post("/addSong")
def addSongToPlaylist(song: str, playlist: str, currentUser= Depends(oauth2.getCurrentUser)
                      , db: Session= Depends(getDb)):
    
    querySong= db.query(models.Song).filter(models.Song.songTitle.is_not_distinct_from(song))
    queryPlaylist= db.query(models.Playlist).filter(models.Playlist.playlistName.is_not_distinct_from(playlist))
    song= querySong.first()
    playlist= queryPlaylist.first()

    if song and playlist and playlist.creatorId == currentUser.id:
        playlist.songIds.append(song.id)
        db.commit()
        db.refresh(playlist)

    print(queryPlaylist.first())
    print(querySong.first())
    return {"msg": "idk fam"}
