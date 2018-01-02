export default {
  header: 'Data iterator',
  headerText: 'The `v-data-iterator` component is used for displaying data, and shares a majority of its functionality with the `v-data-table` component. Features include sorting, searching, pagination, and selection.',
  components: ['v-data-iterator'],
  examples: [{
    simple: {
      header: 'Simple',
      desc: 'The `v-data-iterator` allows you to customize exactly how to display your data. In this example we are using a grid list with cards. We can use the `content-tag` prop (along with `content-class` and `content-props`) to specify what the wrapper element around the items should look like.'
    },
  }],
  props: {
    contentClass: 'Applies a custom class to the wrapper element around items',
    contentProps: 'Applies custom props to the wrapper element around items',
    contentTag: 'Specified what tag should be used for the wrapper element around items',
  }
}
