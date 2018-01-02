export default {
  header: 'Tab',
  headerText: 'The `v-tabs` component is used for hiding content behind a selectable item. This can also be used as a pseudo-navigation for a page, where the tabs are links and the tab-items are the content.',
  components: [
    'v-tabs',
    'v-tabs-slider',
    'v-tabs-item',
    'v-tabs-items',
    'v-tabs-content',
  ],
  examples: [{
    toolbar: {
      header: 'Toolbar tabs',
      desc: ''
    },
    fixedTabs: {
      header: 'Fixed tabs',
      desc: 'The **fixed-tabs** prop sets a higher minimum width and applies a new maximum width to `v-tabs-items`. On desktop screens, the tab items will be centered within the `v-tabs` component and switch to evenly fill on mobile.'
    },
    // right: {
    //   header: 'Right aligned tabs',
    //   desc: 'The **right** prop aligns the tabs to the right'
    // },
    content: {
      header: 'Content',
      desc: 'Tabs are not the only thing you can put inside the `v-tabs` component. In this example we\'ve also added a toolbar.'
    },
    search: {
      header: 'With search',
      desc: 'Here is another example of additional content inside the `v-tabs` component.'
    },
    iconsAndText: {
      header: 'Icons and text',
      desc: 'By using the **icons-and-text** prop you can add icons to each tab item.'
    },
    desktop: {
      header: 'Desktop tabs',
      desc: ''
    },
    alignWithTitle: {
      header: 'Align tabs with toolbar title',
      desc: 'Make `v-tabs` lined up with the `v-toolbar-title` component (`v-toolbar-side-icon` or `v-btn` must be used in `v-toolbar`). May not work if the tab text is wrapped.'
    },
    grow: {
      header: 'Grow',
      desc: 'The **grow** prop will make the tab items take up all available space.'
    },
    pagination: {
      header: 'Pagination',
      desc: 'If the tab items overflow their container, pagination controls will appear.'
    },
    icons: {
      header: 'Custom icons',
      desc: '**prepend-icon** and **append-icon** can be used for applying custom pagination icons.'
    }
  }],
  props: {
    alignWithTitle: 'Make `v-tabs` lined up with the toolbar title',
    prependIcon: 'Left pagination icon',
    appendIcon: 'Right pagination icon',
    right: 'Aligns tabs to the right'
  }
}
