---
meta:
  title: CSS Flex helpers
  description: Flex helper classes allow you to modify flexbox parents and children.
  keywords: flex helper classes, flex classes, vuetify flex
related:
  - /styles/display/
  - /components/grids/
  - /styles/css-reset/
---

# Flex

Control the layout of flex containers with alignment, justification and more with responsive flexbox utilities.

<entry-ad />

## Enabling flexbox

Using `display` utilities you can turn any element into a flexbox container transforming **direct children elements** into flex items. Using additional flex property utilities, you can customize their interaction even further.

<example file="flex/flexbox" />

<example file="flex/flexbox-inline" />

You can also customize flex utilities to apply based upon various breakpoints.

- **.d-flex**
- **.d-inline-flex**
- **.d-sm-flex**
- **.d-sm-inline-flex**
- **.d-md-flex**
- **.d-md-inline-flex**
- **.d-lg-flex**
- **.d-lg-inline-flex**
- **.d-xl-flex**
- **.d-xl-inline-flex**

## Flex direction

By default, `d-flex` applies `flex-direction: row` and can generally be omitted. However, there may be situations where you need to explicitly define it.

<example file="flex/flex-direction" />

The `flex-column` and `flex-column-reverse` utility classes can be used to change the orientation of the flexbox container. Keep in mind that **IE11** and **Safari** may have issues with the column direction.

<example file="flex/flex-column" />

There are also responsive variations for `flex-direction`.

- **.flex-row**
- **.flex-row-reverse**
- **.flex-column**
- **.flex-column-reverse**
- **.flex-sm-row**
- **.flex-sm-row-reverse**
- **.flex-sm-column**
- **.flex-sm-column-reverse**
- **.flex-md-row**
- **.flex-md-row-reverse**
- **.flex-md-column**
- **.flex-md-column-reverse**
- **.flex-lg-row**
- **.flex-lg-row-reverse**
- **.flex-lg-column**
- **.flex-lg-column-reverse**
- **.flex-xl-row**
- **.flex-xl-row-reverse**
- **.flex-xl-column**
- **.flex-xl-column-reverse**

## Flex justify

The `justify-content` flex setting can be changed using the flex justify classes. This by default will modify the flexbox items on the **x-axis** but is reversed when using `flex-direction: column`, modifying the **y-axis**. Choose from `start` (browser default), `end`, `center`, `space-between`, or `space-around`.

<example file="flex/flex-justify" />

There are also responsive variations for `justify-content`.

- **.justify-start**
- **.justify-end**
- **.justify-center**
- **.justify-space-between**
- **.justify-space-around**
- **.justify-sm-start**
- **.justify-sm-end**
- **.justify-sm-center**
- **.justify-sm-space-between**
- **.justify-sm-space-around**
- **.justify-md-start**
- **.justify-md-end**
- **.justify-md-center**
- **.justify-md-space-between**
- **.justify-md-space-around**
- **.justify-lg-start**
- **.justify-lg-end**
- **.justify-lg-center**
- **.justify-lg-space-between**
- **.justify-lg-space-around**
- **.justify-xl-start**
- **.justify-xl-end**
- **.justify-xl-center**
- **.justify-xl-space-between**
- **.justify-xl-space-around**

## Flex align

The `align-items` flex setting can be changed using the flex align classes. This by default will modify the flexbox items on the **y-axis** but is reversed when using `flex-direction: column`, modifying the **x-axis**. Choose from `start`, `end`, `center`, `baseline`, or `stretch` (browser default).

<alert type="info">

  When using flex align with IE11 you will need to set an explicit `height` as `min-height` will not suffice and cause undesired results.

</alert>

<example file="flex/flex-align" />

There are also responsive variations for `align-items`.

- **.align-start**
- **.align-end**
- **.align-center**
- **.align-baseline**
- **.align-stretch**
- **.align-sm-start**
- **.align-sm-end**
- **.align-sm-center**
- **.align-sm-baseline**
- **.align-sm-stretch**
- **.align-md-start**
- **.align-md-end**
- **.align-md-center**
- **.align-md-baseline**
- **.align-md-stretch**
- **.align-lg-start**
- **.align-lg-end**
- **.align-lg-center**
- **.align-lg-baseline**
- **.align-lg-stretch**
- **.align-xl-start**
- **.align-xl-end**
- **.align-xl-center**
- **.align-xl-baseline**
- **.align-xl-stretch**

