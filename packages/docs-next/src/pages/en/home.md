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
  1. **docs/src/lang/en/components/{Page}.json**—e.g. `Alerts.json`
  2. **docs/src/data/pages/components/{Page}.pug**—e.g. `Alerts.pug`
  3. **docs/src/lang/en/meta.json**
7. In the *docs-next* repo, navigate to `src/pages/{folder}{page}.md`—e.g. `src/pages/components/alerts.md`
8. Move metadata from `meta.json` to the page's **frontmatter** (example below).
9. Move the __up-next__ items from `{Page}.pug` to __related__ in the page's **frontmatter**:

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
