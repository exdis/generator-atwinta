Atwinta studio yeoman generator
====

Генератор для студии [Атвинта](http://atwinta.ru).

Включает в себя:
* Require.js
* Watch/LiveReload
* SASS/Compass
* Минификацию css/js
* Локальный веб-сервер
* Линтер JavaScript
* Проверку код-стайла JavaScript
* Поддержку изображений
  * Поддержку спрайтов
  * Поддержку base64-кодирования изображений
  * Поддержку ретина-изображений
* Тесты Mocha, Chai, Sinon (требуется установленная PhantomJS и mocha-phantomjs)

Структура проекта
```
project
├── css
|   ├── style.css
|   └── style.min.css
├── img
|   ├── base64
|   └── ui
|       ├── normal
|       └── retina
├── js
|   └── lib
├── sass
├── sprites
├── stylesheets
└── test
```

В папке **css** скомпилированные, сконкатенированные стили. 

В папке **img/base64** в файле **base64.css** правила для кодирования изображений в base64, эти правила будут добавлены в основной стиль. В папке **ui** изображения, из которых будет склеен спрайт. Если поддержка ретина-дисплеев включена, то изображения в двойном масштабе следует складывать в папку **retina**.

В папке **js** клиентский JavaScript. В **js/lib** установленные бовером компоненты.

В папке **sass** иснодники стилей.

В папке **sprites** миксинги спрайтов.

В папке **stylesheets** стили, которые будут слиты в главный стилевой файл.

В папке **test** тесты.

###### Grunt команды
Основной workflow:
```bash
$ grunt
```
Сжатие для продакшна:
```bash
$ grunt dist
```
Тестирование
```bash
$ grunt test
```