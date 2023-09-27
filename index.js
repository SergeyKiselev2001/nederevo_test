const { tryCatch } = require("./utils");
const { setSessionStep, getSessionByChatID, createSession } = require("./sessions");
const { bot } = require("./bot");
const {
  step_whereWeAre,
  step_start,
  step_ourDirections,
  step_yoga,
  step_rastyajka,
  step_aero,
  step_healthySpine,
  step_mfr,
  step_pilates,
  step_registration,
  step_requestPhone,
  step_preferWayToContact,
  step_end,
} = require("./scenarios");
const { STEP } = require("./scenarios/steps");
const { CHATS } = require("./secret");

bot.setMyCommands([{ command: "/start", description: "Начать" }]);

console.log("STARTED")

bot.on("message", (msg) => {
  console.log("MESSAGE RECEIVED")
  tryCatch(() => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (chatId == CHATS.MAIN) {
      return;
    }

    if (text == "/start") {
      step_start(chatId, msg.from);
      setSessionStep(chatId, STEP.START);
      return;
    }

    if (!getSessionByChatID(chatId)) {
      step_start(chatId, msg.from);
      setSessionStep(chatId, STEP.START);
      return;
    }

    const session = getSessionByChatID(chatId);

    if (text == "Йога") {
      setSessionStep(chatId, STEP.YOGA);
      step_yoga(chatId);
      return;
    }

    if (text == "Растяжка") {
      setSessionStep(chatId, STEP.RASTYAJKA);
      step_rastyajka(chatId);
      return;
    }
    if (text == "Аэро - занятие в гамаках") {
      setSessionStep(chatId, STEP.AERO);
      step_aero(chatId);
      return;
    }
    if (text == "Здоровая спина") {
      setSessionStep(chatId, STEP.HEALTHY_SPINE);
      step_healthySpine(chatId);
      return;
    }
    if (text == "МФР тренировка") {
      setSessionStep(chatId, STEP.MFR_TRAINING);
      step_mfr(chatId);
      return;
    }
    if (text == "Пилатес") {
      setSessionStep(chatId, STEP.PILATES);
      step_pilates(chatId);
      return;
    }

    if (text == "Записаться на пробное занятие") {
      setSessionStep(chatId, STEP.START_REGISTRATION);
      step_registration(chatId);
      return;
    }

    if (text == "Где мы находимся?") {
      setSessionStep(chatId, STEP.WHERE_WE_ARE);
      step_whereWeAre(chatId);
      return;
    }

    if (text == "Познакомиться с направлениями") {
      setSessionStep(chatId, STEP.OUR_DIRECTIONS);
      step_ourDirections(chatId);
      return;
    }

    if (text == "Записаться на пробное занятие") {
      setSessionStep(chatId, STEP.START_REGISTRATION);
      step_registration(chatId);
      return;
    }

    if (session.step == STEP.REQUEST_PHONE) {
      getSessionByChatID(chatId).name = text;
      step_requestPhone(chatId);
      return;
    }

    if (session.step == STEP.PREFER_WAY_TO_CONTACT) {
      getSessionByChatID(chatId).phone =
        text ||
        msg.contact.phone_number ||
        bot.sendMessage(
          CHATS.MAIN,
          `Ошибка с номером телефона ${JSON.stringify(msg)} `,
          { message_thread_id: CHATS.LOGS }
        );
      step_preferWayToContact(chatId);
      return;
    }

    if (session.step == STEP.END) {
      getSessionByChatID(chatId).preferWayToContact = text;
      step_end(chatId, msg);
      return;
    }
  });
});

bot.on("callback_query", (msg) => {
  tryCatch(() => {
    const queryParam = msg.data;
    const chatId = msg.message.chat.id;

    if (!getSessionByChatID(chatId)) {
      step_start(chatId);
      setSessionStep(chatId, STEP.START);
      return;
    }

    if (queryParam == STEP.OUR_DIRECTIONS) {
      setSessionStep(chatId, STEP.OUR_DIRECTIONS);
      step_ourDirections(chatId);
      return;
    }

    if (queryParam == STEP.START_REGISTRATION) {
      setSessionStep(chatId, STEP.START_REGISTRATION);
      step_registration(chatId);
      return;
    }

    if (queryParam == "PHONE_CALL") {
      getSessionByChatID(chatId).preferWayToContact = "Телефонный звонок";
      setSessionStep(chatId, STEP.END);
      step_end(chatId, msg);
      return;
    }

    if (queryParam == "WHATS_APP") {
      getSessionByChatID(chatId).preferWayToContact = "WhatsApp";
      setSessionStep(chatId, STEP.END);
      step_end(chatId, msg);
      return;
    }
  });

  return;
});
