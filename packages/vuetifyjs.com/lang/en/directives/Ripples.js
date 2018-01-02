export default {
  header: 'Ripple directive',
  headerText: 'The `v-ripple` directive is used to show action from a user. It can be applied to any block level element. Numerous components come with the ripple directive built in, such as the `v-btn`, `v-tabs-item` and many more.',
  components: ['v-ripple'],
  examples: [{
    buttons: {
      header: 'Default',
      desc: 'Buttons by default have ripples enabled. This can be removed with the prop `:ripple="false`.',
      uninverted: true
    },
    customColor: {
      header: 'Custom color',
      desc: 'Using a helper class, you can change the color of the ripple.',
      uninverted: true
    },
    tabs: {
      header: 'Tabs',
      desc: 'Tabs by default have ripples disabled. This can be enabled with the **ripple** prop.',
      uninverted: true
    },
    navigationDrawers: {
      header: 'Navigation drawers',
      desc: 'List items by default have ripples disabled. This can be enabled with the **ripple** prop',
      uninverted: true
    },
    toolbars: {
      header: 'Toolbars',
      desc: 'Toolbar items by default have ripples disabled. This can be enabled with the **ripple** prop.',
      uninverted: true
    },
    expansionPanels: {
      header: 'Expansion panels',
      desc: 'Expansion panels by default have ripples disabled. This can be enabled with the **ripple** prop.',
      uninverted: true
    },
    htmlElement: {
      header: 'Standard HTML element',
      desc: 'Add the ripple effect to a standard HTML element. This can be enabled with the `v-ripple` HTML attribute.',
      uninverted: true
    }
  }],
  props: [{
    'v-ripple': [
      {
        name: 'class',
        type: 'String',
        default: 'undefined',
        desc: 'Applies a custom class to the ripple, used for changing color'
      },
      {
        name: 'center',
        type: 'Boolean',
        default: 'False',
        desc: 'Force ripple to originate from the center of the target'
      }
    ]
  }]
}
