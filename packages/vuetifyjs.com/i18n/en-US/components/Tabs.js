export default {
  header: 'Tab',
  headerText: 'The <code>v-tabs</code> component is used for hiding content behind a selectable item. This can also be used as a pseudo-navigation for a page, where the tabs are links and the tab-items are the content.',
  components: [
    'v-tabs',
    'v-tabs-bar',
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
      desc: 'The **fixed-tabs** prop sets a higher minimum width and applies a new maximum width to `v-tabs-items`. On desktop screens, the tab items will be centered within the `v-tabs-bar` component and switch to evenly fill on mobile.'
    },
    content: {
      header: 'Content',
      desc: 'Tabs are not the only thing you can put inside the <code>v-tabs</code> component. In this example we\'ve also added a toolbar.'
    },
    search: {
      header: 'With search',
      desc: 'Here is another example of additional content inside the <code>v-tabs</code> component.'
    },
    icons: {
      header: 'Icons',
      desc: 'By using the <code>icons</code> prop you can add icons to each tab item.'
    },
    desktop: {
      header: 'Desktop tabs',
      desc: ''
    },
    grow: {
      header: 'Grow',
      desc: 'The <code>grow</code> prop will make the tab items take up all available space.'
    },
    pagination: {
      header: 'Pagination',
      desc: 'If the tab items overflow their container, pagination controls will appear.'
    },
    disabledScroll: {
      header: 'Disabled scroll',
      desc: 'You can disable the pagination controls by setting the <code>scrollable</code> prop to <code>false</code>. This also has the effect of removing the margins around the tab item container.'
    }
  }]
}
