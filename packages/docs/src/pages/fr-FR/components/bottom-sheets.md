---
meta:
  title: Bottom sheet component
  description: The bottom sheet component is used for elevating content above other elements in a dialog style fashion.
  keywords: bottom sheets, vuetify bottom sheet component, vue bottom sheet component
related:
  - /components/dialogs/
  - /components/lists/
  - /components/menus/
---

# Pop-up basse

The bottom sheet is a modified `v-dialog` that slides from the bottom of the screen, similar to a `v-bottom-navigation`. Whereas a bottom navigation component is for buttons and specific application level actions, a bottom sheet can contain anything.

<entry-ad />

## Utilisation

Ici, nous affichons une liste d’exemple d’actions pouvant être présentes dans une application.

<usage name="v-bottom-sheet" />

## API

- [v-bottom-sheet](/api/v-bottom-sheet)

<inline-api page="components/bottom-sheets" />

## Exemples

### Propriétés

#### Incrusté

Bottom sheets can be inset, reducing their maximum width on desktop to 70%. This can be further reduced manually using the **width** prop.

<example file="v-bottom-sheet/prop-inset" />

#### Modèle

Bottom sheets can be controlled using **v-model**. You can use it to close them or if you can't use `activator` slot.

<example file="v-bottom-sheet/prop-model" />

#### Persistant

Les feuilles de fond persistantes ne peuvent pas être fermées en cliquant en dehors de celles-ci.

<example file="v-bottom-sheet/prop-persistent" />

### Divers

#### Lecteur de musique

En utilisant une feuille de fond inséparable, vous pouvez faire des composants pratiques tels que ce simple lecteur de musique.

<example file="v-bottom-sheet/misc-player" />

#### Liste à ouvrir

En combinant une liste fonctionnelle en bas, vous pouvez créer un composant simple 'open in'.

<example file="v-bottom-sheet/misc-open-in-list" />

<backmatter />
