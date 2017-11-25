export default {
  grid: {
    header: 'Usage',
    desc: 'The <code>v-container</code> can be used for a center focused page, or given the <code>fluid</code> prop to extend its full width. <code>v-layout</code> is used for separating sections and contains the <code>v-flex</code>. The structure of your layout will be as follows, <strong>v-container</strong> &raquo; <strong>v-layout</strong> &raquo; <strong>v-flex</strong>. Each part of the grid chain is a flex-box element. The final, <code>v-flex</code>, automatically sets its children to have <kbd>flex: 1 1 auto</kbd>.'
  },
  offset: {
    header: 'Offset',
    desc: `Offsets are useful for compensating for elements that may not be visible yet, or to control the position of content. Just as with breakpoints, you can set an offset for any available sizes. This allows you to fine tune your application layout precisely to your needs.`
  },
  order: {
    header: 'Order',
    desc: 'You can control the ordering of grid items. As with offsets, you can set different orders for different sizes. Design specialized screen layouts that accommodate to any application.'
  },
  directionAndAlign: {
    header: 'Direction and Align',
    desc: 'Designate the direction and alignment in a variety of ways. All of the available <kbd>flex-box</kbd> api is available through intuitive helper props.'
  },
  rowColumnBreakpoint: {
    header: 'Row and column breakpoints',
    desc: 'Dynamically change your layout based upon resolution. <strong>(resize your screen and watch the layout change to a <code>row</code> on small breakpoints)</strong>'
  },
  nestedGrid: {
    header: 'Nested grid',
    desc: 'Grids can be nested, similar to other frameworks, in order to achieve very custom layouts.'
  },
  uniqueLayouts: {
    header: 'Unique layouts',
    desc: 'The power and flexibility of the Vuetify grid system allows you to create amazing user interfaces.'
  },
  tags: {
    header: 'Tags',
    desc: 'Sometimes you will want to specify a layout item as a specific tag, such as a <code>section</code> or <code>li</code> element.'
  }
}
