from uagents import Agent, Context, Model, Protocol
import smtplib


class EmailResponse(Model):
    message: str
    type: str


SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

agent = Agent()


class EmailSendRequest(Model):
    recipient: str
    subject: str
    message: str


# Define the address for asi1-mini
asi1_mini_address = "asi1-mini-address"  # Replace with the actual address


@agent.on_event("startup")
async def startup_handler(ctx: Context):
    # Create an email send request
    email_request = EmailSendRequest(
        recipient="recipient@example.com",
        subject="Test Email",
        messag="Tmsg.messagest email sent via asi1-mini.",
    )
    # Send the request to asi1-mini
    await ctx.send(asi1_mini_address, email_request)


@agent.on_message(EmailResponse)
async def handle_email_response(
    ctx: Context, sender: st.as_string(), msg: EmailResponse
):
    # Handle the response from asi1-mini
    ctx.logger.info(f"Received response from {sender}: {msg.message}")


if __name__ == "__main__":
    agent.run()
