---
meta:
  title: Scroll directive
  description: The scroll directive gives you the ability to conditionally invoke methods when the screen or an element are scrolled.
  keywords: scroll, vuetify scroll directive, vue scroll directive, window scroll directive
related:
  - /styles/scroll/
  - /directives/touch-support/
---

# Directive de défilement

La directive `v-scroll` vous permet de fournir des rappels lorsque la fenêtre, la cible spécifiée ou l'élément lui-même (avec le modificateur `.self`) défile.

<entry-ad />

## Utilisation

Le comportement par défaut est de se lier à la fenêtre. Si aucune option de configuration supplémentaire n'est nécessaire, vous pouvez simplement passer votre fonction de rappel.

<example file="v-scroll/usage" />

## API

- [v-scroll](/api/v-scroll)

<inline-api page="directives/scroll" />

## Exemples

### Paramètres

#### Self

`v-scroll` cible la `window` par défaut mais peut également regarder l'élément auquel il est lié. Dans l'exemple suivant, nous utilisons le modificateur **self**, `v-scroll.self`, pour regarder les [ élément `v-card`](/components/cards) en particulier. Cela provoque l'appel de la méthode `onScroll` lorsque vous faites défiler le contenu de la carte ; incrémenter le compteur.

<example file="v-scroll/option-self" />

#### Cibler

Pour une approche plus précise, vous pouvez désigner la cible pour lier l'écouteur d'événements de scroll.

<example file="v-scroll/option-target" />

<backmatter />
