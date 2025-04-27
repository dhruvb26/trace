import smtplib
import ssl

try:
    # Parse the email data if it's a string

    # Check for required fields

    # Get SMTP settings from environment variables
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 465
    SMTP_USERNAME = "kanavg004@gmail.com"
    SMTP_PASSWORD = "nszh xykq hltx jacq"

    # Send the email using SMTP
    try:
        # Create SMTP connection
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.ehlo()
        server.starttls()  # Secure the connection
        server.ehlo()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        context = ssl.create_default_context()

        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(SMTP_USERNAME, SMTP_USERNAME, "hi")
            server.close()

    except Exception as smtp_error:
        print(f"SMTP error: {str(smtp_error)}")

except Exception as e:
    print(f"An error occurred: {str(e)}")
