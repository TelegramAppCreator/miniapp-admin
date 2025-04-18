const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// 🔑 Token du bot Telegram (remplace par le tien)
const token = '7450099526:AAF_6tzDY958H7fbq9PXiSUlByUhx9K3s2M';

// 📋 Liste des administrateurs autorisés (chat IDs)
const admins = [8064413082, 7269042628, ];

// 📁 Fichier JSON où sont stockés les plugs
const dataPath = path.join(__dirname, '../data/channels.json');

// 🧠 Fonctions utilitaires pour lire et écrire le fichier
function readData() {
  if (!fs.existsSync(dataPath)) return { channels: [] };
  const raw = fs.readFileSync(dataPath);
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// 🤖 Lancer le bot
const bot = new TelegramBot(token, { polling: true });

// 👋 Commande /start : ouvre directement la mini app
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const webAppUrl = 'https://miniapp-admin.vercel.app'; // ← Remplace par ton URL Vercel

  bot.sendMessage(chatId, "Clique ci-dessous pour ouvrir le catalogue 👇", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📂 Ouvrir le catalogue",
            web_app: { url: webAppUrl }
          }
        ]
      ]
    }
  });
});


// 🔐 Commande /admin (admin only)
bot.onText(/\/admin/, (msg) => {
  const chatId = msg.chat.id;
  if (!admins.includes(chatId)) return bot.sendMessage(chatId, "⛔ Accès refusé.");
  bot.sendMessage(chatId, "✅ Bienvenue dans le panneau d’administration.");
});

// ➕ Commande /ajouterplug nom | description | lien | contact
bot.onText(/\/ajouterplug (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  if (!admins.includes(chatId)) return bot.sendMessage(chatId, "⛔ Accès refusé.");

  const input = match[1].split('|').map(s => s.trim());

  if (input.length < 4) {
    return bot.sendMessage(chatId, "❗ Format incorrect.\nUtilise :\n/ajouterplug Nom | Description | Lien | Contact");
  }

  const [name, description, link, contact] = input;
  const db = readData();

  const newPlug = {
    id: Date.now(),
    name,
    description,
    link,
    contact
  };

  db.channels.push(newPlug);
  writeData(db);

  bot.sendMessage(chatId, `✅ Plug ajouté :\n\n📌 ${name}\n📝 ${description}\n🔗 ${link}\n👤 ${contact}`);
});

// ➖ Commande /supprimerplug ID
bot.onText(/\/supprimerplug (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  if (!admins.includes(chatId)) return bot.sendMessage(chatId, "⛔ Accès refusé.");

  const plugId = parseInt(match[1], 10);
  const db = readData();

  const found = db.channels.find(p => p.id === plugId);
  if (!found) return bot.sendMessage(chatId, "❌ Aucun plug trouvé avec cet ID.");

  db.channels = db.channels.filter(p => p.id !== plugId);
  writeData(db);

  bot.sendMessage(chatId, `🗑️ Plug supprimé : ${found.name}`);
});

// 🪪 Logger tous les messages pour dev
bot.on('message', (msg) => {
  console.log(`Message de ${msg.chat.username || msg.chat.id}: ${msg.text}`);
});
