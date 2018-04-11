import Vue from 'vue'
import Ripple from '../directives/ripple'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Location } from 'vue-router'
import { consoleWarn } from '../util/console'
import { VNodeData } from 'vue/types/vnode'

declare type classObject = { [name: string]: boolean }

@Component({
  directives: {
    Ripple
  },
})
export default class Routable extends Vue {
  @Prop() activeClass!: string
  @Prop() append!: boolean
  @Prop() disabled!: boolean
  @Prop({ default: undefined })
  exact!: boolean
  @Prop() exactActiveClass!: string
  @Prop() href!: string
  @Prop({ type: [String, Object] })
  to!: string | Location
  @Prop() nuxt!: boolean
  @Prop() replace!: boolean
  @Prop() ripple!: boolean | object // TODO: ripple settings type
  @Prop() tag!: string
  @Prop() target!: string

  get classes (): classObject {
    consoleWarn('Routable.classes must be overridden', this)
    return {}
  }

  click (e: MouseEvent): void {
    consoleWarn('Routable.click must be overridden', this)
  }
  generateRouteLink () {
    let exact = this.exact
    let tag

    const data = {
      attrs: {
        disabled: this.disabled
      } as {
        href?: string
        target?: string
        type?: string
        value?: string
      },
      class: this.classes,
      props: {},
      directives: [{
        name: 'ripple',
        value: (this.ripple && !this.disabled) ? this.ripple : false
      }],
      [this.to ? 'nativeOn' : 'on']: {
        ...this.$listeners,
        click: this.click
      }
    }

    if (typeof this.exact === 'undefined') {
      exact = this.to === '/' ||
        (this.to === Object(this.to) && typeof this.to !== 'string' && this.to.path === '/')
    }

    if (this.to) {
      // Add a special activeClass hook
      // for component level styles
      let activeClass = this.activeClass
      let exactActiveClass = this.exactActiveClass || activeClass

      if ((this as any).proxyClass) {
        activeClass += ' ' + (this as any).proxyClass
        exactActiveClass += ' ' + (this as any).proxyClass
      }

      tag = this.nuxt ? 'nuxt-link' : 'router-link'
      Object.assign(data.props, {
        to: this.to,
        exact,
        activeClass,
        exactActiveClass,
        append: this.append,
        replace: this.replace
      })
    } else {
      tag = (this.href && 'a') || this.tag || 'a'

      if (tag === 'a') {
        if (this.href) data.attrs.href = this.href
        if (this.target) data.attrs.target = this.target
      }
    }

    return { tag, data }
  }
}
