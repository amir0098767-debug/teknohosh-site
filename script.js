function toggleMode() {
  document.body.classList.toggle('day-mode');
  document.body.classList.toggle('night-mode');
  const btn = document.querySelector(".mode-toggle");
  btn.textContent = document.body.classList.contains("night-mode") ? "☀️" : "🌙";
}

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function scrollToAI() {
  document.getElementById("aiSection").scrollIntoView({ behavior: "smooth" });
}

async function askAI() {
  const prompt = document.getElementById("prompt").value;
  const responseBox = document.getElementById("response");
  responseBox.textContent = "در حال پردازش...";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "پاسخی دریافت نشد.";
    responseBox.textContent = reply;
  } catch (err) {
    responseBox.textContent = "خطا در ارتباط با سرور یا کلید API.";
  }
}
