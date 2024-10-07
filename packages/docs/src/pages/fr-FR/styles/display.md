---
meta:
  title: Display helpers
  description: Les classes d'aide d'affichage vous permettent de contrôler quand les éléments doivent s'afficher en fonction du mode de vue.
  keywords: afficher les classes d'aide, afficher les classes, afficher l'affichage
related:
  - /styles/text-and-typography/
  - /directives/resize/
  - /features/breakpoints/
---

# Outils d'affichage

The display helpers allow you to control the display of content. This includes being conditionally visible based upon the current viewport, or the actual element display type.

<entry-ad />

<breakpoints-table />

## Affichage

Specify the elements `display` property. These classes can be applied to all breakpoints from `xs` to `xl`. When using a base class,`.d-{value}`, it is inferred to be `.d-${value}-xs`.

- `.d-{value}` for `xs`
- `.d-{breakpoint}-{value}` for `sm`, `md`, `lg` and `xl`

The _value_ property is one of:

- `aucun`
- `inline`
- `inline-block`
- `block`
- `tableau`
- `table-cell`
- `table-row`
- `flex`
- `inline-flex`

When setting a specific breakpoint for a display helper class, it will apply to all screen widths from the designation and up. For example, `d-lg-flex` will apply to `lg` and `xl` size screens.

<example file="display/display-inline" />

<example file="display/display-block" />

## Visibilité

Conditionally display an element based upon the current **viewport**. Breakpoint utility classes always apply from the bottom up. That means if you have `.d-none`, it will apply to all breakpoints. However, `.d-md-none` will apply to only `md` and up.

| Taille d'écran     | Class                           |
| ------------------ | ------------------------------- |
| Hidden on all      | `.d-none`                       |
| Hidden only on xs  | `.d-none .d-sm-flex`            |
| Hidden only on sm  | `.d-sm-none .d-md-flex`         |
| Hidden only on md  | `.d-md-none .d-lg-flex`         |
| Hidden only on lg  | `.d-lg-none .d-xl-flex`         |
| Hidden only on xl  | `.d-xl-none`                    |
| Visible on all     | `.d-flex`                       |
| Visible only on xs | `.d-flex .d-sm-none`            |
| Visible only on sm | `.d-none .d-sm-flex .d-md-none` |
| Visible only on md | `.d-none .d-md-flex .d-lg-none` |
| Visible only on lg | `.d-none .d-lg-flex .d-xl-none` |
| Visible only on xl | `.d-none .d-xl-flex`            |

<example file="display/visibility" />

Additionally you can also display an element based upon the current **viewport** using lateral display helper classes. These classes can be applied using the following format `hidden-{breakpoint}-{condition}`

The _condition_ applies the class base on:

- `only` - hide the element only on `xs` through `xl` breakpoints
- `and-down` - hide the element on the specified breakpoint and down `sm` through `lg` breakpoints
- `and-up` - hide the element on the specified breakpoint and up `sm` through `lg` breakpoints

Additionally, **media types** can be targeted using the `only` condition. Both `hidden-screen-only` and `hidden-print-only` are currently supported.

## Display in print

Vous pouvez également modifier la propriété d'affichage lors de l'impression.

- `.d-print-none`
- `.d-print-inline`
- `.d-print-inline-block`
- `.d-print-block`
- `.d-print-table`
- `.d-print-table-row`
- `.d-print-table-cell`
- `.d-print-flex`
- `.d-print-inline-flex`

Les classes d'utilitaires d'impression peuvent également être combinées avec des utilitaires d'affichage sans impression.

<example file="display/print" />

## Accessibilité

### Screen readers

Use the `d-sr` utility classes to conditionally hide content on all devices *except* screen readers.

- `d-sr-only` visually hides elements but will still announce to **screen readers**.
- `d-sr-only-focusable` visually hides an element until it is focused. This is useful when implementing *skip links*. <backmatter />
