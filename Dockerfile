# На базе Ubuntu
FROM ubuntu:21.04

# Не взаимодействовать с пользователем (установки и сборки без вопросов от Ubuntu)
ARG DEBIAN_FRONTEND=noninteractive

# Временная зона
ENV TZ=Europe/Moscow

# Установка node.js. RUN запускается на этапе сборки контейнера
RUN apt update && apt install -y nodejs && apt install -y npm

# WORKDIR команда cd внутри контейнера при сборке и запуске
WORKDIR /var/www

# Копировать файл index.js в контейнер в /var/www/index.js (в эту дерикторию перешли выше)
COPY ./index.js index.js

# Информация что контейнер использует 3000 порт
EXPOSE 3000

# Вывод версии node и запуск node приложения
CMD node -v && node index.js
