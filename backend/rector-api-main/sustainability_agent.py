import requests
import os
from dotenv import load_dotenv
from uagents import Agent, Context, Model, Protocol

# Load environment variables
load_dotenv()

# Get Perplexity API key
p_key = os.getenv("PERPLEXITY_API_KEY")


# Define data models
class SustainabilityRequest(Model):
    company_name: str
    metric: str


class SustainabilityResponse(Model):
    alternatives: str
    status: str


# Create agent
sustainability_agent = Agent(
    name="sustainability_agent",
    seed="sustainability_alternatives_seed",
)

# Create protocol
sustainability_protocol = Protocol("SustainabilityProtocol")


def fetch_alternatives(company_name, metric):
    """Query Perplexity API for sustainable alternatives based on company and metric."""
    url = "https://api.perplexity.ai/chat/completions"

    payload = {
        "model": "sonar",
        "messages": [
            {"role": "system", "content": "Be precise and concise."},
            {
                "role": "user",
                "content": f"Given a supplier/factory/manufacturer {company_name}, provide sustainable alternatives that can help improve their {metric} sustainability metric. List specific companies, technologies, or approaches that would be better alternatives.",
            },
        ],
    }
    headers = {"Authorization": f"Bearer {p_key}", "Content-Type": "application/json"}

    try:
        response = requests.request("POST", url, json=payload, headers=headers)
        res = response.json()
        result = res["choices"][0]["message"]["content"]
        return result, "SUCCESS"
    except Exception as e:
        return str(e), "ERROR"


@sustainability_protocol.on_message(model=SustainabilityRequest)
async def handle_sustainability_request(
    ctx: Context, sender: str, msg: SustainabilityRequest
):
    """Handle incoming requests for sustainability alternatives."""
    ctx.logger.info(f"Received request for {msg.company_name} focusing on {msg.metric}")

    alternatives, status = fetch_alternatives(msg.company_name, msg.metric)

    await ctx.send(
        sender, SustainabilityResponse(alternatives=alternatives, status=status)
    )


# Include protocol in agent
sustainability_agent.include(sustainability_protocol, publish_manifest=True)

# API endpoint for direct access
from fastapi import FastAPI

app = FastAPI()


@app.get("/sustainability-search")
def search(company: str, metric: str):
    """FastAPI endpoint to allow REST API access to the same functionality."""
    alternatives, status = fetch_alternatives(company, metric)
    return {"alternatives": alternatives, "status": status}


if __name__ == "__main__":
    import uvicorn
    import threading

    # Start the agent in a separate thread
    agent_thread = threading.Thread(target=sustainability_agent.run)
    agent_thread.daemon = True
    agent_thread.start()

    # Start the FastAPI server on port 8001 instead of 8000
    uvicorn.run(app, host="0.0.0.0", port=8001)
