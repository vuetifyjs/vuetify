export default {
  header: 'Tooltip',
  headerText: 'The `v-tooltip` component is useful for conveying information when a user hovers over an element. You can also programmatically control the display of tooltips through a **v-model**',
  components: ['v-tooltip'],
  examples: [{
    default: {
      header: 'Default',
      desc: 'Tooltips can wrap any element.'
    },
    alignment: {
      header: 'Alignment',
      desc: 'Tooltip can be aligned to any of the four sides of the activator element'
    },
    visibility: {
      header: 'Visibility',
      desc: 'Tooltip visibility can be programmatically changed using `v-model`.'
    }
  }],
  props: {
    closeDelay: 'Delay (in ms) after which menu closes (when open-on-hover prop is set to true)',
    debounce: 'Duration before tooltip is shown and hidden when hovered',
    openDelay: 'Delay (in ms) after which menu opens (when open-on-hover prop is set to true)'
  }
}
