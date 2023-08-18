// Utilities
import { h, mergeProps, render, resolveComponent } from 'vue'

// Types
import type {
  Component,
  ComponentInternalInstance,
  ComponentPublicInstance,
  ConcreteComponent,
  DirectiveBinding,
  ObjectDirective,
  VNode,
} from 'vue'

export const useDirectiveComponent = (
  component: string | Component,
  props?: any
): ObjectDirective => {
  const concreteComponent = (typeof component === 'string'
    ? resolveComponent(component)
    : component) as ConcreteComponent

  return {
    mounted (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
      const { value } = binding

      // Get the children from the props or directive value, or the element's children
      const children = props.text || value.text || el.innerHTML

      // If vnode.ctx is the same as the instance, then we're bound to a plain element
      // and need to find the nearest parent component instance to inherit provides from
      const provides = (vnode.ctx === binding.instance!.$
        ? findComponentParent(vnode, binding.instance!.$)?.provides
        : vnode.ctx?.provides) ?? binding.instance!.$.provides

      const node = h(concreteComponent, mergeProps(props, value), children)
      node.appContext = Object.assign(
        Object.create(null),
        (binding.instance as ComponentPublicInstance).$.appContext,
        { provides }
      )

      render(node, el)
    },
    unmounted (el: HTMLElement) {
      render(null, el)
    },
  }
}

function findComponentParent (vnode: VNode, root: ComponentInternalInstance): ComponentInternalInstance | null {
  // Walk the tree from root until we find the child vnode
  const stack = new Set<VNode>()
  const walk = (children: VNode[]): boolean => {
    for (const child of children) {
      if (!child) continue

      if (child === vnode) {
        return true
      }

      stack.add(child)
      if (Array.isArray(child.children)) {
        const result = walk(child.children as VNode[])
        if (result) {
          return result
        }
      } else if (child.component?.vnode) {
        const result = walk([child.component?.subTree])
        if (result) {
          return result
        }
      }
      stack.delete(child)
    }

    return false
  }
  if (!walk([root.subTree])) {
    throw new Error('Could not find original vnode')
  }

  // Return the first component parent
  const result = Array.from(stack).reverse()
  for (const child of result) {
    if (child.component) {
      return child.component
    }
  }
  return root
}
