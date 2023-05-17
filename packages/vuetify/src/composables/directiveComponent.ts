import { h, mergeProps, render, resolveComponent } from 'vue'
import type {
  Component,
  ComponentPublicInstance,
  ConcreteComponent,
  DirectiveBinding,
  ObjectDirective,
} from 'vue'

export const useDirectiveComponent = (
  component: string | Component,
  props?: any
): ObjectDirective => {
  const concreteComponent = (typeof component === 'string'
    ? resolveComponent(component)
    : component) as ConcreteComponent

  return {
    mounted (el: HTMLElement, binding: DirectiveBinding) {
      const { value } = binding

      // Get the children from the props or directive value, or the element's children
      const children = props.text || value.text || el.innerHTML

      const node = h(concreteComponent, mergeProps(props, value), children)
      node.appContext = Object.assign(
        Object.create(null),
        (binding.instance as ComponentPublicInstance).$.appContext,
        { provides: binding.instance!.$.provides }
      )

      render(node, el)
    },
    unmounted (el: HTMLElement) {
      render(null, el)
    },
  }
}
