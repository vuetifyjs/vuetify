---
meta:
  title: Ripple directive
  description: The ripple directive adds touch and click feedback to any element in the form of a water ripple.
  keywords: ripples, ink, vuetify ripple directive, vue ripple directive
related:
  - /components/buttons/
  - /components/expansion-panels/
  - /styles/transitions/
---

# Ripple directive

The `v-ripple` directive is used to show action from a user. It can be applied to any block level element. Numerous components come with the ripple directive built in, such as the `v-btn`, `v-tabs-item` and many more.

<entry-ad />

## Usage

Basic ripple functionality can be enabled just by using `v-ripple` directive on a component or an HTML element

<example file="v-ripple/usage" />

## API

- [v-ripple](/api/v-ripple)

## Examples

### Options

#### Center

When a `center` option is used ripple will always originate from the center of the target.

<example file="v-ripple/option-center" />

### Misc

#### Custom color

Using a helper class, you can change the color of the ripple.

<example file="v-ripple/misc-custom-color" />

#### Ripple in components

Some components provide the `ripple` prop that allows you to control the ripple effect. You can turn it off or customize the behavior by using `class` or `center` options.

<example file="v-ripple/misc-ripple-in-components" />

<backmatter />