## Flex align self

The `align-self` flex setting can be changed using the flex align-self classes. This by default will modify the flexbox items on the **x-axis** but is reversed when using `flex-direction: column`, modifying the **y-axis**. Choose from `start`, `end`, `center`, `baseline`, `auto`, or `stretch` (browser default).

<example file="flex/flex-align-self" />

There are also responsive variations for `align-self-items`.

- **.align-self-start**
- **.align-self-end**
- **.align-self-center**
- **.align-self-baseline**
- **.align-self-auto**
- **.align-self-stretch**
- **.align-self-sm-start**
- **.align-self-sm-end**
- **.align-self-sm-center**
- **.align-self-sm-baseline**
- **.align-self-sm-auto**
- **.align-self-sm-stretch**
- **.align-self-md-start**
- **.align-self-md-end**
- **.align-self-md-center**
- **.align-self-md-baseline**
- **.align-self-md-auto**
- **.align-self-md-stretch**
- **.align-self-lg-start**
- **.align-self-lg-end**
- **.align-self-lg-center**
- **.align-self-lg-baseline**
- **.align-self-lg-auto**
- **.align-self-lg-stretch**
- **.align-self-xl-start**
- **.align-self-xl-end**
- **.align-self-xl-center**
- **.align-self-xl-baseline**
- **.align-self-xl-auto**
- **.align-self-xl-stretch**

## Auto margins

Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the **x-axis** or **y-axis** when using `flex-row` or `flex-column` respectively.

