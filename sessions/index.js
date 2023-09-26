const { remindHandler, tryCatch } = require("../utils");

module.exports = {
  sessions: [],
  clearSessionById(id) {
    tryCatch(() => {
      console.log();
      console.log("ВЫЗОВ clearSessionById", module.exports.sessions, id);
  
      clearTimeout(
        module.exports.sessions.find((session) => session.chatId == id)?.timerId
      );
      module.exports.sessions = module.exports.sessions.filter(
        (session) => session.chatId != id
      );
  
      console.log("ОЧИЩЕНА СЕССИЯ С ID", id);
      console.log("ТЕКУЩИЕ СЕССИИ", module.exports.sessions);
  
      return;
    })

  },
  getSessions: () => module.exports.sessions,
  createSession: (chatId, bot) => {
    module.exports.sessions.push({
      chatId,
      step: 0,
      name: "",
      phone: "",
      time_to_contact: "",
      timerId: remindHandler(chatId, "Вы не указали имя =(", 5000, bot),
    });

    return;
  },
};
