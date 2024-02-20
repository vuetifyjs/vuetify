---
meta:
  nav: Tabs
  title: Tabs component
  description: The tabs component provides a way to organize and navigate between groups of content that are related at the same level of hierarchy.
  keywords: tabs, vuetify tabs component, vue tabs component
related:
  - /components/icons/
  - /components/toolbars/
  - /components/windows/
features:
  figma: true
  label: 'C: VTabs'
  report: true
  github: /components/VTabs/
  spec: https://m2.material.io/components/tabs
---

# Tabs

The `v-tabs` component is used for hiding content behind a selectable item. This can also be used as a pseudo-navigation for a page, where the tabs are links and the tab-items are the content.

<PageFeatures />

## Usage

The `v-tabs` component is a styled extension of [v-slide-group](/components/slide-groups). It provides an easy to use interface for organizing content into separate sections.

<ExamplesExample file="v-tabs/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-tabs](/api/v-tabs/) | Primary Component |
| [v-tab](/api/v-tab/) | Sub-component used for modifying the `v-tabs` state |

<ApiInline hide-links />

## Examples

### Props

#### Align tabs

The **align-tabs** prop will align tabs to the `start`, `center`, or `end` of its container.

<ExamplesExample file="v-tabs/prop-align-tabs-center" />

<ExamplesExample file="v-tabs/prop-align-tabs-end" />

#### Align tabs with title

Make `v-tabs` line up with the `v-toolbar-title` component by setting the **align-tabs** prop to `title` (`v-app-bar-nav-icon` or `v-btn` must be used in `v-toolbar`).

<ExamplesExample file="v-tabs/prop-align-tabs-title" />

#### Center active

The **center-active** prop will make the active tab always centered.

<ExamplesExample file="v-tabs/prop-center-active" />

#### Custom icons

**prev-icon** and **next-icon** can be used for applying custom pagination icons.

<ExamplesExample file="v-tabs/prop-icons" />

#### Fixed tabs

The **fixed-tabs** prop forces `v-tab` items to take up all available space up to their maximum width (300px), and centers them.

<ExamplesExample file="v-tabs/prop-fixed-tabs" />

#### Grow

The **grow** prop will make the tab items take up all available space with no limit.

<ExamplesExample file="v-tabs/prop-grow" />

#### Stacked

Using **stacked** increases the `v-tabs` height to 72px to allow for both icons and text to be displayed.

<ExamplesExample file="v-tabs/prop-stacked" />

#### Pagination

If the tab items overflow their container, pagination controls will appear on desktop. For mobile devices, arrows will only display with the **show-arrows** prop.

<ExamplesExample file="v-tabs/misc-pagination" />

#### Vertical tabs

The **direction** prop allows for `v-tab` components to stack vertically.

<ExamplesExample file="v-tabs/prop-direction" />

### Misc

#### Content

It is common to put `v-tabs` inside the **extension** slot of `v-toolbar`.

<ExamplesExample file="v-tabs/misc-content" />

#### Mobile tabs

On mobile you can use `v-tab` items with just icons to conserve space.

<ExamplesExample file="v-tabs/misc-mobile" />

#### Dynamic Tabs

Tabs can be dynamically added and removed. In this example when we add a new tab, we automatically change our model to match. As we add more tabs and overflow the container, the selected item will be automatically scrolled into view. Remove all `v-tab` items and the slider will disappear.

<ExamplesExample file="v-tabs/misc-dynamic" />

#### Overflow to menu

You can use a menu to hold additional tabs, swapping them out on the fly.

<ExamplesExample file="v-tabs/misc-overflow-to-menu" />
