# try-docker

## Dockerfile

Файл `Dockerfile` описывает конфигурацию контейнера

Пример 1: 

```dockerfile
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
```

Пример 2:

Образ без node_modules зависимостей. Нужно билдить фронт и бэк

```dockerfile
# Собираем билды фронта и бэка
FROM node:14-alpine AS build
WORKDIR /app
COPY . .
RUN npm install -f && npm run build

# Запускаем собраный сервер с раздачей собранной статики
FROM node:14-alpine
COPY --from=build /app/dist /dist
CMD node ./dist/server/index.js

```

## Сборка, запуск, остановка

### Сборка `build`

Собрать образ с именем (`-t`, `--tag`).  
Опционально через `:` указывается тег. `name:tag`.  
Далее директория из которой производить сборку

```bash
docker build -t name .
```

### Запуск `run`

Запустить контейнер с указанным именем

```bash
docker run name
```

Запустить контейнер в фоновом режиме (`-d`).  
Вернёт идентификатор запущенного контейнера

```bash
docker run -d name
```

> Ниже про проброс портов и файловой системы

Список запущенных контейнеров

```bash
docker ps
```

### Остановка `stop`

Остановить контейнер с задержкой (`-t 0`) по id.  
Id не обязательно целиком, достаточно уникальную часть

```bash
docker stop -t 0 c9aa05a7f869d
```

## Чёрный ящик

Контейнер — это чёрный ящик. Если мы там запускаем сервер или изменяем файлы,
это внутренние дела контейнера. Более того, при остановке, всё, что происходило в контейнере исчезает.

Чтобы связать с локальной машиной, нужно выполнить проброс портов и файловой системы

```bash
docker run -v ~/dev/try-docker/shared:/var/www/shared -p 4000:3000 -d name
```

Далее подробнее...

### Проброс портов

Документируем нужный порт. `EXPOSE` не открывает порт,
это лишь информация для того кто будет запускать контейнер

```dockerfile
EXPOSE 3000
```

Установка связи портов локальной машины и контейнера при запуске
`-p локальный-порт:порт-контейнера`

```bash
docker run -p 4000:3000 -d name
```

### Проброс файловой системы

`-v абсолютный-локальный-путь:абсолютный-путь-в-контейнере`

```bash
docker run -v ~/dev/try-docker/shared:/var/www/shared -d name 
```

## docker-compose

Файл `docker-compose.yaml`

Пример: 

```yaml
version: "3"

services:
  # Название сервиса
  mongo:
    # Образ с hub.docker.com
    image: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: user
      MONGO_INITDB_ROOT_PASSWORD: password
    # Проброс файлов родитель:контейнер. MongoDB будет создавать свои файлы
    volumes:
      - ./mongo:/data/db
    # Проброс порта родитель:контейнер
    ports:
      - "27017:27017"
    # Использование сети
    networks:
      # Название сети
      - app

  # Название сервиса
  server-app:
    # Сборка про Dockerfile находящемуся в корне
    build:
      context: .
    # Переменные окружения
    environment:
      # Хост mongo с портом 27017 будет создан в сервисе mongo
      - MONGO_HOST=mongo
    # Секретные переменные окружения
    env_file:
      ./.env
    # Проброс порта родитель:контейнер
    ports:
      - "4000:3000"
    # Проброс файлов родитель:контейнер
    volumes:
      - ./shared:/var/www/shared
    # Зависимость от mongo
    depends_on:
      - mongo
    # Использование сети
    networks:
      # Название сети
      - app
    # Дожидаться запуска MongoDB
    command: ./wait-for.sh mongo:27017 -- npm start

# Связать созданные сервисы по сети
networks:
  # Название сети
  app:
    driver: bridge
```

### Сборка `build`

```bash
docker-compose build server-app
```

### Запуск `up`

```bash
docker-compose up название-сервиса
```

```bash
docker-compose up -d название-сервиса
```

Список запущенных контейнеров в контексте `.docker-compose.yaml`

```bash
docker ps
```

### Остановка `stop`

Остановка запущенных контейнеров в контексте `.docker-compose.yaml`

```bash
docker-compose stop
```
