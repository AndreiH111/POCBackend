// api/noAuthentication.js
import express from "express";

const app = express();

app.get("/noAuth", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});

export default app;
