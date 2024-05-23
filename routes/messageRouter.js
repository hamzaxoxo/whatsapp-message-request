const express = require("express");
const messageRouter = express.Router();
const twilio = require("twilio");

const TWILIO_ACCOUNT_SID = "AC36807ccb35d4afb9cb64f6293a97989f";
const TWILIO_AUTH_TOKEN = "56c2682cbbe007ce6c9c35a0ff171b63";
const TWILIO_PHONE_NUMBER = "whatsapp:+14155238886";
const WHATSAPP_NUMBER = "whatsapp:+923113177279";
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Middleware for parsing JSON bodies
messageRouter.use(express.json());

messageRouter.get("/message", (req, res) => {
  res.send("Message Router is running");
});

messageRouter.post("/send-message", (req, res) => {
  const { body, to } = req.body;

  client.messages
    .create({
      body: body,
      from: TWILIO_PHONE_NUMBER,
      to: to, 
    })
    .then((message) => {
      console.log(
        `WhatsApp message sent from ${TWILIO_PHONE_NUMBER} to ${to}. Message SID: ${message.sid}`
      );
      res.json({ status: "Message sent successfully", messageId: message.sid });
    })
    .catch((error) => {
      console.error("Error sending WhatsApp message:", error);
      res.status(500).json({ error: "Failed to send WhatsApp message" });
    });
});

module.exports = messageRouter;
