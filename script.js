const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const usernameInput = document.getElementById("username");
const clearBtn = document.getElementById("clear-btn");

// Load messages
let messages = JSON.parse(localStorage.getItem("messages")) || [];

// Render saved messages
messages.forEach(msg => {
  renderMessage(msg.user, msg.text);
});

// SEND BUTTON
sendBtn.addEventListener("click", sendMessage);

// ENTER KEY
messageInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// CLEAR CHAT
clearBtn.addEventListener("click", function () {
  localStorage.removeItem("messages");
  chatBox.innerHTML = "";
  messages = [];
});

// SEND MESSAGE FUNCTION
function sendMessage() {
  const text = messageInput.value.trim();
  const user = usernameInput.value.trim();

  if (user === "" || text === "") {
    alert("Please enter username and message");
    return;
  }

  const message = { user, text };
  messages.push(message);
  localStorage.setItem("messages", JSON.stringify(messages));

  renderMessage(user, text);
  messageInput.value = "";
}

// RENDER MESSAGE
function renderMessage(user, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");

  if (user === usernameInput.value.trim()) {
    msgDiv.classList.add("right");
  } else {
    msgDiv.classList.add("left");
  }

  msgDiv.textContent = `${user}: ${text}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
