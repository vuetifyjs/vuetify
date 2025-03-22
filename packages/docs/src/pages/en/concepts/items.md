---
meta:
  nav: Items
  title: Items
  description: Items
  keywords: items
related:
  - /components/lists/
  - /components/selects/
  - /components/data-tables/
---

# Items

Items are the data that is displayed in a component. They can be passed as an array of objects or strings.

<PageFeatures />

<PromotedEntry />

## Guide

Item props allow you to map the properties of each item to the component's props. This allows you to customize the display of each item without having to manually extract the data.

### Accessor props

Accessor props are they keys to look for in each item object. They can be set to a string, array, or function.

- **item-title:** The title of each item.
- **item-value:** The value of each item.
- **item-children:** The children of each item.
- **item-props:** The props of each item.

### String

Specify the property to use for the title when you have an array of user objects:

```html
<v-component
  item-title="name"
  item-title="user.name"
/>
```

This makes it easy to display nested properties without manually extracting them.

### Array

Lookup on each item object. Like dot notation (each member is a key in the current object), but can be used if the key contains a dot.

```html
<v-component
  :item-title="['name']"
  :item-title="['user', 'name']"
/>
```

### Function

A function that returns the value to use for the title. This is useful if you need to format the value or access a property that is not a direct child of the item.

```html
<v-component
  :item-title="item => item.name"
  :item-title="item => item.user.name"
/>
```
