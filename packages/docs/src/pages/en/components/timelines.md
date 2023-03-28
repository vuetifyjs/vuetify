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

| Component | Description |
| - | - |
| [v-timeline](/api/v-timeline/) | Primary Component |
| [v-timeline-item](/api/v-timeline-item/) | Sub-component used to display a single timeline item |

<api-inline hide-links />

<!-- ## Sub-components

### v-timeline-item

v-timeline-item description -->

## Examples

### Props

#### Direction

Switch between a horizontal and vertical timeline in real-time using the **direction** prop.

<example file="v-timeline/prop-direction" />

#### Side

Use the **side** property to force all items to one side of the timeline.

<example file="v-timeline/prop-single-side" />

#### Alignment

By default, `v-timeline-item` content is vertically aligned `center`. The **align** prop also supports `top` alignment.

<example file="v-timeline/prop-align" />

#### Dot color

Colored dots create visual breakpoints that make your timelines easier for users to read.

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

Truncate the start, end or both ends of the timeline center line by using the **truncate-line** prop.

<example file="v-timeline/prop-truncate-line" />

#### Line inset

Modify the inset of dividing lines by specifying a custom amount using the **line-inset** prop.

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
