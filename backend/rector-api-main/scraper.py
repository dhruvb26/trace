import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import json


# Headers to pretend like we're a real browser (scraping etiquette)
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
}

products = []

# List of Patagonia products to scrape
product_urls = [
    "https://www.patagonia.com/product/mens-micro-d-fleece-jacket/26171.html?dwvar_26171_color=NENA",
    "https://www.patagonia.com/product/mens-better-sweater-fleece-jacket/25528.html",
    "https://www.patagonia.com/product/mens-baggies-shorts-5-inch/57021.html",
    "https://www.patagonia.com/product/womens-down-sweater-jacket/84683.html",
]

# Step 3: Scrape individual product pages
for product_url in product_urls:
    print(f"Scraping {product_url}...")

    prod_response = requests.get(product_url, headers=HEADERS)
    prod_soup = BeautifulSoup(prod_response.content, "html.parser")

    try:
        # Get product name
        name = prod_soup.find("h1").text.strip()

        # Get material info (inside description or bulleted list)
        material_info = ""
        made_in_info = ""
        sustainability_features = []

        # Look for sustainability/environmental sections
        desc = prod_soup.findAll("p", class_="content-feature__description")
        for i, tag in enumerate(desc):
            text = tag.text.strip()
            if i == 0:
                material_info = text

            # Look for manufacturing location
            if "Made in" in text:
                made_in_info = text

            # Identify sustainability features
            sustainability_keywords = [
                "recycled",
                "organic",
                "fair trade",
                "bluesign",
                "sustainable",
                "renewable",
                "carbon",
                "footprint",
                "environmental",
            ]
            for keyword in sustainability_keywords:
                if keyword in text.lower() and text not in sustainability_features:
                    sustainability_features.append(text)

        # Get certification information
        certifications = []
        cert_images = prod_soup.findAll("img", class_="content-feature__image")
        for img in cert_images:
            alt_text = img.get("alt", "").lower()
            if any(
                cert in alt_text
                for cert in ["fair trade", "bluesign", "gots", "certified"]
            ):
                certifications.append(alt_text)

        # Save into dictionary
        products.append(
            {
                "Product Name": name,
                "Material Info": material_info,
                "Made In Info": made_in_info,
                "Sustainability Features": sustainability_features,
                "Certifications": certifications,
                "Product URL": product_url,
            }
        )

    except Exception as e:
        print(f"Error scraping {product_url}: {e}")

    time.sleep(1)  # Be nice: 1 second pause between product pages

# Step 4: Save results to CSV and JSON
df = pd.DataFrame(products)
df.to_csv("patagonia_products.csv", index=False)

# Save to JSON for easier programmatic access
with open("patagonia_products.json", "w") as f:
    json.dump(products, f, indent=2)

print(
    "✅ Scraping complete! Data saved to patagonia_products.csv and patagonia_products.json"
)
