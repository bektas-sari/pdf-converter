document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const messages = document.getElementById("messages");

  sendBtn.addEventListener("click", () => {
    const question = input.value.trim();
    if (!question) return;

    addMessage("You", question);
    input.value = "";
    simulateAiResponse(question);
  });

  function addMessage(sender, text) {
    const message = document.createElement("div");
    message.className = "message";
    message.innerHTML = `<strong>${sender}:</strong> ${text}`;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function simulateAiResponse(question) {
    // Burada gerçek AI entegrasyonu yapılabilir (OpenAI API gibi)
    setTimeout(() => {
      const mockAnswer = `🤖 This is a mock answer to your question: "${question}"`;
      addMessage("PDF Bot", mockAnswer);
    }, 1000);
  }
});
