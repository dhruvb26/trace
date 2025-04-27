import time
from datetime import datetime
from uuid import uuid4
from uagents import Agent, Protocol, Context, Model
from time import sleep
from typing import Dict, List, Any, Optional

# import the necessary components from the chat protocol
from uagents_core.contrib.protocols.chat import (
    ChatAcknowledgement,
    ChatMessage,
    TextContent,
    chat_protocol_spec,
)


class Message(Model):
    url: str


class TestResponse(Model):
    response: str


class ProductData(Model):
    products: Optional[List[Dict[str, Any]]] = None


# Initialize agent1
agent1 = Agent(name="agent1", mailbox=True)


test_agent_address = "agent1qd4qr2dqs5uylu4kcgcm0cuk5j34atjp30smupfpujjjtutvyh8fyjmzyyr"

# Initialize the chat protocol
chat_proto = Protocol(spec=chat_protocol_spec)


# Startup Handler - Print agent details and send initial message
@agent1.on_event("startup")
async def startup_handler(ctx: Context):
    time.sleep(10)
    # Print agent details
    ctx.logger.info(
        f"My name is {ctx.agent.name} and my address is {ctx.agent.address}"
    )

    print(f"\n==================================================")
    print(f"IMPORTANT: Make sure test_agent_address is correct!")
    print(f"Sending message to: {test_agent_address}")
    print(f"If this doesn't match your test_agent's address, update it in test.py")
    print(f"==================================================\n")

    # Send initial message to the test agent
    # Use a valid URL that's more likely to be parsed successfully
    url = "https://www.patagonia.com/product/mens-micro-d-fleece-jacket/26171.html?dwvar_26171_color=NENA"
    initial_message = Message(url=url)
    ctx.logger.info(f"Sending message to {test_agent_address}: {initial_message}")
    await ctx.send(test_agent_address, initial_message)


@agent1.on_message(ProductData)
async def handle_test_response(ctx: Context, sender: str, msg: ProductData):
    ctx.logger.info(f"Received test response from {sender}: {msg.products}")

    # Process the received product data
    # The product data is expected to be in msg.url as JSON
    ctx.logger.info("Processing product data...")

    # Mark that we can exit after receiving the product data
    ctx.storage.set("can_exit", True)


if __name__ == "__main__":
    agent1.run()
