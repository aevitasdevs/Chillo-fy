from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_NAME: str
    DATABASE_USERNAME: str
    DATABASE_PASSWORD: str
    DATABASE_HOST_NAME: str
    DATABASE_PORT: int

    model_config=  SettingsConfigDict(env_file=".env")

settings= Settings()