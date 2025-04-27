from uagents import Agent, Context, Model
import requests
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from typing import Dict, Any

load_dotenv()

# Create FastAPI app
app = FastAPI(title="Supplier Alternatives API")


# Define API request/response models
class SupplierRequestAPI(BaseModel):
    name: str


class SupplierResponseAPI(BaseModel):
    alternatives: Dict[str, Any]


# Define the uAgents message models
class SupplierRequest(Model):
    name: str


class SupplierResponse(Model):
    alternatives: str


# Initialize the agent
agent = Agent()


# Fetch function from your existing script
def fetch(name):
    url = "https://api.perplexity.ai/chat/completions"
    payload = {
        "model": "sonar",
        "messages": [
            {"role": "system", "content": "Be precise and concise."},
            {
                "role": "user",
                "content": f"""Given a supplier/factory/manufacturer {name} for a company, give some sustainable alternative solutions and suppliers that the company can use.
                Give a comprehensive summary, not bullet points.
                Don't give in markdown format.""",
            },
        ],
    }
    headers = {
        "Authorization": f"Bearer {os.getenv('PERPLEXITY_API_KEY')}",
        "Content-Type": "application/json",
    }
    response = requests.post(url, json=payload, headers=headers)
    res = response.json()

    return res


# FastAPI endpoint
@app.post("/supplier-alternatives", response_model=SupplierResponseAPI)
async def get_supplier_alternatives(request: SupplierRequestAPI):
    try:
        alternatives = fetch(request.name)
        return SupplierResponseAPI(alternatives=alternatives)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error processing request: {str(e)}"
        )


# Define the uAgent message handler
@agent.on_message(SupplierRequest)
async def handle_supplier_request(ctx: Context, sender: str, msg: SupplierRequest):
    # Use the fetch function to get alternatives
    alternatives = fetch(msg.name)
    # Send the response back to the sender
    await ctx.send(sender, SupplierResponse(alternatives=alternatives))


if __name__ == "__main__":
    # Run both the agent and the FastAPI app
    import threading

    def run_agent():
        agent.run()

    # Start agent in a separate thread
    agent_thread = threading.Thread(target=run_agent)
    agent_thread.daemon = True
    agent_thread.start()

    # Start the FastAPI app
    uvicorn.run(app, host="0.0.0.0", port=8000)
