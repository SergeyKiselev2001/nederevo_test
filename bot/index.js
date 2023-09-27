const TelegramBot = require("node-telegram-bot-api");
const { token } = require("../secret/index");

const bot = new TelegramBot(token, { polling: true });

module.exports = {
  bot,
};
