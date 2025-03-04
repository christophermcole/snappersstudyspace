import axios from "axios";

export default async function handler(req, res) {
    const code = req.query.code || null;

    if (!code) {
        return res.status(400).json({ error: "No code provided" });
    }

    try {
        const response = await axios.post("https://accounts.spotify.com/api/token", new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET
        }), { headers: { "Content-Type": "application/x-www-form-urlencoded" } });

        res.redirect(`/spotify?token=${response.data.access_token}`);
    } catch (error) {
        console.error("Error fetching Spotify token:", error);
        res.status(500).json({ error: "Failed to get access token" });
    }
}
