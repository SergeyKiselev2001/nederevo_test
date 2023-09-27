const { bot } = require("../bot");
const { CHATS } = require("../secret");

module.exports = {
  remindHandler: (chatId, number, session, clearSession) => {
    if (number == 1) {
      return setTimeout(() => {
        bot.sendMessage(
          chatId,
          "Вы молодец, выбрали направление, осталось записаться на занятие"
        );
      }, 10000);
    }

    if (number == 2) {
      return setTimeout(() => {
        bot.sendMessage(
          chatId,
          `Вы почти у цели!

Оставьте заявку и получите бесплатное занятие уже через 5 минут`
        );
      }, 20000);
    }

    if (number == 3) {
      return setTimeout(() => {
        bot.sendMessage(
          chatId,
          "Оставьте свой номер телефона, так мы сможем быстрее познакомиться и записать вас на занятие"
        );
      }, 30000);
    }

    if (number == 4) {
      return setTimeout(() => {
        clearSession()
        bot.sendMessage(
          CHATS.MAIN,
          `Клиент не дошёл до конца

Шаг: ${session.step}
Имя: ${session.name}
Телефон: ${session.phone}

Автоматически собранная информация: ${JSON.stringify(session.from)}
`,
          {
            message_thread_id: CHATS.STATS,
          }
        );
      }, 40000);
    }
  },
  tryCatch: (callback) => {
    try {
      callback();
    } catch (e) {
      bot.sendMessage(
        CHATS.MAIN,
        `Произошла ошибка 👀 - ${e} - ${JSON.stringify(e)}`,
        {
          message_thread_id: CHATS.LOGS,
        }
      );
    }
  },
};
