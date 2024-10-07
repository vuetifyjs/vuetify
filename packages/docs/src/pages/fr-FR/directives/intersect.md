---
meta:
  title: Intersection observer directive
  description: The intersection observer directive utilizes the Intersection observer API. It allows you to determine when elements are visible on the screen.
  keywords: intersect, vuetify intersect directive, intersection observer directive
related:
  - /components/cards/
  - /components/images/
---

# Observateur d'intersection

La directive `v-intersect` utilise l'[API Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Il fournit une interface facile à utiliser pour détecter le moment où les éléments sont visibles dans la fenêtre de l'utilisateur. Ceci est également utilisé pour le composant [v-lazy](/components/lazy).

<entry-ad />

## Utilisation

Faites défiler la fenêtre et observez le point coloré. Notez que la [v-card](/components/cards) apparaît qu'elle passe de l'erreur à la réussite.

<example file="v-intersect/usage" />

## API

- [v-intersect](/api/v-intersect)

<inline-api page="directives/intersect" />

## Mise en garde

<alert type="info">

  Si l'API [Intersection Observer](https://developer.mozilla.org/fr-US/docs/Web/API/Intersection_Observer_API) n'est pas disponible dans IE11 par défaut, il peut être implémenté en utilisant un [polyfill](https://github.com/w3c/IntersectionObserver)

</alert>

## Exemples

### Propriétés

#### Paramètres

La directive `v-intersect` accepte les options. Les options disponibles se trouvent dans l'[API Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Vous trouverez ci-dessous un exemple utilisant l'option `threshold`.

<example file="v-intersect/prop-options" />

<backmatter />
