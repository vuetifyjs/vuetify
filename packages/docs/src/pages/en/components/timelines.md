---
nav: Timelines
meta:
  title: Timeline component
  description: The timeline component is used to display chronological information either vertically or horizontally.
  keywords: timelines, vuetify timeline component, vue timeline component
related:
  - /components/cards/
  - /components/icons/
  - /components/grids/

---

# Timelines

The `v-timeline` is useful for stylistically displaying chronological information.

<entry />

<!--
## Usage

`v-timeline`s in their simplest form display a vertical timeline that should contain at least one `v-timeline-item`.

<example file="v-timeline/usage" />
-->

## API

<api-inline />

<!-- ## Sub-components

### v-timeline-item

v-timeline-item description -->

## Examples

### Props

#### Direction

You can switch to a horizontal timeline using the **direction** prop.

<example file="v-timeline/prop-direction" />

#### Side

**side** positions all items to one side of the timeline. In this example, `v-alert` replaces the card to provide a different design.

<example file="v-timeline/prop-single-side" />

#### Alignment

By default item content is aligned to the center of the item. Using the **align** prop you can change this to align to the start instead.

<example file="v-timeline/prop-align" />

#### Dot color

Colored dots create visual breakpoints that make your timelines easier to read.

<example file="v-timeline/prop-color" />

#### Icon dots

Use icons within the `v-timeline-item` dot to provide additional context.

<example file="v-timeline/prop-icon-dots" />

<!-- #### Mirror

You can mirror the placement of the timeline items by using the **mirror** prop.

<example file="v-timeline/prop-mirror" /> -->

#### Size

The **size** prop allows you to customize the size of each dot.

<example file="v-timeline/prop-size" />

#### Truncated line

Using the **truncate-line** prop you can truncate the line at the start, end, or both ends.

<example file="v-timeline/prop-truncate-line" />

#### Line inset

Using the **line-inset** prop you can specify an amount that each dividing line is inset.

<alert type="warning">

  It is not possible to use the **line-inset** prop together with the **truncate-line** prop. The **line-inset** prop will take precedence if both are specified.

</alert>

<example file="v-timeline/prop-line-inset" />

### Slots

#### Icon

Insert avatars into dots with use of the `icon` slot and `v-avatar`.

<example file="v-timeline/slot-icon" />

#### Opposite

The **opposite** slot provides an additional layer of customization within your timelines.

<example file="v-timeline/slot-opposite" />

<!--
#### Timeline item default

If you place a `v-card` inside of a `v-timeline-item`, a caret will appear on the side of the card.

<example file="v-timeline/slot-timeline-item-default" />
-->

### Misc

#### Advanced

<example file="v-timeline/misc-advanced" />

<backmatter />
