from uagents import Agent, Context, Model
import requests

# create a scrape agent that scrapes a website and returns the data


class Message(Model):
    url: str


agent = Agent(
    name="scrape-agent",
    seed="scrape-agent-seed",
    endpoint="http://localhost:8001/submit",
    port=8001,
    mailbox=True,
)


@agent.on_event("startup")
async def on_startup(ctx: Context):
    # Send message to scrape agent
    message = Message(
        url="https://www.patagonia.com/factories-farms-material-suppliers"
    )
    await ctx.send(
        "agent1qvalv00zu0agyzla9jg527hl0a82j6qsg7h29c64jl0ztly594rlq90de87", message
    )
    print(f"Sent request to scrape {message.url}")


@agent.on_message(Message)
async def handle_message(ctx: Context, message: Message):
    print(f"Received message: {message}")

    # scrape the website
    response = requests.get(message.url)
    print(f"Scraped website: {response.text}")

    # send the response back to the user
    await ctx.send(response.text)


if __name__ == "__main__":
    agent.run()
