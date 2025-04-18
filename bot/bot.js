const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Ton token de bot Telegram
const token = '7450099526:AAF_6tzDY958H7fbq9PXiSUlByUhx9K3s2M';
const bot = new TelegramBot(token, { polling: true });

// Gérer le message '/start'
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Accéder à l'Admin WebApp",
            web_app: { url: 'https://ton-app.vercel.app' }
          }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, "Cliquez pour accéder à l'admin", options);
});

// Gérer la commande '/addcard' pour ajouter une carte
bot.onText(/\/addcard/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    // Envoi d'une requête POST à ton API Next.js pour ajouter une carte
    const response = await axios.post('https://ton-app.vercel.app/api/cards', {
      name: 'Nouvelle Carte',
      description: 'Détails de la carte'
    });

    bot.sendMessage(chatId, 'Carte ajoutée avec succès!');
  } catch (error) {
    bot.sendMessage(chatId, 'Une erreur est survenue. Essayez encore.');
  }
});
