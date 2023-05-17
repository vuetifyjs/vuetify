import type {
  AppContext,
  Component,
  ComponentPublicInstance,
  ConcreteComponent,
  DirectiveBinding,
  ObjectDirective,
  VNode,
} from 'vue'
import { h, render, resolveComponent } from 'vue'

// Function to render the main component
const renderComponent = (
  component: Component,
  children: VNode[] | string,
  props: any,
  appContext: AppContext
) => {
  const result = h(component as Component, props, children)
  result.appContext = appContext
  return result
}

// Function to render VLayout component if necessary
const renderVLayoutComponent = (
  component: Component,
  layoutComponent: Component,
  children: VNode
) => {
  // Check if the component has a 'name' prop that includes 'layout'
  if (
    (component as ConcreteComponent).props?.name &&
    ((component as ConcreteComponent).props?.name.source as string).includes(
      'layout'
    )
  ) {
    // Render the component within VLayout
    const result = h(layoutComponent, null, {
      default: () => [children],
    })
    // Set the appContext to maintain reactivity
    result.appContext = children.appContext
    return result
  }

  return children
}

export const useDirectiveComponent = (
  component: string | Component,
  props?: any
): ObjectDirective => {
  // Resolve the component if it's a string
  if (typeof component === 'string') {
    component = resolveComponent(component)
  }

  // Resolve the VLayout component
  const VLayout = resolveComponent('VLayout')

  return {
    mounted (el: HTMLElement, binding: DirectiveBinding) {
      const { value } = binding

      // Get the children from the props or directive value, or the element's children
      const children = props.text || value.text || el.innerHTML

      // Render the main component with the children, props, and appContext
      let element = renderComponent(
        component as Component,
        children,
        { ...props, ...value },
        (binding.instance as ComponentPublicInstance).$.appContext
      )

      // Render the component within VLayout if necessary
      element = renderVLayoutComponent(
        component as Component,
        VLayout as Component,
        element
      )

      render(element, el)
    },
    unmounted (el: HTMLElement) {
      render(null, el)
    },
  }
}
