from fastapi import FastAPI
from .routers import user, auth, playlists, songs
from .database import engine
from . import models
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind = engine)

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def main():
    return {"message": "Hello world!!!!!"}

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(playlists.router)
app.include_router(songs.router)