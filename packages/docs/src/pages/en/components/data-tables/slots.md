---
nav: Slots
meta:
  title: Data table - Slots
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/data-tables/basics/
  - /components/tables/
---

# Data table - Slots

The data-table components provide a number of slots that can be used to customize the look and function of the component.

<entry />

## Examples

### Item slot

Normally you would use the `item.<key>` slots to render custom markup in specific columns. If you instead need more control over the entire row, you can use the `item` slot.

<example file="v-data-table/slot-item" />

### Group header slot

When using the **group-by** prop, you can customize the group header with the `group-header` slot.

<example file="v-data-table/slot-group-header" />
