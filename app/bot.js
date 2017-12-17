const TelegramBot = require('node-telegram-bot-api');
const config = require('config');
const utils = require('./utils');

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

bot.on('message', (msg) => {
  const { id } = msg.chat;
  bot.sendMessage(id, utils.debug(msg));
});
