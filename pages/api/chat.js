import chatWithGPT from "@/library/ChatGPT";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        console.log("✅ Received request:", req.body);
        const userMessage = req.body.message;

        if (!userMessage) {
            console.error("❌ Error: No message received.");
            return res.status(400).json({ error: "Message is required" });
        }

        const botResponse = await chatWithGPT(userMessage);

        console.log("✅ OpenAI Response:", botResponse);
        res.json({ response: botResponse });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}

// Set up for debugging.