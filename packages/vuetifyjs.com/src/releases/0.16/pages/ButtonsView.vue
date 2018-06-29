<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    name: 'buttons-view',

    data () {
      return {
        doc: {
          component: 'VBtn',
          edit: 'ButtonsView',
          title: 'Button',
          desc: `
            <p>
              The <code>v-btn</code> component replaces the standard html button with a material design theme and a multitude of options. Any color helper class can be used to alter the background or text color.
            </p>
          `,
          examples: [
            { header: "Flat", file: "buttons/flat", desc: ``},
            { header: "Raised", file: "buttons/raised", desc: ``},
            { header: "Button Dropdown Variants", file: "buttons/dropdown", desc: `Button dropdowns are regular selects with additional styling.` },
            { header: "Button Toggle", file: "buttons/toggle", desc: `Toggle buttons are essentially styled radio or checkboxes, depending on the properties selected. This component is compatible with the <code>v-toolbar</code> component.`},
            { header: "Icon", file: "buttons/icon", desc: `Icons can be used for the primary content of a button.`},
            // { header: "App Bar", file: "buttons/app-bar", desc: `The application bar is useful for mimicking the design of a native application.`},
            { header: "Floating", file: "buttons/floating", desc: `Floating buttons are round and usually contain an icon.`},
            { header: "Loaders", file: "buttons/loaders", desc: `Using the loading prop, you can notify a user that there is processing taking place. The default behavior is to use a <code>v-progress-circular</code> component but this can be customized.`},
            { header: "Sizing", file: "buttons/sizing", desc: `Buttons can be given different sizing options to fit a multitude of scenarios.`},
            { header: "Outline", file: "buttons/outline", desc: `Outline buttons inherit their borders from the current color applied.`},
            { header: "Round", file: "buttons/round", desc: `Rounded buttons behave the same as regular buttons but have rounded edges.`},
            { header: "Block", file: "buttons/block", desc: `Block buttons extend the full available width.`},
          ],
          props: {
            'v-btn': {
              shared: ['theme', 'colorable', 'contextual', 'router', 'positionable'],
              params: [
                [
                  'block',
                  'Boolean',
                  'False',
                  'Button will have 100% width'
                ],
                [
                  'flat',
                  'Boolean',
                  'False',
                  'Applies the flat style'
                ],
                [
                  'fab',
                  'Boolean',
                  'False',
                  'Applies the floating / round style'
                ],
                [
                  'icon',
                  'Boolean',
                  'False',
                  'Designates the button as icon - round and flat'
                ],
                [
                  'small',
                  'Boolean',
                  'False',
                  'Small size button',
                ],
                [
                  'large',
                  'Boolean',
                  'False',
                  'Large size button'
                ],
                [
                  'loading',
                  'Boolean',
                  'False',
                  'Adds a loading icon animation'
                ],
                [
                  'outline',
                  'Boolean',
                  'False',
                  'Button will have an outline'
                ],
                [
                  'round',
                  'Boolean',
                  'False',
                  'Button will be round on the sides'
                ],
                [
                  'depressed',
                  'Boolean',
                  'True',
                  'Removes the button box shadow'
                ],
                [
                  'ripple',
                  '[Boolean, Object]',
                  'True',
                  'Applies ripple effect'
                ]
              ]
            },
            'v-btn-toggle': {
              shared: ['theme'],
              params: [
                [
                  'multiple',
                  'Boolean',
                  'False',
                  'Designates the toggle accepts and returns an array'
                ],
                [
                  'mandatory',
                  'Boolean',
                  'False',
                  'Makes it so that at least one button must be toggle on'
                ],
                [
                  'input-value',
                  '',
                  '-',
                  'Custom prop for v-model instead of <code>value</code>'
                ]
              ],
              model: {
                type: ['Array', 'String', 'Number'],
                default: '-',
                description: 'Holds the value(s) for toggled buttons. '
              }
            }
          },
          slots: {
            'v-btn': {
              default: true,
              params: [
                [
                  'loader',
                  'Used for specifying custom loader'
                ]
              ]
            }
          },
          events: {
            'v-btn-toggle': {
              params: [
                ['change', 'Array, String, Number', 'Selected button(s)']
              ]
            },
          }
        }
      }
    }
  }
</script>
