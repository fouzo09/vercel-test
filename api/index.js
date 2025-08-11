const express = require("express");
const app = express();

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

app.listen(3000, () => console.log("Server ready on port 3000"));

module.exports = app;