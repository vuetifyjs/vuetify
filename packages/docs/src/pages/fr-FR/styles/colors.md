---
meta:
  title: Palette de couleurs Material
  description: Learn about the colors of Material Design. Consume the javascript color pack directly in your application.
  keywords: couleurs, couleurs de design de matériaux, pack de couleurs vuetify, classes de couleur de matériau
related:
  - /features/theme/
  - /resources/themes/
  - /getting-started/wireframes/
---

# Couleurs

En utilisant **javascript**. et **sass**, vous avez tout de suite accès à toute la palette de couleurs de la [spécification Matérial Design](https://material.io/design/color/the-color-system.html). Ces valeurs peuvent être utilisées dans vos feuilles de style, vos fichiers de composants et dans d'actuels composants, via le système **de classes de couleurs**.

<entry-ad />

## Classes

Chaque couleur de la spécification (matérial design) est convertie en une variante **arrière-plan** et **texte** pour la stylisation dans votre application via une classe css, ex : `<div class="red">` ou `<span class="red--text">`. These class colors are defined [here](https://github.com/vuetifyjs/vuetify/blob/v2-stable/packages/vuetify/src/styles/settings/_colors.scss).

<example file="color/classes" />

Les couleurs de texte prennent également en charge les variantes **darken** (foncée) et **lighten** (éclaircie), en utilisant : `text--{lighten|darken}-{n}`

<example file="color/text-classes" />

## Pack de couleurs Javascript

Vuetify dispose d'un pack de couleurs JavaScript optionnel, que vous pouvez importer et utiliser dans votre application. Ce pack peut également être utilisé pour vous aider à définir le thème de votre application.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
})
```

## Pack de couleurs Sass

Bien que pratique, le pack de couleurs augmente la taille d'exportation CSS d'environs 30kb. Certains projets peuvent ne nécessiter que les classes fournies par défaut, qui sont créées lors de l'exécution, à partir du bootstrap (programme d'amorçage) Vuetify. Pour désactiver cette fonctionnalité, vous devrez importer et construire _manuellement_ le fichier **sass** principal (généralement main.sass/scss ou app.sass/scss). Cela nécessitera un [Sass loader](https://github.com/webpack-contrib/sass-loader) (chargeur de fichier sass) et un fichier d'extension `.sass`/`.scss`.

```sass
// src/sass/main.scss

$color-pack: false;

@import '~vuetify/src/styles/main.sass';
```

Une fois votre fichier `main.sass` créé, vous devrez ensuite l'inclure dans votre projet.

```js
// src/index.js

import './src/sass/main.scss'
// OR
require('./src/sass/main.scss')
```

<alert type="error">

  Il est **indispensable** de configurer votre installation webpack de sorte à ce qu'il puisse prendre en charge les fichiers `Sass`. Vous n'aurez pas ce problème si vous utilisez un [template prêt-à-l'emploi](/getting-started/quick-start#vue-cli-install).

</alert>

Cela peut également être fait dans votre fichier principal **App.vue**. Notez tout de même, qu'en fonction de l'organisation structurelle de votre projet, ceci _augmentera_ le temps de compilation, étant donné qu'à chaque mise à jour de votre fichier d'entrée, les fichiers Sass seront regénérés.

```html
<style lang="sass">
  $color-pack: false;

  @import '~vuetify/src/styles/main.sass';
</style>
```

## Les couleurs Material Design

Vous avez ci-dessous, une liste de la palette de couleurs Material Design regroupée par couleur principale

<color-palette />

<backmatter />
