---
meta:
  title: Skeleton loader component
  description: The v-skeleton-loader component is a versatile tool that can fill many roles within a project. At its heart, the component provides an indication to the user that something is coming but not yet available.
  keywords: skeleton-loader, material loader, bar loader
related:
  - /components/cards/
  - /components/progress-circular/
  - /components/buttons/
---

# Skeleton loaders

Le composant `v-skeleton-loader` est un outil polyvalent qui peut remplir de nombreux rôles dans un projet.  En son cœur, le composant fournit une indication à l'utilisateur que quelque chose arrive mais n'est pas encore disponible. Il existe plus de 30 options prédéfinies qui peuvent être combinées pour créer des exemples personnalisés.

<entry-ad />

## Utilisation

Le composant `v-skeleton-loader` fournit à un utilisateur un indicateur visuel indiquant que le contenu est à venir/chargement. Il vaut mieux que les chargeuses traditionnelles en plein écran.

<example file="v-skeleton-loader/usage" />

## API

- [v-skeleton-loader](/api/v-skeleton-loader)

<inline-api page="components/skeleton-loaders" />

## Exemples

### Divers

#### Composoant Boilerplate

Le `v-skeleton-loader` peut être utilisé comme une chaudière lors de la création de maquettes. Mixez et associez différentes options prédéfinies ou créez vos propres implémentations uniques. Dans cet exemple, nous utilisons une propriété de **données** personnalisées pour appliquer les mêmes propriétés à plusieurs `v-skeleton-loader` en même temps.

<example file="v-skeleton-loader/misc-boilerplate" />


<!-- #### Implementation methods

There are 2 ways that you can utilize the `v-skeleton-component`. The **default slot** or a **v-if** conditional. The built in slot is the most convenient and easiest to use, but generates an extra div once rendered. If the extra div is an issue in your setup, you can utilize a **v-if** conditional with a Vuetify [transition component](/styles/transitions) or a custom one.

<example file="v-skeleton-loader/misc-implementation" /> -->

## Accessibilité

By default, the `v-skeleton-loader` component is assigned a [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) role of [**alert**](https://www.w3.org/TR/wai-aria/#alert). We augment this role with two aria properties. An [**aria-busy**](https://www.w3.org/TR/wai-aria-1.0/states_and_properties#aria-busy) value of **true** denotes that a widget is missing required owned elements. An [**aria-live**](https://www.w3.org/TR/wai-aria-1.1/#aria-live) value of **polite** sets the screen reader's priority of live regions.

<backmatter />
