export default {
  header: 'Разделитель',
  headerText: 'Компонент `v-divider` используется для разделения групп списков.',
  components: ['v-divider'],
  examples: [{
    fullBleed: {
      header: 'Полная заливка',
      desc: 'Полные разделители для прокачки расширяют всю ширину содержимого.'
    },
    lightAndDark: {
      header: 'Светлая и Темная',
      desc: 'Разделители имеют светлые и темные варианты.',
      uninverted: true
    },
    inset: {
      header: 'Вставные разделители',
      desc: 'Вставки вставки перемещены на 72px вправо. Это приведет к выравниванию элементов списка.'
    },
    subheaders: {
      header: 'Суб заголовки и разделители',
      desc: 'Подзаголовки могут быть выстроены с помощью вставных разделителей, используя то же свойство.'
    },
    dividerList: {
      header: 'List dividers',
      desc: 'Inset dividers and subheaders can help break up content'
    },
    dividerListPortrait: {
      header: 'Divivders in Portrait View',
      desc: 'Create custom cards to fit any use-case'
    }
  }],
  props: {
    inset: 'Добавляет отступы (72px)'
  }
}
