---
nav: Upgrade Guide
meta:
  title: Guide to upgrading Vuetify
  description: Detailed instruction on how to upgrade Vuetify to 3.0
  keywords: migration, upgrade, releases, upgrading vuetify, alpha, v3
---

# Upgrade Guide

## Introduction

This page contains a detailed list of breaking changes and the steps required to upgrade your application to Vuetify 3.0

## Setup

- **`Vuetify`** class removed, use **`createVuetify`** function

```js
// 2.x
Vue.use(Vuetify)

const vuetify = new Vuetify({ ... })

const app = new Vue({
  vuetify,
  ...
})

```

```js
// 3.0
const app = createVue()

const vuetify = createVuetify({ ... })

app.use(vuetify)
```

- Something about importing styles?

## Features

### Layout

### Theme

## Components

### General changes

- **`light`** and **`dark`** props have been removed from all components. Use **`theme`** prop instead
- **`value`** prop has been replaced by **`model-value`** on components that support `v-model` usage
- **`@input`** event has been replaced by **`@update:model-value`** on components that support `v-model` usage
- **`dense`** has been replaced by **`density="compact"`**

### v-alert

- **`border`** prop values `left` and `right` have been replaced by `start` and `end`
- **`colored-border`** prop has been replaced by **`border-color`**
- **`dismissable`** prop has been replaced by **`closeable`**
- **`outlined`** and **`text`** props have been replaced by single prop **`variant`**
- **`text`** prop has new purpose. It represents the text content of the alert, if default slot is not used

### v-app

- **`id`** prop has been removed

### v-layout

- **`fill-height`** prop has been replaced by **`full-height`**
- **`id`** prop has been removed
- The grid helper classes such as `align-{direction}` and `justify-{direction}` are still available, but have been removed as props. See [Grid documentation](/components/grids/#helper-classes) for more details.

### v-app-bar

[//]: # TODO: Investigate breaking changes for `scroll-off-screen`, `scroll-target` and `scroll-threshold` when scrolling is completed / danieka 2022-07-21

- **`bottom`** has been replaced by **`position='bottom'`**
- **`prominent`** has been replaced by **`density='prominent'`**
- **`app`** has been removed and is no longer needed
- **`clipped-left`** and **`clipped-right`** has been removed
- **`src`** has been renamed to **`image`**
- **`outlined`** has been removed
- **`tile`** has been removed
- **`width`** has been removed
- **`fixed`** has been removed
- **`{max/min}-{height/width}`** has been removed
- **`short`** has been removed
* The **`img`** slot has been renamed to **`image`**

### v-toolbar

- **`bottom`** has been replaced by **`position='bottom'`**
- **`prominent`** has been replaced by **`density='prominent'`**
- **`app`** has been removed and is no longer needed
- **`clipped-left`** and **`clipped-right`** has been removed
- **`src`** has been renamed to **`image`**
- **`outlined`** has been removed
- **`tile`** has been removed
- **`width`** has been removed
- **`fixed`** has been removed
- **`{max/min}-{height/width}`** has been removed
- **`short`** has been removed
- The **`img`** slot has been renamed to **`image`**