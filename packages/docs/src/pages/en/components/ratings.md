---
meta:
  title: Rating component
  description: The star rating component is a specialized widget for collecting user feedback via ratings.
  keywords: star ratings, vuetify star rating component, vue star rating component, rating component
related:
  - /components/cards/
  - /components/icons/
  - /components/lists/
---

# Ratings

The `v-rating` component is a specialized but important piece in building user widgets. Collecting user feedback via ratings is a simple analytic that can provide a lot of feedback to your product or application.

<entry-ad />

<!--
## Usage

The `v-rating` component provides a simple interface for gathering user feedback.

<usage name="v-rating" />
-->

## API

- [v-rating](/api/v-rating)

## Examples

### Props

#### Color

The `v-rating` component can be colored as you want, you can set both selected and not selected colors.

<example file="v-rating/prop-color" />

#### Density

Control the space occupied by `v-rating` items using the **density** prop.

<example file="v-rating/prop-density" />

#### Clearable

Clicking on a current rating value can reset the rating by using **clearable** prop.

<example file="v-rating/prop-clearable" />

#### Readonly

For ratings that are not meant to be changed you can use **readonly** prop.

<example file="v-rating/prop-readonly" />

#### Hover effect

TODO

<example file="v-rating/prop-hover" />

#### Labels

The `v-rating` component can display labels above or below each item.

<example file="v-rating/prop-item-labels" />

#### Icons

You can use custom icons.

<example file="v-rating/prop-icons" />


#### Length

Change the number of items by modifying the the **length** prop.

<example file="v-rating/prop-length" />

#### Incremented

A `v-rating` component has 3 types of icons, **full-icon**, **half-icon** (with the **half-increments** prop) and **empty-icon**.

<example file="v-rating/prop-half-increments" />

#### Size

Utilize the same sizing classes available in `v-icon` or provide your own with the **size** prop.

<example file="v-rating/prop-size" />

#### Aria Label

Provide a label to assistive technologies for each item.

<example file="v-rating/prop-icon-label" />

### Slots

#### Item slot

Slots enable advanced customization possibilities and provide you with more freedom in how you display the rating.

<example file="v-rating/slot-item" />

#### Custom labels slot

Any arbitrary content could be displayed for labels in **item-label** slot.

<example file="v-rating/slot-item-label" />


### Misc

#### Advanced usage

The `v-rating` component fits right in with existing components. Build truly complex examples with rich features and beautiful designs.

<example file="v-rating/misc-advanced" />

#### Card ratings

The rating component pairs well with products allowing you to gather and display customer feedback.

<example file="v-rating/misc-card" />

<backmatter />
