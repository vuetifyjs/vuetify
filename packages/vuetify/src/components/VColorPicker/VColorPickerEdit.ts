// Components
import VBtn from '../VBtn'
import VIcon from '../VIcon'

// Types
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { RGBAtoHSVA, HSVAtoRGBA, HSVA, HSVAtoHSLA, HSLAtoHSVA, colorEqual } from '../../util/colorUtils'

type Input = [string, number, number, string]

type Mode = {
  name: string
  inputs: Input[]
  from: Function
  to: Function
}

export default Vue.extend({
  name: 'v-color-picker-edit',

  props: {
    color: Array as PropValidator<HSVA>
  },

  data: () => ({
    internalColor: [0, 0, 0, 1],
    modes: [
      {
        name: 'rgba',
        inputs: [
          ['r', 0, 255, 'int'],
          ['g', 1, 255, 'int'],
          ['b', 2, 255, 'int'],
          ['a', 3, 1, 'float']
        ],
        from: RGBAtoHSVA,
        to: HSVAtoRGBA
      },
      {
        name: 'hsla',
        inputs: [
          ['h', 0, 360, 'int'],
          ['s', 1, 1, 'float'],
          ['l', 2, 1, 'float'],
          ['a', 3, 1, 'float']
        ],
        from: HSLAtoHSVA,
        to: HSVAtoHSLA
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

  watch: {
    color: {
      handler (v: number[]) {
        this.internalColor = this.currentMode.to(v)
      },
      immediate: true
    },
    internalColor: {
      handler (v: number[]) {
        const hsva = this.currentMode.from(v)
        if (colorEqual(hsva, this.color)) return
        this.$emit('update:color', hsva)
      }
    }
  },

  methods: {
    parseValue (v: string, type: string) {
      if (type === 'float') return parseFloat(v)
      else if (type === 'int') return parseInt(v, 10) || 0
      else return 0
    },
    changeMode () {
      const value = this.currentMode.from(this.internalColor)
      const index = this.modes.findIndex(m => m.name === this.mode)
      const newMode = this.modes[(index + 1) % this.modes.length]
      this.mode = newMode.name
      this.internalColor = newMode.to(value)
    },
    genInput (target: string, index: number, maxlength: number, type: string): VNode {
      const value: number = this.internalColor[index]

      return this.$createElement('div', {
        staticClass: 'v-color-picker__input'
      }, [
        this.$createElement('input', {
          key: target,
          attrs: {
            // type: type !== 'hex' ? 'number' : 'text',
            max: type !== 'hex' && maxlength,
            maxlength: type === 'hex' && maxlength,
            step: type === 'float' ? '0.01' : type === 'int' ? '1' : undefined
          },
          domProps: {
            value: type === 'int' ? Math.round(value) : Math.round(value * 100) / 100
          },
          on: {
            change: (e: Event) => {
              const el = e.target as HTMLInputElement
              const newVal = this.parseValue(el.value || '0', type)
              this.internalColor = this.internalColor.map((oldVal: number, i: number) => i === index ? newVal : oldVal)
            }
          }
        }),
        this.$createElement('span', target.toUpperCase())
      ])
    },
    genInputs (): VNode[] {
      return this.currentMode.inputs.map(input => this.genInput(...input))
    },
    genSwitch (): VNode {
      return this.$createElement(VBtn, {
        props: {
          small: true,
          icon: true
        },
        on: {
          click: this.changeMode
        }
      }, [
        this.$createElement(VIcon, ['home'])
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
