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
      keyboard: [
        [{  text: "Отправить мой номер", request_contact: true }],
      ],
      one_time_keyboard: true,
    }),
  }),
};
