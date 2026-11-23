---
meta:
  nav: Validation rules
  title: Validation rules composable
  description: Vuetify implements a set of validation rules that can be overwritten
  keywords: Form validation, vuetify form validation, rules composable, validation rules
related:
  - /components/forms/
  - /features/internationalization/
features:
  github: /composables/rules/
  label: 'E: rules'
  report: true
---

# Validation rules

The `useRules` composable provides common validation rules for form inputs.

<PageFeatures />

<PromotedEntry />

## Installation

Register the rules plugin with your Vuetify instance:

```js
import { createApp } from 'vue'
import { createRulesPlugin, createVuetify } from 'vuetify'

const app = createApp()
const vuetify = createVuetify()

app.use(createRulesPlugin({ /* options */ }, vuetify.locale))
```

Error messages come from the Vuetify locale. Components can then get the rules from `useRules`:

```js
import { useRules } from 'vuetify'

const rules = useRules()
```

## Usage

Each rule is a function that returns the actual validation rule, so call it in the **rules** prop.

```html { resource="src/views/ValidationForm.vue" }
<template>
  <v-app>
    <v-container>
      <v-form validate-on="submit" @submit.prevent="submit">
        <v-text-field :rules="[rules.required()]" label="Email" />

        <v-btn text="Submit" type="submit"/>
      </v-form>
    </v-container>
  </v-app>
</template>

<script setup>
  import { useRules } from 'vuetify'

  const rules = useRules()

  async function submit (event) {
    await event
  }
</script>
```

## API

Rules other than **required** and **notEmpty** accept an empty value. Combine them with **required** when the field is mandatory.

| Rule Name    | Description                                                                 | Arguments/Options                  |
|--------------|-----------------------------------------------------------------------------|------------------------------------|
| required     | Ensures the field is not empty. `0` counts as a value.                      | `err?: string`                     |
| email        | Validates that the field contains a valid email address.                    | `err?: string`                     |
| number       | Validates that the field contains a number.                                 | `err?: string`                     |
| integer      | Validates that the field contains only digits.                              | `err?: string`                     |
| capital      | Validates that the field contains only capital letters.                     | `err?: string`                     |
| maxLength    | Validates that the field does not exceed a specified maximum length.        | `len: number, err?: string`        |
| minLength    | Validates that the field meets a specified minimum length.                  | `len: number, err?: string`        |
| strictLength | Ensures the field has an exact specified length.                            | `len: number, err?: string`        |
| exclude      | Ensures the field does not contain any of the specified strings.            | `exclude: string[], err?: string`  |
| notEmpty     | Ensures the value has a length, such as a non-empty array.                  | `err?: string`                     |
| pattern      | Validates that the field matches a specified regular expression pattern.    | `options: RegExp, err?: string`    |

## Guide

### Error message

Pass a message to replace the default one for a single field.

```html { resource="src/App.vue" }
<v-form>
  <v-text-field
    label="Username"
    :rules="[rules.required('You have to fill this field!')]"
  ></v-text-field>
</v-form>
```

### Options

Rules with options take them first. For example, `maxLength` takes the length:

```html { resource="src/App.vue" }
<v-form>
  <v-text-field
    label="Username"
    :rules="[rules.maxLength(10)]"
  ></v-text-field>
</v-form>
```

The custom message then comes after the options:

```html { resource="src/App.vue" }
<v-form>
  <v-text-field
    label="Username"
    :rules="[rules.maxLength(10, 'You can\'t write over 10 characters')]"
  ></v-text-field>
</v-form>
```

## Aliases

Any rule can also be named in the **rules** prop as a string prefixed with `$`. This needs no `useRules()` call in the component:

```html { resource="src/App.vue" }
<v-form>
  <v-text-field
    label="Username"
    :rules="['$required']"
  ></v-text-field>
</v-form>
```

The example above is shorthand for `[rules.required()]`.

::: info

Aliases are resolved by the rules plugin, so they only take effect when [`createRulesPlugin`](#installation) is registered.

:::

### Passing options

To pass options or a message, use an array with the alias first and the arguments after it:

```html { resource="src/App.vue" }
<v-form>
  <v-text-field
    label="Username"
    :rules="[
      ['$required', 'This field is mandatory'],
      ['$maxLength', 10, 'You can\'t write over 10 characters'],
    ]"
  ></v-text-field>
</v-form>
```

### Custom aliases

Your own [custom rules](#custom-rules) can be used by name too:

```html { resource="src/App.vue" }
<v-text-field
  label="PIN"
  :rules="['$pinCode']"
></v-text-field>
```

## Custom rules

Add rules or replace built-in ones through the **aliases** option. A rule takes an optional message and returns the validation function.

```js { resource="src/plugins/vuetify.js" }
import { createApp } from 'vue'
import { createRulesPlugin, createVuetify } from 'vuetify'

const app = createApp()
const vuetify = createVuetify()

app.use(createRulesPlugin({
  aliases: {
    // Create a new rule named "pinCode"
    pinCode: err => {
      return v => (/^[\d]{4}$/.test(v)) || err || 'Field must contain a 4-digit PIN'
    },
    // Overwrite an existing rule by redefining it
    integer: err => {
      return v => Number.isInteger(v) || err || 'Field must contain an integer value'
    },
  },
}, vuetify.locale))
```
