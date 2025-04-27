from fastapi import FastAPI, HTTPException
from perplexity_search import (
    SupplierResponse,
    fetch,
)
import asyncio
from tag import generate_tags, TagResponse
from fastapi import Query
from scrape_model import scrape_url, ScrapeRequest, ScrapeResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
from sustainability_score import analyze_product


class QueryRequest(BaseModel):
    question: str


class QueryResponse(BaseModel):
    response: str


class SupplierQueryRequest(BaseModel):
    name: str


class AnalyzeRequest(BaseModel):
    product: str


class AnalyzeResponse(BaseModel):
    result: dict


response_futures: Dict[str, asyncio.Future] = {}


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/query")
async def get_supplier_alternatives(request: SupplierQueryRequest):
    try:
        alternatives = fetch(request.name)
        return {"alternatives": alternatives}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error processing request: {str(e)}"
        )


@app.get("/tags", response_model=TagResponse)
async def get_tags(url: str = Query(..., description="URL of the product to analyze")):
    tags = generate_tags(url)
    return TagResponse(tags=tags)


# Define the FastAPI endpoint
@app.post("/scrape", response_model=ScrapeResponse)
async def scrape_endpoint(request: ScrapeRequest):
    products = await scrape_url(request.url)
    return ScrapeResponse(products=products)


@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_endpoint(request: AnalyzeRequest):
    print(request.product)
    return AnalyzeResponse(result=analyze_product(request.product))
