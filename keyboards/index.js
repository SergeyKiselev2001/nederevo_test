const { STEP } = require("../scenarios/steps");

module.exports = {
  fillAgainKeyboard: (chatId) => ({
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Да", callback_data: `sendData-${chatId}` },
          { text: "Заполнить заново", callback_data: "fillAgain" },
        ],
      ],
    },
  }),
  shareNumberKeyboard: () => ({
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      resize_keyboard: true,
      keyboard: [[{ text: "Отправить мой номер", request_contact: true }]],
      one_time_keyboard: true,
    }),
  }),

  bigMainKeyboard: () => ({
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      resize_keyboard: true,
      keyboard: [
        [{ text: "Где мы находимся?" }],
        [{ text: "Познакомиться с направлениями" }],
        [{ text: "Записаться на пробное занятие" }],
      ],
      one_time_keyboard: true,
    }),
  }),


  smallOurDirectionsButton: () => ({
    reply_markup: {
      inline_keyboard: [
        [{ text: "Познакомиться с направлениями", callback_data: STEP.OUR_DIRECTIONS }],
      ],
    },
  }),

  smallRegistrationButton: () => ({
    reply_markup: {
      inline_keyboard: [
        [{ text: "Записаться на пробное занятие", callback_data: STEP.START_REGISTRATION }],
      ],
    },
  }),

  smallPreferWayToContactKeyboard: () => ({
    reply_markup: {
      inline_keyboard: [
        [{ text: "Звонок по телефону", callback_data: "PHONE_CALL" }, { text: "Сообщение в WhatsApp", callback_data: "WHATS_APP" }],
      ],
    },
  }),


  bigAllDirectionsKeyboard: () => ({
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
      resize_keyboard: true,
      keyboard: [
        [{ text: "Йога"  }, { text: "Растяжка" }],
        [{ text: "Аэро - занятие в гамаках"  }, { text: "Здоровая спина"  }],
        [{ text: "МФР тренировка", callback_data: STEP.MFR_TRAINING  }, { text: "Пилатес" }],
        [{ text: "Записаться на пробное занятие", callback_data: STEP.START_REGISTRATION  }],
      ],
      one_time_keyboard: true,
    }),
  }),
};
