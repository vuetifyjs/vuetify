// Utilities
import { h, mergeProps, render, resolveComponent } from 'vue'
import { isObject } from '@/util'

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
import type { ComponentInstance } from '@/util'

type ExcludeProps =
  | 'v-slots'
  | `v-slot:${string}`
  | `on${Uppercase<string>}${string}`
  | 'key'
  | 'ref'
  | 'ref_for'
  | 'ref_key'
  | '$children'

declare const CustomDirectiveSymbol: unique symbol
type DirectiveHook<B extends DirectiveBinding> = (el: any, binding: B, vnode: VNode<any, any>, prevVNode: VNode<any, any>) => void
export interface CustomDirective<B extends DirectiveBinding = DirectiveBinding> {
  created?: DirectiveHook<B>
  beforeMount?: DirectiveHook<B>
  mounted?: DirectiveHook<B>
  beforeUpdate?: DirectiveHook<B>
  updated?: DirectiveHook<B>
  beforeUnmount?: DirectiveHook<B>
  unmounted?: DirectiveHook<B>
  [CustomDirectiveSymbol]: true
}

export function useDirectiveComponent <
  Binding extends DirectiveBinding,
> (component: string | Component, props?: (binding: Binding) => Record<string, any>): CustomDirective<Binding>
export function useDirectiveComponent <
  C extends Component,
  Props = Omit<ComponentInstance<C>['$props'], ExcludeProps>
> (component: string | C, props?: Record<string, any>): ObjectDirective<any, Props>
export function useDirectiveComponent (
  component: string | Component,
  props?: Record<string, any> | ((binding: DirectiveBinding) => Record<string, any>)
): ObjectDirective | CustomDirective {
  const concreteComponent = (typeof component === 'string'
    ? resolveComponent(component)
    : component) as ConcreteComponent

  const hook = mountComponent(concreteComponent, props)

  return {
    mounted: hook,
    updated: hook,
    unmounted (el: HTMLElement) {
      render(null, el)
    },
  }
}

function mountComponent (component: ConcreteComponent, props?: Record<string, any> | ((binding: DirectiveBinding) => Record<string, any>)) {
  return function (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const _props = typeof props === 'function' ? props(binding) : props
    const text = binding.value?.text ?? binding.value ?? _props?.text
    const value = isObject(binding.value) ? binding.value : {}

    // Get the children from the props or directive value, or the element's children
    const children = () => text ?? el.innerHTML

    // If vnode.ctx is the same as the instance, then we're bound to a plain element
    // and need to find the nearest parent component instance to inherit provides from
    const provides = (vnode.ctx === binding.instance!.$
      ? findComponentParent(vnode, binding.instance!.$)?.provides
      : vnode.ctx?.provides) ?? binding.instance!.$.provides

    const node = h(component, mergeProps(_props, value), children)
    node.appContext = Object.assign(
      Object.create(null),
      (binding.instance as ComponentPublicInstance).$.appContext,
      { provides }
    )

    render(node, el)
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
      let result
      if (child.suspense) {
        result = walk([child.ssContent!])
      } else if (Array.isArray(child.children)) {
        result = walk(child.children as VNode[])
      } else if (child.component?.vnode) {
        result = walk([child.component?.subTree])
      }
      if (result) {
        return result
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
