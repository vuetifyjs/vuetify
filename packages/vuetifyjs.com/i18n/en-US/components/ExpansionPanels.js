export default {
  header: 'Expansion Panel',
  headerText: 'The <code>v-expansion-panel</code> component is useful for reducing vertical space with large amounts of information. The default functionality of the component is to only display one expansion-panel body at a time, however, with the <code>expandable</code> property, the expansion-panel can remain open until explicitly closed.',
  components: ['v-expansion-panel', 'v-expansion-panel-content'],
  examples: [{
    accordion: {
      header: 'Accordion',
      desc: 'Accordion expansion panels can only have 1 panel open at a time.'
    },
    expand: {
      header: 'Expand',
      desc: 'Expand expansion panels will stay open until closed.',
      uninverted: true
    },
    popout: {
      header: 'Popout & Inset',
      desc: 'The expansion panel also has two alternative designs you can activate with the props <code>popout</code> and <code>inset</code>.',
      inverted: true
    },
    focusable: {
      header: 'Focusable',
      desc: 'The expansion panel headers can be made focusable with the prop <code>focusable</code>.',
      uninverted: true
    }
  }]
}
