---
meta:
  nav: Validation rules
  title: Validation rules composable
  description: Vuetify implements a set of validation rules that can be overwritted
  keywords: Form validation, vuetify form validation, rules composable, validation rules
related:
  - /components/forms/
features:
  github: /labs/rules/
  label: 'E: rules'
  report: true
---

# Validation rules

The rules composable provide a multitude of validation rules to be used with form inputs.

<page-features />

<entry />

## Usage

Within your application, import the useRules function and use it to access the rules composable.
Existing rules’ error messages can also be customized on the fly, to fit specific field cases.

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
  import { useRules } from '@/labs/rules/rules'

  const rules = useRules()

  async function submit (event) {
    await event
  }
</script>
```

## Guide

The `useRules` composable doesn't return rules directly but RuleBuilders that allows to customize
error messages and to provide options when necessary.

### Error message

Default error messages can be field-level redefined.

```html { resource="src/App.vue" }
<v-form>
  <v-text-field
    label="Username"
    :rules="[rules.required('You have to fill this field!')]"
  ></v-text-field>
</v-form>
```

### Options

Some RuleBuilders need options to work. For exemple `maxLength` needs a number as first parameter:

```html { resource="src/App.vue" }
<v-form>
  <v-text-field
    label="Username"
    :rules="[rules.maxLength(10)]"
  ></v-text-field>
</v-form>
```

In this case, error message can be redefined as second parameter:

```html { resource="src/App.vue" }
<v-form>
  <v-text-field
    label="Username"
    :rules="[rules.maxLength(10, 'You can\'t write over 10 characters')]"
  ></v-text-field>
</v-form>
```

## Aliases

Rules can also be used in inputs using the alias names syntax:

```html { resource="src/App.vue" }
<v-form>
  <v-text-field
    label="Username"
    :rules="['$required']"
  ></v-text-field>
</v-form>
```

RuleBuilders parameters can also be passed using an Array:

```html { resource="src/App.vue" }
<v-form>
  <v-text-field
    label="Username"
    :rules="[
      ['$required', 'This field is mandatory'],
      ['$maxLength', 10, 'You can\'t write over 10 characters']
    ]"
  ></v-text-field>
</v-form>
```

## Custom rules

Vuetify comes with an existing set of validation rules but you can overwrite them or add yours.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'

export default createVuetify({
  rules: {
    aliases: {
      // Create a new rule named "pinCode"
      pinCode: err => {
        return v => (/^[\d]{4}$/.test(v)) || err || 'Field must contain a 4-digit PIN'
      },
      // Overwrite an existing rule by redefining it
      integer: err => {
        return v => Number.isInteger(v) || err || 'Field must contain an interger value'
      }
    },
  },
})
```
