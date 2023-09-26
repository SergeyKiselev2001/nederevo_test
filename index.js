const { start } = require("./scenarios/start");
const { registration, fillAgain, sendData } = require("./scenarios/form");
const { fillAgainKeyboard, shareNumberKeyboard } = require("./keyboards/index");
const { remindHandler, tryCatch } = require("./utils");
const { getSessions } = require("./sessions");
const { bot } = require("./bot");

bot.setMyCommands([{ command: "/start", description: "Начать" }]);

bot.on("message", async (msg) => {
  console.log(msg)
  tryCatch(async () => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text == "/start") {
      start(bot, chatId);
    }

    const session = getSessions().find((session) => session.chatId == chatId);

    if (session) {
      if (session.step == 0) {
        session.name = text;
        clearTimeout(session.timerId);
        session.timerId = remindHandler(
          chatId,
          "Вы не указали телефон =(",
          7000,
          bot
        );
        session.step = 1;

        await bot.sendMessage(chatId, "Введите номер телефона", shareNumberKeyboard());
        return;
      }

      if (session.step == 1) {
        console.log("STEP 1", msg)
        session.phone = text || msg.contact.phone_number;
        session.step = 2;

        clearTimeout(session.timerId);
        session.timerId = remindHandler(
          chatId,
          "Скажите, когда с вами связаться? =(",
          7000,
          bot
        );

        await bot.sendMessage(chatId, "Когда с вами удобнее связаться?");
        return;
      }

      if (session.step == 2) {
        session.time_to_contact = text;
        session.step = 3;
        clearTimeout(session.timerId);
        session.timerId = remindHandler(
          chatId,
          "Отправить форму или создать новую?",
          7000,
          bot
        );

        await bot.sendMessage(
          chatId,
          `Имя: ${session.name}
Телефон: ${session.phone}
Время для связи: ${session.time_to_contact}
  
Отправить?`,
          fillAgainKeyboard(session.chatId)
        );

        return;
      }
    }
  });
});

bot.on("callback_query", async (msg) => {
  tryCatch(async () => {
    const queryParam = msg.data;
    const chatId = msg.message.chat.id;

    if (queryParam == "registration") {
      console.log("НОВАЯ РЕГИСТРАЦИЯ");
      console.log("ТЕКУЩИЕ СЕССИИ", getSessions());
      registration(bot, chatId);
      return;
    }

    if (queryParam == "fillAgain") {
      fillAgain(bot, chatId);
      return;
    }

    if (queryParam.includes("sendData")) {
      console.log("ОТПРАВКА ДАННЫХ");
      console.log("ТЕКУЩИЕ СЕССИИ", getSessions());
      sendData(bot, chatId, queryParam);
      return;
    }
  });
});
