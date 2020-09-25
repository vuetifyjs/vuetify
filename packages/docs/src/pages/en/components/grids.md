---
meta:
  title: Grid system
  description: Vuetify supports the 12 point Material Design grid for laying out and controlling breakpoints for your application.
  keywords: grids, vuetify grid component, layout component, flex component
related:
  - /styles/flex/
  - /features/breakpoints/
  - /styles/display/
---

# Grid system

Vuetify comes with a 12 point grid system built using flexbox. The grid is used to create specific layouts within an application's content.  It contains 5 types of media breakpoints that are used for targeting specific screen sizes or orientations, **xs**, **sm**, **md**, **lg** and **xl**. These resolutions are defined below in the Viewport Breakpoints table and can be modified by customizing the [Breakpoint service](/features/breakpoints).

<promoted-ad slug="vuemastery-grids" />

<breakpoints-table />

## Usage

The Vuetify grid is heavily inspired by the [Bootstrap grid](https://getbootstrap.com/docs/4.0/layout/grid/). It is integrated by using a series of containers, rows, and columns to layout and align content. **If you are new to flexbox**, [Read the CSS Tricks flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background) for background, terminology, guidelines, and code snippets.

<example file="grid/usage" />

## API

- [v-container](/api/v-container)
- [v-row](/api/v-row)
- [v-col](/api/v-col)
- [v-spacer](/api/v-spacer)

## Sub-components

### v-container

`v-container` provides the ability to center and horizontally pad your site's contents. You can also use the **fluid** prop to fully extend the container across all viewport and device sizes. Maintains previous 1.x functionality in which props are passed through as classes on `v-container` allowing for the application of helper classes (such as `ma-#`/`pa-#`/`fill-height`) to easily be applied

### v-col

`v-col` is a content holder that must be a direct child of `v-row`. This is the 2.x replacement for `v-flex` in 1.x.

### v-row

`v-row` is a wrapper component for `v-col`. It utilizes flex properties to control the layout and flow of its inner columns. It uses a standard gutter of **24px**. This can be reduced with the **dense** prop or removed completely with **no-gutters**. This is the 2.x replacement for `v-layout` in 1.x.

### v-spacer

`v-spacer` is a basic yet versatile spacing component used to distribute remaining width in-between a parents child components. When placing a single `v-spacer` before or after the child components, the components will push to the right and left of its container. When more than one `v-spacer`'s are used between multiple components, the remaining width is evenly distributed between each spacer.

## Caveats

<alert type="info">

  1.x grid system has been deprecated in favor of the 2.x grid system. Documentation for 1.x grids can be found in the [v1.5 docs](https://v15.vuetifyjs.com/framework/grid)

</alert>

<alert type="info">

  Breakpoints based props on grid components work in an `andUp` fashion. With this in mind the **xs** breakpoint is assumed and has been removed from the props context. This applies to **offset**, **justify**, **align**, and single breakpoint props on `v-col`

- Props like **justify-sm** and **justify-md** exist, but **justify-xs** does not, it is simply **justify**
- The **xs** prop does not exist on `v-col`. The equivalent to this is the **cols** prop

</alert>

<alert type="info">

  When using the grid system with IE11 you will need to set an explicit `height` as `min-height` will not suffice and cause undesired results.

</alert>

## Examples

### Props

#### Align

Change the vertical alignment of flex items and their parents using the **align** and **align-self** properties.

<example file="grid/prop-align" />

#### Breakpoint sizing

Columns will automatically take up an equal amount of space within their parent container. This can be modified using the **cols** prop. You can also utilize the **sm**, **md**, **lg**, and **xl** props to further define how the column will be sized in different viewport sizes.

<example file="grid/prop-breakpoint-sizing" />

#### Justify

Change the horizontal alignment of flex items using the **justify** property.

<example file="grid/prop-justify" />

#### No gutters

You can remove the negative margins from `v-row` and the padding from its direct `v-col` children using the **no-gutters** property.

<example file="grid/prop-no-gutters" />

#### Offset

Offsets are useful for compensating for elements that may not be visible yet, or to control the position of content. Just as with breakpoints, you can set an offset for any available sizes. This allows you to fine tune your application layout precisely to your needs.

<example file="grid/prop-offset" />

#### Offset breakpoint

Offset can also be applied on a per breakpoint basis.

<example file="grid/prop-offset-breakpoint" />

#### Order

You can control the ordering of grid items. As with offsets, you can set different orders for different sizes. Design specialized screen layouts that accommodate to any application.

<example file="grid/prop-order" />

#### Order first and last

You can also designate explicitly **first** or **last** which will assign **-1** or **13** values respectively to the `order` CSS property.

<example file="grid/prop-order-first-and-last" />

### Misc

#### Column wrapping

When more than 12 columns are placed within a given row (that is not using the `.flex-nowrap` utility class), each group of extra columns will wrap onto a new line.

<example file="grid/misc-column-wrapping" />

#### Equal width columns

You can break equal width columns into multiple lines. While there are workarounds for older browser versions, there was a [Safari flexbox bug](https://github.com/philipwalton/flexbugs#11-min-and-max-size-declarations-are-ignored-when-wrapping-flex-items). This shouldn't be necessary if you're up-to-date.

<example file="grid/misc-equal-width-columns" />

#### Grow and Shrink

By default, flex components will automatically fill the available space in a row or column. They will also shrink relative to the rest of the flex items in the flex container when a specific size is not designated. You can define the column width of the `v-col` by using the **cols** prop and providing a value from **1 to 12**.

<example file="grid/misc-grow-and-shrink" />

#### Margin helpers

Using the [auto margin helper utilities](/styles/flex#auto-margins) you can force sibling columns away from each other.

<example file="grid/misc-margin-helpers" />

#### Nested grid

Grids can be nested, similar to other frameworks, in order to achieve very custom layouts.

<example file="grid/misc-nested-grid" />

#### One column width

When using the auto-layout, you can define the width of only one column and still have its siblings to automatically resize around it.

<example file="grid/misc-one-column-width" />

#### Row and column breakpoints

Dynamically change your layout based upon resolution. **(resize your screen and watch the top `row` layout change on sm, md, and lg breakpoints)**

<example file="grid/misc-row-and-column-breakpoints" />

#### Spacers

The `v-spacer` component is useful when you want to fill available space or make space between two components.

<example file="grid/misc-spacer" />

#### Unique layouts

The power and flexibility of the Vuetify grid system allows you to create amazing user interfaces.

<example file="grid/misc-unique-layouts" />

#### Variable content width

Assigning breakpoint width for columns can be configured to resize based upon the nature width of their content.

<example file="grid/misc-variable-content" />

<backmatter />
