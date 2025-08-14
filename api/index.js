const express = require("express");
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const response = await fetch('https://api.djomy.africa/server-ip');
        const data = await response.text();

        const lines = data.split('\n');
        const result = {
            serverIP: lines[0]?.replace('Server IP: ', ''),
            remoteIP: lines[1]?.replace('Remote: ', ''),
            allowed: lines[2]?.replace('Allowed: ', '') === '1'
        };

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch server IP' });
    }
});

app.post("/auth", async (req, res) => {
    try {
        const response = await fetch('https://api.djomy.africa/v1/auth', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'X-API-KEY': 'djomy-client-1753876876819-a180:e8ca1facfe8cd35a8b49181c9314cded9e9e4c6ce658b17c6a3d387e77c1fc0a',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({
                error: 'Authentication failed',
                status: response.status,
                details: errorText
            });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to authenticate with Djomy API',
            details: error.message
        });
    }
});

app.listen(3000, () => console.log("Server ready on port 3000"));

module.exports = app;