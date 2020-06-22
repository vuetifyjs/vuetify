---
meta:
  title: Vuetify — A Material Design Framework for Vue.js
  description: Vuetify is a Material Design component framework for Vue.js. It aims to provide all the tools necessary to create beautiful content rich applications.
  keywords: vue, material design components, vue components, material design components, vuetify, vuetify.js, component framework
---

<br>
<br>
<br>

# 🎉 Contribute to Vuetify!

Help us build the new documentation by porting over existing pages:

## Getting Started
1. Join our [Discord server](https://discord.gg/HJXwxMy) and say hello
2. Select an unassigned task on our [Notion Board](https://www.notion.so/vuetify/e8053365c88b4b238ebe4fd187057d03?v=33d6efa7be664eb088164810c70928eb)

  <alert type="info">For this guide we will say we have selected to convert the `Alerts` page.</alert>

3. Clone the [vuetify](https://github.com/vuetifyjs/vuetify) and [docs-next](https://github.com/vuetifyjs/docs-next) repositories using **ssh** or **https**:

    ```bash
    git clone git@github.com:vuetifyjs/vuetify.git &&
    git clone git@github.com:vuetifyjs/docs-next.git
    ```

    ```bash
    git clone https://github.com/vuetifyjs/vuetify.git && \
    git clone https://github.com/vuetifyjs/docs-next.git
    ```

4. Open both of your local `Vuetify` and `docs-next` repositories in VSCode.
5. In your local *Vuetify* repo, navigate to `vuetify/packages/docs/src`.
6. Navigate to the following folders and open the files related to page you are converting:

    * **src/lang/en/\*\*** - This path contains the `.json` file related to the page language and content.

    <alert type="info">
      I am working on the `Alerts` page so I will want to open the file: `src/lang/en/components/Alerts.json`
    </alert>

    * **src/data/pages/\*\*** - This path contains the `.pug` file related to the page structure.

    <alert type="info">
      I am working on the `Alerts` page so I will want to open the file: `src/data/pages/components/Alerts.pug`
    </alert>

7. In your local *docs-next* repo, following folder and open the file related to page you are converting:

    * **src/pages/en/\*\*** - This path contains the `.md` file you will be migrating data + structure to.

    <alert type="info">
      I am working on the `Alerts` page so I will want to open the file: **`src/lang/en/`**`components/Alerts.md`
    </alert>

<alert type="info">
  At this point you are ready to start migrating the data from the *Vuetify* repo to *docs-next*.
</alert>

## Converting the page

The following will cover various sections you will come across when convert a *Vuetify* page to *docs-next*

Each page in *doc-next* has been pre-filled with some dummy content. Component pages will contain a skeleton structure to put content in and some relevant information pertaining to the syntax of any available custom components.

<alert type="error">
  If at any time you come across something that needs a custom component, make a note on notion board item and move on.
</alert>

<alert type="error">
  If at any time you have any questions or get stuck. Reach out to us in [Discord](https://discord.gg/HJXwxMy).
</alert>

### Frontmatter

Frontmatter will always exist at the top of the page.

1. Move the __up-next__ items from your `.pug` page (`Alerts.pug`) to __related__ section of the **frontmatter** in your `.md` page (`alerts.md`):

```pug
<!-- Alerts.pug -->
up-next(:value=`[
  'components/buttons',
  'components/icons',
  'components/snackbars'
]`)
```

```html
<!-- alerts.md -->
---
meta:
  title: ...
  description: ...
  keywords: ...
related:
  - /components/buttons/
  - /components/icons/
  - /components/snackbars/
---
```

### Usage and Playground

The first sub section of your `.md` file in component pages will be a `Usage` section. You may also come across a section in your `.pug` file that looks like one of the following:

```pug
<!-- playground -->
playground(value="playground")
<!-- usage-new -->
usage-new(:value=`{
  ...
}`)
<!-- usage -->
usage(value="usage")
```
These are essentially the same thing: A single usage example. These will be completed at a different time. In the meantime you can still prep this `Usage` section by doing the following:

1. Move the usage/playground description text from your `.json` file (`Alerts.json`) beneath the `Usage` section of the `.md` page (`alerts.md`)
2. Add a custom usage component with the name of the component as its `name` attribute - eg: `<usage name="v-alert" />`

Full Example
```html
## Usage

Alerts in their simplest form are a flat [sheets of paper](/components/sheets) that display a message.

<usage name="v-alert" />
```

<alert type="info">
  If you are interested in learning how to convert usage examples, please reach out to us on [Discord](https://discord.gg/HJXwxMy)
</alert>

### API

1. Move the api items from your `.pug` file (`Alerts.pug`) to API section of the `.md` page (`alerts.md`). Format each component as a link:

```pug
<!-- Alerts.pug -->
api(:value=`[
  'v-alert'
]`)
```

```html
<!-- Alerts.md -->
## API

- [v-alert](../../api/v-alert)
```

### Examples

If you are working on a component page, you will come across a section relating to examples. In the `.pug` file you will see a chunk of code that looks like this:

```pug
examples(:value=`[
  'simple/type',
  'simple/border',
  'simple/colored-border',
  'simple/dense',
  'simple/dismissible',
  'simple/icon',
  'simple/outlined',
  'simple/prominent',
  'simple/text',
  'simple/transition',
  'complex/twitter'
]`)
```

1. If a page contains example files, create a folder in the *docs-next* repo under `src/examples/` labeled by component

    <alert type="info">
      I am working on the `Alerts` page so I will want to create a folder: `src/examples/v-alert`
    </alert>

    <alert type="info">
      For non-component based pages you can simply use the page name.
    </alert>

2. In your local *Vuetify* repo, navigate to `src/examples/` and find the folder pertaining to your component.

    <alert type="info">
      I am working on the `Alerts` page so I will want to find the folder: `src/examples/Alerts`
    </alert>

3. Copy all **folders** (simple/intermediate/complex)  to the newly created examples folder in the *docs-next* repo.
4. Move all files from each folder to the root of the example folder, and remove the folders. You should now have a single example folder containing `.vue` files that looks something like this:

  ```
  - src
    - examples
      - v-alert
        - example1.vue
        - example2.vue
  ```

5. Prepend the following to each of the files based on the following structure:

    - `prop-<filename>`: an example for a given prop
    - `event-<filename>`: an example for a given event
    - `slot-<filename>`: an example for a given slot
    - `misc-<filename>`: an example for anything that doesn't fall in the above mentioned.
    - eg: `dense.vue` -> `prop-dense.vue`

6. Add the examples to the `.md` file under the headers of respective prefix (prop/event/slot/misc).

    - Provide the header and description text provided in the *Vuetify* `.json` language file using the following format:

    ```html
    ### Props

    #### Example Header

    Example Description

    <example file="<component>/<filename>" />
    ```

    A full example:

    ```html
    ## Examples

    Below is a collection of simple to complex examples.

    ### Props

    #### Border

    The **border** prop adds a simple border to one of the 4 sides of the alert. This can be combined props like with **color**, **dark**, and **type** to provide unique accents to the alert.

    <example file="v-alert/prop-border" />
    ```

### API Language Data

Inside the `.json` files, you will likely notice a bunch of additional data related to `props`/`events`/`slots`/`functions` etc. This data needs to be moved to placeholder `.json` files within *docs-next* to be merged into our api-generator at a later time. To do so proceed with the following steps:

1. Navigate to the following folder in your local *docs-next* repo and open the file related to page you are converting:

    * **build/api-gen/locale/en/\*\*** - This path contains the `.json` file related to the page language for component api.

    <alert type="info">
      I am working on the `Alerts` page so I will want to open the file: `build/api-gen/locale/en/v-alert.json`
    </alert>

2. Move the data contained within the `props`/`events`/`slots`/`functions` properties in your *Vuetify*`.json` file, to the corresponding section of the *docs-next* `.json` file:

```json
// Vuetify .json file
{
  "props": {
    "border": "Puts a border on the alert. Accepts **top** | **right** | **bottom** | **left**.",
    ...
  }
}
```

```json
// docs-next .json file
{
  "props": {
    "empty": "",
    // add prop lang here
    "border": "Puts a border on the alert. Accepts **top** | **right** | **bottom** | **left**.",
    ...
  }
}
```

## Finishing Up

Once your conversion is complete, [submit a pull request](https://github.com/vuetifyjs/docs-next/pulls).

## Tips

* All skill levels encouraged, if you have questions, just ask us [on Discord](https://community.vuetifyjs.com/)
* Ensure content is evenly spaced and uniform:

```html
<!-- Good -->
# Heading 1

Lorem ipsum dolor sit amet, ius elit fugit ut

## Heading 2

Lorem ipsum dolor sit amet, ius elit fugit ut

> Blockquote Lorem ipsum dolor sit amet, ius elit fugit ut

* List item 1
* List item 2
* List item 3

<!-- Bad -->
# Heading 1
Lorem ipsum dolor sit amet, ius elit fugit ut

## Heading 2

Lorem ipsum dolor sit amet, ius elit fugit ut

>Blockquote Lorem ipsum dolor sit amet, ius elit fugit ut

- List item 1
- List item 2
- List item 3
```

## Glossary

### Useful example pages

* Regular page example is [quick-start.md](https://github.com/vuetifyjs/docs-next/blob/master/src/pages/en/getting-started/quick-start.md)
* Component page example is [alerts.md](https://github.com/vuetifyjs/docs-next/blob/master/src/pages/en/components/alerts.md)

### Generic page template

```html
---
<!-- This is the page's frontmatter -->
meta:
  title: Page title
  description: Page description
  keywords: Page keywords
related:
  - Doc page link
  - Doc page link
  - Doc page link
---

# Page Heading

Lorem ipsum dolor sit amet, ius elit fugit ut.

<entry-ad />

<!-- Main Content Area -->

<doc-footer />
```

### Generic component page template

```html
---
<!-- This is the page's frontmatter -->
meta:
  title: Page title
  description: Page description
  keywords: Page keywords
related:
  - Doc page link
  - Doc page link
  - Doc page link
---

# Component Name

Component description

<entry-ad />

## Usage

Usage text

`<usage name="" />`
- **name**: component name
- eg: `<usage name="v-alert" />`

## API

- [API Page Link]()

## Sub-Components

Omit if none

### Sub Component 1

Sub component text

### Sub Component 2

Sub component text

## Caveats

Omit if none

<alert type="success">
  Success Caveat
</alert>
<alert type="info">
  Info Caveat
</alert>
<alert type="warning">
  Warning Caveat
</alert>
<alert type="error">
  Error Caveat
</alert>

## Examples

Example text.

### Props

Omit if none

### Events

Omit if none

### Slots

Omit if none

#### Misc

Omit if none

#### Example Header

Example description

`<example file="" />`
- **file**: `<component>/<type>-<propname>`
- eg: `<example file="v-alert/prop-colored-border" />`

## Accessibility

Accessibility text - omit if none

<doc-footer />
```
