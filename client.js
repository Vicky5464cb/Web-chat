const socket = io();

let myUsername = "";

const joinScreen = document.getElementById("join-screen");
const chatScreen = document.getElementById("chat-screen");
const usernameInput = document.getElementById("username-input");
const joinBtn = document.getElementById("join-btn");

const messagesEl = document.getElementById("messages");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const userListEl = document.getElementById("user-list");
const typingIndicator = document.getElementById("typing-indicator");

// Join chat
function joinChat() {
  const name = usernameInput.value.trim();
  if (!name) return;
  myUsername = name;
  socket.emit("join", name);
  joinScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
  messageInput.focus();
}

joinBtn.addEventListener("click", joinChat);
usernameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") joinChat();
});

// Send message
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;
  socket.emit("chat-message", text);
  messageInput.value = "";
});

// Typing indicator (debounced-ish)
let typingTimeout;
messageInput.addEventListener("input", () => {
  socket.emit("typing");
  clearTimeout(typingTimeout);
});

socket.on("typing", (username) => {
  typingIndicator.textContent = `${username} is typing...`;
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    typingIndicator.textContent = "";
  }, 1500);
});

// Receive chat message
socket.on("chat-message", (data) => {
  const div = document.createElement("div");
  div.classList.add("message");
  if (data.username === myUsername) div.classList.add("own");

  div.innerHTML = `
    <div class="meta">${escapeHtml(data.username)} · ${data.time}</div>
    <div class="text">${escapeHtml(data.text)}</div>
  `;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
});

// System messages (join/leave)
socket.on("system-message", (text) => {
  const div = document.createElement("div");
  div.classList.add("system-message");
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
});

// Update user list
socket.on("user-list", (users) => {
  userListEl.innerHTML = "";
  users.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = u;
    userListEl.appendChild(li);
  });
});

// Basic HTML escaping to prevent injection in messages
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
