---
meta:
  nav: Confirm Edit
  title: Confirm Edit
  description: The confirm edit component is used to allow the user to verify their changes before they are committed. This is useful when you want to prevent accidental changes or to allow the user to cancel their changes.
  keywords: v-confirm-edit, confirm edit, vuetify confirm edit, vuetify confirm edit component, vuetify confirm edit examples
related:
  - /components/avatars/
  - /components/icons/
  - /components/toolbars/
features:
  github: /components/VConfirmEdit/
  label: 'C: VConfirmEdit'
  report: true
---

# Confirm edit

The `v-confirm-edit` component is used to allow the user to verify their changes before they are committed.

<PageFeatures />

<DocIntroduced version="3.6.0" />

## Usage

<ExamplesUsage name="v-confirm-edit" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-confirm-edit](/api/v-confirm-edit/) | Primary Component |

<ApiInline hide-links />

## Guide

The `v-confirm-edit` component is an intuitive way to capture a model's changes before they are committed. This is useful when you want to prevent accidental changes or to allow the user to cancel their changes.

### Pickers

It's easy to integrate pickers into the `v-confirm-edit` component. This allows you to provide a more user-friendly experience when selecting dates, times, or colors.

<ExamplesExample file="v-confirm-edit/misc-date-picker" />
