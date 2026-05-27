import json
import os
from functools import lru_cache
from pathlib import Path
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="Bhotey Kukur API",
    description="Backend API for the Himalayan Mastiff Portal",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to frontend data.json
DATA_PATH = Path(__file__).parent.parent / "frontend" / "src" / "data" / "site-data.json"


@lru_cache(maxsize=1)
def load_site_data() -> dict:
    """Load site data from the shared data.json file. Cached to avoid repeated disk I/O."""
    if DATA_PATH.exists():
        with open(DATA_PATH) as f:
            return json.load(f)
    return {}


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Bhotey Kukur API is running"}


@app.get("/api/site-data")
async def get_site_data():
    """Returns the full site configuration and content data."""
    data = load_site_data()
    if not data:
        return {"error": "Site data not found"}, 404
    return data


@app.get("/api/tiers")
async def get_tiers():
    """Returns puppy tier information."""
    data = load_site_data()
    return data.get("tiers", {})


@app.get("/api/testimonials")
async def get_testimonials():
    """Returns customer testimonials."""
    data = load_site_data()
    return data.get("testimonials", [])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
