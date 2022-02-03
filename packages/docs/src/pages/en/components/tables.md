---
meta:
  title: Table component
  description: The table component is a lightweight wrapper around the table element that provides a Material Design feel without all the baggage.
  keywords: table, simple table, vuetify table component, vue simple table component, table component
nav: 'Tables'
related:
  - /components/data-iterators/
  - /components/data-tables/
  - /components/lists/
---

# Tables

The `v-table` component is a simple wrapper component around the `<table>` element. Inside the component you can use all the regular table elements such as `<thead>`, `<tbody>`, `<tr>`, etc.

<entry-ad />

## Usage

The simple table is a wrapper component around the `<table>` element.

<example file="v-table/usage" />

## API

<api-inline />

## Examples

### Props

#### Dark

Use **dark** prop to switch table to the dark theme.

<example file="v-table/prop-dark" />

#### Dense

You can show a dense version of the table by using the **dense** prop.

<example file="v-table/prop-dense" />

#### Fixed header

Use the **fixed-header** prop together with the **height** prop to fix the header to the top of the table.

<example file="v-table/prop-fixed-header" />

#### Height

Use the **height** prop to set the height of the table.

<example file="v-table/prop-height" />

<backmatter />
