# Барабан фортуны

## Для запуска:

1. Подтянуть репозиторий
2. установить зависимости командой: npm install
3. запустить фейковый сервер командой: node server.mjs
4. Виджет запускается командой: npm start
5. Окно браузера откроется автоматически, если этого не произошло то перейдите по адресу http://localhost:3000

## Логика:

С сервера ждем данные, потом подтягиваем их. Когда данные пришли тогда пропадает загрузка и появляется барабан, активируется кнопка действия прокрутки.
При нажатии кнопки срабатывает функция которая через Math.random() генерирует случайное число в диапазоне от 0 до высоты отрисованного списка(heightList), и через transform смещаем список, после срабатывает setInterval который повторяется через каждые speedAnimation (по умолчанию 30) миллисекунд в течении timeSpin (по умолчанию 4000) миллисекунд.
По оканчанию вычисляется элемент на котором произошла остановка, эти данные отображаются и отправляются на сервер.

## Пример:

https://user-images.githubusercontent.com/49805080/215308487-5008c498-9eea-4aed-984b-c2429b28d018.mp4

