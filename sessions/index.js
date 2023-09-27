const { STEP } = require("../scenarios/steps");
const { remindHandler, tryCatch } = require("../utils");

// interface ISession {
//   chatId: Number,
//   from: any
//   step: STEP,
//   name: String,
//   phone: String,
//   preferWayToContact: "WHATS_UP" | "PHONE_CALL",
//   reminder_1: Timeout
//   reminder_2: Timeout
//   reminder_3: Timeout
//   reminder_4: Timeout
// }

module.exports = {
  sessions: [],
  setSessionStep: (chatId, step) => {
    module.exports.sessions = module.exports.sessions.map((session) => {
      if (session.chatId == chatId) {
        clearTimeout(session.reminder_1);
        clearTimeout(session.reminder_2);
        clearTimeout(session.reminder_3);
        clearTimeout(session.reminder_4);

        return {
          ...session,
          reminder_1: remindHandler(chatId, 1),
          reminder_2: remindHandler(chatId, 2),
          reminder_3: remindHandler(chatId, 3, session),
          reminder_4: remindHandler(chatId, 4, session, () =>
            module.exports.clearSessionById(chatId)
          ),
          step,
        };
      } else {
        return step;
      }
    });
    return;
  },
  clearSessionById(chatId) {
    tryCatch(() => {
      const session = module.exports.getSessionByChatID(chatId);

      clearTimeout(session.reminder_1);
      clearTimeout(session.reminder_2);
      clearTimeout(session.reminder_3);
      clearTimeout(session.reminder_4);

      module.exports.sessions = module.exports.sessions.filter(
        (session) => session.chatId != chatId
      );
      return;
    });
  },
  getSessions: () => module.exports.sessions,
  getSessionByChatID: (chatId) =>
    module.exports.sessions.find((session) => session.chatId == chatId) ||
    false,
  createSession: (chatId, from) => {
    module.exports.sessions.push({
      chatId,
      from,
      step: STEP.START,
      name: "",
      phone: null,
      preferWayToContact: "",
      reminder_1: remindHandler(chatId, 1),
      reminder_2: remindHandler(chatId, 2),
      reminder_3: remindHandler(chatId, 3),
      reminder_4: remindHandler(chatId, 4, { from }, () =>
        module.exports.clearSessionById(chatId)
      ),
    });

    return;
  },
};
