import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
}


def scrape_product(product_url):
    prod_response = requests.get(product_url, headers=HEADERS)
    prod_soup = BeautifulSoup(prod_response.content, "html.parser")

    try:
        factories = []

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
                    factories.append(factory_info)

        else:
            print("No factory elements found on the page")

        return factories

    except Exception as e:
        print(f"Error scraping product: {e}")
        return None


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/scrape")
async def scrape():
    result = scrape_product(
        "https://www.patagonia.com/factories-farms-material-suppliers"
    )
    return result


if __name__ == "__main__":
    scrape_product("https://www.patagonia.com/factories-farms-material-suppliers")
