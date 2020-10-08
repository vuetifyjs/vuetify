---
meta:
  title: Simple table component
  description: The simple table component is a lightweight wrapper around the table element that provides a Material Design feel without all the baggage.
  keywords: simple table, vuetify simple table component, vue simple table component, table component
related:
  - /components/data-iterators/
  - /components/data-tables/
  - /components/lists/
---

# Simple tables

The `v-simple-table` component is a simple wrapper component around the `<table>` element. Inside the component you can use all the regular table elements such as `<thead>`, `<tbody>`, `<tr>`, etc.

<entry-ad />

## Usage

The simple table is a wrapper component around the `<table>` element.

<example file="v-simple-table/usage" />

## API

- [v-simple-table](/api/v-simple-table)

## Examples

### Props

#### Dark

Use **dark** prop to switch table to the dark theme.

<example file="v-simple-table/prop-dark" />

#### Dense

You can show a dense version of the table by using the **dense** prop.

<example file="v-simple-table/prop-dense" />

#### Fixed header

Use the **fixed-header** prop together with the **height** prop to fix the header to the top of the table.

<example file="v-simple-table/prop-fixed-header" />

#### Height

Use the **height** prop to set the height of the table.

<example file="v-simple-table/prop-height" />

<backmatter />
