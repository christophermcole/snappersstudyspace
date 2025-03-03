require("dotenv").config({ path: ".env.local" });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const chatWithGPT = require("./pages/api/ChatGPT"); 

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());

app.post("/Chat", async (req, res) => {
    try {
        console.log("✅ Received request:", req.body);

        const userMessage = req.body.message;
        if (!userMessage) {
            console.error("❌ Error: No message received in request.");
            return res.status(400).json({ error: "Message is required" });
        }

        // Call the chat function (already set to "gpt-3.5-turbo")
        const botResponse = await chatWithGPT(userMessage);

        console.log("✅ OpenAI Response:", botResponse);
        res.json({ response: botResponse });

    } catch (error) {
        console.error("❌ Error processing response:", error);
        res.status(500).json({ error: "Error processing response" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
