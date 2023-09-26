const { admins } = require("../secret");
const { clearSessionById, getSessions, createSession } = require("../sessions");
const { tryCatch } = require("../utils");

module.exports = {
  registration: (bot, chatId) => {
    tryCatch(() => {
      createSession(chatId, bot);

      bot.sendMessage(chatId, "Введите ваше имя");
    });
  },
  fillAgain: (bot, chatId) => {
    tryCatch(() => {
      clearSessionById(chatId);
      createSession(chatId, bot);

      bot.sendMessage(chatId, "Введите ваше имя");
    });
  },
  sendData: (bot, chatId, queryParam) => {
    tryCatch(() => {
      const sessionChatId = queryParam.split("-")[1];

      const thisSession = getSessions().find(
        (session) => session.chatId == sessionChatId
      );
  
      console.log("ВХОД В sendData", thisSession);
  
      if (thisSession) {
        const { name, phone, time_to_contact } = thisSession;
  
        console.log("СЕССИИ ПЕРЕД УДАЛЕНИЕМ", getSessions());
        clearSessionById(sessionChatId);
  
        bot.sendMessage(chatId, "Заявка отправлена, спасибо!");
  
        admins.forEach((admin) => {
          bot.sendMessage(
            admin.chatId,
            `Новая Заявка 🤩!
          
Имя - ${name}
Телефон - ${phone}
Время для связи - ${time_to_contact}`
          );
        });
  
        return;
      }
    })
  
  },
};
