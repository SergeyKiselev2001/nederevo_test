const TelegramBot = require("node-telegram-bot-api");
const { token } = require("../secret");

const bot = new TelegramBot(token, { polling: true });

module.exports = {
  bot,
};
