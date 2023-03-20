---
nav: Pagination
meta:
  title: Pagination component
  description: The pagination component is used to separate long sets of data so that it is easier for a user to consume information.
  keywords: pagination, vuetify pagination component, vue pagination component
related:
  - /components/data-tables/basics/
  - /components/data-tables/pagination/
  - /components/tables/
---

# Pagination

The `v-pagination` component is used to separate long sets of data so that it is easier for a user to consume information. Depending on the length provided, the pagination component will automatically scale. To maintain the current page, simply supply a **v-model** attribute.

----

## Usage

Pagination by default displays the number of pages based on the set **length** prop, with **prev** and **next** buttons surrounding to help you navigate.

<usage name="v-pagination" />

<entry />

## API

| Component | Description |
| - | - |
| [v-pagination](/api/v-pagination/) | Primary Component |

<api-inline hide-links />

## Examples

### Props

#### Rounded

The **rounded** prop allows you to render pagination buttons with alternative styles.

<example file="v-pagination/prop-rounded" />

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
