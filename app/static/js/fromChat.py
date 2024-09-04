import smtplib
from email.message import EmailMessage

# Set up the email message
msg = EmailMessage()
msg['From'] = 'tohannessbi@gmail.com'
msg['To'] = 'bigrocket0687@gmail.com'
msg['Subject'] = 'Test Email'
msg.set_content('This is a test email.')

# Set up the SMTP server
smtp_server = 'smtp.gmail.com'
smtp_port = 587  # Port for TLS encryption

# Establish a connection to the server
try:
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()  # Enable encryption
    server.login('tohannessbi@gmail.com', 'niro.ni.0687')  # Use your email and password here

    # Send the email
    server.send_message(msg)
    print("Email sent successfully!")

except Exception as e:
    print("Email failed to send:", str(e))

finally:
    server.quit()  # Close the connection
