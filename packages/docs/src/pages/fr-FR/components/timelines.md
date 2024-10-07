---
meta:
  title: Timeline component
  description: The timeline component is used to display chronological information horizontally.
  keywords: timelines, vuetify timeline component, vue timeline component
related:
  - /components/cards/
  - /components/icons/
  - /components/grids/
---

# Fils d'activité

The `v-timeline` is useful for stylistically displaying chronological information.

<entry-ad />

## Utilisation

`v-timeline`'s in their simplest form display a vertical timeline that should contain at least one `v-timeline-item`.

<example file="v-timeline/usage" />

## API

- [v-timeline](/api/v-timeline)
- [v-timeline-item](/api/v-timeline-item)

<inline-api page="components/timelines" />


<!-- ## Sub-components

### v-timeline-item

v-timeline-item description -->

## Exemples

### Propriétés

#### Color

Les points colorés créent des points de rupture visuels qui facilitent la lecture de vos échéanciers.

<example file="v-timeline/prop-color" />

#### Compact

**dense** timelines position all content to the right. In this example, `v-alert` replaces the card to provide a different design.

<example file="v-timeline/prop-dense" />

#### Icon dots

Conditionally use icons within the `v-timeline-item`'s dot to provide additional context.

<example file="v-timeline/prop-icon-dots" />

#### Reverse

You can reverse the direction of the timeline items by using the **reverse** prop. This works both in default and **dense** mode.

<example file="v-timeline/prop-reverse" />

#### Small

The **small** prop allows alternate styles to provide a unique design.

<example file="v-timeline/prop-small" />

### Slots

#### Icônes

Insert avatars into dots with use of the `icon` slot and `v-avatar`.

<example file="v-timeline/slot-icon" />

#### Opposite

The **opposite** slot provides an additional layer of customization within your timelines.

<example file="v-timeline/slot-opposite" />

#### Timeline item default

If you place a `v-card` inside of a `v-timeline-item`, a caret will appear on the side of the card.

<example file="v-timeline/slot-timeline-item-default" />

### Divers

#### Avancé

Les composants modulaires vous permettent de créer des solutions hautement personnalisées qui fonctionnent juste.

<example file="v-timeline/misc-advanced" />

<backmatter />
