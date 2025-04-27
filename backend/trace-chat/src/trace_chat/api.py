from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio
from contextlib import redirect_stdout
import io
import sys
from typing import AsyncGenerator
from trace_chat.crew import PatagoniaCrew
from datetime import datetime

app = FastAPI()

async def stream_crew_output() -> AsyncGenerator[str, None]:
    # Create a string buffer to capture stdout
    output_buffer = io.StringIO()
    
    # Redirect stdout to our buffer
    with redirect_stdout(output_buffer):
        try:
            inputs = {"season": "Spring", "year": str(datetime.now().year)}
            PatagoniaCrew().crew().kickoff(inputs=inputs)
        except Exception as e:
            yield f"Error: {str(e)}\n"
            return

        # Get the final output
        output = output_buffer.getvalue()
        
        # Stream the output line by line
        for line in output.split('\n'):
            yield f"{line}\n"
            await asyncio.sleep(0.1)  # Add a small delay to simulate streaming

@app.get("/run-crew")
async def run_crew():
    return StreamingResponse(
        stream_crew_output(),
        media_type="text/plain",
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 