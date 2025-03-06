---
meta:
  nav: Ratings
  title: Rating component
  description: The star rating component is a specialized widget for collecting user feedback via ratings.
  keywords: star ratings, vuetify star rating component, vue star rating component, rating component
related:
  - /components/cards
  - /components/icons
  - /components/lists
features:
  github: /components/VRating/
  label: 'C: VRating'
  report: true
---

# Ratings

The `v-rating` component is a specialized but important piece in building user widgets. Collecting user feedback via ratings is a simple analytic that can provide a lot of feedback to your product or application.

<PageFeatures />

## Usage

The `v-rating` component provides a simple interface for gathering user feedback.

<ExamplesUsage name="v-rating" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-rating](/api/v-rating/) | Primary Component |

<ApiInline hide-links />

## Examples

### Props

#### Color

The `v-rating` component can be colored as you want, you can set both selected and not selected colors.

<ExamplesExample file="v-rating/prop-color" />

#### Density

Control the space occupied by `v-rating` items using the **density** prop.

<ExamplesExample file="v-rating/prop-density" />

#### Clearable

Clicking on a current rating value can reset the rating by using **clearable** prop.

<ExamplesExample file="v-rating/prop-clearable" />

#### Readonly

For ratings that are not meant to be changed you can use **readonly** prop.

<ExamplesExample file="v-rating/prop-readonly" />

#### Hover effect

When using the **hover** prop, the rating icons will become a solid color and slightly increase its scale when the mouse is hovered over them.

<ExamplesExample file="v-rating/prop-hover" />

#### Labels

The `v-rating` component can display labels above or below each item.

<ExamplesExample file="v-rating/prop-item-labels" />

#### Icons

You can use custom icons.

<ExamplesExample file="v-rating/prop-icons" />

#### Length

Change the number of items by modifying the the **length** prop.

<ExamplesExample file="v-rating/prop-length" />

#### Half increments

The **half-increments** prop increases the granularity of the ratings, allow for `.5` values as well.

<ExamplesExample file="v-rating/prop-half-increments" />

#### Size

Utilize the same sizing classes available in `v-icon` or provide your own with the **size** prop.

<ExamplesExample file="v-rating/prop-size" />

#### Aria Label

Provide a label to assistive technologies for each item.

<ExamplesExample file="v-rating/prop-icon-label" />

### Slots

#### Item slot

Slots enable advanced customization possibilities and provide you with more freedom in how you display the rating.

<ExamplesExample file="v-rating/slot-item" />

#### Custom labels slot

Any arbitrary content could be displayed for labels in **item-label** slot.

<ExamplesExample file="v-rating/slot-item-label" />

### Misc

<!-- #### Advanced usage

The `v-rating` component fits right in with existing components. Build truly complex examples with rich features and beautiful designs.

<ExamplesExample file="v-rating/misc-advanced" /> -->

#### Card ratings

The rating component pairs well with products allowing you to gather and display customer feedback.

<ExamplesExample file="v-rating/misc-card" />

<ExamplesExample file="v-rating/misc-card-overview" />
