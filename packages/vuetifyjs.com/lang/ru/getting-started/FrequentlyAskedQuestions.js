export default {
  header: 'Часто задаваемые вопросы',
  headerText:
    'Застрял на конкретной проблеме? Проверьте некоторые из этих распространенных ошибок, прежде чем создавать билет. Если вы все еще не можете найти то, что ищете, отправьте <a href="https://issues.vuetifyjs.com" target="_blank" rel="noopener"> вопрос </a> на github или попросите сообщество в <a href="https://chat.vuetifyjs.com" target="_blank" rel="noopener"> разлад </a>.',
  question: 'Вопрос:',
  answer: 'Ответ',
  noResultsFound: 'результатов не найдено',
  resetSearch: 'Сбросить поиск',
  gotchas: [
    {
      q: `Мой код не работает - что мне делать?`,
      a: `
          <p> Сначала убедитесь, что вы используете последнюю версию Vue.js и Vuetify. Попробуйте воспроизвести его в codepen, используя следующий шаблон: </p>
          <a href="https://template.vuetifyjs.com/" target="_blank" rel="noopener">https://template.vuetifyjs.com </a>.
          <p>, а затем обратитесь за советом к официальному серверу раздора: </p>
          <a href="https://chat.vuetifyjs.com/" target="_blank" rel="noopener"> https://chat.vuetifyjs.com </a>
          `
    },
    {
      q: `Есть ли код-код с маршрутизатором?`,
      a:
        'да, <a href="https://codepen.io/zikeji/pen/ypeQNm" target="_blank" rel="noopener">https://codepen.io/zikeji/pen/ypeQNm</a>'
    },
    {
      q: `Мое приложение выглядит неправильно`,
      a: `Vuetify требует использования компонента <code> v-app </code>. Он должен обернуть все ваше приложение и стать центральной точкой для большинства функциональных возможностей платформы. Если по какой-либо причине вы не можете использовать этот элемент, вы можете имитировать его из атрибутов и классов. Установите для атрибута <code> data-app </code> значение true для наивысшего доступного элемента (не включая тело) и **application application - {light | dark}** классов.`
    },
    {
      q: `Тема Dark или Light не работает.`,
      a: `Vuetify требует точки монтирования для выполнения таких задач, как стилизация темы. Убедитесь, что у вас есть <code> v-app </code>, завершающее ваше приложение. В случае, если это невозможно, по какой-либо причине вы можете имитировать свое поведение, применяя **application-app** и **class = "application application - light (или dark)** к самому высокому элементу, который вы может в вашем приложении.`
    },
    {
      q: `Меню / Диалоговое окно / Навигационое меню не открывается должным образом.`,
      a: `Убедитесь, что ваши компоненты обернуты элементом <code> v-app </code>. Если вы используете элемент для активации компонента, который не помещен в слот <kbd> активатор </kbd>, убедитесь, что вы прекратили распространение события щелчка. Эти компоненты используют директиву <code> v-external-click </code> и немедленно закрываются.`
    },
    {
      q: `Полоса прокрутки показывается, хотя мой контент не переполняется вертикально.`,
      a: `Vuetify по умолчанию включает панель прокрутки html. Это выбор дизайна и неоднократно обсуждался. Есть плюсы и минусы того, что они имеют и не имеют этого, и на данный момент голосование за то, чтобы оставить его как есть. Если вы хотите отключить эту функцию, просто добавьте <code> html {overflow-y: auto} </code> в свой файл стиля.`
    },
    {
      q: `Как центрировать вертикально?`,
      a: `Примените **fill-height** prop к <code> v-container </code>. Этот вспомогательный класс обычно добавляет только **height: 100%**, но для контейнера он также ищет дочерний <code> v-layout </code> и применяет необходимые классы для вертикального центрирования содержимого.`
    },
    {
      q: `Моя ссылка «/» активна, когда я нахожусь на странице «/home»`,
      a:
        'Добавьте **exact** к ссылке, которая указывает на абсолютный /. Для получения дополнительной информации об этом вы можете посетить официальный маршрутизатор Vue <a href="https://router.vuejs.org/en/api/router-link.html" target="_blank" rel="noopener"> документацию </a>.'
    },
    {
      q: `Моя страница на мобильном телефоне не реагирует`,
      a:
        'Add the `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">` to the `<head>` section in your index.html.'
    },
    {
      q: `Как я могу использовать шрифты Awesome Icons или Material Design Icons (mdi)?`,
      a: `
          <p> Вы должны добавить шрифты в свой index.html или иным образом импортировать их в свой проект. </ p>
          <ul> <li> MDI: <a href="https://materialdesignicons.com/getting-started" target="_blank" rel="noopener"> https://materialdesignicons.com/getting-started</a > </ li> 
          <li> FA: <a href="http://fontawesome.io/get-started/" target="blank" rel="noopener"> http://fontawesome.io/get-started/ </a> </li> 
          </ul>
          `
    },
    {
      q: `Мой диалог закрывается сразу после нажатия кнопки`,
      a: `Если вы не используете слот <b>активатора</b> для <code> v-menu </code> и <code> v-dialog </code>, вы должны вручную остановить _propagation_ события click. Для этого просто добавьте модификатор _.stop_ в событие click, <code> @ click.stop = "myMethod" </code>.`
    },
    {
      q: `Относительные изображения не работают в компонентах <code> v-card </code>`,
      a: `<p> загрузчик Vue преобразует относительные пути в требуемые функции автоматически для вас. К сожалению, это не тот случай, когда речь идет о пользовательских компонентах. </p> <p> Чтобы использовать относительные пути, вы должны использовать <code>require</code>:</p><p><code class="pa-2">methods: {<br>&nbsp;&nbsp;getImgUrl (img) {<br>&nbsp;&nbsp;&nbsp;&nbsp;return require('../../assets/img/' + img)<br>&nbsp;&nbsp;}<br>}</code></p> 
      <p> и использовать его в tempate: <code>: src = "getImgUrl('card.png')" </code> </p>`
    }
  ],
  questionHeader: 'Что-то, что вы считаете здесь?',
  questionButton: 'Дайте нам знать'
};
