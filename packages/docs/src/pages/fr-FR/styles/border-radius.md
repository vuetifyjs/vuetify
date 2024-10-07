---
meta:
  title: Border radius
  description: Utilisez les utilitaires de bordure pour styliser rapidement le rayon de bordure de n'importe quel élément.
  keywords: border radius classes, radius utilities, vuetify radius helper classes
related:
  - /styles/text-and-typography/
  - /components/sheets/
  - /components/buttons/
---

# Border Radius

Utilisez les utilitaires de bordure pour styliser rapidement le rayon de bordure de n'importe quel élément.

<entry-ad />

## Utilisation

<example file="border-radius/usage" />

## Mises en garde

<alert type="info">

  The infixes **sm**, **lg**, **xl**, and **xxl** correlate to the border radius *size* and are not affected by breakpoints.

</alert>

## Variables SASS

Configurer ou désactiver les classes d'aide au rayon de bord. Nécessite l'utilisation de la bibliothèque [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugins/tree/master/packages/vue-cli-plugin-vuetify) et d'un fichier `variables.s(c|a)ss` configuré. Des informations supplémentaires sur la façon de configurer les variables sont situées sur la page de documentation [Variables SASS](/features/sass-variables).

Les tailles arrondies sont basées sur la variable `$border-radius-racine` qui a une valeur par défaut de **0,25rem**.

```scss
$rounded: (
  0: 0,
  'sm': $border-radius-root / 2,
  null: $border-radius-root,
  'lg': $border-radius-root * 2,
  'xl': $border-radius-root * 4,
  'xxl': $border-radius-root * 6,
  'pill': 9999px,
  'circle': 50%
);
```

### Écraser les Radius

Vous pouvez modifier ou ajouter des tailles de *border-radius* en ajoutant une liste nommée `$rounded` dans le fichier des `variables` de votre projet.

```scss
$rounded: (
  'sm': $border-radius-root / 3,
  'lg': $border-radius-root * 2
);
```

## Exemples

### Divers

#### Pilule et cercle

Vous pouvez créer des pilules avec la classe `.rounded-pill` et des cercles avec la classe `.rounded-circle`.

<example file="border-radius/misc-pill-and-circle" />

#### Suppression du rayon de bordure

Utilisez la classe d'assistance `.rounded-0` pour *supprimer* tous les éléments d'un rayon ou sélectionner par côté ou par coin; par exemple : `.rounded-l-0` et `.rounded-tr-0`.

<example file="border-radius/misc-removing-border-radius" />

#### Arrondir tous les coins

Les classes d'aide **arrondies** vous permettent de modifier le *rayon de bordure* d'un élément. Use the `.rounded-sm`, `.rounded`, `.rounded-lg`, `.rounded-xl` and `.rounded-xxl` to add a border radius of varying size.

<example file="border-radius/misc-rounding-all-corners" />

#### Arrondir par côtés

Le rayon de la bordure est configurable par côté en utilisant les classes d'infixes **t, r, b, l**; par exemple : `.rounded-b-xl` et `.rounded-t`.

<example file="border-radius/misc-rounding-by-side" />

#### Arrondir par coins

Le rayon de la bordure est configurable sur une base par coin en utilisant les classes d'infixes **tl, tr, br, bl**; par exemple : `.rounded-br-xl` et `.rounded-tr`.

<example file="border-radius/misc-rounding-by-corner" />

<backmatter />
