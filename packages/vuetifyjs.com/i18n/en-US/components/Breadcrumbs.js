export default {
  header: 'Breadcrumbs',
  headerText: 'The `v-breadcrumbs` component is a navigational helper for pages. It can accept a **Material Icons** icon or characters as a divider. An array of objects containing the fields _href_, _text_ and optional _disabled_ can be passed to the **items** property of the component.  Additionally, a regular slot exists for more control of the breadcrumbs, either utilizing `v-breadcrumbs-item` or other custom markup.',
  components: ['v-breadcrumbs', 'v-breadcrumbs-items'],
  examples: [{
    textDividers: {
      header: 'Text dividers',
      desc: 'By default, breadcrumbs use a text divider. This can be any string.'
    },
    iconDividers: {
      header: 'Icon dividers',
      desc: 'For the icon variant, breadcrumbs can use any icon in Material Design Icons.'
    }
  }],
  props: {
    divider: 'Specifies the dividing character',
    icons: 'Specifies that the dividers are icons',
    justifyCenter: 'Align the breadcrumbs center',
    justifyEnd: 'Align the breadcrumbs at the end',
    large: 'Increase the font-size of the breadcrumb item text'
  }
}
