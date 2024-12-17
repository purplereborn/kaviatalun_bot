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

// Event handler untuk menerima pesan
bot.on("message", (msg) => {
  const chatId = msg.chat.id; // ID chat pengguna
  const text = msg.text; // Teks yang dikirim oleh pengguna

  console.log(`Pesan dari ${chatId}: ${text}`);

  // Menangani perintah "/start" dan langsung menampilkan menu
  if (text === "/start") {
    bot.sendMessage(chatId, "Selamat datang!");

    // Menampilkan custom keyboard langsung setelah inline keyboard
    bot.sendMessage(chatId, "Silahkan gunakan tombol menu di bawah", {
      reply_markup: {
        keyboard: [["📜 Menu 1", "🚀 Menu 2"], ["ℹ️ Info"]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }
  // Menangani input lain dari custom keyboard
  else {
    switch (text) {
      case "📜 Menu 1":
        bot.sendMessage(chatId, "Kamu memilih Menu 1 🎉");
        break;
      case "🚀 Menu 2":
        bot.sendMessage(chatId, "Kamu memilih Menu 2 🚀");
        break;
      case "ℹ️ Info":
        bot.sendMessage(
          chatId,
          "Ini adalah bot dengan fitur menu interaktif. 😊"
        );
        break;
      default:
        bot.sendMessage(chatId, `Halo! Kamu mengirim: "${text}"`);
    }
  }
});

// Event handler untuk menangani callback data dari inline keyboard
bot.on("callback_query", (callbackQuery) => {
  const message = callbackQuery.message;
  const data = callbackQuery.data;

  let response = "";

  // Menentukan respons berdasarkan callback_data
  switch (data) {
    case "menu1":
      response = "Kamu memilih Menu 1 🎉";
      break;
    case "menu2":
      response = "Kamu memilih Menu 2 🚀";
      break;
    case "info":
      response = "Ini adalah bot dengan fitur menu interaktif. 😊";
      break;
    default:
      response = "Menu tidak dikenal.";
  }

  // Kirim pesan respons
  bot.sendMessage(message.chat.id, response);
});

// Jalankan server Express.js
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
