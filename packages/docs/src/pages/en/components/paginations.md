---
meta:
  nav: Pagination
  title: Pagination component
  description: The pagination component is used to separate long sets of data so that it is easier for a user to consume information.
  keywords: pagination, vuetify pagination component, vue pagination component
related:
  - /components/data-tables/basics/
  - /components/data-tables/pagination/
  - /components/tables/
features:
  figma: true
  label: 'C: VPagination'
  report: true
  github: /components/VPagination/
---

# Pagination

The `v-pagination` component is used to separate long sets of data so that it is easier for a user to consume information.

<PageFeatures />

## Usage

Pagination by default displays the number of pages based on the set **length** prop, with **prev** and **next** buttons surrounding to help you navigate. Depending on the length provided, the pagination component will automatically scale. To maintain the current page, simply supply a **v-model** attribute.

<ExamplesUsage name="v-pagination" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-pagination](/api/v-pagination/) | Primary Component |

<ApiInline hide-links />

## Examples

### Props

#### Rounded

The **rounded** prop allows you to render pagination buttons with alternative styles.

<ExamplesExample file="v-pagination/prop-rounded" />

#### Disabled

Pagination items can be manually deactivated using the **disabled** prop.

<ExamplesExample file="v-pagination/prop-disabled" />

#### Icons

Previous and next page icons can be customized with the **prev-icon** and **next-icon** props.

<ExamplesExample file="v-pagination/prop-icons" />

#### Length

Using the **length** prop you can set the length of `v-pagination`, if the number of page buttons exceeds the parent container, it will truncate the list.

<ExamplesExample file="v-pagination/prop-length" />

#### Total visible

You can also manually set the maximum number of visible page buttons with the **total-visible** prop.

<ExamplesExample file="v-pagination/prop-total-visible" />
