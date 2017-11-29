export default {
  header: 'Ripple directive',
  headerText: 'The `v-ripple` directive is used to show action from a user. It can be applied to any block level element. Numerous components come with the ripple directive built in, such as the `v-btn`, `v-tabs-item` and many more.',
  components: ['v-resize'],
  examples: [{
    buttons: {
      header: 'Default',
      desc: 'Buttons by default have ripples enabled. This can be removed with the prop `:ripple="false`.'
    },
    customColor: {
      header: 'Custom color',
      desc: 'Using a helper class, you can change the color of the ripple.'
    },
    tabs: {
      header: 'Tabs',
      desc: 'Tabs by default have ripples disabled. This can be enabled with the **ripple** prop.'
    },
    navigationDrawers: {
      header: 'Navigation drawers',
      desc: 'List items by default have ripples disabled. This can be enabled with the **ripple** prop'
    },
    toolbars: {
      header: 'Toolbars',
      desc: 'Toolbar items by default have ripples disabled. This can be enabled with the **ripple** prop.'
    },
    expansionPanels: {
      header: 'Expansion panels',
      desc: 'Expansion panels by default have ripples disabled. This can be enabled with the **ripple** prop.'
    },
    htmlElement: {
      header: 'Standard HTML element',
      desc: 'Add the ripple effect to a standard HTML element. This can be enabled with the `v-ripple` HTML attribute.'
    }
  }],
  props: {
    '[up, down, left, right]': 'Assign a callback based upon a swipe direction. Pairing x-axis and y-axis callbacks is not recommended at this time',
    '[move, start, end]': 'Assign a callback when the touch event starts, ends, and while it is in progress'
  }
}
