# Vuetify Contributing Guide

Thank you for your interest in improving Vuetify! Please review these guidelines to ensure a smooth contribution process.

## Important Information

- Detailed instructions for [Contributing to Vuetify](https://vuetifyjs.com/getting-started/contributing/) are available in the documentation.
- For general questions, join [our Discord Community](https://community.vuetifyjs.com/).

## Reporting Issues

- Issues **must** be created using <https://issues.vuetifyjs.com/> or they will be closed immediately.
- The issue list is **exclusively** for bug reports and feature requests.
- Search for existing issues before submitting a new one.
- Ensure the issue is reproducible with the [latest version](https://github.com/vuetifyjs/vuetify/releases/latest).
- Provide a **minimal** and **concise** reproduction using [Vuetify Play](https://play.vuetifyjs.com/) or a public repository with:
  - An initial commit showing the working state.
  - A subsequent commit triggering the issue.
- Include clear reproduction steps (actions another developer can follow after opening your link).
- Avoid comments like "+1" or "me too!" without additional details—use the :+1: button instead.

## Pull Requests

- Work on a new branch in your fork (e.g., `fix/1234-some-issue`), not `dev` or `master`.
- Submit bug fixes to the `master` branch; new features or breaking changes to the `dev` branch.
- Use a descriptive title (max 64 characters) for the PR—it will become the commit message.
- Include examples of the problem and proposed solution, ideally referencing an existing issue (e.g., `Fixes #1234`).
- Follow [commit guidelines](#commit-guidelines) for all changes.

## Local Development Setup

1. **Prerequisites:**
   - Git (>v2.20)
   - Node.js (LTS)
   - [pnpm](https://pnpm.io/)
   - Additional tools may be needed for [node-gyp](https://github.com/nodejs/node-gyp#installation) on Windows.

1. **Clone and Install:**

   ```bash
   git clone https://github.com/vuetifyjs/vuetify.git
   cd vuetify
   pnpm i
   pnpm build vuetify
   pnpm build api
   ```

1. **Development:**
   - Run `pnpm dev` from the root to start a dev server at `localhost:8090` with `packages/vuetify/dev/Playground.vue`.
   - Test changes in `Playground.vue` and include its contents in your PR.
   - For documentation, run `pnpm dev docs` (after building Vuetify with `pnpm build:lib`) at `localhost:8095`.

1. **Submitting Changes:**
   - Fork the repository and add your fork as a remote:

     ```bash
     git remote add fork https://github.com/YOUR_USERNAME/vuetify.git
     ```

   - Choose the correct base branch:
     - Bug fixes/Documentation: `master`
     - New features: `dev`
   - Push your branch and open a PR.

## Commit Guidelines

Follow the [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) standard:

- Format: `<type>(scope): <subject>` (e.g., `fix(VSelect): resolve dropdown bug`) or `<type>: <subject>` (e.g., `docs: update contributing guide`).
- Subject: Max 60 characters, imperative mood (e.g., "fix", not "fixed").
- Body: Reference issues (e.g., `resolves #1234`), wrap at 72 characters, explain "what" and "why" (not "how").
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`.
