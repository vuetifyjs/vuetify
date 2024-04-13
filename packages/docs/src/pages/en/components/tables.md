---
meta:
  nav: Tables
  title: Table
  description: The table component is a lightweight wrapper around the table element that provides a Material Design feel without all the baggage.
  keywords: table, simple table, vuetify table component, vue simple table component, table component
related:
  - /components/data-tables/basics/
  - /components/data-tables/headers/
  - /components/lists/
features:
  github: /components/VTable/
  label: 'C: VTable'
  report: true
  spec: https://m2.material.io/components/data-tables
---

# Tables

The simpler of the table components is `v-table`, a basic wrapper component for the HTML `<table>` element. In addition, regular table elements such as `<thead>`, `<tbody>`, `<tr>`, and `<td>` work by default.

::: info
More advanced tables such as [v-data-table](/components/data-tables/basics/) are available for preview in [Vuetify Labs](/labs/introduction/).
:::

<!-- ![Table Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-table/v-table-entry.png) -->

<PageFeatures />

## Usage

<ExamplesExample file="v-table/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-table](/api/v-table/) | Primary Component |

<ApiInline hide-links />

## Examples

### Props

#### Theme

Use **theme** prop to switch table to another theme.

<ExamplesExample file="v-table/prop-dark" />

#### Density

You can show a dense version of the table by using the **density** prop.

<ExamplesExample file="v-table/prop-dense" />

#### Height

Use the **height** prop to set the height of the table.

<ExamplesExample file="v-table/prop-height" />

#### Fixed header

Use the **fixed-header** prop together with the **height** prop to fix the header to the top of the table.

<ExamplesExample file="v-table/prop-fixed-header" />
