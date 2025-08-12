function toggleMenu() {
  document.querySelector('.menu').classList.toggle('active');
}

async function sendMessage() {
  const input = document.getElementById('user-input').value;
  const chatBox = document.getElementById('chat-box');
  if (!input) return;

  chatBox.innerHTML += `<div class="user-msg">${input}</div>`;
  document.getElementById('user-input').value = '';

  try {
    const response = await fetch('https://your-api.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await response.json();
    chatBox.innerHTML += `<div class="ai-msg">${data.reply}</div>`;
  } catch (error) {
    chatBox.innerHTML += `<div class="ai-msg">خطا در دریافت پاسخ</div>`;
  }
}
