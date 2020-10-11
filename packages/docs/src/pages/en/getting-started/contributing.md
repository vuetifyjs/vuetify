---
meta:
  title: Contributing
  description: Contributing to open source helps developers access amazing tools for free. Learn how you can help develop in the Vuetify framework.
  keywords: contribute, contributing, feature request
related:
  - /getting-started/unit-testing/
  - /about/code-of-conduct/
  - /getting-started/frequently-asked-questions/
---

# Contributing

Vuetify is made possible by an amazing community that submits issues, creates pull requests, and provides invaluable feedback. It is our job to enable you to create amazing applications. A lot of the time, you come across something that can be made better. Maybe you find a bug, or you have an idea for additional functionality. That's great! It's as easy as cloning the Vuetify repository to get started working in a development environment.

<promoted-ad slug="vuetify-discord" />

## Reporting Issues

The issue list of this repo is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately. Before reporting an issue, ensure that:

- Search for a similar [issues](https://github.com/vuetifyjs/vuetify/issues), it may have been answered.
- Try to reproduce with the [latest](https://github.com/vuetifyjs/vuetify/releases/latest) version in a [Codepen template](https://template.vuetifyjs.com/) or repository that can be be cloned to produced the expected behavior.
- The reproduction is **MINIMAL** and concise

Issues that are convoluted and lacking a proper reproduction may be closed by a member of the [Core Team]. For additional questions regarding reporting issues and creating reproductions, join the official Vuetify Discord [community].

<alert type="success">

  **TIP**

  When you create a reproduction, exclude all **elements, properties, and data variables** that are not needed for the reproduction. This helps drastically reduce the time it takes to triage the issue and ultimately _resolve/fix it_.

</alert>

In the next section you will learn—step-by-step—how to setup your local environment and how to configure Vuetify for development.

## Local development

The Vuetify repository is a [lerna](https://github.com/lerna/lerna) monorepo that connects the vuetify lib, docs, api generator, and reduces the friction of working with multiple projects at once. The following guide is designed to get you up and running in no time.

<alert type="info">

  The following process and information pertains to the **v2.x** branch. For information on getting started with **Vuetify 3** (v3.x) development, email [john@vuetifyjs.com](mailto:john@vuetifyjs.com)

</alert>

### Setting up your environment

If you are making a [pull request](https://github.com/vuetifyjs/vuetify/pulls), please [fork the Vuetify repository](https://github.com/vuetifyjs/vuetify) before continuing; More information on forking repositories can be found in the [GitHub documentation](https://help.github.com/en/github/getting-started-with-github/fork-a-repo).

If you are new to the process of contributing to Open Source, it's recommended that you clone using **https**. More information on [which remote URL](https://help.github.com/en/github/using-git/which-remote-url-should-i-use) to use can be found on the GitHub documentation page.

```bash
# Example of cloning the Vuetify repository (non fork)

# Using HTTPS
git clone https://github.com/vuetifyjs/vuetify.git

# Using SSH
git clone git@github.com:vuetifyjs/vuetify.git
```

Once cloned, run the following commands:

```bash
# Navigate to the vuetify folder
cd vuetify

# Install all project dependencies
yarn

# Build the packages
yarn build
```

The build process compiles all of the Vuetify packages for development and may take awhile (grab some ☕). Once the packages are built, start your local development server by running <kbd>yarn dev</kbd> in the terminal.

### Starting your environment

There are a few ways to start the development environments in the Vuetify mono-repo.

```bash
# All commands run from root directory

# To start Vuetify dev
yarn dev

# To access your local vuetify playground: http://localhost:8080

# To start docs
yarn dev docs

# To access your local docs environment: http://localhost:8095

# To start a specific package
yarn dev <package name>

# To build all packages
yarn build

# To build a specific package
yarn build <package name>

# Package alias
api-generator: api
```

### Playground.vue

The **Playground** file is a cleanroom used for Vuetify development and is the recommended way to iterate on changes within the framework.

```html
<template>
  <v-container>
    <!--  -->
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      //
    }),
  }
</script>
```

The **App.vue** file used for Vuetify development is located in `packages/vuetify/dev/`. It contains a [v-app](/api/v-app/) and [v-main](/api/v-main/) component and the local Playground.vue file.

<alert type="warning">

If you are receiving errors when trying to start the development server, make sure you have done _all_ of the following:

- Installed all dependencies by running the <kbd>yarn</kbd> command in the terminal
- Built all projects by running running <kbd>yarn build</kbd> in the terminal
- Duplicated the **Playground.example.vue** file and renamed to **Playground.vue**

</alert>

## Working with GitHub

Vuetify's repository lives on [GitHub] and is the primary location for all development related information. In addition, we have a public Notion board with a detailed overview of our development process and status for [Vuetify 3](https://notion.vuetifyjs.com). These tools enables the [Core Team] to efficiently manage a large scale OSS project while also providing complete transparency of its progress with framework maintenance and development.

Some of the more notable links within these services include:

**GitHub**

- [Issues]
- [Discussions](https://github.com/vuetifyjs/vuetify/discussions)
- [Projects](https://github.com/vuetifyjs/vuetify/projects)

---

**Notion**

- [Vuetify 3 Development Epic](https://www.notion.so/vuetify/Development-Epic-f94ee76662b04d8fafb93062b58df71b)
- [Coding Guidelines](https://www.notion.so/vuetify/Coding-Guidelines-86c96a7da947421bb88515a966e71df0)

The following sections are designed to familiarize you with our standard operating procedures for Vuetify development.

<promoted-ad slug="vue-jobs" />

### Issue triage

With the size and popularity of Vuetify has come a constant influx of new issues, questions, and feature requests. To organize these requests the [Core Team] developed tools to aid not only the triaging of issues, but creating them as well.

The [Issues] board makes heavy use of the _label system_ with some light automation; such as adding the `triage` label to new issues.

### Creating a pull request

#### For Vuetify

<alert type="info">

  Pull requests related to Vuetify:

- For **bug fixes** and **documentation updates** submit pull requests to `master`.
- For **new features** and **enhancements** submit pull requests to `dev`
- For **bugs** and **critical fixes** related to **v1.5/LTS** submit pull requests to `stable`
- For any **features** that contain **breaking changes** should follow the [RFC](#requesting-new-features "Request for comments")

</alert>

#### For Docs

<alert type="info">

  For any pull requests related to Vuetify docs, submit your pull request to the `master` branch.

</alert>

#### For Docs - Language

<alert type="warning">

  We **do not** accept PRs for any doc changes pertaining to languages other than `en`. All changes for languages other than `en` are to be submitting through our Crowdin project. To get started simply select `Help Translate` in the language drop down of the docs. Languages will not be added until they have at least 15% of their translations completed.

</alert>

### Requesting new features

Vuetify uses the **RFC** (request for comments) process for new feature suggestions. It is intended to provide a consistent and controlled path for new features to enter the framework.

Many changes, including bug fixes and documentation improvements can be implemented and reviewed via the normal GitHub pull request workflow.

Some changes though are _substantial_, and we ask that these be put through a bit of a design process and produce a consensus among the Vuetify [Core Team](/about/meet-the-team/) and the [community](https://discord.gg/eXubxyJ).

#### Getting started

In order to get a major feature added to Vuetify you must get your RFC merged into the this repository as a `.md` file. The following is a guide on how to get started:

- Fork the Vuetify RFC repo <http://github.com/vuetifyjs/rfcs>

- Copy `0000-template.md` to `active-rfcs/0000-my-feature.md` (where __my-feature__ is descriptive. **do not** assign an RFC number yet).

- Fill in the RFC. Be detailed and put care into the details.

  <alert type="error">

    RFCs that do not present convincing motivation, demonstrate understanding of the impact of the design, or are disingenuous about the drawbacks or alternatives tend to be poorly-received

  </alert>

- Submit a pull request. As a pull request the RFC will receive design feedback from the larger community, and the author should be prepared to revise it in response. New RFC pull requests start in the **Pending** stage.

- Build consensus and integrate feedback. RFCs that have broad support are much more likely to make progress than those that don't receive any comments.

- Eventually, the [Core Team] will decide whether the RFC is a candidate for inclusion in Vuetify.

- An RFC can be modified based upon feedback from the [Core Team] and [community]. Significant modifications may trigger a new _final comment_ period.

- An RFC may be rejected after public discussion has settled and comments have been made summarizing the rationale for rejection. A [Core Team] member will close the RFC's associated pull request, at which point the RFC will enter the **Rejected** stage.

- An RFC may be accepted at the close of its _final comment_ period. A [Core Team] member will merge the RFC's associated pull request, at which point the RFC will enter the **Active** stage.

Once an RFC is merged and the corresponding functionality implemented within the Vuetify repository, it will be part of the next _major_ or _minor_ release. Once released, the RFC will enter the **Released** stage and be locked.

For more information regarding RFC's, navigate to the official repository: <https://github.com/vuetifyjs/rfcs>

#### Commit guidelines

All commits are required to follow the [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) standard using the _angular_ preset. This standard format consists of 2 types of commits:

- With scope: `<type>(scope): <subject>`

  ```bash
  fix(VSelect): don't close when a detachable child is clicked

  fixes #12354
  ```

- Without scope: `<type>: <subject>`

  ```bash
  docs: restructure nav components

  move duplicated functionality in drawer to reduce
  scope of responsibility
  ```

##### General Rules

- Commit messages must have a subject line and may have body copy. These must be separated by a blank line.
- The subject line must not exceed 50 characters
- The subject line must be written in imperative mood; (fix, not fixed / fixes etc.)
- The body copy must include a reference all issues resolved:

  ```bash
  doc(sass-variables): fix broken link to api

  resolves #3219
  resolves #3254
  ```

- The body copy must be wrapped at 72 columns
- The body copy must only contain explanations as to what and why, never how. The latter belongs in documentation and implementation.

##### Commit types

The following is a list of **commit types** used in the _angular_ preset:

- **feat:** Commits that result in a new features or functionalities. Backwards compatible features will release with the next **MINOR** whereas breaking changes will be in the next **MAJOR**. The body of a commit with breaking changes must begin with `BREAKING CHANGE`, followed by a description of how the API has changed.
- **fix:** Commits that provide fixes for bugs within vuetify's codebase.
- **docs:** Commits that provide updates to the docs.
- **style:** Commits that do not affect how the code runs, these are simply changes to formatting.
- **refactor:** Commits that neither fixes a bug nor adds a feature.
- **perf:** Commits that improve performance.
- **test:** Commits that add missing or correct existing tests.
- **chore:** Other commits that don't modify src or test files.
- **revert:** Commits that revert previous commits.

<promoted-ad slug="vuetify-reddit" />

### Submitting Changes / Pull Requests

When submitting a [pull request] it is important that your local fork is synced with the latest changes in Vuetify. A [pull request] should be free of unnecessary commits and follow the [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) standards using the _angular_ preset.

<alert type="warning">

  Pull requests that include superfluous commits or your local merges may be **closed** without notice.

</alert>

## Recommended setup

More to follow...

### VSCode tasks

More to follow...

### Process Manager 2

More to follow...

### Commitizen

The [Vuetify team](/about/meet-the-team/) uses [commitizen] for all repository commits. This allows for easy to read and organized commits with minimal change to normal commit functions. Commitizen provides a fluid interface for handling semantic versioning and makes it easier to write [release notes](https://github.com/vuetifyjs/vuetify/releases).

To get started, [globally install the commitizen package](https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility) using [yarn](https://yarnpkg.com/) by running the following commands in your terminal:

```bash
# Install commitizen and the conventional changelog adapter
yarn global add commitizen cz-conventional-changelog

# Then create a .czrc file that tells commitizen
# which adapter to use globally.
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

<alert type="warning">

  Sometimes creating a `.czrc` file does not work using the **command prompt**. If you get unexpected results, create the file in your user folder located in the home directory. This is typically located on your primary harddrive in the `Users` folder.

</alert>

Once complete, instead of using <kbd>git commit</kbd> you will run the command <kbd>git cz</kbd> in your terminal. From here, you are presented with a series of prompts used to build the commit message. For additional information, please review our guidlines on [commits](#commit-guidelines).

<backmatter />

[commitizen]: https://github.com/commitizen/cz-cli
[community]: https://community.vuetifyjs.com/
[Core Team]: /about/team/
[pull request]: https://github.com/vuetifyjs/vuetify/pulls
[Issues]: https://github.com/vuetifyjs/vuetify/issues
