---
emphasized: true
meta:
  title: File upload
  description: The file upload component is a drag and drop area for uploading files.
  keywords: file uploading, file upload, file drag and drop, file drop area, file dropzone, file upload component
related:
  - /components/buttons/
  - /components/file-inputs/
  - /components/sheets/
features:
  report: true
  label: 'C: VFileUpload'
  github: '/labs/VFileUpload/'
---

# File upload

<PageFeatures />

::: warning

This feature requires [v3.7.6](/getting-started/release-notes/?version=v3.7.6)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VFileUpload } from 'vuetify/labs/VFileUpload'

export default createVuetify({
  components: {
    VFileUpload,
  },
})
```

## Usage

The `v-file-upload` component is a drag and drop area for uploading files. It can be customized with slots and has support for density and multiple styles.

<ExamplesUsage name="v-file-upload" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-file-upload](/api/v-file-upload/) | Primary Component |
| [v-file-upload-item](/api/v-file-upload-item/) | Item Component |
| [v-file-input](/api/v-file-input/) | File input component |

<ApiInline hide-links />

## Guide

The v-file-upload component is a more visual counterpart to the [v-file-input](/components/file-inputs/) component. It provides a drag and drop area for files, and can be customized with slots.

### Props

Utilize various properties to customize the look and feel of the `v-file-upload` component.

#### Density

The **density** prop is used to control the vertical space the upload takes up.

<ExamplesExample file="v-file-upload/prop-density" />

#### Content

Use the **browse-text**, **divider-text**, **icon**, **title**, or **subtitle** props to customize the text displayed in the component.

<ExamplesExample file="v-file-upload/prop-content" />

#### Disabled

The **disabled** property reduces the opacity of the component and prevents interaction.

<ExamplesExample file="v-file-upload/prop-disabled" />

#### Scrim

The **scrim** property allows you to set a colored scrim when hovering over the component with files.

<ExamplesExample file="v-file-upload/prop-scrim" />

### Slots

The `v-file-upload` component has several slots that can be used to customize the component.

#### Item

The **item** slot is used to customize the appearance of the file item.

<ExamplesExample file="v-file-upload/slot-item" />
