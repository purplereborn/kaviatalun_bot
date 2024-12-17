const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = 3000;

// Token dari BotFather
const BOT_TOKEN = "7757338079:AAFKHgLCmegoty5-LYguqJOYafFv_3DLZ1E";

// Inisialisasi bot Telegram
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Middleware (opsional)
app.use(express.json());

// Route untuk tes server
app.get("/", (req, res) => {
  res.json("Server is running well!");
});

// Fungsi untuk menampilkan custom keyboard (menu)
function sendMenu(chatId) {
  bot.sendMessage(chatId, "Silahkan gunakan tombol menu di bawah 👇", {
    reply_markup: {
      keyboard: [["📜 Menu 1", "🚀 Menu 2"], ["ℹ️ Info"]],
      resize_keyboard: true, // Ukuran keyboard menyesuaikan
    },
  });
}

// Event handler untuk menerima pesan
bot.on("message", (msg) => {
  const chatId = msg.chat.id; // ID chat pengguna
  const text = msg.text; // Teks yang dikirim oleh pengguna

  console.log(`Pesan dari ${chatId}: ${text}`);

  // Menangani perintah "/start"
  if (text === "/start") {
    bot.sendMessage(chatId, "Selamat datang!");
    sendMenu(chatId); // Tampilkan menu
  } else {
    // Menangani input dari custom keyboard
    switch (text) {
      case "📜 Menu 1":
        bot.sendMessage(chatId, "Kamu memilih Menu 1 🎉");
        sendMenu(chatId); // Tampilkan kembali menu
        break;
      case "🚀 Menu 2":
        bot.sendMessage(chatId, "Kamu memilih Menu 2 🚀");
        sendMenu(chatId); // Tampilkan kembali menu
        break;
      case "ℹ️ Info":
        bot.sendMessage(
          chatId,
          "Ini adalah bot dengan fitur menu interaktif. 😊"
        );
        sendMenu(chatId); // Tampilkan kembali menu
        break;
      default:
        bot.sendMessage(chatId, `Halo! Kamu mengirim: "${text}"`);
        sendMenu(chatId); // Tampilkan kembali menu
    }
  }
});

// Jalankan server Express.js
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
