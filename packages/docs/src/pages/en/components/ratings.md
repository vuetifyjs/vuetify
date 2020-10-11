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

The rating component is a specialized but crucial piece in building user widgets. Collecting user feedback via ratings is a simple analytic that can provide a lot of feedback to your product or application.

<entry-ad />

## Usage

The `v-rating` component provides a simple interface for gathering user feedback.

<usage name="v-rating" />

## API

- [v-rating](/api/v-rating)

## Examples

### Props

#### Color

The `v-rating` component can be colored as you want, you can set both selected and not selected colors.

<example file="v-rating/prop-color" />

#### Length

Sometimes an application will call for a customized implementation. Easily change length or displayed icons.

<example file="v-rating/prop-length" />

#### Incremented

A rating can have 3 defined icons, **full-icon**, **half-icon** (with the **half-increments** prop) and **empty-icon**.

<example file="v-rating/prop-half-increments" />

#### Size

Utilize the same sizing classes available in `v-icon` or provide your own with the **size** prop.

<example file="v-rating/prop-size" />

### Slots

#### Item slot

Slots are provided to give you even more freedom in how you display the rating.

<example file="v-rating/slot-item" />

### Misc

#### Advanced usage

The `v-rating` component fits right in with existing components. Build truly complex examples with rich features and beautiful designs.

<example file="v-rating/misc-advanced" />

#### Card ratings

The rating component pairs well with products allowing you to gather and display customer feedback.

<example file="v-rating/misc-card" />

<backmatter />
