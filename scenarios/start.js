const { clearSessionById } = require("../sessions");
const { tryCatch } = require("../utils");

module.exports = {
  start: async (bot, chatId) => {
    tryCatch(async () => {
      clearSessionById(chatId);
      await bot.sendMessage(
        chatId,
        "Добро пожаловать в студию расстяжки NEDEREVO!"
      );
  
      await bot.sendPhoto(
        chatId,
        "https://sun9-64.userapi.com/impg/ac3-4sqM5rJRd6kk21tWnVY3odzZ65D3rUDWsQ/64jAj8TsBoE.jpg?size=1280x1280&quality=95&sign=f6e02cb5682c975d89df37a6d4d586ad&type=album"
      );
  
      setTimeout(() => {
        bot.sendMessage(chatId, "У нас вы найдёте...");
      }, 500);
  

  
      setTimeout(() => {
        bot.sendMessage(chatId, "А ещё у нас есть...", {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Записаться на занятие", callback_data: "registration" }],
            ],
          },
        });
      }, 1000);
    })
   
  },
};
