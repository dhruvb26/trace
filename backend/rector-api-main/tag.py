import requests
from dotenv import load_dotenv
import os
import google.generativeai as genai
import bs4
from fastapi import FastAPI, Query
from pydantic import BaseModel
from firecrawl import FirecrawlApp


load_dotenv()

app = FirecrawlApp(api_key=os.getenv("FIRECRAWL_API_KEY"))


# Configure the Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


class TagResponse(BaseModel):
    tags: list[str]


def get_product_description(url):
    scrape_result = app.scrape_url(url, formats=["markdown", "html"])

    return scrape_result.markdown


def generate_tags(url):
    # Create a Gemini model instance
    model = genai.GenerativeModel("gemini-1.5-flash")

    # Create the prompt
    prompt = f"""
    Given this product description: {get_product_description(url)}
    Return as many tags relevant to the product as a list of words (e.g., healthcare, finance, fashion, fabric, sustainable,type of fabric, etc.).
    Don't include any other text in your response.
    Output should be like:
    [tag1, tag2, tag3]
    """

    # Generate the response
    response = model.generate_content(prompt)

    # Parse the response to extract tags
    tag_text = response.text.strip()
    # Remove brackets and split by commas
    tags = [tag.strip() for tag in tag_text.strip("[]").split(",")]
    return tags


# This section only runs when executing the file directly, not on Vercel
if __name__ == "__main__":
    print(generate_tags("https://www.patagonia.com/home/"))
