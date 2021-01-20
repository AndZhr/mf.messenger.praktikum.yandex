# Базовый слой
FROM node:13 

# Копируем всё что нужно из локальной папки в образ
COPY src /src
COPY static /static
COPY server /server
COPY package.json /
COPY package-lock.json /
COPY tsconfig.json /
COPY webpack.config.js /

# Устанавливаем зависимости, в образе появится /node_modules
RUN npm install && npm run build

# При старте контейнер начнёт общаться через 80 порт
EXPOSE 80

# При старте контейнер выполнит эту команду – запустит наше приложение
CMD node server/index.js