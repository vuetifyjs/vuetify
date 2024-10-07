---
meta:
  title: Navigateurs supportés
  description: Vuetify is a progressive framework that supports all evergreen browsers and IE11 / Safari with polyfill.
  keywords: vuetify browser support
related:
  - /getting-started/installation/
  - /getting-started/frequently-asked-questions/
  - /features/sass-variables/
---

# Navigateurs supportés

Vuetify est un framework progressif qui tente de pousser le développement web à un niveau supérieur. Afin d'accomplir au mieux cette tâche, certains sacrifices ont dû être faits en termes de support pour les anciennes versions d'Internet Explorer. Il ne s'agit pas d'une liste exhaustive de navigateurs compatibles, mais bien des navigateurs principaux.

<entry-ad />

## Navigateurs

| Navigateur                      | Statut                 |
| ------------------------------- | ---------------------- |
| Chromium (Chrome, Edge Insider) | Supporté               |
| Edge                            | Supporté               |
| Firefox                         | Supporté               |
| Safari 10+                      | Supporté               |
| IE11/Safari 9                   | Supporté avec polyfill |
| IE9 / IE10                      | Non supporté           |

## Support d'IE11 et de Safari 9

Vuetify utilise des fonctionnalités de ES2015/2017 qui nécessitent l'utilisation de polyfills pour **Internet Explorer 11** et **Safari 9/10**.

## Vue CLI

Malheureusement, Vue CLI n'apporte pas automatiquement la compatibilité IE11 dans laquelle vous pouvez rencontrer diverses erreurs (comme Symbol n'est pas défini). Pour aider à résoudre ces erreurs, vous devez ajouter manuellement le paramètre `transpileDependencies` dans `vue.config.js`:

```js
// vue.config.js

module.exports = {
  transpileDependencies: ['vuetify']
}
```

## Webpack

Si vous utilisez une configuration personnalisée de Webpack, vous devrez installer les paquets [core-js](https://github.com/zloirock/core-js) et [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime). Ouvrez un nouveau terminal et exécutez les commandes suivantes :

```bash
yarn add core-js regenerator-runtime
# OU
npm install core-js regenerator-runtime --save
```

Incluez le plugin _le plus tôt_ possible dans votre fichier **main.js**- ou quel que soit le point d'entrée principal de votre application.

```js
// src/main.js

// Polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// Imports
import Vue from 'vue'
import vuetify from '@/plugins/vuetify'

new Vue({ vuetify }).$mount('#app')
```

<discovery-ad />

<br>
<br>

### Babel preset-env

Au lieu d'installer et d'importer manuellement les polyfills dont vous avez besoin, nous _vous recommandons_ d'installer [@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env). Ce paquet garantit que seuls les **polyfills nécessaires** sont ajoutés à votre application en fonction de vos paramètres désignés.

```bash
yarn add @babel/preset-env -D
# OU
npm install @babel/preset-env -D
```

Une fois installé, ajoutez le préréglage à votre fichier `babel.config.js`:

```js
// babel.config.js

module.exports = {
  presets: ['@babel/preset-env']
}
```

ou si vous utilisez un fichier `.babelrc`:

```json
// .babelrc

{
  "presets": ["@babel/preset-env"]
}
```

## Limitations du template

En raison de la prise en charge limitée des balises `<template>` d'Internet Explorer, vous devez envoyer des éléments dom entièrement compilés au navigateur. Cela peut être fait soit en construisant votre code Vue à l'avance, soit en créant des composants d'aide pour remplacer les éléments du dom. Par exemple, si envoyé directement à IE, cela échouera :

```html
<!-- Vue Component -->

<template v-slot:items="props">
  <td>{‌{ props.item.name }‌}</td>
</template>
```

<backmatter />