<alert type="error">

  **IE11** does not properly support auto margins on flex items that have a parent with a non-default `justify-content` value. [See this StackOverflow answer](https://stackoverflow.com/a/37535548) for more details.

</alert>

<example file="flex/margins" />

### Using align-items

Mixing `flex-direction: column` and `align-items`, you can utilize `.mt-auto` and `.mb-auto` helper classes to adjust flex item positioning.

<example file="flex/margins-align-items" />

## Flex wrap

By default `.d-flex` does not provide any wrapping (behaves similarly to `flex-wrap: nowrap`). This can be modified by applying flex-wrap helper classes in the format `flex-{condition}` where condition can be `nowrap`, `wrap`, or `wrap-reverse`.

- **.flex-nowrap**
- **.flex-wrap**
- **.flex-wrap-reverse**

<example file="flex/flex-nowrap" />

<example file="flex/flex-wrap" />

<example file="flex/flex-wrap-reverse" />

These helper classes can also be applied in the format `flex-{breakpoint}-{condition}` to create more responsive variations based on breakpoints. The following combinations are available:

- **.flex-sm-nowrap**
- **.flex-sm-wrap**
- **.flex-sm-wrap-reverse**
- **.flex-md-nowrap**
- **.flex-md-wrap**
- **.flex-md-wrap-reverse**
- **.flex-lg-nowrap**
- **.flex-lg-wrap**
- **.flex-lg-wrap-reverse**
- **.flex-xl-nowrap**
- **.flex-xl-wrap**
- **.flex-xl-wrap-reverse**

## Flex order

You can change the visual order of flex items with the `order` utilities.

<example file="flex/flex-order" />

There are also responsive variations for `order`.

- **.order-first**
- **.order-0**
- **.order-1**
- **.order-2**
- **.order-3**
- **.order-4**
- **.order-5**
- **.order-6**
- **.order-7**
- **.order-8**
- **.order-9**
- **.order-10**
- **.order-11**
- **.order-12**
- **.order-last**
- **.order-sm-first**
- **.order-sm-0**
- **.order-sm-1**
- **.order-sm-2**
- **.order-sm-3**
- **.order-sm-4**
- **.order-sm-5**
- **.order-sm-6**
- **.order-sm-7**
- **.order-sm-8**
- **.order-sm-9**
- **.order-sm-10**
- **.order-sm-11**
- **.order-sm-12**
- **.order-sm-last**
- **.order-md-first**
- **.order-md-0**
- **.order-md-1**
- **.order-md-2**
- **.order-md-3**
- **.order-md-4**
- **.order-md-5**
- **.order-md-6**
- **.order-md-7**
- **.order-md-8**
- **.order-md-9**
- **.order-md-10**
- **.order-md-11**
- **.order-md-12**
- **.order-md-last**
- **.order-lg-first**
- **.order-lg-0**
- **.order-lg-1**
- **.order-lg-2**
- **.order-lg-3**
- **.order-lg-4**
- **.order-lg-5**
- **.order-lg-6**
- **.order-lg-7**
- **.order-lg-8**
- **.order-lg-9**
- **.order-lg-10**
- **.order-lg-11**
- **.order-lg-12**
- **.order-lg-last**
- **.order-lg-first**
- **.order-xl-0**
- **.order-xl-1**
- **.order-xl-2**
- **.order-xl-3**
- **.order-xl-4**
- **.order-xl-5**
- **.order-xl-6**
- **.order-xl-7**
- **.order-xl-8**
- **.order-xl-9**
- **.order-xl-10**
- **.order-xl-11**
- **.order-xl-12**
- **.order-xl-last**

## Flex align content

The `align-content` flex setting can be changed using the flex align-content classes. This by default will modify the flexbox items on the **x-axis** but is reversed when using `flex-direction: column`, modifying the **y-axis**. Choose from `start` (browser default), `end`, `center`, `between`, `around` or `stretch`.

<example file="flex/flex-align-content-start" />

<example file="flex/flex-align-content-end" />

<example file="flex/flex-align-content-center" />

<example file="flex/flex-align-content-between" />

<example file="flex/flex-align-content-around" />

There are also responsive variations for `align-content`.

- **align-content-start**
- **align-content-end**
- **align-content-center**
- **align-content-space-between**
- **align-content-space-around**
- **align-content-stretch**
- **align-sm-content-start**
- **align-sm-content-end**
- **align-sm-content-center**
- **align-sm-content-space-between**
- **align-sm-content-space-around**
- **align-sm-content-stretch**
- **align-md-content-start**
- **align-md-content-end**
- **align-md-content-center**
- **align-md-content-space-between**
- **align-md-content-space-around**
- **align-md-content-stretch**
- **align-lg-content-start**
- **align-lg-content-end**
- **align-lg-content-center**
- **align-lg-content-space-between**
- **align-lg-content-space-around**
- **align-lg-content-stretch**
- **align-xl-content-start**
- **align-xl-content-end**
- **align-xl-content-center**
- **align-xl-content-space-between**
- **align-xl-content-space-around**
- **align-xl-content-stretch**

## Flex grow and shrink

Vuetify has helper classes for applying grow and shrink manually. These can be applied by adding the helper class in the format `flex-{condition}-{value}`, where condition can be either `grow` or `shrink` and value can be either `0` or `1`. The condition `grow` will permit an element to grow to fill available space, whereas `shrink` will permit an element to shrink down to only the space needs for its contents. However, this will only happen if the element must shrink to fit their container such as a container resize or being effected by a `flex-grow-1`. The value `0` will prevent the condition from occurring whereas `1` will permit the condition. The following classes are available:

- **flex-grow-0**
- **flex-grow-1**
- **flex-shrink-0**
- **flex-shrink-1**

<example file="flex/grow-shrink" />

These helper classes can also be applied in the format `flex-{breakpoint}-{condition}-{state}` to create more responsive variations based on breakpoints. The following combinations are available:

- **flex-sm-grow-0**
- **flex-md-grow-0**
- **flex-lg-grow-0**
- **flex-xl-grow-0**
- **flex-sm-grow-1**
- **flex-md-grow-1**
- **flex-lg-grow-1**
- **flex-xl-grow-1**
- **flex-sm-shrink-0**
- **flex-md-shrink-0**
- **flex-lg-shrink-0**
- **flex-xl-shrink-0**
- **flex-sm-shrink-1**
- **flex-md-shrink-1**
- **flex-lg-shrink-1**
- **flex-xl-shrink-1**

<backmatter />
