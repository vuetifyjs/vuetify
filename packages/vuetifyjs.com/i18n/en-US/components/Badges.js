export default {
  header: 'Badge',
  headerText: 'The <code>v-badge</code> component can wrap any type of content to highlight information to a user or to just draw attention to a specific element.',
  components: ['v-badge'],
  examples: [{
    character: {
      header: 'Character',
      desc: 'Any character can be placed with a badge.'
    },
    icon: {
      header: 'Icon',
      desc: 'The icon badge type only supports Material Design icons.'
    },
    inline: {
      header: 'Inline',
      desc: 'Badges can also be placed inline with text.'
    },
    visibility: {
      header: 'Visibility',
      desc: 'The visibility of badges can be controlled using <code>v-model</code>.'
    }
  }],
  props: {
    bottom: 'Position the badge to the bottom',
    left: 'Position the badge to the left',
    overlap: 'Remove the added margin and allow badge to overlap designated element'
  },
  slots: {
    badge: 'The slot that will be used for the badge'
  }
}
