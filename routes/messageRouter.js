const express = require("express");
const messageRouter = express.Router();
const twilio = require("twilio");

const TWILIO_ACCOUNT_SID = "AC36807ccb35d4afb9cb64f6293a97989f";
const TWILIO_AUTH_TOKEN = "e46390595ae89fb2291617ec577c623f";
const TWILIO_PHONE_NUMBER = "whatsapp:+14155238886";
const TWILIO_DETINITION_NUMBER = "whatsapp:+923113177279";

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

messageRouter.use(express.json());

messageRouter.get("/message", (req, res) => {
  res.send("Message Router is running");
});

messageRouter.post("/send-message", (req, res) => {
  const { body } = req.body;

  client.messages
    .create({
      body: body,
      from: TWILIO_PHONE_NUMBER,
      to: TWILIO_DETINITION_NUMBER,
    })
    .then((message) => {
      console.log(
        `WhatsApp message sent from ${TWILIO_PHONE_NUMBER} to ${TWILIO_DETINITION_NUMBER} Message SID: ${message.sid}`
      );
      res.json({ status: "Message sent successfully", messageId: message.sid });
    })
    .catch((error) => {
      console.error("Error sending WhatsApp message:", error);
      res.status(500).json({ error: "Failed to send WhatsApp message" });
    });
});

module.exports = messageRouter;
