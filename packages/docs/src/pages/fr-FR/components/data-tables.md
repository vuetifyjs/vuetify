---
meta:
  title: Composant table de données
  description: Le composant table de données est utilisé pour afficher des données tabulaires d'une manière facile à analyser pour les utilisateurs. Il comprend le tri, la recherche, la pagination et la sélection.
  keywords: tables de données, composant table de données vuetify, composant table de données vue
related:
  - /components/data-iterators/
  - /components/simple-tables/
  - /components/lists/
---

# Tableaux de données

La composante `v-data-table` est utilisée pour afficher des données tabulaires. Les fonctionnalités comprennent le tri, la recherche, la pagination, l'édition de contenu et la sélection de lignes.

<vuetify-ad slug="vs-vuetify-subscribe" />

## Utilisation

Le data-table standard affichera par défaut vos données sous forme de lignes simples.

<example file="v-data-table/usage" />

## API

- [v-data-table](/api/v-data-table)
- [v-data-table-header](/api/v-data-table-header)
- [v-data-footer](/api/v-data-footer)
- [v-edit-dialog](/api/v-edit-dialog)
- [v-simple-checkbox](/api/v-simple-checkbox)

<inline-api page="components/data-tables" />


<!-- ## Sub-components

### v-data-table-header

v-data-table-header description

### v-data-footer

v-data-footer description

### v-edit-dialog

v-edit-dialog description

### v-simple-checkbox

v-simple-checkbox description -->

## Exemples

### Propriétés

#### Filtre personnalisé

Vous pouvez remplacer le filtrage par défaut utilisé avec la propriété **search** en fournissant une fonction à la propriété **custom-filter**. Si vous voulez personnaliser le filtrage d'une colonne spécifique, vous pouvez fournir une fonction à la propriété **filtrer** sur les éléments de l'en-tête. La signature est `(valeur: any, recherche: string | null, élément: any) => booléen`. Cette fonction sera toujours exécutée même si la propriété **search** n'a pas été fournie. Ainsi, vous devez vous assurer de sortir tôt avec une valeur de `true` si le filtre ne doit pas être appliqué.

<example file="v-data-table/prop-custom-filter" />

#### Compact

En utilisant la propriété **dense** vous pouvez donner à vos tableaux de données un style alternatif.

<example file="v-data-table/prop-dense" />

#### Filtrable

Vous pouvez facilement désactiver l'inclusion de colonnes spécifiques lors de la recherche dans les lignes du tableau en définissant la propriété **filterable** à false sur le(s) élément(s) d'en-tête(s). Dans l'exemple qui suit, la colonne de nom de dessert ne peut plus être recherchée.

<example file="v-data-table/prop-filterable" />

#### Propriétés du pied de page

La `v-data-table` affiche un pied de page par défaut en utilisant le composant `v-data-footer`. Vous pouvez passer des propriétés à ce composant en utilisant **footer-props**.

<example file="v-data-table/prop-footer-props" />

#### Regroupement

En utilisant les propriétés **group-by** et **group-desc** vous pouvez regrouper les lignes sur une propriété d'élément. La propriété **show-group-by** affichera un bouton de regroupement dans l'en-tête par défaut. Vous pouvez utiliser la propriété **groupable** sur les éléments d'en-tête pour désactiver le bouton de regroupement.

<example file="v-data-table/prop-grouping" />

#### Masquer l'en-tête et le pied de page par défaut

Vous pouvez appliquer les propriétés **hide-default-header** et **hide-default-footer** pour respectivement supprimer l'en-tête et le pied de page par défaut.

<example file="v-data-table/prop-hide-header-footer" />

#### Chargement

Vous pouvez utiliser la propriété **loading** pour indiquer que les données de la table sont en cours de chargement. S'il n'y a pas de données dans la table, un message de chargement sera également affiché. Ce message peut être personnalisé à l'aide de la propriété **loading-text** ou de l'emplacement `loading`.

<example file="v-data-table/prop-loading" />

#### Tri multiple

