---
meta:
  title: Text and typography
  description: View the various typography styles. From headings to captions, with various weights, sizes and italics.
  keywords: typography, headings, titles, text
related:
  - /styles/display/
  - /styles/content/
  - /components/subheaders/
---

# Texte et typographie

Contrôlez la taille du texte, l'alignement, l'emballage, le débordement, les transformations et plus encore. <inline-ad slug="scrimba-typography" />

<entry-ad />

## Typographie

Contrôlez la taille et le style du texte en utilisant les classes d'aide de Typography. Ces valeurs sont basées sur la spécification [Material Design type specification](https://material.io/design/typography/the-type-system.html).

<example file="text-and-typography/typography" />

Ces classes peuvent être appliquées à tous les points d'arrêt de `xs` à `xl`. Lors de l'utilisation d'une classe de base, `.text-{value}`, il est déduit que c'est `.text-xs-${value}`.

- `.text-{value}` pour `xs`
- `.text-{breakpoint}-{value}` pour `sm`, `md`, `lg` et `xl`

La propriété _value_ est une des propriétés :

- `h1`
- `h2`
- `h3`
- `h4`
- `h5`
- `h6`
- `subtitle-1`
- `subtitle-2`
- `body-1`
- `body-2`
- `boutons`
- `caption`
- `overline`

<br>

<alert type="success">

  **ASTUCE**

  Dans toutes les versions antérieures à la v2.3. , ces classes étaient l'une des classes suivantes :

  <br>

- `.display-4`
- `.display-3`
- `.display-2`
- `. isplay-1`
- `.headline`
- `.title`
- `.subtitle-1`
- `.subtitle-2`
- `.body-1`
- `.body-2`
- `.caption`
- `.overline`

</alert>

L'exemple suivant montre comment les différentes tailles apparaîtraient à différents points d'arrêt :

<example file="text-and-typography/typography-breakpoints" />

### Font emphasis

Material design, by default, supports **100, 300, 400, 500, 700, 900** font weights and italicized text.

<example file="text-and-typography/font-emphasis" />

## Texte

### Alignment

Les classes d'aide à l'alignement vous permettent de ré-aligner facilement le texte.

<example file="text-and-typography/text-justify" />

Il existe également des classes d'alignement disponibles qui supportent les affichages réactifs.

<example file="text-and-typography/text-align" />

### Decoration

<alert type="info">

  **New in v2.3.0+**

</alert>

Remove text decoration with the `.text-decoration-none` class or add an *overline, underline or line-through* by using `.text-decoration-overline`, `.text-decoration-underline`, and `.text-decoration-line-through`.

<example file="text-and-typography/text-decoration" />

### Opacity

Opacity helper classes allow you to easily adjust the emphasis of text. `text--primary` has the same opacity as default text. `text--secondary` is used for hints and helper text. De-emphasize text with `text--disabled`.

<example file="text-and-typography/text-opacity" />

### Transform

Le texte peut être transformé avec des classes de mise en majuscules.

<example file="text-and-typography/text-transform" />

Text breaking and the removal of `text-transform` is also possible. In the first example, the `text-transform: uppercase` custom class is overwritten and allows the text casing to remain. In the second example, we break up a longer word to fit the available space.

<example file="text-and-typography/text-break" />

### Wrapping and overflow

You can prevent wrapping text with the `.text-no-wrap` utility class.

<example file="text-and-typography/text-no-wrap" />

Longer content can be truncated with a text ellipsis using the `.text-truncate` utility class.

<alert type="info">

  **Requires** `display: inline-block` **or** `display: block`.

</alert>

<example file="text-and-typography/text-truncate" />

## RTL Alignment

When using [RTL](/features/bidirectionality), you may want to keep the alignment regardless of the **rtl** designation. This can be achieved using text alignment helper classes in the following format: `text-<breakpoint>-<direction>`, where breakpoint can be `sm`, `md`, `lg`, or `xl` and direction can be `left` or `right`. You may also want alignment to respond to rtl which can be done using directions `start` and `end`.

<example file="text-and-typography/text-rtl" />

<backmatter />
