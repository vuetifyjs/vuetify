---
meta:
  title: Directive ripple
  description: La directive _ripple_ ajoute un feedback sur le toucher et le clic d'un élément sous forme de vague.
  keywords: ondulations, encre, directive vuetify ripple, directive vue ripple
related:
  - /fr/components/buttons/
  - /fr/components/expansion-panels/
  - /fr/styles/transitions/
---

# Directive ripple

La directive `v-ripple` est utilisée pour montrer l'action d'un utilisateur. Elle peut être appliquée à n'importe quel élément de bloc. De nombreux composants intègrent d'office la directive ripple, comme `v-btn`, `v-tabs-item` et beaucoup d'autres.

<entry-ad />

## Utilisation

Pour activer la fonctionnalité ripple de base, il suffit d'utiliser la directive `v-ripple` sur un composant ou un élément HTML

<example file="v-ripple/usage" />

## API

- [v-ripple](/api/v-ripple)

<inline-api page="directives/ripple" />

## Exemples

### Paramètres

#### Centre

Lorsque l'option `center` est utilisée, l'ondulation partira toujours du centre de la cible.

<example file="v-ripple/option-center" />

### Divers

#### Couleur personnalisée

Avec une classe d'aide, il est possible de modifier la couleur de l'ondulation.

<example file="v-ripple/misc-custom-color" />

#### Ondulation dans les composants

Certains composants fournissent la prop `ripple` pour vous permettre de contrôler l'effet de l'ondulation. Vous pouvez la désactiver ou en personnaliser le comportement en utilisant les options `class` ou `center`.

<example file="v-ripple/misc-ripple-in-components" />

<backmatter />
