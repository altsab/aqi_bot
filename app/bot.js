const TelegramBot = require('node-telegram-bot-api');
process.env.NODE_ENV = "production";
const config = require('config');
const {
  stringify,
  beautifyData,
  getCityData,
} = require('./utils');

const getMap = require("./map.js")

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
  bot.sendMessage(id, stringify(msg), {
    disable_notification: true,
  });
});

bot.onText(/\/help/, (msg, [source, match]) => {
  const { id } = msg.chat;
  bot.sendMessage(id, 'Для обратной связи стучаться сюда: @altsab', {
    disable_notification: false,
  });
});

bot.onText(/\/aqinfo/, (msg, [source, match]) => {
  const { id } = msg.chat;
  bot.sendMessage(
    id,
    `
[Что такое AQI? short](http://telegra.ph/CHto-takoe-AQI-12-18)
[Что такое AQI? long](http://auagroup.kz/almaty-air/pokazateli-kachestva-vozdukha-iza.html)
[О частицах pm2.5 и почему они вредны для вас](https://airkaz.org/pm25.php)`,
    {
      disable_notification: false,
      parse_mode: 'Markdown',
    },
  );
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Choose a city', {
    reply_markup: {
      keyboard: [
        ['Astana', 'Almaty'],
        ['Karaganda', 'Temirtau'],
        ['Close', 'About'],
      ],
    },
  });
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const receivedMessage = msg.text;
  switch (receivedMessage) {
    case 'Astana':
      getCityData('Астана')
        .then(data => bot.sendMessage(chatId, beautifyData(data), { parse_mode: 'Markdown' }))
        .catch((err) => {
          console.error(err);
          bot.sendMessage(chatId, 'Error occured while fetching results');
        });
      break;
    case 'Almaty':
      getCityData('Алматы')
          .then(data => bot.sendMessage(chatId, beautifyData(data), { parse_mode: 'Markdown' }))
          .catch((err) => {
            console.error(err);
            bot.sendMessage(chatId, 'Error occured while fetching results');
          });
      break;
    case 'Karaganda':
      getCityData('Караганда')
          .then(data => bot.sendMessage(chatId, beautifyData(data), { parse_mode: 'Markdown' }))
          .catch((err) => {
            console.error(err);
            bot.sendMessage(chatId, 'Error occured while fetching results');
          });
      break;
    case 'Temirtau':
      getCityData('Темиртау')
          .then(data => bot.sendMessage(chatId, beautifyData(data), { parse_mode: 'Markdown' }))
          .catch((err) => {
            console.error(err);
            bot.sendMessage(chatId, 'Error occured while fetching results');
          });
      break;
    /*
    case 'Map':
      getMap()
          .then(fileName => bot.sendPhoto(chatId, fileName))
          .catch((err) => {
            console.error(err);
            bot.sendMessage(chatId, 'Error occured while fetching map');
          });
      break;
    */
    case 'Close':
      bot.sendMessage(chatId, 'Keyboard closed', {
        reply_markup: {
          remove_keyboard: true,
        },
        disable_notification: true,
      });
      break;
    case 'About':
      bot.sendMessage(
        chatId,
        `
[Что такое AQI? short](http://telegra.ph/CHto-takoe-AQI-12-18)
[Что такое AQI? long](http://auagroup.kz/almaty-air/pokazateli-kachestva-vozdukha-iza.html)
[О частицах pm2.5 и почему они вредны для вас](https://airkaz.org/pm25.php)`,
        {
          disable_notification: false,
          parse_mode: 'Markdown',
        },
      );
      break;
    default:
      bot.sendMessage(chatId, 'WAT?!');
      break;
  }
});

bot.on('callback_query', (query) => {
  // bot.sendMessage(query.message.chat.id, stringify(query));
  bot.answerCallbackQuery(query.id, query.data);
});
