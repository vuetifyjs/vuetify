---
layout: documentation
description: The v-alert component is used to convey information to the user. Designed to stand out, the alerts come in four contextual styles.
keywords: v-alert, alerts, vue alert component, vuetify alert component
---

# Alerts
The `v-alert` component is used to convey important information to the user through the use contextual types icons and color. These default types come in in 4 variations: `success`, `info`, `warning`, and `error`. Default icons are assigned which help represent different actions each type portrays. Many parts of an alert such as border, icon, and color can also be customized to fit almost any situation.

<carbon-ad />

## Usage
Alerts in their simplest form are a flat sheets of paper that display a message.<usage>v-alert</usage>

## Sub-Components
None

## Caveats

<alert type="warning">I'm an alert. Fear My Alertness!</alert>

## Examples
Below is a collection of simple to complex examples.

  ### Type Type Example <example file="v-alert/simple/type" />

  ### Dense Dense Example <example file="v-alert/simple/dense" />

## Accessibility
By default, v-alert components are assigned the WAI-ARIA role of alert which denotes that the alert "is a live region with important and usually time-sensitive, information." When using the dismissible prop the close icon will receive a corresponding aria-label. This value can be modified by changing either the close-label prop or globally through customizing the Internationalization's default value for the close property.

## API
  - [v-alert](../api/v-alert)

## Up Next
<up-next />

<vuetify-ad />

<contribute />
