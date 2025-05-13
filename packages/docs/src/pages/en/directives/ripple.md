---
meta:
  nav: Ripple
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

<PageFeatures />

## Usage

Basic ripple functionality can be enabled just by using `v-ripple` directive on a component or an HTML element

<ExamplesExample file="v-ripple/usage" />

<PromotedEntry />

## API

| Directive                            | Description          |
|--------------------------------------|----------------------|
| [v-ripple](/api/v-ripple-directive/) | The ripple directive |

<ApiInline hide-links />

## Examples

### Propagation

If multiple elements have the ripple directive applied, only the inner one will show the effect. This can also be done without having a visible ripple by using `v-ripple.stop` to prevent ripples in the outer element if the inner element is clicked on. `v-ripple.stop` will not actually stop propagation of the mousedown/touchstart events unlike other workarounds.

<ExamplesExample file="v-ripple/stop" />

### Options

#### Center

When a `center` option is used ripple will always originate from the center of the target.

<ExamplesExample file="v-ripple/option-center" />

### Misc

#### Custom color

Using a helper class, you can change the color of the ripple.

<ExamplesExample file="v-ripple/misc-custom-color" />

#### Ripple in components

Some components provide the `ripple` prop that allows you to control the ripple effect. You can turn it off or customize the behavior by using `class` or `center` options.

<ExamplesExample file="v-ripple/misc-ripple-in-components" />
