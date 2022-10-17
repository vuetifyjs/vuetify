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

- **Vuetify** class removed, use **createVuetify** function

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

- **light** and **dark** props have been removed from all components. Use **theme** prop instead
- **value** prop has been replaced by **model-value** on components that support `v-model` usage
- **@input** event has been replaced by **@update:model-value** on components that support `v-model` usage
- color definitions changed to `bg-red` and `text-red` and variations added to same class name `bg-red-darken-2`

### v-alert

- **border** prop values `left` and `right` have been replaced by `start` and `end`
- **colored-border** prop has been replaced by **border-color**
- **dismissable** prop has been replaced by **closeable**
- **outlined** and **text** props have been replaced by single prop **variant**
- **text** prop has new purpose. It represents the text content of the alert, if default slot is not used

### v-app

- **id** prop has been removed
