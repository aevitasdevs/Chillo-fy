from .database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.types import LargeBinary

class User(Base):
    __tablename__ = "users"

    id= Column(Integer, primary_key=True, nullable=False)
    userName= Column(String, unique=True, nullable=False)
    email= Column(String, unique=True, nullable=False)
    password= Column(String, nullable=False)

class Playlist(Base):
    __tablename__= "playlists"

    id= Column(Integer, primary_key=True, nullable=False)
    playlistName= Column(String, nullable=False)
    creatorId= Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    songIds= Column(MutableList.as_mutable(ARRAY(Integer)), server_default="{}", nullable=False)

    user= relationship("User")

class Song(Base):
    __tablename__= "songs"

    id= Column(Integer, primary_key=True, nullable=False)
    songTitle= Column(String, nullable=False)
    content= Column(LargeBinary, nullable=False)
    artistId= Column(Integer, ForeignKey("users.id", ondelete= "CASCADE"), nullable=False)
    poster = Column(LargeBinary, nullable=False)

    artist = relationship("User")