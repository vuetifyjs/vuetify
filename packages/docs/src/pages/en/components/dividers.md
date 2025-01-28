---
meta:
  nav: Dividers
  title: Divider component
  description: The divider component is a thin line commonly used to separate groups of content in lists or layouts.
  keywords: dividers, vuetify divider component, vue divider component
related:
  - /components/lists
  - /components/navigation-drawers
  - /components/toolbars
features:
  github: /components/VDivider/
  label: 'C: VDivider'
  report: true
  spec: https://m2.material.io/components/dividers
---

# Dividers

The `v-divider` component is used to separate sections of lists or layouts.

<!-- ![divider Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-divider/v-divider-entry.png) -->

<PageFeatures />

## Usage

Dividers in their simplest form display a horizontal line.

<ExamplesUsage name="v-divider" />

::: info

This example uses the **border-opacity** utility class and is not available when **$utilities** is set to **false**. More information regarding utility classes is located on the [SASS variables page](features/sass-variables/#basic-usage).

:::

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-divider](/api/v-divider/) | The divider component. |

<ApiInline hide-links />

## Examples

### Props

#### Inset

Inset dividers are moved 72px to the right. This will cause them to line up with list items.

<ExamplesExample file="v-divider/prop-inset" />

#### Vertical

Vertical dividers give you more tools for unique layouts.

<ExamplesExample file="v-divider/prop-vertical" />

#### Thickness

By using the **thickness** prop, the thickness of the divider can be adjusted to the desired value.

### Misc

#### Portrait View

Create custom cards to fit any use-case.

<ExamplesExample file="v-divider/misc-portrait-view" />

#### Subheaders

Dividers and subheaders can help break up content and can optionally line up with one another by using the same `inset` prop.

<ExamplesExample file="v-divider/misc-subheaders" />

## Accessibility

By default, `v-divider` components are assigned the [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) role of [**separator**](https://www.w3.org/TR/wai-aria/#separator) which denotes that the divider "separates and distinguishes sections of content or groups of menu items." However, sometimes a divider is just a way to make an interface look nice. In those cases, the role of [**presentation**](https://www.w3.org/TR/wai-aria/#presentation) should be used which denotes "an element whose implicit native role semantics will not be mapped to the accessibility API." To override the default **separator** role in a `v-divider`, simply add a `role="presentation"` prop to your component. In addition, `v-divider` components have an `aria-orientation="horizontal"`. If `vertical="true"`, then `aria-orientation="vertical"` will be set automatically as well. If `role="presentation"`, `aria-orientation="undefined"`, its default value.
