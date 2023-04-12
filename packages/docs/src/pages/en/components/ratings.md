---
nav: Ratings
meta:
  title: Rating component
  description: The star rating component is a specialized widget for collecting user feedback via ratings.
  keywords: star ratings, vuetify star rating component, vue star rating component, rating component
related:
  - /components/cards
  - /components/icons
  - /components/lists
---

# Ratings

The `v-rating` component is a specialized but important piece in building user widgets. Collecting user feedback via ratings is a simple analytic that can provide a lot of feedback to your product or application.

## Usage

The `v-rating` component provides a simple interface for gathering user feedback.

<!-- <usage name="v-rating" /> -->

<entry />

## API

| Component | Description |
| - | - |
| [v-rating](/api/v-rating/) | Primary Component |

<api-inline hide-links />

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

When using the **hover** prop, the rating icons will become a solid color and slightly increase its scale when the mouse is hovered over them.

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

#### Half increments

The **half-increments** prop increases the granularity of the ratings, allow for `.5` values as well.

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

<!-- #### Advanced usage

The `v-rating` component fits right in with existing components. Build truly complex examples with rich features and beautiful designs.

<example file="v-rating/misc-advanced" /> -->

#### Card ratings

The rating component pairs well with products allowing you to gather and display customer feedback.

<example file="v-rating/misc-card" />

<example file="v-rating/misc-card-overview" />
