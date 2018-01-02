export default {
  header: 'Subheaders',
  headerText: 'The `v-subheader` component is used to separate sections of lists.',
  components: ['v-subheader'],
  examples: [{
    list: {
      header: 'List subheaders',
      desc: 'Subheaders work great with lists for describing the information below.'
    },
    grid: {
      header: 'Grid subheaders',
      desc: 'A subheader can add context to what a user is looking at.'
    },
    menu: {
      header: 'Menu subheaders',
      desc: 'Using a subheader can help separate different types of actions.'
    }
  }],
  props: {
    inset: 'Adds identation (72px)'
  }
}
