---
meta:
  title: Scroll directive
  description: The scroll directive gives you the ability to conditionally invoke methods when the screen or an element are scrolled.
  keywords: scroll, vuetify scroll directive, vue scroll directive, window scroll directive
related:
  - /styles/scroll/
  - /directives/touch-support/
---

# Scroll directive

The `v-scroll` directive allows you to provide callbacks when the window, specified target or element itself (with `.self` modifier) is scrolled.

<entry-ad />

## Usage

The default behavior is to bind to the window. If no additional configuration options are needed, you can simply pass your callback function.

<example file="v-scroll/usage" />

## API

- [v-scroll](/api/v-scroll)

## Examples

### Options

#### Self

`v-scroll` targets the `window` by default but can also watch the element it's being bound to. In the following example we use the **self** modifier, `v-scroll.self`, to watch the [`v-card`](/components/cards) element specifically. This causes the method `onScroll` to invoke as you scroll the card contents; incrementing the counter.

<example file="v-scroll/option-self" />

#### Target

For a more fine tuned approach, you can designate the target to bind the scroll event listener.

<example file="v-scroll/option-target" />

<backmatter />
