---
meta:
  nav: Infinite scrollers
  title: Infinite scroller component
  description: The Infinite scroll component is a container that loads more items when scrolling. It is useful when you need to display an unknown but large number of items.
  keywords: infinite scroll, vuetify infinite scroll component, vue infinite scroll component, v-infinite-scroll component
related:
  - /components/lists/
  - /components/data-tables/basics/
  - /components/data-iterators/
features:
  github: /components/VInfiniteScroll/
  label: 'C: VInfiniteScroll'
  report: true
---

# Infinite scrollers

The `v-infinite-scroll` component displays a potentially infinite list, by loading more items of the list when scrolling. It supports either vertical or horizontal scrolling.

![Infinite scroll Entry](https://cdn.vuetifyjs.com/docs/images/components/v-infinite-scroll/v-infinite-scroll-entry.png)

<PageFeatures />

::: success
This feature was introduced in [v3.4.0 (Blackguard)](/getting-started/release-notes/?version=v3.4.0)
:::

## Usage

When scrolling towards the bottom, new items will be rendered either automatically, or manually with the click of a button.

<ExamplesUsage name="v-infinite-scroll" />

A **load** event will be emitted when the component needs to load more content. The argument passed is an object with two properties.

- `side` tells you at which side new content should be added, either at the `'start'` or `'end'`. The return value of the function is a string which describes if the new content was loaded successfully or not.
- `done` is a callback function that should be called when the loading of new content is done. It takes a single parameter `status` that describes if the load was successful or not. See the table below for the possible values.

|Status|Description|
|------|-----------|
|`'ok'`|Content was added succesfully|
|`'error'`|Something went wrong when adding content. This will display the `error` slot|
|`'empty'`|There is no more content to fetch. This will display the `empty` slot|
|`'loading'`|Content is currently loading. This will display a message that content is loading. This status is only set internally by the component and should not be used with the **done** function|

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-infinite-scroll](/api/v-infinite-scroll/) | Primary Component |

<ApiInline hide-links />

## Anatomy

The `v-infinite-scroll` works with any content in its default slot.

![Infinite scroll Anatomy](https://cdn.vuetifyjs.com/docs/images/components/v-infinite-scroll/v-infinite-scroll-anatomy.png)

| Element / Area | Description                                                              |
|----------------|-----------------------------------------|
| 1. Container   | The infinite scroller content container |
| 2. Loader      | The loader content area                 |

## Guide

The `v-infinite-scroll` component is a container that allows you to react to a user reaching the end of content area. It is useful when you need to display an unknown but large number of items, and you don't want to load them all at once.

### Props

The `v-infinite-scroll` component has a number of props that can be used to customize its behaviour.

#### Mode

The default behaviour of the component is to try to load more content automatically when the scrollbar gets close to the end. However a manual mode is also supported, where the user needs to do some interaction to load the content. By default this a button, but it can be customized with a [slot](#load-more)

<ExamplesExample file="v-infinite-scroll/prop-mode" />

#### Direction

The `v-infinite-scroll` component can be used with either vertical and horizontal scrolling.

<ExamplesExample file="v-infinite-scroll/prop-direction" />

#### Side

By default the `v-infinite-scroll` component assumes that new content will be appearing at the end of existing content. But it also supports content being added to the start, and content appearing both at the start and the end.

When using the **start** side for content, the scrolllbar will start at the bottom of the content.

<ExamplesExample file="v-infinite-scroll/prop-side-start" />

When using **both** sides for content, the scrollbar will start in the middle of the content.

<ExamplesExample file="v-infinite-scroll/prop-side-both" />

#### Color

The default load more button and loading spinner can be colored with the **color** prop.

<ExamplesExample file="v-infinite-scroll/prop-color" />

### Slots

The `v-infinite-scroll` component exposes a number of slots that allow you to further customize its behaviour.

![Infinite scroll Slots](https://cdn.vuetifyjs.com/docs/images/components/v-infinite-scroll/v-infinite-scroll-slots.png)

| Element / Area | Description |
| - | - |
| 1. Container | The default slot |
| 2. Load-more | The slot shown when mode is set to `manual` and status is not `loading` |
| 3. Loading | The slot shown when mode is set to `manual` and status is `loading` |
| 4. Empty | The slot shown when status is `empty` |
| 5. Error | The slot shown when status is `error` |

#### Loading

You can customize the loading message with the **loading** slot.

<ExamplesExample file="v-infinite-scroll/slot-loading" />

#### Load more

When using **manual** mode you can customize the action required to load more content with the **load-more** slot.

<ExamplesExample file="v-infinite-scroll/slot-load-more" />

#### Empty

You can customize the empty message with the **empty** slot.

<ExamplesExample file="v-infinite-scroll/slot-empty" />

#### Error

The **error** slot is shown if the status `'error'` is returned from the `done` callback.

<ExamplesExample file="v-infinite-scroll/slot-error" />

### Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-infinite-scroll` component.

#### Virtualized infinite scroller

If the items in your infinite list are of a uniform size, you can quite easily virtualize the list to only render a small amount of items regardless of how far you scroll in either direction.

<ExamplesExample file="v-infinite-scroll/misc-virtual" />
