---
meta:
  nav: Upgrade guide
  title: Upgrade guide
  description: Detailed instructions on how to upgrade Vuetify from v4 to v5
  keywords: migration, upgrade, releases, upgrading vuetify, v5
related:
  - /introduction/roadmap/
  - /introduction/long-term-support/
  - /introduction/enterprise-support/
---

# Upgrade Guide

This page contains a detailed list of breaking changes and the steps required to upgrade your application from Vuetify 4 to Vuetify 5.

<PageFeatures />

## Date

The date system now uses `@vuetify/v0` under the hood. The consumer API (`useDate()`) is unchanged for most users.

### Default date type changed

The default adapter now uses `Temporal.PlainDateTime` instead of native `Date`. If your code handles date values from VDatePicker or VCalendar model values, update accordingly:
