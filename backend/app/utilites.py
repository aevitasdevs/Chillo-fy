from passlib.context import CryptContext
import bitstring

pwdContext = CryptContext(schemes= ["bcrypt"], deprecated= "auto") 
def hash(password: str):
    return pwdContext.hash(password)

#password verification.
def verify(input: str, hashedPassword: str):
    return pwdContext.verify(input, hashedPassword)

