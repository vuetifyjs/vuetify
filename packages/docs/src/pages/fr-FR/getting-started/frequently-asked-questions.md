---
meta:
  title: Foire aux questions
  description: Bloqué sur un problème ? Vous avez un problème ? Consultez les questions les plus fréquemment posées par la communauté Vuetify.
  keywords: foire aux questions, faq
related:
  - /getting-started/contributing/
  - /features/treeshaking/
---

# Foire aux questions

Bloqué sur un problème particulier ? Vérifiez certaines de ces erreurs communes avant de créer un ticket. If you still cannot find what you are looking for, you can submit an [issue](https://issues.vuetifyjs.com/) on GitHub or ask the in our [community](https://community.vuetifyjs.com/).

<promoted-ad slug="vuetify-discord" />

## Table des matières

- [Quand Vuetify v3 sera-t-il publié ?](#version-3)
- [Pourquoi la recherche Vuetify ne fonctionne pas correctement ?](#search-broke)
- [Mon application ne compile pas à cause d'erreurs sass / scss.](#sass-compile-error)
- [Y a-t-il des exemples sur la façon dont la grille v2 se comporte par rapport à la v1.5?](#v2-v15-grid)
- [Erreur: Impossible de trouver le module 'node-sass'.](#cannot-find-module-sass)
- [CSS invalide après @content": expected "}", was "($material-light); ".](#invalid-css-content)
- [Mon application ne fonctionne pas.](#my-application-is-not-working)
- [Je vois que $attrs est en lecture seule et/ou que $listeners est en lecture seule dans la console.](#attrs-is-readonly)
- [Je vois Error Module parse "failed". Unexpected token dans le terminal.](#unexpected-token)
- [Existe-t-il un template codepen avec un routeur?](#codepen-template-with-router)
- [Comment puis-je étendre les composants Vuetify ?](#extend-components)
- [Mon application ne semble pas correcte.](#my-application-does-not-look-correct)
- [Les Menus / Dialogues / Menus de navigation ne s’ouvrent pas correctement.](#menu-dialog-drawer)
- [La barre de défilement est affichée même si mon contenu ne déborde pas verticalement.](#scrollbar-overflow)
- [Comment centrer verticalement un contenu ?](#vertically-center-content)
- [Mon lien _/_ est actif lorsque je suis sur la page _/home_.](#link-active-home)
- [Pourquoi mon application n'est-elle pas responsive sur les appareils mobiles ?](#mobile-responsiveness)
- [Comment utiliser Font Awesome, Material Design Icons ou Material Icons?](#custom-icons)
- [Ma boîte de dialogue se ferme immédiatement après avoir cliqué sur le bouton?](#dialog-close-click)
- [Comment mettre à niveau vers la dernière version?](#latest-version-upgrade)
- [Comment puis-je signaler un bug ou demander une fonctionnalité?](#report-request-feature)
- [Le vuetify-loader ne charge pas tous les composants](#vuetify-loader-components)
- [Combien de temps la version 1.5 sera-t-elle supportée ?](#v15-lts)
- [Comment puis-je accéder à la documentation v1.5 ?](#v15-docs)
- [[Vue warn]: Unknown custom element: &lt;v-app>](#unknown-element)
- [SCRIPT5022: Expected identifier, string or number](#script5022)
- [Error: Could not find a declaration file for module 'vuetify/lib'](#typescript-declaration-file)

## Questions

Vous avez une question qui apparait ici? Parlez-nous sur notre Discord communautaire [Discord](https://community.vuetifyjs.com/) ou créez une demande sur notre [générateur de tickets](https://issues.vuetifyjs.com/).

---

- **Quand sortira Vuetify v3 ?** { #version-3 }

  Suivez notre progression sur [GitHub](https://titan.vuetifyjs.com) ou lisez et découvrez ce qui se passera sur notre [Feuille de route](/introduction/roadmap/).

<br>

- **Mon application ne compile pas à cause d'erreurs sass / scss.**{ #sass-compile-error }

  Assurez-vous que vous avez bien configuré webpack en utilisant l'objet d'options approprié, conformément à votre version de sass-loader. Reportez-vous à la section [Installation de Webpack](/getting-started/installation/#webpack-install) pour plus de détails.

<br>

- **Pourquoi la recherche Vuetify ne fonctionne pas correctement ?**{ #search-broke }

  Pour le moment, Algolia docsearch ne fait que parcourir le site principal de production : [https://vuetifyjs.com/](https://vuetifyjs.com/).

<br>

- **Y a-t-il des exemples sur la façon dont la grille v2 se comporte par rapport à la v1.5 ?**{ #v2-v15-grid }

  Oui, vous pouvez voir des exemples de la grille [ici](https://gist.github.com/johnleider/207f63c9d30fb77042a0bb0258c5ab32).

<br>

- **Error: Cannot find module 'node-sass'.**{ #cannot-find-module-sass }

  Assurez-vous que vos paquets `@vue/cli-*` situés dans `package.json` sont au moins **^3.5.0**.

<br>

- **Invalid CSS after @content: expected "}", was "($material-light);".**{ #invalid-css-content}

  Assurez-vous que vous utilisez `sass` au lieu de `node-sass` dans votre **package.json**.

<br>

- **Mon application ne fonctionne pas.**{ #my-application-is-not-working }

  Tout d'abord, assurez-vous que vous utilisez la dernière version de Vue.js et de Vuetify. Essayez de le reproduire sur codepen en utilisant le [template suivant](https://template.vuetifyjs.com/). Si vous ne pouvez pas reproduire le problème en dehors de votre environnement, cela signifie généralement que le problème se trouve sur votre environnement local. Si vous ne parvenez toujours pas à résoudre votre problème, veuillez contacter notre [communauté](https://community.vuetifyjs.com) en fournissant votre codepen et votre problème dans le canal d'aide approprié.

<br>

- **je vois que `$attrs est en lecture seule` et/ou que `$listeners est en lecture seule` dans le terminal**{ #attrs-is-readonly }

  Vuetify utilise Typescript et doit actuellement importer et étendre l'objet Vue. Cela a pour but, dans certaines applications, de générer un message d'avertissement. There is currently an ongoing [GitHub discussion](https://github.com/vuetifyjs/vuetify/issues/4068) with potential work-arounds in a variety of use-cases.

<br>

- **Je vois `Error in ./node_modules/vuetify/src/dir/file.js Module parse failed: Unexpected token (<lineno>:<characterno>)` dans le terminal.**{ #unexpected-token }

  Si vous utilisez un IDE, tel qu'IntelliJ IDEA ou WebStorm, il ajoutera souvent des importations automatiques pointant vers le répertoire `vuetify/src` pour les composants que vous utilisez. Changez le chemin de la déclaration de l'import de `vuetify/src` en `vuetify/lib`.

<br>

- **Y a-t-il un template codepen avec un routeur ?**{ #codepen-template-with-router }

  Oui. [Template de routeur Vuetify Codepen](https://codepen.io/johnjleider/pen/PMZvpr).

<br>

- **Comment puis-je étendre les composants Vuetify ?**{ #extend-components }

  Les composants Vuetify sont facilement extensibles en l'important et en utilisant l'option `extends` dans la vue. [Exemple de Codepen](https://codepen.io/whoistobias/pen/yLNgjwy)

```js
// src/components/ActivateBtn
import { VBtn } from 'vuetify/lib'

export default {
  extends: VBtn,

  methods: {
    // Here we overwrite the genContent method of VBtn
    // to override the default genContent method
    genContent() {
      return this.$createElement('div', {
        staticClass: 'v-btn__contents'
      }, [
        'Activate ',
        this.$slots.default
      ])
    }
  }
}
```

<br>

- **Mon application ne fonctionne pas.**{ #my-application-does-not-look-correct }

  Vuetify nécessite l'utilisation du composant `v-app`. Il faut envelopper toute votre application et est le point central de la plupart des fonctionnalités du framework y compris des thèmes. Assurez-vous que vous suivez le balisage approprié documenté dans la page [Application](/components/application/).

<br>

- **Les Menus / Dialogues / Menus de navigation ne s’ouvrent pas correctement.**{ #menu-dialog-drawer }

  Assurez-vous que vos composants sont entourés d'un élément `v-app`. Si vous utilisez un élément pour activer le composant qui n'est pas placé dans l'emplacement **activator** , assurez-vous que vous arrêtez la propagation de l'événement de clic. Ces composants utilisent la directive **v-outside-click** et se ferment immédiatement.

<br>

- **La barre de défilement s'affiche même si mon contenu ne déborde pas verticalement.**{ #scrollbar-overflow }

  Vuetify utilise une version légèrement modifiée de [ress reset](https://github.com/filipelinhares/ress) qui, par défaut, active la barre de défilement html pour normaliser le comportement entre les navigateurs. C'est un choix de design qui a été débattu à plusieurs reprises. Il y a des avantages et des inconvénients à l'avoir et à ne pas l'avoir et, dès maintenant, le vote est favorable à ce qu'il en soit ainsi. Si vous souhaitez désactiver cette fonctionnalité, ajoutez simplement `html { overflow-y: auto }` à votre fichier de style. Trouver plus d'informations sur la page [CSS Reset](/styles/css-reset/).

- **Comment centrer le contenu verticalement ?**{ #vertically-center-content }

  Apply the **fill-height** prop to `v-container`. This helper class normally only adds **height: 100%**, but for the container, it also looks for a child `v-layout` and applies the needed classes to vertically center the content.

<promoted-ad slug="vuetify-reddit" />

- **My _/_ link is active when I'm on _/home_ page.**{ #link-active-home }

  Ajoute le **exact** au lien qui pointe vers le /. Pour plus d'informations à ce sujet, vous pouvez visiter la documentation officielle [du routeur Vue](https://router.vuejs.org/en/api/router-link.html).

<br>

- **Pourquoi mon application n'est-elle pas réactive sur les appareils mobiles ?**{ #mobile-responsiveness }

  Ensure that you have the proper meta tags inside of the `<head>` section of your index.html.

```html
<!-- public/index.html -->
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
</head>
</html>
```

<br>

- **How do I use Font Awesome, Material Design Icons or Material Icons?**{ #custom-icons }

  Vous pouvez trouver plus d'informations dans notre [guide d'icônes](/features/icon-fonts/).

<br>

- **Why does &lt;v-dialog> close immediately after clicking the button?**{ #dialog-close-click }

  When not using the **activator** slot for `v-menu` and `v-dialog` for example, you must manually stop the propagation of the click event. To do this, simply add the `.stop` modifier to the click event.

```html
<!-- Vue Component -->
<template>
  <div>
    <v-dialog v-model="dialog">
      <v-card>...</v-card>
    </v-dialog>

    <v-btn @click.stop="dialog = true">
      Open Dialog
    </v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
    }),
  }
</script>

```

<br>

- **How do I upgrade to the latest version?**{ #latest-version-upgrade }

  For a detailed guide on how to upgrade to the latest version, navigate to the [Releases and Migrations](/getting-started/releases-and-migrations/) page. In addition, all required changes are noted in the **Upgrade Guide** of all releases.

  **Releases**:

- [Récents](https://github.com/vuetifyjs/vuetify/releases/latest)
- [v2.0.0](https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0)
- [v1.5.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.5.0)
- [v1.4.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.4.0)
- [v1.3.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.3.0)
- [v1.2.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.2.0)
- [v1.1.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.1.0)
- [v1.0.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.0.0)
- [v0.17.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.17.0)
- [v0.16.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.16.0)
- [v0.15.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.15.0)
- [v0.14.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.14.0)
- [v0.13.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.13.0)
- [v0.12.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.12.0)

<br>

- **How do I report a bug or request a feature?**{ #report-request-feature }

  In order to ensure all required information is provided, we have created an [Issue Generator](https://issues.vuetifyjs.com) that helps you through the process. Any issue created not using the generator will automatically be closed, so please use it.

<br>

- **The vuetify-loader doesn't load all components.**{ #vuetify-loader-components }

  The vuetify-loader has limitations in _dynamic_ components. Make sure to checkout the [limitations](/features/treeshaking/#limitations) section for more information.

<br>

- **How long will version 1.5 be supported?**{ #v15-lts }

  Until July 2020. More information is located on the [Long-term Support](/introduction/long-term-support/) page.

<br>

- **How do I get to the v1.5 documentation?**{ #v15-docs }

  [https://v15.vuetifyjs.com](https://v15.vuetifyjs.com)

<br>

- **[Vue warn]: Unknown custom element: &lt;v-app>**{ #unknown-element }

  Ensure that you have the latest version of [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugin-vuetify) and [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) installed in your **package.json**.

<br>

- **SCRIPT5022: Expected identifier, string or number**{ #script5022 }

  In order to support **modern mode** in vue-cli-3, `vuetify/lib` is not transpiled. You must tell vue-cli to transpile the `vuetify` package. This is configured automatically when installing the Vuetify cli plugin. If you are using an older version, simply add 'vuetify' to the `transpileDependencies` array in `vue.config.js`.

<br>

- **When adding typescript - Error: Could not find a declaration file for module 'vuetify/lib'**{ #typescript-declaration-file }

  Update the `compilerOptions` key in `tsconfig.json` with the vuetify type:

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vuetify"]
  }
}
```

## J'ai besoin d'aide

Si vous avez besoin d'aide pour résoudre un problème, veuillez utiliser l'un de nos canaux d'aide :

- [Support professionnel de Vuetify](https://vuetifyjs.com/en/introduction/enterprise-support/)
- [Communauté Discord](https://community.vuetifyjs.com/)
- [Discussions GitHub](https://discussions.vuetifyjs.com/)

<br>

Pour toute demande complémentaire, veuillez contacter [John Leider](mailto:john@vuetifyjs.com) ou [Heather Leider](mailto:heather@vuetifyjs.com).

<promoted-ad type="theme" />

<backmatter />
