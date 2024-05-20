from fastapi import FastAPI
from .routers import user, auth, playlists, songs
from .database import engine
from . import models

models.Base.metadata.create_all(bind = engine)

app = FastAPI()

@app.get("/")
def main():
    return {"message": "Hello world!!!!!"}

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(playlists.router)
app.include_router(songs.router)