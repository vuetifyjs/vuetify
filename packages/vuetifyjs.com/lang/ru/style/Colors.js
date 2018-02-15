export default {
  header: 'Цвета',
  headerText: 'Из коробки вы получаете доступ ко всем цветам в [Material Design спецификации](https://material.io/guidelines/style/color.html) через **stylus** и **javascript**. Эти значения могут использоваться в ваших таблицах стилей, ваших файлах компонентов и фактических компонентах через систему **color class**.',
  classesHeader: 'Классы',
  classesText: 'Каждый цвет из спецификации преобразуется в **фоновый** и **текстовый** вариант для стилизации в вашем приложении через класс, например: `<div class="red">` или `<span class="red-text">`. Эти цвета классов определены [здесь](https://github.com/vuetifyjs/vuetify/blob/master/src/stylus/settings/_colors.styl).',
  classesText2: 'Цвет текста также поддерживают **затемненные** и **осветленные** варианты с использованием `text - {lighten|darken} - {n}`',
  javascriptPackHeader: 'Цветовой пакет Javascript',
  javascriptPackText: 'Vuetify имеет дополнительный пакет цветов javascript, который вы можете импортировать и использовать в своем приложении. Это также можно использовать для определения темы ваших приложений.',
  stylusPackHeader: 'Цветовой пакет Stylus',
  stylusPackText: 'Хотя удобно, цветовой пакет увеличивает размер экспорта css на ~ 30 кб. В некоторых проектах могут потребоваться только классы по умолчанию, созданные во время выполнения из бутстрапа Vuetify. Чтобы отключить эту функцию, вам придется _вручную_ импортировать и создать основной файл **stylus**. Для этого потребуется [stylus loader](https://github.com/shama/stylus-loader) и запись файла .styl .',
  stylusPackText2: 'Затем созданный файл `main.styl` должен быть включен в ваш проект.',
  alert: 'Вы **должны** сконфигурировать свою webpack настройку для использования `stylus`. Если вы используете [готовый шаблон](/get-started/quick-start#new-applications), это уже будет сделано для вас.',
  stylusPackText3: 'Это также можно сделать в основном файле **App.vue**. Имейте в виду, что в зависимости от вашей настройки проекта это _будет_ увеличивать время сборки, так как каждый раз, когда ваш файл входа обновляется, файлы stylus будут повторно сгенерированы.',
  colorHeader: 'Material цвета',
  colorText: 'Ниже представлен список цветовой палитры Material design, сгруппированный по основному цвету',
  toc: [
    {
      text: 'Введение',
      href: 'introduction'
    },
    {
      text: 'Классы',
      href: 'classes'
    },
    {
      text: 'Цветовой пакет Javascript',
      href: 'javascript-color-pack'
    },
    {
      text: 'Цветовой пакет Stylus',
      href: 'stylus-color-pack'
    },
    {
      text: 'Material цвета',
      href: 'introduction'
    }
  ]
}
