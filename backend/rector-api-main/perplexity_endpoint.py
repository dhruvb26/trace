from fastapi import FastAPI, HTTPException
from uagents import Agent, Context, Model
import requests
import os
from dotenv import load_dotenv

load_dotenv()


class SupplierRequest(Model):
    name: str


class SupplierResponse(Model):
    alternatives: str


# Initialize the agent
perplexity_agent = Agent(name="perplexity_agent", mailbox=True)

# Define the address for the agent you want to communicate with
agent_address = "agent1qf5sv78s8r46t43q7es0qmqs2knspqv262hanalmqv8lum3xdywmss3pc05"


@perplexity_agent.on_event("startup")
async def startup_handler(ctx: Context):
    ctx.logger.info("Perplexity agent started")


@perplexity_agent.on_message(SupplierResponse)
async def handle_supplier_response(ctx: Context, sender: str, msg: SupplierResponse):
    ctx.logger.info(f"Received response from {sender}: {msg.alternatives}")


if __name__ == "__main__":
    pass
