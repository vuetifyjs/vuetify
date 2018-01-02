export default {
  header: 'Footer',
  headerText: 'The `v-footer` component is used for displaying general information that a user might want to access from any page within your site.',
  components: ['v-footer'],
  examples: [{
    default: {
      header: 'Default',
      desc: 'The footer component is just a basic container.'
    }
  }],
  props: {
    absolute: 'Mixins.Positionable.props.absolute',
    fixed: 'Mixins.Positionable.props.fixed',
    inset: 'Positions the toolbar offset from an application `v-navigation-drawer`'
  }
}
