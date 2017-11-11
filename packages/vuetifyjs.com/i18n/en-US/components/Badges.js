export default {
  header: 'Badge',
  headerText: 'The <code>v-badge</code> component can wrap any type of content to highlight information to a user or to just draw attention to a specific element.',
  props: {
    bottom: 'Position the badge to the bottom',
    left: 'Position the badge to the left',
    overlap: 'Remove the added margin and allow badge to overlap designated element'
  },
  slots: {
    badge: 'The slot that will be used for the badge'
  }
}
