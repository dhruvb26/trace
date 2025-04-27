import json
import os
import requests
from langchain_google_genai import ChatGoogleGenerativeAI


from dotenv import load_dotenv

# Load environment variables
load_dotenv()
# client = genai.Client(
#     model_name="gemini-1.5-flash", api_key=os.getenv("GEMINI_API_KEY")
# )
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro")

patagonia_products = [
    "Men's Better Sweater® Fleece Jacket",
    "Made from warm, soft, long-lasting 100% recycled polyester knit fleece dyed with a low-impact process that reduces the use of dyestuffs, energy and water compared to conventional heather dyeing methods",
    "Made in a Fair Trade Certified™ factory",
    "['Made from warm, soft, long-lasting 100% recycled polyester knit fleece dyed with a low-impact process that reduces the use of dyestuffs, energy and water compared to conventional heather dyeing methods', 'Made in a Fair Trade Certified™ factory, which means the people who made this product earned a premium for their labor', '10-oz 100% recycled polyester knit fleece dyed with a low-impact process that reduces the use of dyestuffs, energy and water compared to conventional heather dyeing methods', '5.3-oz 100% recycled polyester brushed tricot', 'Fabrics are certified as bluesign® approved', 'Made in a Fair Trade Certified™ factory']",
    [],
    "https://www.patagonia.com/product/mens-better-sweater-fleece-jacket/25528.html",
]


def load_product_data(file_path="patagonia_products.json"):
    """Load scraped product data"""
    try:
        with open(file_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: {file_path} not found. Run scraper.py first.")
        return []


def get_supply_chain_data(product_name, company, api_key=None):
    """Use AI to fill in missing supply chain data"""

    prompt = f"""
    Based on public information about {company}'s product '{product_name}', 
    provide a JSON object with the following supply chain information:
    1. Materials sourcing locations
    2. Manufacturing facilities
    3. Transportation methods
    4. Known sustainability initiatives
    5. Environmental certifications
    6. Estimated carbon footprint
    
    Format your response as a valid JSON object with these keys: 
    materials_source, manufacturing_locations, transportation, sustainability_initiatives, 
    certifications, carbon_footprint_estimate
    """
    response = llm.invoke(prompt)
    content = response.content
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {
            "ai_response": content,
            "parsing_error": "Could not parse AI response as JSON",
        }


def calculate_sustainability_score(product_data, supply_chain_data):
    """Calculate a sustainability score based on available data"""
    score = 50  # Default middle score

    # Scoring based on scraped data
    if product_data:
        # Material score: recycled/organic materials are better
        if "Material Info" in product_data:
            material_info = product_data["Material Info"].lower()
            if "recycled" in material_info:
                score += 10
            if "organic" in material_info:
                score += 8
            if "polyester" in material_info and "recycled" not in material_info:
                score -= 5

        # Certification score
        if "Certifications" in product_data and product_data["Certifications"]:
            score += min(len(product_data["Certifications"]) * 5, 15)  # Max 15 points

        # Sustainability features
        if "Sustainability Features" in product_data:
            score += min(len(product_data["Sustainability Features"]) * 3, 12)

    # Scoring based on AI-enhanced supply chain data
    if supply_chain_data and not supply_chain_data.get("error"):
        # Location-based scoring (shorter supply chains are better)
        if "manufacturing_locations" in supply_chain_data:
            manufacturing_countries = supply_chain_data["manufacturing_locations"]
            if (
                isinstance(manufacturing_countries, list)
                and len(manufacturing_countries) < 3
            ):
                score += 5  # Fewer manufacturing locations is better

        # Transportation method scoring
        if "transportation" in supply_chain_data:
            transport = supply_chain_data["transportation"]
            if isinstance(transport, str):
                if "ship" in transport.lower() and "air" not in transport.lower():
                    score += 3  # Sea shipping is better than air
                if "air" in transport.lower():
                    score -= 5  # Air freight has high emissions

    # Cap the score between 0 and 100
    return max(0, min(score, 100))


def analyze_product(product_name, company="Patagonia"):
    """Analyze a product's sustainability based on available data"""
    # 1. Get scraped data
    print(product_name)
    product_data = None
    if product_name in patagonia_products:
        product_data = patagonia_products[patagonia_products.index(product_name)]
    else:
        print(f"Product '{product_name}' not found in scraped data")
        product_data = {"Product Name": product_name}

    # 2. Get AI-enhanced supply chain data
    supply_chain_data = get_supply_chain_data(product_name, company)

    # 3. Calculate sustainability score
    score = calculate_sustainability_score(product_data, supply_chain_data)

    # 4. Prepare result
    result = {
        "product_name": product_name,
        "company": company,
        "sustainability_score": score,
        "scraped_data": product_data,
        "supply_chain_data": supply_chain_data,
        "score_explanation": get_score_explanation(score),
    }

    return result


def get_score_explanation(score):
    """Provide explanation for sustainability score"""
    if score >= 80:
        return "Excellent sustainability practices with transparent supply chain"
    elif score >= 65:
        return "Good sustainability practices, some areas could be improved"
    elif score >= 50:
        return "Average sustainability, significant room for improvement"
    elif score >= 30:
        return "Below average sustainability, many concerns in supply chain"
    else:
        return "Poor sustainability practices, major environmental concerns"


if __name__ == "__main__":
    # Example usage
    product_name = "Men's Micro D® Fleece Jacket"
    result = analyze_product(product_name)

    print(
        f"\nSustainability Analysis for {result['product_name']} by {result['company']}"
    )
    print(
        f"Overall Score: {result['sustainability_score']}/100 - {result['score_explanation']}"
    )

    # Save result to JSON
    with open(f"{product_name.replace(' ', '_').lower()}_analysis.json", "w") as f:
        json.dump(result, f, indent=2)

    print(f"\nAnalysis saved to {product_name.replace(' ', '_').lower()}_analysis.json")
