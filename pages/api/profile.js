import axios from "axios";

export default async function handler(req, res) {
    const token = req.query.token;

    if (!token) {
        return res.status(400).json({ error: "Missing token" });
    }

    try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${token}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profile" });
    }
}
