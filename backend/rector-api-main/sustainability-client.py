from uagents import Agent, Context, Model, Protocol
from uagents.setup import fund_agent_if_low
from sustainability_agent import SustainabilityRequest, SustainabilityResponse

# Create client agent
client_agent = Agent(
    name="client_agent",
    seed="client_agent_seed",
)

# Fund the agent if needed
fund_agent_if_low(client_agent.wallet.address())

# Sustainability agent's address - you'll need to replace this with the actual address
# from when you run the sustainability agent
SUSTAINABILITY_AGENT_ADDRESS = (
    "agent1q23kkpnptxnpgaunc848v9k9q4fmvu05zufv5585vvsyn8xgnuqqxdaj5nd"
)


@client_agent.on_interval(period=10.0)
async def send_sustainability_request(ctx: Context):
    # Example request - you can modify these parameters
    company = "ARAVIND LTD"
    metric = "water usage"

    ctx.logger.info(
        f"Requesting sustainable alternatives for {company} focusing on {metric}"
    )

    # Send request to sustainability agent
    await ctx.send(
        SUSTAINABILITY_AGENT_ADDRESS,
        SustainabilityRequest(company_name=company, metric=metric),
    )


@client_agent.on_message(model=SustainabilityResponse)
async def handle_sustainability_response(
    ctx: Context, sender: str, msg: SustainabilityResponse
):
    ctx.logger.info("Received sustainability alternatives:")
    ctx.logger.info(f"Status: {msg.status}")
    ctx.logger.info(f"Alternatives: {msg.alternatives}")


if __name__ == "__main__":
    client_agent.run()
