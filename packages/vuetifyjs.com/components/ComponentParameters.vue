<template lang="pug">
  v-card.component-parameters
    v-card-title
      v-select(
        label="Component"
        hide-details
        single-line
        v-bind:items="items"
        v-model="component"
        auto
      )
      v-spacer
      v-spacer.hidden-sm-and-down
      v-text-field(
        append-icon="search"
        label="Search..."
        single-line
        hide-details
        v-model="search"
      )
    v-card-text(v-if="addedProps.length || removedProps.length")
      template(v-if="addedProps.length")
        .title Not documented
        ul
          li(v-for="prop in addedProps") {{ prop }}
      template(v-if="removedProps.length")
        .title Removed
        ul
          li(v-for="prop in removedProps") {{ prop }}
    v-data-table(
      v-bind:headers="headers"
      v-bind:search="search"
      v-bind:items="table"
    )
      template(slot="items" slot-scope="{ item }")
        td(
          v-for="(opt, i) in item"
          v-bind:key="i"
          v-html="opt"
        )
</template>

<script>
  import Vue from 'vue'

  const hyphenateRE = /\B([A-Z])/g
  const hyphenate = str => (
    str.replace(hyphenateRE, '-$1').toLowerCase()
  )

  export default {
    name: 'component-parameters',

    data () {
      return {
        component: Object.keys(this.data)[0],
        search: '',
        addedProps: [],
        removedProps: [],
        shared: {
          app: this.makeApp(),
          dialog: this.makeDialog(),
          contextual: this.makeContextual(),
          router: this.makeRouter(),
          default: this.makeSlot(),
          delayable: this.makeDelayable(),
          theme: this.makeTheme(),
          input: this.makeInput(),
          label: this.makeLabel(),
          lazy: this.makeLazy(),
          loadable: this.makeLoadable(),
          progress: this.makeProgress(),
          overlay: this.makeOverlay(),
          detachable: this.makeDetach(),
          positionable: this.makePosition(),
          transitionable: this.makeTransition(),
          colorable: this.makeColorable(),
          filterable: this.makeFilter(),
          menu: this.makeMenu(),
          mask: this.makeMask()
        }
      }
    },

    props: {
      id: String,
      headers: Array,
      data: Object,
      type: String
    },

    computed: {
      items () {
        return Object.keys(this.data)
      },
      table () {
        return this.parseComponent(this.data[this.component])
      }
    },

    methods: {
      parseComponent (c) {
        let params = []

        c.shared && c.shared.forEach(s => {
          params = params.concat(this.shared[s])
        })

        params = Array.from(new Set(params.map(JSON.stringify))).map(JSON.parse)

        params = params.concat(c.params || [])

        if (c.model) {
          params.push(this.makeModel('v-model', 'Controls visibility', c.model))
        }

        if (process.env.NODE_ENV === 'development' && this.type === 'props') {
          this.findMissed(params)
        }

        return params.map(d => {
          return {
            prop: `<code>${d[0]}</code>`,
            type: d[1],
            default: d[2],
            desc: d[3]
          }
        })
      },
      findMissed (params) {
        const instance = new (Vue.extend(Vue.component(this.component)))()
        const knownProps = params.map(p => p[0])
        const actualProps = instance.$props ? Object.keys(instance.$props).map(_ => hyphenate(_)) : []
        const added = actualProps.filter(p => !knownProps.includes(p))
        const removed = knownProps.filter(p => !actualProps.includes(p) && p !== 'v-model')

        this.addedProps = added
        this.removedProps = removed
      },
      makeApp () {
        return [
          [
            'app',
            'Boolean',
            'False',
            'Designates the component as part of the application layout. Used for dynamically adjusting content sizing'
          ]
        ]
      },
      makeDelayable () {
        return [
          [
            'open-delay',
            '[Number, String]',
            '0',
            'Delay (in ms) after which menu opens (when open-on-hover prop is set to true)'
          ],
          [
            'close-delay',
            '[Number, String]',
            '200',
            'Delay (in ms) after which menu closes (when open-on-hover prop is set to true)'
          ],
        ]
      },
      makeLazy () {
        return [
          [
            'lazy',
            'Boolean',
            'False',
            'Conditionally renders content on mounted'
          ]
        ]
      },
      makeMask () {
        return [
          [
            'mask',
            'String',
            'null',
            'Apply a custom character mask to the input. See mask table above for more information'
          ],
          [
            'dont-fill-mask-blanks',
            'Boolean',
            'False',
            'Disables the automatic character display when typing'
          ],
          [
            'return-masked-value',
            'Boolean',
            'False',
            'Returns the unmodified masked string'
          ]
        ]
      },
      makeMenu () {
        return [
          [
            'activator',
            '[String, Object]',
            'null',
            'Designate a custom activator when the <strong>activator</strong> slot is not used. String can be any valid querySelector and Object can be any valid Node'
          ],
          [
            'allow-overflow',
            'Boolean',
            'False',
            'Removes overflow re-positioning for the content'
          ],
          [
            'content-class',
            'String',
            'null',
            'A custom class applied to the detached content'
          ],
          [
            'min-width',
            '[Number, String]',
            'null',
            `Set's the minimum width for the content`
          ],
          [
            'offset-overflow',
            'Boolean',
            'False',
            `Causes the component to flip to the opposite side when repositioned due to overflow`
          ],
          [
            'max-width',
            '[Number, String]',
            'null',
            `Set's the maximum width for the content`
          ],
          [
            'top',
            'Boolean',
            'False',
            'Designates content to open up'
          ],
          [
            'right',
            'Boolean',
            'False',
            'Designates content to open right'
          ],
          [
            'bottom',
            'Boolean',
            'False',
            'Designates content to open down'
          ],
          [
            'left',
            'Boolean',
            'False',
            'Designates content to open left'
          ],
          [
            'nudge-top',
            'Number',
            '0',
            'Nudge the content from the top'
          ],
          [
            'nudge-bottom',
            'Number',
            '0',
            'Nudge the content from the bottom'
          ],
          [
            'nudge-left',
            'Number',
            '0',
            'Nudge the content from the left'
          ],
          [
            'nudge-right',
            'Number',
            '0',
            'Nudge the content from the right'
          ],
          [
            'nudge-width',
            'Number',
            '0',
            'Nudge the content width'
          ],
          [
            'position-x',
            'Number',
            '0',
            'Used to position the content when not using an activator slot'
          ],
          [
            'position-y',
            'Number',
            '0',
            'Used to position the content when not using an activator slot'
          ]
        ]
      },
      makeDialog () {
        return [
          [
            'persistent',
            'Boolean',
            'False',
            'Clicking outside will not dismiss the dialog'
          ],
          [
            'lazy',
            'Boolean',
            'False',
            'Lazily load dialog contents'
          ],
          [
            'scrollable',
            'Boolean',
            'False',
            'When set to true, expects a card, card-title, card-text and card-actions. Additionally card-text should have specified height. Will set card-text to overflow-y'
          ],
          [
            'disabled',
            'Boolean',
            'False',
            'Disabled the ability to open the dialog.'
          ],
          [
            'max-width',
            '[String, Number]',
            '290',
            'The maximum width the content'
          ],
          [
            'full-width',
            'Boolean',
            'False',
            'Specifies the modal to force 100% width'
          ]
        ]
      },
      makeFilter () {
        return [
          [
            'no-data-text',
            'String',
            'No data available',
            'Display text when there is no data'
          ],
          [
            'filter',
            'Function',
            'See component file',
            'The function used for filtering items'
          ]
        ]
      },
      makeDetach () {
        return [[
          'content-class', 'String', '-', 'Applies a custom class to the detached element. This is useful because the content is moved to the end of the app and is not targettable by classes passed directly on the component.'
        ]]
      },
      makePosition () {
        return [
          ['absolute', 'Boolean', 'False', 'Position the component absolutely.'],
          ['bottom', 'Boolean', 'False', 'Align the component towards the bottom.'],
          ['fixed', 'Boolean', 'False', 'Position the component fixed.'],
          ['right', 'Boolean', 'False', 'Align the component towards the right.'],
          ['left', 'Boolean', 'False', 'Align the component towards the left.'],
          ['top', 'Boolean', 'False', 'Align the component towards the top.'],
        ]
      },
      makeSlot () {
        return [[
          'default',
          'Default Vue slot'
        ]]
      },
      makeTransition () {
        return [
          ['mode', 'String', '-', 'Sets the transition mode (does not apply to transition-group)'],
          ['origin', 'String', '-', 'Sets the transition origin'],
          ['transition', 'String', '-', 'Sets the component transition. Can be one of the built in transitions or your own.']
        ]
      },
      makeModel (text, description, model) {
        if (!model) return false

        return [
          text,
          Array.isArray(model.type) ? model.type.join(', ') : model.type,
          model.default || '-',
          model.description ? model.description : description
        ]
      },
      makeContextual () {
        return ['primary', 'secondary', 'success', 'info', 'warning', 'error'].map(c => {
          return [ c, 'Boolean', 'False', `Applies the ${c} contextual color (DEPRECATED - use <code>color</code> prop instead)` ]
        })
      },
      makeLabel () {
        return [[
          'label',
          'Label slot'
        ]]
      },
      makeProgress () {
        return [[
          'progress',
          'Slot for custom progress linear (displayed when <code>loading</code> prop is not equal to <code>false</code>'
        ]]
      },
      makeLoadable () {
        return [[
          'loading',
          '[Boolean, String]',
          'False',
          'Displays linear progress bar. Can either be a String which specifies which color is applied to the progress bar (any material color or theme color - primary, secondary, success, info, warning, error) or a Boolean which uses the component color (set by <code>color</code> prop - if it\'s supported by the component) or the primary color'
        ]]
      },
      makeTheme () {
        return [
          [
            'dark',
            'Boolean',
            'True',
            'Applies a dark tint to the content - light themes'
          ],
          [
            'light',
            'Boolean',
            'True',
            'Applies a light tint to the content - dark themes'
          ]
        ]
      },
      makeRouter () {
        return [
          [
            'active-class',
            'String',
            'varies',
            'Class bound when component is active. <strong class="red--text">warning</strong> Depending upon the component, this could cause side effects. If you need to add a custom class on top of a default, just do <code>active-class="default-class your-class"</code>'
          ],
          [
            'append',
            'Boolean',
            'False',
            'Vue Router router-link prop'
          ],
          [
            'disabled',
            'Boolean',
            'False',
            'List tile is disabled'
          ],
          [
            'exact',
            'Boolean',
            'False',
            'Exactly match the link. Without this, "/" will match every route'
          ],
          [
            'href',
            'String, Object',
            'javascript:;',
            'For router, this is passed to the "to" prop'
          ],
          [
            'to',
            'String, Object',
            'javascript:;',
            'For router, this is passed to the "to" prop'
          ],
          [
            'target',
            'String',
            '-',
            'Specify the target attribute, only works with anchor tag.'
          ],
          [
            'nuxt',
            'Boolean',
            'False',
            'Specifies the link is a nuxt-link'
          ],
          [
            'replace',
            'Boolean',
            'False',
            'Vue Router router-link prop'
          ],
          [
            'ripple',
            'Boolean',
            'False',
            'Applies ripple effect'
          ],
          [
            'tag',
            'String',
            'a',
            'Use a custom tag for the list tile'
          ]
        ]
      },
      makeInput () {
        return [
          [
            'append-icon',
            'String',
            '-',
            'Append material icon'
          ],
          [
            'append-icon-cb',
            'Function',
            '-',
            'Callback for appended icon'
          ],
          [
            'error',
            'Boolean',
            'False',
            'Puts the input in a manual error state'
          ],
          [
            'error-messages',
            'Array',
            '[]',
            'Puts the input in an error state and passes through custom error messsages. Will be combined with any validations that occur from the <code>rules</code> prop. This field will not trigger validation.'
          ],
          [
            'prepend-icon',
            'String',
            '-',
            'Prepend material icon'
          ],
          [
            'prepend-icon-cb',
            'Function',
            '-',
            'Callback for prepended icon'
          ],
          [
            'light',
            'Boolean',
            'True',
            'Applies a light tint to the content - dark themes'
          ],
          [
            'dark',
            'Boolean',
            'True',
            'Applies a dark tint to the content - light themes'
          ],
          [
            'disabled',
            'Boolean',
            'False',
            'Disables the input'
          ],
          [
            'hint',
            'String',
            '-',
            'Hint text'
          ],
          [
            'persistent-hint',
            'Boolean',
            'False',
            'Forces hint visible'
          ],
          [
            'label',
            'String',
            '-',
            'Sets input label'
          ],
          [
            'required',
            'Boolean',
            'False',
            'Designates the input as required. Does not perform any validation.'
          ],
          [
            'rules',
            'Array',
            '[]',
            "Array of functions that return either True or a String with an error message"
          ],
          [
            'tabindex',
            'Number',
            '0',
            'Tabindex of input'
          ],
          [
            'placeholder',
            'String',
            '-',
            'Placeholder text'
          ],
          [
            'hide-details',
            'Boolean',
            'False',
            'Hides hint, validation errors'
          ],
          [
            'toggle-keys',
            'Array',
            '[13, 32]',
            "Array of key codes that will toggle the input (if it supports toggling)"
          ],
          [
            'validate-on-blur',
            'Boolean',
            'false',
            'Delays validation until blur event'
          ]
        ]
      },
      makeOverlay () {
        return [
          [
            'hide-overlay',
            'Boolean',
            'False',
            'Hide the display of the overlay'
          ]
        ]
      },
      makeColorable () {
        return [
          [
            'color',
            'String',
            '-',
            'Applies specified color to the control'
          ]
        ]
      }
    }
  }
</script>

<style lang="stylus">
  .component-parameters
    box-shadow: none
    code
      white-space: nowrap
</style>
