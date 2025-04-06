from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import ticker_router  # Import your routers here

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(ticker_router.router)  # Include the ticker router

@app.get("/")
def read_root():
    return {"message": "Welcome to the FCProperty API!"}