export default function handler(req, res) {
    const scope = "user-read-private user-read-email";
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=${encodeURIComponent(scope)}`;
    res.redirect(authUrl);
}