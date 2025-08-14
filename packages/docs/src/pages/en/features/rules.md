---
emphasized: true
meta:
  nav: Validation rules
  title: Validation rules composable
  description: Vuetify implements a set of validation rules that can be overwritten
  keywords: Form validation, vuetify form validation, rules composable, validation rules
related:
  - /components/forms/
  - /features/internationalization/
features:
  github: /labs/rules/
  label: 'E: rules'
  report: true
---

# Validation rules

The rules composable provide a multitude of validation rules to be used with form inputs.

<PageFeatures />

<PromotedEntry />

::: warning

This feature requires [v3.8.0](/getting-started/release-notes/?version=v3.8.0)

:::

## Installation

To use the Rules plugin, you'll need to import and register it with your Vuetify instance:

```js
import { createVue } from 'vue'
import { createVuetify } from 'vuetify'
import { createRulesPlugin } from 'vuetify/labs/rules'

const app = createVue()
const vuetify = createVuetify()

app.use(createRulesPlugin({ /* options */ }, vuetify.locale))
```

This will make the rules system available throughout your application. The plugin accepts options for customizing validation rules and integrates with Vuetify's locale system for internationalization.

Inside of components, you can now import and utilize the rules composable:

```js
import { useRules } from 'vuetify/labs/rules'

const rules = useRules()
```

## Usage

Within your application, import the useRules function and use it to access the rules composable.
Existing rules' error messages can also be customized on the fly, to fit specific field cases.

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
  import { useRules } from 'vuetify/labs/rules'

  const rules = useRules()

  async function submit (event) {
    await event
  }
</script>
```

## API

Below is a table of the available validation rules provided by the rules composable, including their arguments or options:

| Rule Name    | Description                                                                 | Arguments/Options                  |
|--------------|-----------------------------------------------------------------------------|------------------------------------|
| required     | Ensures the field is not empty.                                             | `err?: string`                     |
| email        | Validates that the field contains a valid email address.                    | `err?: string`                     |
| number       | Validates that the field contains a number.                                 | `err?: string`                     |
| integer      | Validates that the field contains an integer.                               | `err?: string`                     |
| capital      | Ensures the field contains at least one capital letter.                     | `err?: string`                     |
| maxLength    | Validates that the field does not exceed a specified maximum length.        | `len: number, err?: string`        |
| minLength    | Validates that the field meets a specified minimum length.                  | `len: number, err?: string`        |
| strictLength | Ensures the field has an exact specified length.                            | `len: number, err?: string`        |
| exclude      | Ensures the field does not contain any of the specified values.             | `exclude: string[], err?: string`  |
| notEmpty     | Ensures the field is not empty (similar to required).                       | `err?: string`                     |
| pattern      | Validates that the field matches a specified regular expression pattern.    | `options: RegExp, err?: string`    |

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

Some RuleBuilders need options to work. For example `maxLength` needs a number as first parameter:

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

<!--
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
-->

## Custom rules

Vuetify comes with an existing set of validation rules but you can overwrite them or add yours.

```js { resource="src/plugins/vuetify.js" }
import { createVue } from 'vue'
import { createVuetify } from 'vuetify'
import { createRulesPlugin } from 'vuetify/labs/rules'

const app = createVue()
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
}, vuetify.locale)
```
