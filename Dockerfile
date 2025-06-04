# Базовый образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем проект
COPY . .

# Установка зависимостей и сборка фронта
WORKDIR /app/client
RUN npm install && npm run build

# Установка зависимостей сервера
WORKDIR /app/server
RUN npm install

# Открываем порт
EXPOSE 3000

# Запускаем сервер
CMD ["npm", "run", "start"]
