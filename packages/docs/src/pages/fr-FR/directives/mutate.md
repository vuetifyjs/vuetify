---
meta:
  title: Mutation observer directive
  description: The mutation observer directive utilizes the Mutation observer API. It allows you to determine when elements are updated.
  keywords: mutate, vuetify mutate directive, mutation observer directive
related:
  - /components/sheets/
  - /components/images/
---

# Observateur de Mutation

La directive `v-mutate` utilise l'[API Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). Il fournit une interface facile à utiliser pour détecter quand les éléments sont mis à jour.

<entry-ad />

## Utilisation

Par défaut, la directive `v-mutate` activera toutes les options disponibles dans l'[API Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). Cela peut être modifié de deux manières. Vous pouvez transmettre un objet avec des clés pour les options **handler** et **options** ou utiliser le `modifier` propriété de la directive, `v-mutate.attr.sub="onMutate"`

<example file="v-mutate/usage" />

## API

- [v-mutate](/api/v-mutate)

<inline-api page="directives/mutate" />

## Exemples

### Paramètres

#### Modificateurs

La directive `v-mutate` accepte les modificateurs pour toutes les options disponibles dans l'[API Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). Par souci de concision, des abréviations sont utilisées : **attr** (attributs), **child** (childList), **sub** (subtree) et **char** (characterData).

<example file="v-mutate/option-modifiers" />

<backmatter />
