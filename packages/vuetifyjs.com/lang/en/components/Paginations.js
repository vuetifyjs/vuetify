export default {
  header: 'Pagination',
  headerText: 'The `v-pagination` component is used to separate long sets of data so that it is easier for a user to consume information. Depending on the length provided, the pagination component will automatically scale. To maintain the current page, simply supply a `v-model` attribute.',
  components: ['v-pagination'],
  examples: [{
    short: {
      header: 'Short',
      desc: 'Pagination displays all pages if parent container is big enough.'
    },
    long: {
      header: 'Long',
      desc: 'When the number of page buttons exceeds the parent container, the component will truncate the list.'
    },
    limit: {
      header: 'Limit',
      desc: 'You can also manually set the maximum number of visible page buttons with the `total-visible` prop.'
    },
    round: {
      header: 'Round',
      desc: 'The alternate style for pagination is circle pages.'
    },
    disabled: {
      header: 'Disabled',
      desc: 'Pagination items can be manually deactivated.'
    }
  }]
}
