<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    name: 'buttons-view',

    data () {
      return {
        doc: {
          component: 'buttons',
          edit: 'ButtonsView',
          title: 'Button',
          desc: `
            <p>
              The <code>v-btn</code> component replaces the standard html button with a material design theme and a multitude of options. Any color helper class can be used to alter the background or text color. Remember that all event captures must be done using the <strong>.native</strong> modifier.
            </p>
          `,
          examples: [
            { header: "Flat", file: "buttons/1", desc: ``},
            { header: "Raised", file: "buttons/2", desc: ``},
            { header: "Button Dropdown Variants", file: "buttons/4", desc: `Button dropdowns are regular selects with additional styling.` },
            { header: "Button Toggle", file: "buttons/5", desc: `Toggle buttons are essentially styled radio or checkboxes, depending on the properties selected. This component is compatible with the <code>v-toolbar</code> component.`},
            { header: "Icon", file: "buttons/6", desc: `Icons can be used for the primary content of a button.`},
            // { header: "App Bar", file: "buttons/7", desc: `The application bar is useful for mimicing the design of a native application.`},
            { header: "Floating", file: "buttons/8", desc: `Floating buttons are round and usually contain an icon.`},
            { header: "Loaders", file: "buttons/9", desc: `Using the loading prop, you can notify a user that there is processing taking place. The default behavior is to use a <code>v-progress-circular</code> component but this can be customized.`},
            { header: "Sizing", file: "buttons/10", desc: `Buttons can be given different sizing options to fit a multitude of scenarios.`},
            { header: "Outline", file: "buttons/11", desc: `Outline buttons inherit their borders from the current color applied.`},
            { header: "Round", file: "buttons/12", desc: `Rounded buttons behave the same as regular buttons but have rounded edges.`},
            { header: "Block", file: "buttons/13", desc: `Block buttons extend the full available width.`},
          ],
          props: {
            'v-btn': {
              shared: ['theme', 'contextual', 'router', 'positionable'],
              model: {
                types: ['Boolean'],
                default: 'False'
              },
              params: [
                [
                  'active-class',
                  'String',
                  'btn--active',
                  'Applies the .btn--active class. This does not alter the button style, but can be used for hooking into.'
                ],
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
                  'floating',
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
                  'raised',
                  'Boolean',
                  'True',
                  'Applies the raised style'
                ]
              ]
            },
            'v-btn-toggle': {
              params: [
                [
                  'items',
                  'Array',
                  '[]',
                  'Item Props: [text, icon, value]'
                ],
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
                types: ['String'],
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
