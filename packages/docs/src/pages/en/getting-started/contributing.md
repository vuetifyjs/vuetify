---
meta:
  title: Contributing
  description: Contributing to open source helps developers access amazing tools for free. Learn how you can help develop the Vuetify framework.
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

The issue list of this repo is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately. Before reporting an issue:

- Search for similar [issues](https://github.com/vuetifyjs/vuetify/issues), it may have been answered already.
- Try to reproduce with the [latest](https://github.com/vuetifyjs/vuetify/releases/latest) version in a [codepen](https://template.vuetifyjs.com/) or repository that can be cloned to produce the expected behavior.
- Make sure that the reproduction is **MINIMAL** and concise

These steps ensure that we have all the information necessary to quickly triage and resolve your issue. Once your reproduction is complete, submit a new issue using the [Vuetify Issue Creator](https://issues.vuetifyjs.com/).

When writing an issue please provide as much detail as possible. Note that "reproduction steps" should be a series of actions another developer should take after clicking your reproduction link, not a recollection of how you discovered the bug.

Issues that are convoluted and lacking a proper reproduction may be closed by a member of the [Core Team]. For additional questions regarding reporting issues and creating reproductions, join the official Vuetify Discord [community].

<alert type="success">

  **TIP**

  When you create a reproduction, exclude all **elements, properties, and data variables** that are not needed for the reproduction. This helps drastically reduce the time it takes to triage the issue and ultimately resolve it.

</alert>

In the next section you will learn step-by-step how to set up your local environment and how to configure Vuetify for development.

## Local development

The Vuetify repository is a [lerna](https://github.com/lerna/lerna) monorepo that connects the vuetify library, docs, api generator, and reduces the friction of working with multiple projects at once. The following guide is designed to get you up and running in no time.

### Setting up your environment

Required software:

- [Git](https://git-scm.com/) >v2.20
- [Node.js](https://nodejs.org/) LTS
- [Yarn](https://classic.yarnpkg.com/)

Some of our dependencies use [node-gyp](https://github.com/nodejs/node-gyp#installation) to build themselves. You don't need to install node-gyp itself but may require additional tools, especially on windows. See the node-gyp documentation for more details.

Once you have everything installed, clone the repository:

```bash
# Using HTTPS
git clone https://github.com/vuetifyjs/vuetify.git

# Using SSH
git clone git@github.com:vuetifyjs/vuetify.git
```

<alert type="info">

[Which remote URL should I use?](https://docs.github.com/en/free-pro-team@latest/github/using-git/which-remote-url-should-i-use)

</alert>

Then install dependencies and perform an initial build to link all the packages together:

```bash
# Navigate to the vuetify folder
cd vuetify

# Install all project dependencies
yarn

# Build the packages
yarn build
```

The build process compiles all the Vuetify packages for development and may take a while (grab some ☕). Once the packages are built, you can start developing.

### Vuetify

The Vuetify library is located in `packages/vuetify`. In `packages/vuetify/dev` you will find a `Playground.vue` file; running `yarn dev` from the project root will start a dev server on [localhost:8080](http://localhost:8080/) with this file loaded. You can test your changes in the playground then copy its contents into your pull request when you're ready.

You can also test vuetify in your own project using [`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link/):

- Navigate to `packages/vuetify`
- Run `yarn link`
- Navigate to your project's directory
- Run `yarn link vuetify`

If your project is using vuetify-loader you will have to run `yarn build:lib` in the vuetify package to see changes, otherwise you can use `yarn watch` for incremental builds.

#### Playground.vue

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

The **App.vue** file used for Vuetify development is located in `packages/vuetify/dev`. It contains a [v-app](/api/v-app/) and [v-main](/api/v-main/) component and the local Playground.vue file.

### Documentation

The documentation is located in `packages/docs` but also uses some files from `packages/api-generator`. A dev server for the documentation can be started by running `yarn dev docs` from the project root and will be available on [localhost:8095](http://localhost:8095/) by default.

If you want to see changes from Vuetify in the documentation you need to run `yarn build:lib` in the vuetify package before starting the documentation server.

### Submitting Changes / Pull Requests

First you should create a fork of the vuetify repository to push your changes to. Information on forking repositories can be found in the [GitHub documentation](https://help.github.com/en/github/getting-started-with-github/fork-a-repo).

Then add your fork as a remote in git:

```bash
# Using HTTPS
git remote add fork https://github.com/YOUR_USERNAME/vuetify.git

# Using SSH
git remote add fork git@github.com:YOUR_USERNAME/vuetify.git
```

#### Choosing a base branch

Before starting development you should know which branch to base your changes on. If in doubt use master as changes to master can usually be merged into a different branch without rebasing.

| Type of change | Branch |
| --- | --- |
| Documentation | `master` |
| Bug fixes | `master` |
| New features | `dev` |
| Features with breaking changes | `next` |

```bash
# Switch to the desired branch
git switch master

# Pull down any upstream changes
git pull

# Create a new branch to work on
git switch --create fix/1234-some-issue
```

<alert type="warning">Never commit directly to the base branches, always create a feature branch to work on</alert>

Commit your changes following [our guidelines](#commit-guidelines), then push the branch to your fork with `git push -u fork` and open a pull request on the Vuetify repository following the provided template.

<alert type="warning">

  Pull requests that include unrelated commits or your local merges may be **closed** without notice.

</alert>

## Working with GitHub

Vuetify's repository lives on [GitHub](https://github.com/vuetifyjs/vuetify) and is the primary location for all development related information. In addition, we have a public Notion board with a detailed overview of our development process and status for [Vuetify 3](https://notion.vuetifyjs.com). These tools enable the [Core Team] to efficiently manage a large scale OSS project while also providing complete transparency of its progress with framework maintenance and development.

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

The [Issues] board makes heavy use of GitHub's label system with some light automation, such as adding the `triage` label to new issues.

#### For Docs - Language

We **do not** accept PRs for any documentation changes pertaining to languages other than `en`. All changes for languages other than `en` are to be submitted through our [Crowdin project](https://crowdin.com/project/vuetify). You can help translate in one of 2 ways:

- Using in-context translation service directly through the documentation site. To get started simply select `Help Translate` in the language drop down in the docs.
- Directly through the [Crowdin project](https://crowdin.com/project/vuetify).

**Note**: Languages will not be added to the language drop down on the docs site until they have at least 50% of their translations completed.

### Requesting new features

Vuetify uses the **RFC** (request for comments) process for new feature suggestions. It is intended to provide a consistent and controlled path for new features to enter the framework.

Many changes, including bug fixes and documentation improvements can be implemented and reviewed via the normal GitHub pull request workflow.

Some changes though are _substantial_, and we ask that these be put through a bit of a design process and produce a consensus among the Vuetify [Core Team](/about/meet-the-team/) and the [community](https://discord.gg/eXubxyJ).

#### Getting started

In order to get a major feature added to Vuetify you must get your RFC merged into this repository as a `.md` file. The following is a guide on how to get started:

- Fork the Vuetify RFC repo <http://github.com/vuetifyjs/rfcs>

- Copy `0000-template.md` to `active-rfcs/0000-my-feature.md` (where **my-feature** is descriptive. **do not** assign an RFC number yet).

- Fill in the RFC. Be detailed and put care into the details.

  <alert type="error">

    RFCs that do not present convincing motivation, demonstrate understanding of the impact of the design, or are disingenuous about the drawbacks or alternatives tend to be poorly-received

  </alert>

- Submit a pull request. As a pull request the RFC will receive design feedback from the larger community, and the author should be prepared to revise it in response. New RFC pull requests start in the **Pending** stage.

- Build consensus and integrate feedback. RFCs that have broad support are much more likely to make progress than those that don't receive any comments.

- Eventually, the [Core Team] will decide whether the RFC is a candidate for inclusion in Vuetify.

- An RFC can be modified based upon feedback from the [Core Team] and [community]. Significant modifications may trigger a new _final comment_ period.

- An RFC may be rejected after public discussion has settled and comments have been made summarizing the rationale for rejection. A [Core Team] member will close the RFCs associated pull request, at which point the RFC will enter the **Rejected** stage.

- An RFC may be accepted at the close of its _final comment_ period. A [Core Team] member will merge the RFCs associated pull request, at which point the RFC will enter the **Active** stage.

Once an RFC is merged and the corresponding functionality implemented within the Vuetify repository, it will be part of the next _major_ or _minor_ release. Once released, the RFC will enter the **Released** stage and be locked.

For more information regarding RFCs, see the official repository: <https://github.com/vuetifyjs/rfcs>

### Commit guidelines

All commit messages are required to follow the [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) standard using the _angular_ preset. This standard format consists of 2 types of commits:

- With scope: `<type>(scope): <subject>`

  ```bash
  fix(VSelect): don't close when a detachable child is clicked

  fixes #12354
  ```

- Without scope: `<type>: <subject>`

  ```bash
  docs: restructure nav components

  Moved duplicated functionality in drawer to reduce
  scope of responsibility
  ```

#### General Rules

- Commit messages must have a subject line and may have body copy. These must be separated by a blank line.
- The subject line must not exceed 60 characters
- The subject line must be written in imperative mood (fix, not fixed / fixes etc.)
- The body copy must include a reference all issues resolved:

  ```bash
  docs(sass-variables): fix broken link to api

  resolves #3219
  resolves #3254
  ```

- The body copy must be wrapped at 72 characters
- The body copy must only contain explanations as to what and why, never how. The latter belongs in documentation and implementation.

#### Commit types

The following is a list of **commit types** used in the _angular_ preset:

- **feat:** Commits that result in new features or functionalities. Backwards compatible features will release with the next **MINOR** whereas breaking changes will be in the next **MAJOR**. The body of a commit with breaking changes must begin with `BREAKING CHANGE`, followed by a description of how the API has changed.
- **fix:** Commits that provide fixes for bugs within vuetify's codebase.
- **docs:** Commits that provide updates to the docs.
- **style:** Commits that do not affect how the code runs, these are simply changes to formatting.
- **refactor:** Commits that neither fixes a bug nor adds a feature.
- **perf:** Commits that improve performance.
- **test:** Commits that add missing or correct existing tests.
- **chore:** Other commits that don't modify src or test files.
- **revert:** Commits that revert previous commits.

<promoted-ad slug="vuetify-reddit" />

#### Commitizen

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
