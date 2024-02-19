---
meta:
  nav: Introduction
  title: Data table - Introduction
  description: The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/paginations/
  - /components/selects/
  - /components/data-tables/basics/
---

# Data table - Introduction

The data table component is used for displaying tabular data in a way that is easy for users to scan. It includes sorting, searching, pagination and selection.

<PromotedEntry />

::: success
This feature was introduced in [v3.4.0 (Blackguard)](/getting-started/release-notes/?version=v3.4.0)
:::

## Components

Before diving into the guides and examples, let's take a moment to understand the core components available for data tables. These are variations optimized for different scenarios.

| Component                                                    | Use-case                                                                            |
|--------------------------------------------------------------|-------------------------------------------------------------------------------------|
| [Data tables](/components/data-tables/basics/)               | The base functionality data table, used for paginating, filtering and sorting data. |
| [Server tables](/components/data-tables/server-side-tables/) | Adds new events and properties used for displaying data from a server               |
| [Virtual tables](/components/data-tables/virtual-tables/)    | A version of the data table that has built in row virtualization features           |

## API

| Component                                          | Description                                                 |
|----------------------------------------------------|-------------------------------------------------------------|
| [v-data-table](/api/v-data-table/)                 | Primary Component                                           |
| [v-data-table-server](/api/v-data-table-server/)   | Specialized Data-table for displaying results from a server |
| [v-data-table-virtual](/api/v-data-table-virtual/) | Data-table with built in row virtualization                 |
| [v-data-table-footer](/api/v-data-table-footer/)   | Functional Component used to display Data-table headers     |
| [v-checkbox-btn](/api/v-checkbox-btn/)             | Reusable lightweight [v-checkbox](/components/checkboxes)   |

<ApiInline hide-links />

## Guides

Explore data table pages that provide detailed explanations and code samples for various functionalities and use cases.

| Guide                                                         | Description                                                |
|---------------------------------------------------------------|------------------------------------------------------------|
| [Basics](/components/data-tables/basics/)                     | Understand the fundamental building blocks of Data Tables. |
| [Data and Display](/components/data-tables/data-and-display/) | Learn how to manipulate and display data effectively.      |
