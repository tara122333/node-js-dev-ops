const express = require("express");
const app = express();
const port = 3000;

app.get("/api", (req, res) => {
  res.send("Hello, World! is this working?");
});

app.get("/api/repos/:username", async (req, res) => {
  const username = req.params.username;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  console.log(`Fetching repos for user: ${username}`);

  const response = await fetch("https://api.github.com/users/" + username);
  const data = await response.json();

  res.status(200).json(data);
});

async function start() {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error("Error starting the server:", err);
});
