---
emphasized: true
meta:
  title: The Vuetify roadmap
  description: The upcoming planned features and new functionality coming to Vuetify. New components, new directives, and much much more!.
  keywords: vuetify roadmap, future plans, new vuetify features
nav: Roadmap
related:
  - /introduction/long-term-support/
  - /introduction/enterprise-support/
  - /getting-started/browser-support/
---

# The Vuetify roadmap

Vuetify is always under development. We are constantly working towards improving the existing codebase, adding new features, and expanding the ecosystem with developer tooling that makes building applications even easier.

<entry />

## In Development

The following releases are currently under development:

<alert type="warning">

  This is not an exhaustive list and is subject to change at any time without notice

</alert>

### v3.4 (Blackguard)

- **Target Release:** Q3 2023
- **Overview:** This release will be smaller in scope with a primary focus on expanding our testing coverage and will include 4 new components:
  - `<v-overflow-btn>`
  - `<v-otp-input>`
  - `<v-speed-dial>`
  - `<v-stepper>`
- **Milestone Issues:** [Github Issues](https://github.com/vuetifyjs/vuetify/milestone/61)

### v2.7 (Nirvana)

- **Target Release:** Q2 2023
- **Support until:** 18 months after release
- **Overview:** Backports and deprecations from v3.0.0 to help developers prepare for v3 upgrade

### Labs release schedule

Information regarding upcoming Labs components is located on the [Labs introduction](/labs/introduction/) page.

----

## Long-term support (LTS)

The following versions have continued maintenance for backwards compatible fixes, major bugs, and security vulnerabilities. More information is located on the [Long-term support](/introduction/long-term-support/) page.

<promoted slug="vuetify-github-sponsors" />

<promoted slug="vuetify-open-collective" />

## Released

The following are the already released **minor** and **major** version updates. Find more information on the [latest releases](https://github.com/vuetifyjs/vuetify/releases/latest) on GitHub.

### v3.3 (Icarus)

- **Released:** May 2023
- **Target Release:** Q2 2023
- **Notes:** [v3.3 Release](/getting-started/release-notes/?version=v3.3.0)
- **Overview:** A small intermediary minor that will release alongside Vue v3.3 and include a few small features.
- **Milestone Issues:** [Github Issues](https://github.com/vuetifyjs/vuetify/milestone/67)

### v3.2 (Orion)

- **Released:** April 2023
- **Target Release:** Q2 2023
- **Notes:** [v3.2 Release](/getting-started/release-notes/?version=v3.2.0)
- **Overview:** New and ported components from v2. Exposed defaults system for public use, allowing you to hook into the global default configuration with your components. More information in the [release notes](/getting-started/release-notes/?version=v3.2.0)
- **Milestone Issues:** [Github Issues](https://github.com/vuetifyjs/vuetify/milestone/53)

### v3.1 (Valkyrie)

- **Released:** January 2023
- **Target Release:** Q1 2023
- **Notes:** [v3.1 Release](/getting-started/release-notes/?version=v3.1.0)
- **Overview:** First post v3 release that will focus on porting remaining missing v2 components and general bug fixing.
- **Milestone Issues:** [Github Issues](https://github.com/vuetifyjs/vuetify/milestone/56)

### Vuetify Labs { id="labs" }

- **Released:** January 2023
- **Target Release:** Q4 2022
- **Overview:** Labs is a new package that includes large components from Vuetify 2 in a pre-production state. More information is located on the [Labs introduction](/labs/introduction/) page.

### v3.0 (Titan)

- **Released:** October 2022
- **Notes:** [v3.0 Release](/getting-started/release-notes/?version=v3.0.0)
- **Overview:**
  - Rebuilt for Vue 3 using the new [composition api](https://vue-composition-api-rfc.netlify.com/)
  - Global properties that allow you to make large overarching changes to your app
  - Improved SASS variable customization and extensibility with [Built-In Modules](https://sass-lang.com/documentation/modules)
  - New [Vue CLI presets](https://github.com/vuetifyjs/vue-cli-plugins) for generating pre-built starting projects
  - First party [Vite](https://vitejs.dev/) support for lightning fast development
  - Greatly improved TypeScript support
  - Better framework coverage with E2E testing using Cypress

----

### v2.6 (Horizon)

- **Released**: November 2021
- **Notes**: [v2.6 Release](/getting-started/release-notes/?version=v2.6.0)
- **Overview**:
  New [v-otp-input](/components/otp-input/) component, calendar event and scrolling improvements, minor features for other components.

----

### v2.5 (Avalon)

- **Released:** May 2021
- **Notes:** [v2.5 Release](/getting-started/release-notes/?version=v2.5.0)
- **Overview:**
  The v2.5 release adds a multitude of new functionality to [v-data-table](/components/data-tables/) and [v-text-field](/components/text-fields/), as well as bug fixes for the [click-outside](/directives/click-outside/) directive, [v-carousel](/components/carousels/) component, and more.
- **Objectives:**
  - Expand functionality of `v-data-table`
  - Quality of life improvements
  - General bug fixes

----

### v2.4 (Endurance)

- **Released:** December 2020
- **Notes:** [v2.4 Release](/getting-started/release-notes/?version=v2.4.0)
- **Overview:**
  The v2.4 release provides bug fixes, features and quality of life changes for Vuetify as we prepare for v3 Alpha. This release contains some new features that we are building into Vuetify 3 right now such as new slots for `v-carousel` and support for globally defined icon components.
- **Objectives:**
  - Add **plain** property for `v-btn`
  - Add new locales
    - Azerbaijani
    - Central Kurdish
  - Add typography css classes `text-pre` and `text-pre-wrap`
  - Add new slots for `v-carousel`
  - Support for a globally defined icon components
  - Improved accessibility in the `v-menu` component

----

### v2.3 (Liberator)

- **Released:** June 2020
- **Notes:** [v2.3 Release](/getting-started/release-notes/?version=v2.3.0)
- **Overview:**
  The v2.3 release was dropped earlier in the year to focus on v3 development but was revived when COVID-19 showed up. This release is packed full of quality of life changes, new features such as the `v-virtual-scroll` component, responsive typography css classes.
- **Objectives:**
  - Add new css helper classes for `text-decoration`, `border-radius`, `typography`, and more.
  - Add new `v-virtual-scroll` component
  - Improve *Date Pickers, Data Tables, and Calendars*
  - Harden framework in preparation for **LTS version**

----

### v2.2 (Tigris)

- **Released:** January 2020
- **Notes:** [v2.2 Release](/getting-started/release-notes/?version=v2.2.0)
- **Overview:**
  The introduction of Vuetify Presets. Will include the entire Material Design Studies collection and be _user customizable_. Will streamline the process for altering the default styles for the framework. Thousands of SASS variables will be added and a lookup tree for finding those variables will put into the documentation. For more information on Google's studies, please [navigate here](https://material.io/design/material-studies/about-our-material-studies.html).
- **Objectives:**
  - Add _thousands_ of new SASS variables
  - Create a new Vuetify Service for bootstrapping pre-configured framework options; **Preset**
  - Create presets for the official [Material Design Studies](https://material.io/design/material-studies/about-our-material-studies.html)
  - Add new features and improve code styling of `v-badge`
  - Add new features and improve code styling of `v-expansion-panels`
  - new `v-theme-provider` component

----

### v2.1 (Vanguard)

- **Released:** October 2019
- **Notes:** [v2.1 Release](/getting-started/release-notes/?version=v2.1.0)
- **Overview:**
  A maintenance cycle to work on bugs from the v2.0 release. This includes performance issues, incorrect or missing a11y, RTL, regressions and general fixes. This will allow the team to catch up on the backlog of tasks that have accumulated over the 8 month development cycle of the previous release.
- **Objectives:**
  - Add new components
    - `v-lazy`
    - `v-skeleton-loader`
  - Add new directives
    - `v-intersect`
    - `v-mutate`
  - Add lazy loading support for `v-img`

----

### v2.0 (Arcadia)

- **Released:** July 2019
- **Notes:** [v2.0 Release](/getting-started/release-notes/?version=v2.0.0)
- **Overview:**
  A complete rebuild of the framework core. Improving the layout and theme systems, platform integration, accessibility, RTL and performance. Update all components to the [Material Design 2](https://material.io/design/) specification. Add additional functionality to multiple existing components and setup v1.5 for [Long-term Support](/introduction/long-term-support).
- **Objectives:**
  - Add new components
    - `v-app-bar`
    - `v-banner`
    - `v-chip-group`
    - `v-color-picker`
    - `v-file-input`
    - `v-list-item-group`
    - `v-overlay`
    - `v-simple-table`
    - `v-slide-group`
  - Complete update to Material Design 2
  - Convert from Javascript to Typescript
  - Convert from Stylus to Sass
  - Convert from avoriaz to vue-test-utils

## Contributing

If you'd like to help contribute to Vuetify, head to our [Contribution guide](/getting-started/contributing/) for more information on how to get started.

## Archived

The following releases are old and unsupported **minor** and **major** versions:

### v1.5

- **Released:** February 2019
- **Support until:** August 1st, 2020
- **Notes:** [v1.5 Release](/getting-started/release-notes/?version=v1.5.0)
- **Overview:**
  Added new component, `v-calendar`. Improved functionality of `v-sparkline` with new **bar** and **fill** properties. Improved `v-treeview` and prepared for LTS. Navigate to the [Long-term Support Page](/introduction/long-term-support) for more information on LTS.

<alert type="error">

  v1.5 reached end of life on **July 31st, 2020** and is no longer actively maintained. It is recommended to update to the latest stable version of Vuetify using our [Upgrade guide](/getting-started/upgrade-guide/).

</alert>

### v1.4

- **Released:** December 2018
- **Notes:** [v1.4 Release](/getting-started/release-notes/?version=v1.4.0)
- **Overview:**
  Added new components `v-sparkline` and abstracted `v-toolbar`'s functionality into multiple components for easier maintainability and testing. Rebuilt the entire documentation to make it easier for contributors and maintenance from the team.

----

### v1.3

- **Released:** December 2018
- **Notes:** [v1.3 Release](/getting-started/release-notes/?version=v1.3.0)
- **Overview:**
  Added new components, `v-treeview`, `v-timeline` and `v-item-group`. Unified the interfaces used in `v-tabs` and `v-carousel`. Improved the **vuetify-loader** to support effortless application tree-shaking of Vuetify components.

----

### v1.2

- **Released:** October 2018
- **Notes:** [v1.2 Release](/getting-started/release-notes/?version=v1.2.0)
- **Overview:**
  Added new components, `v-img`, `v-rating` and `v-hover`. Improved theme propagation system and expanded the functionality of the colors used with components such as HEX and RGBA. Als added numerous new locales.

----

### v1.1

- **Released:** July 2018
- **Notes:** [v1.1 Release](/getting-started/release-notes/?version=v1.1.0)
- **Overview:**
  A complete rebuild of all form functionality including all inputs and selection controls. Abstracted features from components like `v-select` into new implementations, `v-autocomplete`, `v-combobox` for more scoped functionality and easier testing. This release also marked the first official support of **RTL** languages.

----

### v1.0

- **Released:** February 2018
- **Notes:** [v1.0 Release](/getting-started/release-notes/?version=v1.0.0)
- **Overview:**
  The official v1.0 release party. After 18 months and Kael's sanity, we rolled into our first **MAJOR** release. This included a multitude of brand new components, features and functionality.

----

### Alpha release

- **Released:** December 2016
- **Overview:**
  Vuetify is officially announced to the public. The framework initially shipped with 40 components and came in at a whopping 46kb.
