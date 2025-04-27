#!/usr/bin/env python
import sys
import warnings
import os
from datetime import datetime

from dotenv import load_dotenv
from trace_chat.crew import PatagoniaCrew

# Load environment variables from .env file if it exists
load_dotenv()

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

# This main file is intended to be a way for you to run your
# crew locally, so refrain from adding unnecessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information


def run():
    """
    Run the Patagonia supply chain management crew.

    Note: You need to set the OPENAI_API_KEY and GOOGLE_API_KEY environment variables before running this.
    You can do this by:
    1. export OPENAI_API_KEY=your_api_key_here (in terminal)
    2. Create a .env file with OPENAI_API_KEY=your_api_key_here
    3. export GOOGLE_API_KEY=your_api_key_here (in terminal)
    4. Create a .env file with GOOGLE_API_KEY=your_api_key_here
    """
    # Check if OpenAI API key is set
    

    inputs = {"season": "Spring", "year": str(datetime.now().year)}

    try:
        PatagoniaCrew().crew().kickoff(inputs=inputs)
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")


def train():
    """
    Train the crew for a given number of iterations.
    """
    if not os.getenv("OPENAI_API_KEY"):
        print("Error: OPENAI_API_KEY environment variable is not set.")
        print("Please set it using: export OPENAI_API_KEY=your_api_key_here")
        return 1

    inputs = {"season": "Spring", "year": str(datetime.now().year)}
    try:
        PatagoniaCrew().crew().train(
            n_iterations=int(sys.argv[1]), filename=sys.argv[2], inputs=inputs
        )

    except Exception as e:
        raise Exception(f"An error occurred while training the crew: {e}")


def replay():
    """
    Replay the crew execution from a specific task.
    """
    if not os.getenv("OPENAI_API_KEY"):
        print("Error: OPENAI_API_KEY environment variable is not set.")
        print("Please set it using: export OPENAI_API_KEY=your_api_key_here")
        return 1

    try:
        PatagoniaCrew().crew().replay(task_id=sys.argv[1])

    except Exception as e:
        raise Exception(f"An error occurred while replaying the crew: {e}")


def test():
    """
    Test the crew execution and returns the results.
    """
    if not os.getenv("OPENAI_API_KEY"):
        print("Error: OPENAI_API_KEY environment variable is not set.")
        print("Please set it using: export OPENAI_API_KEY=your_api_key_here")
        return 1

    inputs = {"season": "Spring", "year": str(datetime.now().year)}
    try:
        PatagoniaCrew().crew().test(
            n_iterations=int(sys.argv[1]), openai_model_name=sys.argv[2], inputs=inputs
        )

    except Exception as e:
        raise Exception(f"An error occurred while testing the crew: {e}")
