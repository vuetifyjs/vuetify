<p align="center">
  <a href="https://vuetifyjs.com" target="_blank"><img width="100"src="https://vuetifyjs.com/static/doc-images/logo.svg"></a>
</p>

## Vuetify Documentation
<p>This is the repository for the <a href="https://vuetifyjs.com" target="_blank">Vuetify</a> documentation.</p>

## Project Install

``` bash
git clone https://github.com/vuetifyjs/vuetifyjs.com.git
yarn
yarn dev
```

## Running with local Vuetify

### Run Vuetify

``` bash
git clone https://github.com/vuetifyjs/vuetify.git
yarn
yarn build
yarn link
yarn watch
```

### Link Vuetify to docs

``` bash
git clone https://github.com/vuetifyjs/vuetifyjs.com.git
yarn
yarn link vuetify
yarn dev
```

## Want to help with the translation?

If you feel ambitious with translating the documentation, you can fork the repo, create a "work-in-progress" issue to inform others that you're doing the translation, and go for it.

If you are looking to get more feedback before beginning, let us know that you want to help translate the documentation in the [community discord](https://community.vuetifyjs.com/) in the #i18n channel and would like feedback.

We greatly appreciate help from the community with this :) 

### How to contribute

Punctual problems in translations, such as spelling errors or confusing phrases, can be reported by sending _issues_ in this repository. Make it clear which page the problem is referring to, and preferably offer a suggestion to improve clarity.

If you feel comfortable translating/reviewing content on your own, the steps are:

- Make an _fork_ of this _repo_ to your own account;
- Create an _issue_ in this _repo_, of type `work-in-progress`, to inform what you are doing;
- If you want to add a new language, copy and follow the [en translation structure](https://github.com/vuetifyjs/vuetifyjs.com/tree/master/lang/en);
- Translate/revise the files that you choose;
- When finished, make a _pull request_ **with the _commit_ description in English**;
- All PRs should be made to the `dev` branch;
- Do not forget to `pull` the latest changes before resuming the process.

If you can not completely finish a file translation, but want to send the partial work, make it clear in the _issue_ of your work after the submission, to report what issues persist in the uploaded file. In this case, you must include untranslated [component files](https://github.com/vuetifyjs/vuetifyjs.com/tree/master/lang/en/components) and variables in your commit.

### Translation structure

- Make sure the language you are working is listed at:
  - [i18n/languages.js](https://github.com/vuetifyjs/vuetifyjs.com/blob/master/i18n/languages.js);
  - [lang/index.js](https://github.com/vuetifyjs/vuetifyjs.com/blob/master/lang/index.js);
- Existing translations can be found in the [lang folder](https://github.com/vuetifyjs/vuetifyjs.com/tree/master/lang);
- Follow the [en translation structure](https://github.com/vuetifyjs/vuetifyjs.com/tree/master/lang/en);
- Keep the component files even if you don't translate them.
