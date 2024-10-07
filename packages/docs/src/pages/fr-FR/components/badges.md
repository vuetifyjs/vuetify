---
meta:
  title: Composant Badge
  description: The badge component is a small status descriptor for elements. This typically contains a small number or short set of characters.
  keywords: badges, vuetify badge component, vue badge component
related:
  - /components/avatars/'
  - /components/icons/'
  - /components/toolbars/'
---

# Badges

The `v-badge` component superscripts or subscripts an avatar-like icon or text onto content to highlight information to a user or to just draw attention to a specific element. Content within the badge usually contains numbers or icons.

<entry-ad />

## Utilisation

Les badges dans leur forme la plus simple s'affichent à la droite supérieure du contenu qu'il enveloppe et nécessite l'emplacement de badge.

<usage name="v-badge" />

## API

- [v-badge](/api/v-badge)

<inline-api page="components/badges" />

## Exemples

### Divers

#### Customization options

The `v-badge` component is flexible and can be used in a variety of use-cases over numerous elements. Options to tweak the location are also available through the **offset-x** and **offset-y** props."

<example file="v-badge/misc-customization" />

#### Dynamic notifications

Vous pouvez incorporer des badges avec du contenu dynamique pour faire des choses comme un système de notification.

<example file="v-badge/misc-dynamic" />

#### Show on hover

Vous pouvez faire beaucoup de choses avec le contrôle de visibilité, par exemple, montrer badge sur le survol.

<example file="v-badge/misc-hover" />

#### Tabulations

Badges help convey information to the user in a variety of ways.

<example file="v-badge/misc-tabs" />

<backmatter />
