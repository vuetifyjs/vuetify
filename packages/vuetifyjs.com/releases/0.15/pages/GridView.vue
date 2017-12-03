<template lang="pug">
  component-view(v-bind:doc="doc")
    v-alert(info value="true" slot="top") If you are looking for <strong>Grid lists</strong>, please navigate <router-link class="white--text" to="/components/grid-lists">here</router-link>.
    grid(slot="top").mt-5
    v-alert(info value).mb-4 Vuetify breakpoint functionality requires the use of the <code>v-app</code> component.
    section-header Breakpoint object
    section-text Vuetify converts the available breakpoints into an accessible object from within your application. This will allow you to assign/apply specific properties and attributes based upon viewport size. The object can be accessed from:
    markup(lang="js")
      |export default {
      |    mounted () {
      |      console.log(this.$vuetify.breakpoint)
      |    }
      |}
    section-text This object contains the same semantic properties that you are already used to using from the grid system. Let's try a real world example. You have a <code>v-dialog</code> component that you want to convert to a <strong>full-screen</strong> dialog on mobile devices. Normally you would need to bind watchers for the viewport size, and/or check whenever the page loads.
    markup(lang="js")
      |export default {
      |    data: () => ({
      |       isMobile: false
      |    }),
      |    mounted () {
      |      this.$vuetify.load(this.init)
      |    },
      |    beforeDestroy () {
      |      if (typeof window !== 'undefined') {
      |         window.removeEventListener('resize', this.onResize, { passive: true })
      |      }
      |    },
      |    methods: {
      |      init () {
      |         this.onResize()
      |         window.addEventListener('resize', this.onResize, { passive: true })
      |      },
      |      onResize () {
      |         this.isMobile = window.innerWidth < 600
      |      }
      |    }
      |}
    section-text That's a lot of boilerplate to write. Even if you opt to use the built in <router-link to="/directives/resizing">v-resize</router-link> directive, you are still going to have to define a resize method. With the <strong>breakpoint</strong> object you can completely skip this logic and get back to building your application.
    markup(lang="html")
      |&lt;v-dialog :full-screen="$vuetify.breakpoint.xsOnly"&gt;
      |&nbsp;&nbsp;&nbsp;&nbsp;...
      |&lt;/v-dialog&gt;
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Grid',
          component: 'grid',
          edit: 'GridView',
          desc: `Vuetify has a 12 point grid system. Built using <kbd>flex-box</kbd>, the grid is used to layout an application\'s content.  It contains 5 types of media breakpoints that are used for targeting specific screen sizes or orientations. The props for grid components are actually classes that are derived from their defined properties. This allows you to easily specify these helper classes as props, while still providing the classes to be used anywhere.`,
          examples: [
            { header: 'Grid', file: 'grid/1', desc: `The <code>v-container</code> can be used for a center focused page, or given the <code>fluid</code> prop to extend its full width. <code>v-layout</code> is used for separating sections and contains the <code>v-flex</code>. The structure of your layout will be as follows, <strong>v-container</strong> &raquo; <strong>v-layout</strong> &raquo; <strong>v-flex</strong>. Each part of the grid chain is a flex-box element. The final, <code>v-flex</code>, automatically sets its children to have <kbd>flex: 1 1 auto</kbd>.` },
            { header: 'Offset', file: 'grid/2', desc: `Offsets are useful for compensating for elements that may not be visible yet, or to control the position of content. Just as with breakpoints, you can set an offset for any available sizes. This allows you to fine tune your application layout precisely to your needs.` },
            { header: 'Order', file: 'grid/3', desc: 'You can control the ordering of grid items. As with offsets, you can set different orders for different sizes. Design specialized screen layouts that accommodate to any application.' },
            { header: 'Direction and Align', file: 'grid/4', desc: 'Designate the direction and alignment in a variety of ways. All of the available <kbd>flex-box</kbd> api is available through intuitive helper props.' },
            { header: 'Row and column based on breakpoint', file: 'grid/5', desc: 'Dynamically change your layout based upon resolution. <strong>(resize your screen and watch the layout change to a <code>row</code> on small breakpoints)</strong>' },
            { header: 'Nested grid', file: 'grid/6', desc: 'Grids can be nested, similar to other frameworks, in order to achieve very custom layouts.'},
            { header: 'Unique layouts', file: 'grid/7', desc: 'The power and flexiblity of the Vuetify grid system allows you to create amazing user interfaces.'}
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
                ]
              ]
            },
            'v-container/v-layout/v-flex': {
              params: [
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
                  'align-content-start',
                  'Boolean',
                  'False',
                  'Align content to the start.'
                ],
                [
                  'align-content-end',
                  'Boolean',
                  'False',
                  'Align content to the end.'
                ],
                [
                  'align-content-center',
                  'Boolean',
                  'False',
                  'Align content to the center.'
                ],
                [
                  'align-content-space-around',
                  'Boolean',
                  'False',
                  'Align content to the space around.'
                ],
                [
                  'align-content-space-between',
                  'Boolean',
                  'False',
                  'Align content to the space between.'
                ],
                [
                  'wrap',
                  'Boolean',
                  'False',
                  'Allows children to wrap within the container if the elements use more than 100%.'
                ],
                [
                  'fill-height',
                  'Boolean',
                  'False',
                  'Make sure that col element height is filled with parent and child. Important for Safari/Firefox if children is column element.'
                ],
                [
                  'display-helpers',
                  'Boolean',
                  'False',
                  'Specify to display an element as flex/inline-flex/block etc. Syntax is <code>d-{display-type}</code>. For example <code>d-flex</code>.'
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
                ['v-spacer', 'Spacer for flexbox grids']
              ]
            }
          }
        }
      }
    }
  }
</script>
