const TelegramBot = require('node-telegram-bot-api');
const config = require('config');
const {
  stringify,
  getAllData,
  getAlmData,
  getAstData,
  getKrgData,
  getTmrtData,
} = require('./utils');

const TOKEN = config.get('bot.token');
const bot = new TelegramBot(TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    },
  },
});

bot.onText(/\/debug (.+)/, (msg, [source, match]) => {
  const { id } = msg.chat;
  console.log('Sending debug message');
  bot.sendMessage(id, stringify(msg), {
    disable_notification: true,
  });
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Choose a city', {
    reply_markup: {
      keyboard: [
        ['Astana', 'Almaty'],
        ['Karaganda', 'Temirtau'],
        ['Close'],
      ],
      one_time_keyboard: true,
    },
  });
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const receivedMessage = msg.text;
  switch (receivedMessage) {
    case 'Astana':
      bot.sendMessage(chatId, 'Results for Astana');
      break;
    case 'Almaty':
      bot.sendMessage(chatId, 'Results for Almaty');
      break;
    case 'Karaganda':
      bot.sendMessage(chatId, 'Results for Karaganda');
      break;
    case 'Temirtau':
      bot.sendMessage(chatId, 'Results for Temirtau');
      break;
    case 'Close':
      bot.sendMessage(chatId, 'Closing keyboard', {
        reply_markup: {
          remove_keyboard: true,
        },
      });
      break;
    case '/start':
      break;
    default:
      bot.sendMessage(chatId, 'No such city in database');
  }
});