Utiliser la propriété **multi-sort** vous permettra de trier sur plusieurs colonnes en même temps. Lorsque cette option est activée, vous pouvez passer des tableaux à la fois à **sort-by** et **sort-desc** pour contrôler programmatiquement le tri, au lieu de valeurs uniques.

<example file="v-data-table/prop-multi-sort" />

#### Sélection de ligne

The **show-select** prop will render a checkbox in the default header to toggle all rows, and a checkbox for each default row. You can customize these with the slots `header.data-table-select` and `item.data-table-select` respectively. You can also switch between allowing multiple selected rows at the same time or just one with the **single-select** prop.

<example file="v-data-table/prop-row-selection" />

#### Rechercher

The data table exposes a **search** prop that allows you to filter your data.

<example file="v-data-table/prop-search" />

### Slots

<vuetify-ad slug="vs-vue-3-slots" />

The `v-data-table` provides a large number of slots for customizing the table. This example showcases some of these slots and what you can do with each. It is important to note some slots (eg: `item`/`body`/`header`) will completely take over the internal rendering of the component which will require you to re-implement functionalities such as selection and expansion. Some slots will override each other such as: `body` > `item` > `item.<name>` and `header`/`header.<name>`.

<alert type="info">

  Some slots such as `item.<name>` and `header.<name>` use modifiers to target more scoped slots. Eslint by default will throw errors when slots use modifiers. To disable these errors, add the following rule to your eslint configuration: `"vue/valid-v-slot": ["error", { "allowModifiers": true }]`.

</alert>

<example file="v-data-table/slot-main" />

#### Header

You can use the dynamic slots `header.<name>` to customize only certain columns. `<name>` is the name of the `value` property in the corresponding header item sent to **headers**.

<example file="v-data-table/slot-header" />

#### Item

You can use the dynamic slots `item.<name>` to customize only certain columns. `<name>` is the name of the `value` property in the corresponding header item sent to **headers**. So to customize the calories column we're using the `item.calories` slot.

<example file="v-data-table/slot-item" />

#### Simple checkbox

When wanting to use a checkbox component inside of a slot template in your data tables, use the `v-simple-checkbox` component rather than the `v-checkbox` component. The `v-simple-checkbox` component is used internally and will respect header alignment.

<example file="v-data-table/slot-simple-checkbox" />

### Divers

#### CRUD Actions

`v-data-table` with CRUD actions using a `v-dialog` component for editing each row

<example file="v-data-table/misc-crud" />

#### Edit dialog

The `v-edit-dialog` component can be used for editing data directly within a `v-data-table`. You can block the closing of the `v-edit-dialog` when clicked outside by adding the **persistent** prop.

<example file="v-data-table/misc-edit-dialog" />

#### Expandable rows

The **show-expand** prop will render an expand icon on each default row. You can customize this with the `item.data-table-expand` slot. The position of this slot can be customized by adding a column with `value: 'data-table-expand'` to the headers array. You can also switch between allowing multiple expanded rows at the same time or just one with the **single-expand** prop. The expanded rows are available on the synced prop `expanded.sync`. Row items require a unique key property for expansion to work. The default is `id`, but you can use the **item-key** prop to specify a different item property.

<example file="v-data-table/misc-expand" />

#### External pagination

Pagination can be controlled externally by using the individual props, or by using the **options** prop. Remember that you must apply the **.sync** modifier.

<example file="v-data-table/misc-external-paginate" />

#### External sorting

Sorting can also be controlled externally by using the individual props, or by using the the **options** prop. Remember that you must apply the **.sync** modifier.

<example file="v-data-table/misc-external-sort" />

#### Server-side paginate and sort

If you're loading data already paginated and sorted from a backend, you can use the **server-items-length** prop. Defining this prop will disable the built-in sorting and pagination, and you will instead need to use the available events (`update:page`, `update:sortBy`, `update:options`, etc) to know when to request new pages from your backend. Use the **loading** prop to display a progress bar while fetching data.

<example file="v-data-table/misc-server-side-paginate-and-sort" />

<backmatter />
