const { bot } = require("../bot");

module.exports = {
  remindHandler: (chatId, text, ms, bot) => {
    return setTimeout(() => {
      bot.sendMessage(chatId, text);
    }, ms);
  },
  tryCatch: (callback) => {
    try {
      callback();
    } catch (e) {
      bot.sendMessage(-1001905297254, `Произошла ошибка 👀 - ${e} - ${JSON.stringify(e)}`);
      bot.sendMessage(794545357, `error - ${e} - ${JSON.stringify(e)}`);
    }
  },
};
