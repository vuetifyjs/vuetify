---
meta:
  title: Breadcrumbs component
  description: The breadcrumbs component is a navigational helper for pages. It can accept a Material Icons icon or characters as a divider.
  keywords: breadcrumbs, vuetify breadcrumbs component, vue breadcrumbs component, v-breadcrumbs component
related:
  - /components/buttons/
  - /components/navigation-drawers/
  - /components/icons/
---

# Fils d’Ariane

The `v-breadcrumbs` component is a navigational helper for pages. It can accept a **Material Icons** icon or text characters as a divider. An array of objects can be passed to the **items** property of the component.  Additionally, slots exists for more control of the breadcrumbs, either utilizing `v-breadcrumbs-item` or other custom markup.

<entry-ad />

## Utilisation

By default, breadcrumbs use a text divider. This can be any string.

<usage name="v-breadcrumbs" />

## API

- [v-breadcrumbs](/api/v-breadcrumbs)
- [v-breadcrumbs-item](/api/v-breadcrumbs-item)

<inline-api page="components/breadcrumbs" />


<!-- ## Sub-components

### v-breadcrumbs-item

v-breadcrumbs-item description -->

## Caveats

<alert type="info">

  By default `v-breadcrumbs` will disable all crumbs up to the current page in a nested paths. You can prevent this behavior by using `exact: true` on each applicable breadcrumb in the `items` array.

</alert>

## Exemples

### Propriétés

#### Séparateur

Breadcrumbs separator can be set using `divider` property.

<example file="v-breadcrumbs/prop-divider" />

#### Large

Les grandes chaînes d'engrenages ont une taille de police plus grande.

<example file="v-breadcrumbs/prop-large" />

### Slots

#### Icon Dividers

Pour la variante d’icône, le fil d'ariane peut utiliser n’importe quelle icône du thème Material Design.

<example file="v-breadcrumbs/slot-icon-dividers" />

#### Item

You can use the `item` slot to customize each breadcrumb.

<example file="v-breadcrumbs/slot-item" />

<backmatter />
