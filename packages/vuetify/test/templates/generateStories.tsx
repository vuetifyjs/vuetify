/**
 * Utilities for generating formatted mount functions
 * Some utility functions for mounting these generated examples inside of tests
 */
import type { FunctionalComponent } from 'vue'
import type { JSXComponent } from '@/composables'
import { it } from 'vitest'
import { commands, page } from '@vitest/browser/context'
import { render } from '@test'

type Stories = Record<string, JSX.Element>
type Props = Record<string, boolean | any[]>
type GenerateConfiguration = {
  props: Props
  component: JSXComponent
  stories?: Stories
} | {
  props?: never
  component?: never
  stories: Stories
}

type Example = {
  name: string
  mount: () => JSX.Element
}

/** Utility components */
const title = (key: string) => <h4 class="my-4">{ key }</h4>

// Spacing between content
const grid = (content: JSX.Element | JSX.Element[]) => <div style="display: flex; gap: 0.8rem;">{ content }</div>

// Spacing between mounted components
const Wrapper: FunctionalComponent = (_, { slots }) => <div class="ma-4">{ slots.default?.() }</div>

/**
 * Generate an array of Examples by iterating over Stories.
 * @param stories An object where the key is the name of the story and the value is the component to be rendered.
 * @returns An array of Examples, where the name of the story is formatted.
 * @example makeExamplesFromStories({
    'small success button': <VBtn color="success" size="small">Done!</VBtn>
  })
 */
export const makeExamplesFromStories = (stories: Stories): Example[] => {
  return Object.entries(stories).map(([key, value]) => {
    return {
      name: key,
      mount: () => (
        <Wrapper>
          { title(key) }
          { grid(value) }
        </Wrapper>
      ),
    }
  })
}

/**
 * Generate a list of Examples by iterating over all passed in Props.
 * @param props A configuration object of props to call
 * @param Component The component to be mounted with those specific props.
 * @returns
 * @example makeExamplesFromProps({
    color: ['success', 'error' ],
    icon: true
   }, VBtn)
 */
export const makeExamplesFromProps = (props: Props, Component: JSXComponent): Example[] => {
  return Object.entries(props).map(([key, value]) => {
    // Collect an array of examples by prop.
    const variants: JSX.Element[] = []

    // Props with boolean values should be rendered with both their true/false states
    if (typeof value === 'boolean') {
      variants.push(<Component { ...{ [key]: true } }>Is { key }</Component>)
      variants.push(<Component { ...{ [key]: false } }>Is not { key }</Component>)
    } else if (Array.isArray(value)) {
      // Props with array values should be iterated over
      value.forEach(v => {
        variants.push(<Component { ... { [key]: v } }>{ v }</Component>)
      })
    }

    return {
      name: key,
      mount: () => (
        <Wrapper>
          { title(key) }
          { grid(variants) }
        </Wrapper>
      ),
    }
  })
}

/**
 * Generate a single `it` block with all of the stories and examples passed in
 * @param configuration
 * @returns
 */
export const generate = ({ props, stories, component }: GenerateConfiguration) => {
  let exampleStories: Example[]
  let exampleProps: Example[]
  if (stories) {
    exampleStories = makeExamplesFromStories(stories)
  }

  if (props && !component) { throw new Error('Cannot generate examples from props without a component') }
  if (props && component) {
    exampleProps = makeExamplesFromProps(props, component)
  }

  return it('renders everything', async () => {
    await page.viewport(1280, 825)

    render(() => (
      <>
        { exampleStories && (
          <>
            <h2 class="mx-4 mt-10 mb-4">Stories</h2>
            { exampleStories.map(s => s.mount()) }
          </>
        )}
        { exampleProps && (
          <>
            <h2 class="mx-4 mt-10 mb-4">Props</h2>
            { exampleProps.map(s => s.mount()) }
          </>
        )}
      </>
    ))

    let suite = (globalThis as any).__vitest_worker__.current
    let name = ''
    while (suite) {
      name = suite.name + ' ' + name
      suite = suite.suite
    }

    await commands.percySnapshot(name.trim())
    await page.screenshot()
  })
}

/**
 * Generate one `it` block per example passed in
 * @param stories
 * @returns
 */
export const generateByExample = (stories: Stories) => {
  return makeExamplesFromStories(stories).map(({ name, mount }) => {
    return it(name, () => {
      render(mount)
    })
  })
}

/**
 * Generate one `it` block per prop passed in and render all applicable variants for those props
 * @param props
 * @param component
 * @returns
 */
export const generateByProps = (props: Props, component: JSXComponent) => {
  return makeExamplesFromProps(props, component).map(({ mount, name }) => {
    return it(name, () => {
      render(mount)
    })
  })
}
