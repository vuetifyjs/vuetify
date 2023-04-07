---
nav: Defaults providers
meta:
  title: Defaults provider component
  description: The defaults provider allows you to provide specific default prop values to components in a section of your application
  keywords: defaults provider, vuetify defaults provider component, vue defaults provider component
related:
  - /features/aliasing/
  - /features/blueprints/
  - /features/global-configuration/
---

# Defaults providers

The defaults provider allows you to provide specific default prop values to components in a section of your application

----

## Usage

The `v-defaults-provider` component is used to provide default props to components within its scope. It hooks into the [Global configuration](/features/global-configuration/) feature and makes it easy to assign multiple properties at once or scope out all incoming changes to any children.

<usage name="v-defaults-provider" />

<entry />

## API

| Component | Description |
| - | - |
| [v-defaults-provider](/api/v-defaults-provider/) | Primary Component |

<api-inline hide-links />

## Examples

### Defaults

The `v-defaults-provider` expects a prop **defaults** which looks the same as the **defaults** object that you can pass to `createVuetify` when creating your application.

<example file="v-defaults-provider/prop-defaults" />
