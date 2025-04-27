from uagents import Agent, Context, Model, Protocol
import asyncio
import requests
from bs4 import BeautifulSoup
import time
import json
from datetime import datetime
from uuid import uuid4
from typing import Literal, Optional, Dict, Any, List
import re
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

# # Create a protocol for the agent
# scraper_protocol = Protocol("ScrapeProtocol")

# Create a test agent
test_agent = Agent(mailbox=True)


HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}


class Message(Model):
    url: str


class ProductData(Model):
    products: Optional[List[Dict[str, Any]]] = None


products = []


@test_agent.on_message(model=Message)
async def handle_response(ctx: Context, sender: str, message: Message):
    ctx.logger.info(f"Received response from {sender}:")
    prod_response = requests.get(message.url, headers=HEADERS)
    prod_soup = BeautifulSoup(prod_response.content, "html.parser")
    ctx.logger.info(f"Parsed")

    try:

        # Find all factory elements
        factory_elements = prod_soup.find("ul", class_="mapbox__list")

        # Check if factory_elements exists before iterating
        if factory_elements:
            for i, factory in enumerate(factory_elements.find_all("li")):
                factory_info = {}
                factory_name_el = factory.find("h4", class_="h8")
                address = factory.find("p", attrs={"data-facility-address": True})

                if factory_name_el:
                    factory_info["name"] = factory_name_el.text.strip()

                if address:
                    # Clean up the address formatting - remove extra whitespace and newlines
                    address_text = address.text.strip()
                    # Replace multiple whitespaces and newlines with a single space
                    address_text = re.sub(r"\s+", " ", address_text)
                    factory_info["address"] = address_text

                # Only add factory if we have some info
                if factory_info:
                    products.append(factory_info)

    except Exception as e:
        print(f"Error scraping {message.url}: {e}")

    time.sleep(1)
    # Stop the agent after receiving a response
    ctx.storage.set("received_response", True)

    # Send the JSON string directly instead of trying to send the Python object
    products_json = json.dumps(products, indent=2)
    # await ctx.send(sender, products_json)
    ctx.logger.info("done")
    ctx.logger.info(sender)
    ctx.logger.info(f"Scraped products: {products_json}")
    await ctx.send(
        "agent1qv22z2p9u0humylsk95cyvd8c53mwn22sr8dqdrpf5mfv5z00mdr7x3lukz",
        ProductData(products=products),
    )


# Initialize FastAPI app
app = FastAPI()


# Define request and response models
class ScrapeRequest(BaseModel):
    url: str


class ScrapeResponse(BaseModel):
    products: Optional[List[Dict[str, Any]]]


# Define the scraping function
async def scrape_url(url: str) -> List[Dict[str, Any]]:
    products = []
    try:
        prod_response = requests.get(url, headers=HEADERS)
        prod_soup = BeautifulSoup(prod_response.content, "html.parser")

        # Find all factory elements
        factory_elements = prod_soup.find("ul", class_="mapbox__list")

        # Check if factory_elements exists before iterating
        if factory_elements:
            for i, factory in enumerate(factory_elements.find_all("li")):
                factory_info = {}
                factory_name_el = factory.find("h4", class_="h8")
                address = factory.find("p", attrs={"data-facility-address": True})

                if factory_name_el:
                    factory_info["name"] = factory_name_el.text.strip()

                if address:
                    # Clean up the address formatting - remove extra whitespace and newlines
                    address_text = address.text.strip()
                    # Replace multiple whitespaces and newlines with a single space
                    address_text = re.sub(r"\s+", " ", address_text)
                    factory_info["address"] = address_text

                # Only add factory if we have some info
                if factory_info:
                    products.append(factory_info)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error scraping {url}: {e}")

    return products


# Run the FastAPI app
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
