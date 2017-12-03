<template lang="pug">
  component-view(v-bind:doc="doc")
    v-alert(info value="true" slot="top") If you are looking for <strong>Grid lists</strong>, please navigate <router-link class="white--text" to="/components/grid-lists">here</router-link>.
    v-card(slot="top").my-5
      v-table-overflow
        table.table
          caption.mt-3
            strong Material Design Viewport Breakpoints
          thead
            tr.text-xs-left
              th Device
              th Types
              th Range
          tbody
            tr
              td
                v-icon.mr-3 phone_iphone
                span Extra small
              td small to large handset
              td &lt; 600px
            tr
              td
                v-icon.mr-3 tablet
                span Small
              td small to medium tablet
              td 600px &gt; &lt; 1024px
            tr
              td
                v-icon.mr-3 laptop
                span Medium
              td large tablet to laptop
              td 1024px &gt; &lt; 1440px
            tr
              td
                v-icon.mr-3 desktop_windows
                span Large
              td desktop
              td 1440px &gt; &lt; 1920px
            tr
              td
                v-icon.mr-3 tv
                span Extra large
              td 4k and ultra-wides
              td &gt; 1920px
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Grid',
          component: 'grid',
          edit: 'GridView',
          desc: `Vuetify.js uses a 12 point grid system. The grid is used to layout an application\'s content and contains 5 types of media breakpoints. The 5 ranges of breakpoints are used for targeting specific screen sizes or orientations.`,
          examples: [
            { header: 'Grid', file: 'grid/1', desc: `The <code>v-container</code> can be used for a center focused page, or given the <code>fluid</code> prop to extend its full width. <code>v-layout</code> is used for separating sections and contains the <code>v-flex</code>. The structure of your layout will be as follows, <strong>v-layout</strong> &raquo; <strong>v-flex</strong>.` },
            { header: 'Offset', file: 'grid/2', desc: `Offsets are useful for compensating for elements that may not be visible yet, or to control the position of content. Just as with breakpoints, you can set an offset for any available sizes.` },
            { header: 'Order', file: 'grid/3', desc: 'You can control the ordering of grid items. As with offsets, you can set different orders for different sizes' },
            { header: 'Direction and Align', file: 'grid/4', desc: 'Designate the direction and alignment in a variety of ways.' },
            { header: 'Row and column based on breakpoint', file: 'grid/5', desc: 'Dynamically change your layout based upon resolution. <strong>(resize your screen and watch the layout change on small breakpoints)</strong>' }
          ],
          props: {
            'v-container': {
              params: [
                [
                  'fluid',
                  'Boolean',
                  'False',
                  'Removes viewport size breakpoints'
                ],
                [
                  'grid-list-{xs through xl}',
                  'Boolean',
                  'False',
                  'Sets the gutter between grid list items ranging from 1px to 24px'
                ]
              ]
            },
            'v-layout': {
                params: [
                  [
                    'row[-size]',
                    'Boolean',
                    'False',
                    'Sets flex direction to row for the designated breakpoints. Available for all breakpoints xs => xl.'
                  ],
                  [
                    'column[-size]',
                    'Boolean',
                    'False',
                    'Sets flex direction to column for designated breakpoints. Available for all breakpoints xs => xl.'
                  ],
                  [
                    'child-flex',
                    'Boolean',
                    'False',
                    'Apply flex: 1 to all direct children'
                  ],
                  [
                    'child-flex[-size]',
                    'Boolean',
                    'False',
                    'Apply flex: 1 to all direct children for designated breakpoints. Available for all breakpoints xs => xl'
                  ],
                  [
                    'reverse',
                    'Boolean',
                    'False',
                    'Reverses the currently selected direction (column, row).'
                  ],
                  [
                    'justify-space-around',
                    'Boolean',
                    'False',
                    'Justify content to the space around.'
                  ],
                  [
                    'justify-space-between',
                    'Boolean',
                    'False',
                    'Justify content to the space between.'
                  ],
                  [
                    'justify-center',
                    'Boolean',
                    'False',
                    'Justify content to the center..'
                  ],
                  [
                    'justify-start',
                    'Boolean',
                    'False',
                    'Space between child elements.'
                  ],
                  [
                    'justify-end',
                    'Boolean',
                    'False',
                    'Space between child elements.'
                  ],
                  [
                    'align-center',
                    'Boolean',
                    'False',
                    'Align items to the center.'
                  ],
                  [
                    'align-baseline',
                    'Boolean',
                    'False',
                    'Align items to the baseline.'
                  ],
                  [
                    'align-start',
                    'Boolean',
                    'False',
                    'Align items to the start.'
                  ],
                  [
                    'align-end',
                    'Boolean',
                    'False',
                    'Align items to the end.'
                  ],
                  [
                    'wrap',
                    'Boolean',
                    'False',
                    'Allows children to wrap within the container if the elements use more than 100%.'
                  ]
                ]
              },
              'v-flex': {
                params: [
                  [
                    'xs(1-12)',
                    'Boolean',
                    'False',
                    'xs:extra small, sm:small, md:medium, lg:large, xl:extra large - 1 through 12'
                  ], [
                    'offset-[size](0-12)',
                    'Boolean',
                    'False',
                    'offset-xs:extra small, offset-sm:small, offset-md:medium, offset-lg:large, offset-xl:extra large. Example: offset-xs3'
                  ], [
                    'order-[size](1-12)',
                    'Boolean',
                    'False',
                    'order-xs:extra small, order-sm:small, order-md:medium, order-lg:large, order-xl:extra large. Example: order-xs1'
                  ],
                  [
                    'fill-height',
                    'Boolean',
                    'False',
                    'Make sure that col element height is filled with parent and child. Important for Safari/Firefox if children is column element.'
                  ]
                ]
              }
          },
          slots: {
            'v-container': {
              default: true
            },
            'v-layout': {
              default: true
            },
            'v-flex': {
              default: true
            }
          },
          functional: {
            'grid': {
              params: [
                ['v-content', 'The main content wrapper for your application'],
                ['v-spacer', 'Spacer for flexbox grids']
              ]
            }
          }
        }
      }
    }
  }
</script>
