from uagents_adapter.crewai import CrewAIRegisterTool
from trace_chat.crew import PatagoniaCrew
import os
import signal
import sys
import time


# Create a function to handle CrewAI operations
def crew_handler(query):
    # Process with CrewAI
    result = PatagoniaCrew().crew().run()
    return result


def handle_exit(signum, frame):
    print("\nShutting down gracefully...")
    sys.exit(0)


if __name__ == "__main__":
    # Register signal handlers for graceful shutdown
    signal.signal(signal.SIGINT, handle_exit)
    signal.signal(signal.SIGTERM, handle_exit)

    # Register the CrewAI function as a uAgent
    tool = CrewAIRegisterTool()
    agent_info = tool.invoke(
        {
            "crew_obj": crew_handler,
            "name": "my_crew_agent",
            "port": 8081,
            "description": "A CrewAI team of specialized agents",
            "api_token": os.getenv("AGENTVERSE_API_KEY"),
        }
    )

    # Print agent info for debugging
    print("Agent info:", agent_info)

    # Access the agent address safely
    agent_address = (
        agent_info if isinstance(agent_info, str) else "Address not available"
    )
    print(f"Agent registered successfully: {agent_address}")
    print("Agent is running. Press Ctrl+C to stop.")

    # Keep the script running
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down gracefully...")
