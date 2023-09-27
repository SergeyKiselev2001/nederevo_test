FROM node:17

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --omit=dev

# копируем исходный код
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]