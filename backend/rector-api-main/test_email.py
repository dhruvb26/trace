import time
from datetime import datetime
from uuid import uuid4
from uagents import Agent, Protocol, Context, Model


class EmailResponse(Model):
    message: str
    type: str


class EmailSendRequest(Model):
    recipient: str
    subject: str
    message: str


# Initialize agent1
agent1 = Agent(name="agent1", mailbox=True)


test_agent_address = "agent1qtv3k9ss0avea2c8ecvdzuv7060x9j98v2xqte4tn4d8thprxp38jem9qhp"


# Startup Handler - Print agent details and send initial message
@agent1.on_event("startup")
async def startup_handler(ctx: Context):
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
    email_request = EmailSendRequest(
        recipient="guptakanav2004@gmail.com",
        subject="Test Email",
        message="This is a test email",
    )
    await ctx.send(test_agent_address, email_request)


@agent1.on_message(EmailResponse)
async def handle_test_response(ctx: Context, sender: str, msg: EmailResponse):
    ctx.logger.info(f"Received test response from {sender}: {msg.message}")

    # Process the received product data
    # The product data is expected to be in msg.url as JSON
    ctx.logger.info("Processing product data...")

    # Mark that we can exit after receiving the product data
    ctx.storage.set("can_exit", True)


if __name__ == "__main__":
    agent1.run()
