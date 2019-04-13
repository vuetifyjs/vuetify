// Components
import VBtn from '../VBtn'
import VIcon from '../VIcon'

// Helpers
import { parseHex } from '../../util/colorUtils'

// Types
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { VColorPickerColor, fromRgba, fromHex, fromHsla } from './util'

type Input = [string, number, number, string]

type Mode = {
  name: string
  inputs: Input[]
  from: Function
}

export default Vue.extend({
  name: 'v-color-picker-edit',

  props: {
    color: Object as PropValidator<VColorPickerColor>,
    disabled: Boolean
  },

  data: () => ({
    modes: [
      {
        name: 'rgba',
        inputs: [
          ['r', 0, 255, 'int'],
          ['g', 1, 255, 'int'],
          ['b', 2, 255, 'int'],
          ['a', 3, 1, 'float']
        ],
        from: fromRgba
      },
      {
        name: 'hsla',
        inputs: [
          ['h', 0, 360, 'int'],
          ['s', 1, 1, 'float'],
          ['l', 2, 1, 'float'],
          ['a', 3, 1, 'float']
        ],
        from: fromHsla
      },
      {
        name: 'hex',
        from: fromHex
      }
    ] as Mode[],
    mode: 'rgba'
  }),

  computed: {
    currentMode (): Mode {
      const index = this.modes.findIndex(m => m.name === this.mode)
      return this.modes[index]
    }
  },

  methods: {
    getValue (v: any, type: string) {
      if (type === 'float') return Math.round(v * 100) / 100
      else if (type === 'int') return Math.round(v)
      else return 0
    },
    parseValue (v: string, type: string) {
      if (type === 'float') return parseFloat(v)
      else if (type === 'int') return parseInt(v, 10) || 0
      else return 0
    },
    changeMode () {
      const index = this.modes.findIndex(m => m.name === this.mode)
      const newMode = this.modes[(index + 1) % this.modes.length]
      this.mode = newMode.name
    },
    genInput (target: string, attrs: any, value: any, on: any): VNode {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__input'
      }, [
        this.$createElement('input', {
          key: target,
          attrs,
          domProps: {
            value
          },
          on
        }),
        this.$createElement('span', target.toUpperCase())
      ])
    },
    genInputs (): VNode[] | VNode {
      switch (this.currentMode.name) {
        case 'hex': {
          const hex = this.color.hex
          const value = hex[3] === 'FF' ? hex.slice(0, -1) : hex
          return this.genInput(
            this.currentMode.name,
            {
              maxlength: 9,
              disabled: this.disabled
            },
            `#${value.join('')}`,
            {
              change: (e: Event) => {
                const el = e.target as HTMLInputElement
                this.$emit('update:color', this.currentMode.from(parseHex(el.value)))
              }
            }
          )
        }
        default: {
          return this.currentMode.inputs.map(([target, index, max, type]) => {
            const value = this.color[this.currentMode.name as keyof VColorPickerColor] as any[]
            return this.genInput(
              target,
              {
                type: 'number',
                min: 0,
                max,
                step: type === 'float' ? '0.01' : type === 'int' ? '1' : undefined,
                disabled: this.disabled
              },
              this.getValue(value[index], type),
              {
                input: (e: Event) => {
                  const el = e.target as HTMLInputElement
                  const newVal = this.parseValue(el.value || '0', type)

                  this.$emit('update:color', this.currentMode.from(value.map((oldVal: number, i: number) => i === index ? newVal : oldVal)))
                }
              }
            )
          })
        }
      }
    },
    genSwitch (): VNode {
      return this.$createElement(VBtn, {
        props: {
          small: true,
          icon: true,
          disabled: this.disabled
        },
        on: {
          click: this.changeMode
        }
      }, [
        this.$createElement(VIcon, '$vuetify.icons.unfold')
      ])
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-color-picker__edit'
    }, [
      this.genInputs(),
      this.genSwitch()
    ])
  }
})
