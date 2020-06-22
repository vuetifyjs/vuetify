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

1. Join our [Discord server](https://discord.gg/HJXwxMy) and say hello
2. Select an unnasigned task on our [Notion Board](https://www.notion.so/vuetify/e8053365c88b4b238ebe4fd187057d03?v=33d6efa7be664eb088164810c70928eb)
3. Clone the [vuetify](https://github.com/vuetifyjs/vuetify) and [docs-next](https://github.com/vuetifyjs/docs-next) repositories using **ssh** or **https**:
  ```bash
    git clone git@github.com:vuetifyjs/vuetify.git &&
    git clone git@github.com:vuetifyjs/docs-next.git
  ```
  ```bash
    git clone https://github.com/vuetifyjs/vuetify.git && \
    git clone https://github.com/vuetifyjs/docs-next.git
  ```
4. Open both `vuetify` and `docs-next` in VSCode
5. In the *Vuetify* repo, navigate to `vuetify/packages/docs` and open the following files:
  - **docs/src/lang/en/components/{Page}.json**—e.g. `Alerts.json`
  - **docs/src/data/pages/components/{Page}.pug**—e.g. `Alerts.pug`
6. In the *docs-next* repo, navigate to `src/pages/{folder}/{page}.md`—e.g. `src/pages/components/alerts.md`
7. Move the __up-next__ items from `{Page}.pug` to __related__ in the page's **frontmatter**:

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

A generic page:

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
8. If a page contains example files (this can be found by looking in the pages `.pug` file in the *Vuetify* repo) create a folder in the **docs-next** repo under `src/examples/` labeled by component — e.g. `src/examples/v-alert`. For non-component based pages you can simply use the page name.
9. In the *Vuetify* repo, navigate to `packages/docs/src/examples/{page}/` (e.g. `packages/docs/src/examples/alerts`) and copy all **folders** (simple/intermediate/complex) to the newly created examples folder in the *docs-next* repo.
10. Move all files from each folder to the root of the example folder, and remove the folders. You should now have a single example folder containing `.vue` files.
11. Prepend the following to each of the files based on the following structure:
  - `prop-<filename>`: an example for a given prop
  - `event-<filename>`: an example for a given event
  - `slot-<filename>`: an example for a given slot
  - `misc-<filename>`: an example for anything that doesn't fall in the above mentioned.
  - eg: `dense.vue` -> `prop-dense.vue`
12. Add the examples to the `.md` file under the headers of respective prefix (prop/event/slot/misc). Provide the header and description text provided in the *Vuetify* repo's language file using the following format:
```md
### Props

#### Example Header
Example Description

<example file="<component>/<filename>" />
```
A full example:
```md
## Examples
Below is a collection of simple to complex examples.

### Props

#### border
The **border** prop adds a simple border to one of the 4 sides of the alert. This can be combined props like with **color**, **dark**, and **type** to provide unique accents to the alert.

<example file="v-alert/prop-border" />
```

* Regular page example is [quick-start.md](https://github.com/vuetifyjs/docs-next/blob/master/src/pages/en/getting-started/quick-start.md)
* Component page example is [alerts.md](https://github.com/vuetifyjs/docs-next/blob/master/src/pages/en/components/alerts.md)

Once your conversion is complete, [submit a pull request](https://github.com/vuetifyjs/docs-next/pulls).

## Tips

* All skill levels encouraged, if you have questions, just ask us [on Discord](https://community.vuetifyjs.com/)
* Ensure content is evenly spaced and uniform:

```md
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
