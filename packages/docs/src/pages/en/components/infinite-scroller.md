---
nav: Infinite scroller
meta:
  title: Infinite scroller component
  description: The Infinite scroll component is a container that loads more items when scrolling. It is useful when you need to display an unknown but large number of items.
  keywords: infinite scroll, vuetify infinite scroll component, vue infinite scroll component, v-infinite-scroll component
related:
  - /components/lists/
  - /components/data-tables/
  - /components/data-iterators/
---

# Infinite scroller

The `v-infinite-scroll` component displays a potentially infinite list, by loading more items of the list when scrolling. It supports either vertical or horizontal scrolling.

<entry />

## Usage

When scrolling towards the bottom, new items will be rendered either automatically, or manually with the click of a button.

<usage name="v-infinite-scroll" />

The **load** function will be called when the component needs to load more content. It is an asynchronous function with one parameter **side**. It tells you at which side new content should be added, either at the `'start'` or `'end'`. The return value of the function is a string which describes if the new content was loaded successfully or not. See the table below for the possible return values

|Status|Description|
|------|-----------|
|`'ok'`|Content was added succesfully|
|`'error'`|Something went wrong when adding content. This will display the `error` slot|
|`'empty'`|There is no more content to fetch. This will display a message that there is no more content|
|`'loading'`|Content is currently loading. This will display a message that content is loading. This status is only set internally by the component and should not be returned from the **load** function|

## API

<api-inline />

## Examples

### Props

#### Mode

The default behaviour of the component is to try to load more content automatically when the scrollbar gets close to the end. However a manual mode is also supported, where the user needs to do some interaction to load the content. By default this a button, but it can be customized with a [slot](#load-more)

<example file="v-infinite-scroll/prop-mode" />

#### Direction

The `v-infinite-scroll` component can be used with either vertical and horizontal scrolling.

<example file="v-infinite-scroll/prop-direction" />

#### Side

By default the `v-infinite-scroll` component assumes that new content will be appearing at the end of existing content. But it also supports content being added to the start, and content appearing both at the start and the end.

When using the **start** side for content, the scrolllbar will start at the bottom of the content.

<example file="v-infinite-scroll/prop-side-start" />

When using **both** sides for content, the scrollbar will start in the middle of the content.

<example file="v-infinite-scroll/prop-side-both" />

#### Color

The default load more button and loading spinner can be colored with the **color** prop.

<example file="v-infinite-scroll/prop-color" />

### Slots

#### Loading

You can customize the loading message with the **loading** slot.

<example file="v-infinite-scroll/slot-loading" />

#### Load more

When using **manual** mode you can customize the action required to load more content with the **load-more** slot.

<example file="v-infinite-scroll/slot-load-more" />

#### Empty

You can customize the empty message with the **empty** slot.

<example file="v-infinite-scroll/slot-empty" />

#### Error

The `error` slot is shown if the status `'error'` is returned from the `load` function.

<example file="v-infinite-scroll/slot-error" />

### Misc

#### Virtualized infinite scroller

If the items in your infinite list are of a uniform size, you can quite easily virtualize the list to only render a small amount of items regardless of how far you scroll in either direction.

<example file="v-infinite-scroll/misc-virtual" />

<backmatter />
