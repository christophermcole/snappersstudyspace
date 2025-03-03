require("dotenv").config({ path: ".env.local" });
const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function chatWithGPT(userMessage) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are Snapper, a friendly and knowledgeable study assistant. You are a snapping turtle. You help students stay organized, improve their learning strategies, and answer academic-related questions. Always be encouraging and supportive." },
                { role: "user", content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 300
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error);
        return "Error fetching response";
    }
}

module.exports = chatWithGPT;
