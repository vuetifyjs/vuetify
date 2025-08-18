---
meta:
  nav: WYSIWYG Editor
  title: Editor component
  description: The editor component is a rich text editor that allows users to create and edit content with formatting options.
  keywords: editor, vuetify editor component, vue editor component, rich text editor, wysiwyg
related:
  - /components/textareas/
  - /components/text-fields/
  - /components/forms/
features:
  github: /labs/VEditor/
  label: 'C: VEditor'
  report: true
---

# WYSIWYG Editor

The `v-editor` component provides a rich text editor with formatting capabilities, allowing users to create and edit content with text formatting options.

<PageFeatures />

## Usage

The `v-editor` component combines the functionality of a text area with a toolbar for text formatting. It supports basic rich text editing with a clean, intuitive interface.

<ExamplesUsage name="v-editor" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-editor](/api/v-editor/) | Primary Component |

<ApiInline hide-links />

## Guide

The `v-editor` component is built on top of Vuetify's `v-input` and `v-field` components, providing a rich text editing experience. It includes a toolbar with formatting buttons and a content-editable area for text input.

### Props

The `v-editor` component inherits all props from `v-input` and `v-field` components, plus its own specific props for editor functionality.

#### Basic usage

A simple editor with default toolbar (bold, italic, underline):

<ExamplesExample file="v-editor/prop-basic" />

#### Custom toolbar items

You can customize which formatting options are available in the toolbar using the `formats` prop:

<ExamplesExample file="v-editor/prop-formats" />

#### Hide toolbar

You can hide the formatting toolbar entirely using the `hide-toolbar` prop:

<ExamplesExample file="v-editor/prop-hide-toolbar" />

#### Height and sizing

Control the editor's height and maximum height:

<ExamplesExample file="v-editor/prop-height" />

### Examples

#### Form integration

Integrate the editor into forms with validation and other form components:

<ExamplesExample file="v-editor/misc-form-integration" />

#### Custom styling

Apply custom colors and styling to match your application's theme:

<ExamplesExample file="v-editor/prop-custom-colors" />

#### Disabled and readonly states

The editor supports disabled and readonly states like other Vuetify inputs:

<ExamplesExample file="v-editor/prop-disabled-readonly" />

#### Clearable

Make the editor clearable with a clear button:

<ExamplesExample file="v-editor/prop-clearable" />

#### With hints and messages

Add helpful hints and error messages:

<ExamplesExample file="v-editor/prop-hints" />
