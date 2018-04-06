// Styles
import '../../stylus/components/_buttons.styl'

// Components
import VProgressCircular from '../VProgressCircular'

// Mixins
import Colorable from '../../mixins/colorable'
import Positionable from '../../mixins/positionable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'
import { inject as RegistrableInject } from '../../mixins/registrable'

import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export class VBtn extends mixins(
  Colorable,
  // Routable,
  Positionable,
  Themeable,
  // ToggleableFactory('inputValue'),
  // RegistrableInject('buttonGroup')
) {
  @Prop() block: boolean
  @Prop() depressed: boolean
  @Prop() fab: boolean
  @Prop() flat: boolean
  @Prop() icon: boolean
  @Prop() large: boolean
  @Prop() loading: boolean
  @Prop() outline: boolean
  @Prop() round: boolean
  @Prop() small: boolean
  @Prop() value: any

  @Prop({ default: 'btn--active' })
  activeClass: string

  @Prop({ default: true })
  ripple: boolean | object // TODO: ripple arg types

  @Prop({ default: 'button' })
  tag: string

  @Prop({ default: 'button' })
  type: string

  get classes () {
    const classes = {
      'btn': true,
      [this.activeClass]: this.isActive,
      'btn--absolute': this.absolute,
      'btn--block': this.block,
      'btn--bottom': this.bottom,
      'btn--disabled': this.disabled,
      'btn--flat': this.flat,
      'btn--floating': this.fab,
      'btn--fixed': this.fixed,
      'btn--hover': this.hover,
      'btn--icon': this.icon,
      'btn--large': this.large,
      'btn--left': this.left,
      'btn--loader': this.loading,
      'btn--outline': this.outline,
      'btn--depressed': (this.depressed && !this.flat) || this.outline,
      'btn--right': this.right,
      'btn--round': this.round,
      'btn--router': this.to,
      'btn--small': this.small,
      'btn--top': this.top,
      ...this.themeClasses
    }

    return (!this.outline && !this.flat)
      ? this.addBackgroundColorClassChecks(classes)
      : this.addTextColorClassChecks(classes)
  }

  // Prevent focus to match md spec
  click (e) {
    !this.fab &&
    e.detail &&
    this.$el.blur()

    this.$emit('click', e)
  }

  genContent () {
    return this.$createElement(
      'div',
      { 'class': 'btn__content' },
      [this.$slots.default]
    )
  }

  genLoader () {
    const children = []

    if (!this.$slots.loader) {
      children.push(this.$createElement(VProgressCircular, {
        props: {
          indeterminate: true,
          size: 26
        }
      }))
    } else {
      children.push(this.$slots.loader)
    }

    return this.$createElement('span', { 'class': 'btn__loading' }, children)
  }

  mounted () {
    if (this.buttonGroup) {
      this.buttonGroup.register(this)
    }
  }

  beforeDestroy () {
    if (this.buttonGroup) {
      this.buttonGroup.unregister(this)
    }
  }

  render (h) {
    const { tag, data } = this.generateRouteLink()
    const children = [this.genContent()]

    tag === 'button' && (data.attrs.type = this.type)
    this.loading && children.push(this.genLoader())

    data.attrs.value = ['string', 'number'].includes(typeof this.value)
      ? this.value
      : JSON.stringify(this.value)

    return h(tag, data, children)
  }
}
