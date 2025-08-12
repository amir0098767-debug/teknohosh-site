// فایل server.js
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: userMessage }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("خطا:", err);
    res.status(500).json({ reply: "خطا در دریافت پاسخ از هوش مصنوعی." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`سایت در حال اجرا روی پورت ${PORT}`));
