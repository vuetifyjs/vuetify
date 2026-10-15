---
name: playground
description: Use when working with packages/vuetify/dev/Playground.vue
---

# Playground

`packages/vuetify/dev/Playground.vue` (gitignored). `pnpm install` creates it from `Playground.template.vue` when missing; `pnpm dev` from the repo root serves it at localhost:8090.

Goals, in order:

1. Hands-on reproduction for the human authoring the change
2. A demo the author copy-pastes into the PR description for reviewers — keep it brief, no lengthy descriptions, it usually helps to resemble a realistic use case

## Ownership

Do not overwrite Playground content unless explicitly asked. The human is a co-author and may have pasted an old use case to focus on. When asked to change it, keep what the request doesn't touch.

These guidelines exist so AI edits look like what a human would write and expect.

## Setup

- No build step — `@/` resolves to `src`, changes to components, composables, sass and utilities hot-reload
- All components are auto-registered, labs included
- Other files in `dev/` are tracked but fair game when the reproduction needs them: `dev/vuetify.js` (createVuetify options), `dev/vuetify/{defaults,locale,icons,date}.js`

## Shape

```vue
<template>
  <v-app theme="dark">
    <v-container max-width="600">
      <!-- cases -->
    </v-container>
  </v-app>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const model = shallowRef()
</script>
```

- Block order: template → script → style
- Dark theme, `v-container`; `max-width="600"` for smaller components
- Avoid `v-row` / `v-col` as general layout — devs debug in split screen, so it wraps anyway. Stack with `d-flex flex-column ga-4`
- Cover neighbouring combinations (variant, density, disabled/readonly, RTL), not just the reported case. Label each case with a short `<code>` line, not prose
- Deterministic local data, no fetches

## Running

Only when asked, or when the scope of changes needs a visual check.

The vite process often gets stuck holding port 8090. Before starting:

```bash
lsof -ti :8090 | xargs -r kill
pnpm dev
```

RTL / locale checks — fresh Chrome profile with a forced locale (`ar`, `he`, `fa` are RTL):

```bash
LANGUAGE=ar-EG google-chrome --lang=ar-EG --user-data-dir=/tmp/chrome-ar-EG \
  --no-first-run --no-default-browser-check http://localhost:8090/
```

Same thing as a VS Code task (`.vscode/` is gitignored, add it locally):

```json
{
  "type": "shell",
  "label": "Open Playground in Chrome (locale)",
  "command": "LANGUAGE=${input:locale} google-chrome --lang=${input:locale} --user-data-dir=/tmp/chrome-${input:locale} --no-first-run --no-default-browser-check http://localhost:8090/",
  "problemMatcher": []
}
```

```json
"inputs": [{
  "id": "locale",
  "type": "pickString",
  "description": "Browser locale (ar/he/fa are RTL)",
  "options": ["ar-EG", "ar", "el-GR", "he", "fa", "en-US", "de", "ja", "ko-KR", "zh-MO"],
  "default": "ar-EG"
}]
```
