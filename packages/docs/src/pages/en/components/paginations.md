---
meta:
  title: Pagination component
  description: The pagination component is used to separate long sets of data so that it is easier for a user to consume information.
  keywords: pagination, vuetify pagination component, vue pagination component
related:
  - /components/data-iterator/
  - /components/data-tables/
  - /components/lists/
---

# Pagination

The `v-pagination` component is used to separate long sets of data so that it is easier for a user to consume information. Depending on the length provided, the pagination component will automatically scale. To maintain the current page, simply supply a **v-model** attribute.

<entry-ad />

## Usage

Pagination by default displays the number of pages based on the set **length** prop, with **prev** and **next** buttons surrounding to help you navigate.

<example file="v-pagination/usage" />

## API

- [v-pagination](/api/v-pagination)

## Examples

### Props

#### Circle

The **circle** prop gives you an alternate style for pagination buttons.

<example file="v-pagination/prop-circle" />

#### Disabled

Pagination items can be manually deactivated using the **disabled** prop.

<example file="v-pagination/prop-disabled" />

#### Icons

Previous and next page icons can be customized with the **prev-icon** and **next-icon** props.

<example file="v-pagination/prop-icons" />

#### Length

Using the **length** prop you can set the length of `v-pagination`, if the number of page buttons exceeds the parent container, it will truncate the list.

<example file="v-pagination/prop-length" />

#### Total visible

You can also manually set the maximum number of visible page buttons with the **total-visible** prop.

<example file="v-pagination/prop-total-visible" />

<backmatter />
