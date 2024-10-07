---
meta:
  title: Accessibilité (a11y)
  description: Voir les exemples et les avantages d'avoir un support d'accessibilité (a11y) dans les composants Vuetify.
  keywords: a11y, accessibilité, utilisabilité
related:
  - /features/bidirectionality/
  - /components/menus/
  - /components/list-item-groups/
---

# Accessibilité (a11y)

L'accessibilité du Web **(a11y en abrégé)**, est la pratique inclusive consistant à garantir qu'aucune barrière n'empêche les personnes d'interagir avec les sites Web du World Wide Web par des personnes handicapées. Les composants Vuetify sont construits pour fournir des interactions clavier pour toutes les actions basées sur la souris et utiliser les éléments sémantiques HTML5 le cas échéant.

<promoted-ad slug="vuetify-fundamentals-cheat-sheet" />

## Accessibilité Material Design

Google fournit un aperçu détaillé de la manière dont leurs composants sont créés en gardant a11y à l'esprit. Ils fournissent également des exemples de la façon dont vous pouvez vous assurer que vous utilisez les meilleures pratiques lors de la création d'applications (au-delà de ce qui est supporté par défaut avec Vuetify). Vous pouvez trouver plus d'informations sur [l'implémentation de l'accessibilité](https://material.io/design/usability/accessibility.html) sur le site de spécification.

## Activator slots

Vuetify utilise des slots d'activation pour de nombreux composants tels que `v-menu`, `v-dialog` et d'autres. Dans certains cas, ces éléments activateurs devraient avoir des attributs a11y spécifiques qui les associent à leur contenu correspondant. Pour y parvenir, nous passons les options a11y nécessaires dans la portée des créneaux.

```html
<!-- Vue Template HTML Markup -->

<template>
  <v-menu>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
      >
        Click me
      </v-btn>
    </template>

    <v-list>
      <v-list-item @click="method">
        <v-list-item-title>Option 1</v-list-item-title>
      </v-list-item>

      <v-list-item disabled>
        <v-list-item-title>Option 2</v-list-item-title>
      </v-list-item>

      <v-list-item @click="method">
        <v-list-item-title>Option 3</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
```

Lorsque l'élément activateur est rendu, il contiendra maintenant les attributs a11y liés :

```html
<!-- Rendered `v-btn` HTML Output -->

<button
  aria-expanded="false"
  aria-haspopup="true"
  role="button"
  type="button"
>
  Click me
</button>
```

## Item slots

There are some instances where you utilize a slot for a component and will need the correct aria attributes to bind to your elements. When using (**v-slot**) this is passed down to you in the slots scope, as the `v-menu` example above demonstrated. However, there are other components that are more complex in which you will need to bind attributes to the correct components to ensure proper support.

### v-select

The `v-select` component will automatically configure all required a11y attributes. Each item will generate a corresponding **id**, **aria-labelledby**, **aria-selected** and **roles** by default:

```html
<!-- Vue Template HTML Markup -->

<template>
  <v-select
    :items="['Foo', 'Bar']"
    label="Items"
  ></v-select>
</template>
```

When rendered, the `v-select` component's content will look similar to this:

```html
<!-- Rendered `v-select-list` content HTML Output -->

<div
  role="listbox"
  tabindex="-1"
>
  <div
    aria-labelledby="foo-list-item-12"
    aria-selected="true"
    class="v-list-item"
    role="option"
    tabindex="0"
  >
    <div
      class="v-list-item__title"
      id="foo-list-item-12"
    >
      Foo
    </div>
  <div
    aria-labelledby="bar-list-item-13"
    aria-selected="false"
    class="v-list-item"
    role="option"
    tabindex="0"
  >
    <div
      id="bar-list-item-13"
      class="v-list-item__title"
    >
      Bar
    </div>
  </div>
</div>
```

However, when using slots there are conditions in which you will need to utilize the passed down properties to get the proper aria setup. This information also applies to `v-autocomplete`, `v-combobox` and `v-overflow-btn` as they all extend the `v-select` component.

<example file="accessibility/select-list-item" />

<promoted-ad slug="vuetify-github-sponsors" />

When providing a `v-list-item` component in a slot, the aria attributes are passed through the **attrs** data property and can be bound with `v-bind`.

```html
<!-- Vue Template HTML Markup -->

<template>
  <v-select
    :items="['Fizz', 'Buzz']"
    label="Items"
  >
    <template v-slot:item="{ item, attrs, on }">
      <v-list-item
        v-bind="attrs"
        v-on="on"
      >
        <v-list-item-content>
          <v-list-item-title
            :id="attrs['aria-labelledby']"
            v-text="item.title"
          ></v-list-item-title>

          <v-list-item-subtitle v-text="item.sub"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>
```

In order to properly associate a label with the correct _option_ you will need to bind `attrs.id` to the `aria-labelled-by` on your `v-list-item-title`. This will ensure that the text is properly associated. Keep in mind, this is done automatically for you if you are not using slots.

## Gestion des Focus et interactions clavier

Beyond attributes, components such as `v-menu` also support interaction by pressing <kbd>↑</kbd> and <kbd>↓</kbd> for navigating between options.

### v-menu

When inside of a `v-menu`, `v-list-item` will be automatically configured to have a role of **menuitem**. Navigate to the [Menu](/components/menus) for more information on the components features.

<example file="accessibility/menu" />

When the `v-menu` component is rendered it will resemble the following:

```html
<!-- Rendered `v-menu` content HTML Output -->

<div
  class="v-menu__content"
  role="menu"
>
  <div class="v-list">
    <div
      class="v-list-item"
      role="menuitem"
      tabindex="0"
    >
      ...
    </div>
    <div
      aria-disabled="true"
      class="v-list-item"
      role="menuitem"
      tabindex="-1"
    >
      ...
    </div>
  </div>
</div>
```

### v-list-item-group

The `v-list-item-group` component makes `v-list-item` interactable and navigatable when pressing the <kbd>tab</kbd> key. It also configures `v-list-item` to have a role of **listitem**. Navigate to the [List-item group](/components/list-item-groups) for more information on the components features.

<example file="accessibility/list-item-group" />

When the `v-list-item-group` component is rendered it have all the necessary a11y attributes. The following is an example of the rendered component:

```html
<!-- Rendered `v-list-group` content HTML Output -->

<div
  class="v-list-item-group"
  role="listbox"
>
  <div
    aria-selected="true"
    class="v-list-item"
    role="listitem"
    tabindex="0"
  >
    ...
  </div>
  <div
    aria-disabled="true"
    aria-selected="true"
    class="v-list-item"
    role="listitem"
    tabindex="-1"
  >
    ...
  </div>
  <div
    aria-selected="false"
    class="v-list-item"
    role="listitem"
    tabindex="0"
  >
    ...
  </div>
</div>
```

## Ressources supplémentaires

While Vuetify attempts to make a11y as easy as possible in your application, there are times where additional information is needed. Below you can find a list of helpful resources.

- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [The A11Y Project](https://a11yproject.com/)"

<backmatter />
