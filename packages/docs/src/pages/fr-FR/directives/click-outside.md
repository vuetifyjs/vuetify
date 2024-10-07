---
meta:
  title: Click outside directive
  description: The v-click-outside directive calls a function when something outside of the target element is clicked on.,
  keyword: click outside, click directive, vue click directive, vuetify click directives
related:
  - /components/dialogs/
  - /directives/intersect/
---

# Cliquez à l'extérieur

La directive `v-click-outside` appelle une fonction lorsque l'on clique sur quelque chose en dehors de l'élément cible. Ceci est utilisé en interne par des composants tels que `v-menu` et `v-dialog`.

<entry-ad />

## Utilisation

La directive `v-click-outside` vous permet de fournir un gestionnaire à invoquer lorsque l'utilisateur clique en dehors de l'élément cible.

<example file="v-click-outside/usage" />

## API

- [v-click-outside](/api/v-click-outside)

<inline-api page="directives/click-outside" />

## Exemples

### Paramètres

#### Fermer sur clic extérieur

Fournissez éventuellement un gestionnaire `closeOnOutsideClick` qui renvoie `true` ou `false`. Cette fonction détermine si la fonction de clic extérieur est appelée ou non.

<example file="v-click-outside/option-close-on-outside-click" />

#### Include

Fournissez éventuellement une fonction `include` dans l'objet `options` qui renvoie un tableau de `HTMLElement`s. Cette fonction détermine les éléments supplémentaires dont le clic doit se trouver en dehors.

<example file="v-click-outside/option-include" />

<backmatter />
