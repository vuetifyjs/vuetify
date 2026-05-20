---
layout: blog
meta:
  title: September 2025 Update
  description: September marks significant progress as we assemble the building blocks for Vuetify's next phase. From revolutionary design-to-development workflows with our new Figma UI Kit to foundational v0 composables, September has been about connecting the pieces that will define the future of Vue development.
  keywords: Vuetify September 2025, Figma UI Kit, Vuetify0
---

<script setup>
  import { useTheme } from 'vuetify'

  const theme = useTheme()
  const linklogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vlink-logo-${theme.current.value.dark ? 'dark' : 'light'}.svg`
  })
  const zerologo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vzero-logo-${theme.current.value.dark ? 'dark' : 'light'}.svg`
  })
</script>

# September 2025 Update

Welcome to our September update! This month marks significant progress as we assemble the building blocks for Vuetify's next phase. From revolutionary design-to-development workflows with our new Figma UI Kit to foundational v0 composables, September has been about connecting the pieces that will define the future of Vue development.

![Hero image for September update](https://cdn.vuetifyjs.com/docs/images/blog/september-2025-update/september-hero.png "September hero image"){ height=112 }

🖊️ John Leider • 📅 October 12th, 2025

<PromotedEntry />

---

## Assembling the Future

I've been heads-down on Vuetify0 composables this month, and it's starting to click. The Figma UI Kit update is great, the framework improvements are solid, but what keeps me up at night is making sure these v0 composables feel *right*. We're not just building features—we're establishing patterns that thousands of developers will use. Get the abstraction wrong and you've created more problems than you solved. Get it right and complex stuff like permissions and feature flags just works.

Having Jacek take over as Framework Czar has been huge. I can focus on these bigger architectural questions while he keeps the core framework moving forward. The team shipped over 60 bug fixes and features in the month of September, and we're maintaining that pace. Between the Figma Kit, the v0 work, and everything else happening in the ecosystem, things are coming together.

::: success

Cool example of the month: [Gradient VProgressLinear](https://play.vuetifyjs.com/playgrounds/AIVKig) by [J-Sek](https://github.com/J-Sek)

:::

---

## Table of Contents

* [Releases](#releases)
  * [Key Improvements](#key-improvements)
* [Updated Official Figma UI Kit](#updated-official-figma-ui-kit)
  * [What's Included](#whats-included)
  * [Why This Matters](#why-this-matters)
  * [Pro Version Available](#pro-version-available)
* [September Webinar Recap: Performance Crisis](#september-webinar-recap-performance-crisis)
  * [Next Event: v0 Live Coding with John](#next-event-v0-live-coding-with-john)
* [Vuetify0: Composables Taking Shape](#vuetify0-composables-taking-shape)
  * [New Composables This Month](#new-composables-this-month)
* [Framework & Security Updates](#framework-security-updates)
  * [Build System Modernization](#build-system-modernization)
* [Ecosystem Spotlight: Vuetify Link](#ecosystem-spotlight-vuetify-link)
  * [Key Features](#key-features)
* [September 2025 Changelog](#september-2025-changelog)
* [The Pieces Come Together](#the-pieces-come-together)

---

## Releases

September focused on stabilization and quality improvements across the Vuetify 3 series, including iterating to the next minor version with [v3.10.0 (Argo)](/getting-started/release-notes/?version=v3.10.0). We've addressed numerous bugs, enhanced accessibility, and refined component behaviors to ensure a robust experience for developers and users alike.

![September Releases Banner](https://cdn.vuetifyjs.com/docs/images/blog/september-2025-update/v310_release.png "September Releases Banner")

### Key Improvements

* A direct [VCalendar](/components/calendars) port from Vuetify 2, bringing back familiar calendar functionalities with modern enhancements.
* Added support for `prefers-reduced-motion` to respect user accessibility settings
* Added multiple new slots for [VTreeview](/components/treeview) and [VDataTable](/components/data-tables/introduction/) for greater customization

View the complete list of changes in the [Full Changelog](#september-2025-changelog)

**Details:**

* [v3.9.7](https://vuetifyjs.com/getting-started/release-notes/?version=v3.9.7)
* [v3.10.0](https://vuetifyjs.com/getting-started/release-notes/?version=v3.10.0)
* [v3.10.1](https://vuetifyjs.com/getting-started/release-notes/?version=v3.10.1)
* [v3.10.2](https://vuetifyjs.com/getting-started/release-notes/?version=v3.10.2)
* [v3.10.3](https://vuetifyjs.com/getting-started/release-notes/?version=v3.10.3)

## Updated Official Figma UI Kit

We're thrilled to announce the release of our **[updated Vuetify 3 UI Kit for Figma](https://store.vuetifyjs.com/products/vuetify-ui-kit-figma)**! This comprehensive design system brings Vuetify's Material Design implementation directly to your design workflow, completely free.

![Vuetify Figma UI Kit Update](https://cdn.vuetifyjs.com/docs/images/blog/september-2025-update/figma.png "Vuetify Figma UI Kit Update")

### What's Included

* **Complete Component Library**: Every Vuetify 3 component meticulously recreated in Figma
* **Material Design 3 Foundation**: Built on the latest Material Design specifications
* **Design Tokens**: Consistent spacing, typography, and color systems
* **Responsive Variants**: Components optimized for all screen sizes
* **Dark Mode Support**: Full theme switching capabilities
* **Auto-Layout**: Modern Figma features for flexible, maintainable designs

### Why This Matters

This free UI kit bridges the gap between design and development, ensuring pixel-perfect implementations and faster handoffs. Designers can now work with the exact same components developers use, eliminating interpretation errors and accelerating the design-to-code process.

### Pro Version Available

Design faster with 1:1 Vuetify components, production-ready variants and style controls (colors, densities, radius and states) that adapt to any brand. Choose the version that best fits your workflow.

#### Why PRO

* ✅ 150+ components with 1:1 names and structure with Vuetify
* ✅ All variants (elevated, flat, tonal, outlined, text, plain…) and complete states
* ✅ Advanced foundations: 7 color roles, densities, radius, borders (color/width/opacity)
* ✅ +4 modes by variables to scale brands and themes
* ✅ Updates synchronized with the library and direct support

**Ideal for:**

* Teams & Startups — Faster delivery, total consistency and less rework
* Freelancers — Winning proposals and clean handoff with devs
* Design Systems — Variables, tokens and real theme scalability
* Dev Teams — 1:1 parity with Vuetify components to implement without friction.

#### Comparison Table

| Feature | PRO | FREE |
|---------|-----|------|
| **Foundations** | Includes complete **Material Design Colors** | Does not include MD color palette |
| **Themes** | Light / Dark (+ extra modes by variables) | Light / Dark |
| **Color Roles** | Default, Primary, Secondary, Custom, Error, Warning, Info, Success | Default, Primary, Secondary, Custom, Error, Warning, Info, Success |
| **States** | Enabled, Disabled, Active/Focus, Hover | Enabled, Disabled |
| **Sizes** | Default, Small, X/Small, Large, X/Large | Default, Small, Large |
| **Density** | Default, Comfortable, Compact | Only Default |
| **Border Color** | Current + Primary, Secondary, Error, Warning, Info, Success | Only Current |
| **Border Width** | default, 0, xs (thin), sm, md, lg, xl | default, 0 |
| **Border Opacity** | default, 0, 25, 50, 75, 100 | Not available |
| **Border Radius** | default, square, xs, sm, md, lg, xl, pill, circle | default, square, pill, circle |
| **Error State** | Full support | Basic inputs |
| **Others** | Individual color control in `VField` | No individual control |
| **Components** | All components | Missing components |
| **Variants** | All variants | Only elevated • flat • outlined |
| **Variants in Inputs** | All variants | Only filled • outlined |
| **Updates & Support** | Synchronized with library + support | Not guaranteed • no support |
| **Modes by variables** | 4+ modes | 4 or less |

**Details:**

* [Free Figma UI Kit](https://store.vuetifyjs.com/products/vuetify-ui-kit-figma)
* [Go PRO](https://store.vuetifyjs.com/products/official-vuetify-3-ui-kit-for-figma)

## September Webinar Recap: Performance Crisis

Thank you to everyone who joined our September performance optimization webinar. We had an engaging Q&A session with the community discussing bundle size reduction strategies. Some highlights and key takeaways:

* Disable [unused CSS utilities](/features/sass-variables/#disabling-utility-classes) with SASS variables
* Use [vite-plugin-vuetify](/features/treeshaking/) for automatic treeshaking and code splitting
* Reduce page load time with [VLazy](/components/lazy/)
* Use [VVirtualScroll](/components/virtual-scroll/) for expensive lists

Never miss another event by joining our [Discord Community](https://community.vuetifyjs.com/) and following us on [X](https://x.com/vuetifyjs)!.

### Next Event: v0 Live Coding with John

**Wednesday, October 29th**: Join John for an exclusive live coding session where he'll build a complete application using Vuetify0 from scratch!

#### What to Expect

* **Real-time Development**: Watch as John tackles real-world challenges
* **Composables in Action**: See how usePermissions, useFeatures, and other v0 composables work together
* **Architecture Decisions**: Learn the reasoning behind v0's design patterns
* **Live Q&A**: Get your questions answered as we code
* **Early Access Insights**: First detailed look at v0's developer experience

This will be a true live demo, so expect some surprises and spontaneous problem-solving. Whether you're a seasoned Vue developer or just curious about v0, this session will provide valuable insights into building modern applications with v0 composables.

**Details**:

* Date: Wednesday, October 29th
* Start Time: 9:00 AM CST
* [See what Vuetify0 is all about](https://discord.gg/vuetify-340160225338195969?event=1426220686162268311)

## Vuetify0: Composables Taking Shape

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto" title="Vuetify0 Logo" />

September saw intensive development on v0's composable foundation. The team has been deep in the codebase, introducing critical composables and ensuring code quality across the board.

### New Composables This Month

* **usePermissions**: A composable for managing RBAC permissions:

```ts { resource="src/main.ts" }
import { createApp } from 'vue'
import { createPermissionsPlugin } from '@vuetify/0'

const app = createApp()

app.use(
  createPermissionsPlugin({
    permissions: {
      super: [
        ['create', 'Post'],
        ['read', 'Post'],
        ['update', 'Post'],
        ['delete', 'Post'],
        ['use', 'Dev'],
      ],
      editor: [
        ['create', 'Post'],
        ['read', 'Post'],
        ['update', 'Post']
      ],
    },
  })
)

app.mount('#app')
```

```html { resource="src/components/SomeComponent.vue" }
<script lang="ts" setup>
  import { usePermissions } from '@vuetify/0'
  import { useAuth } from 'your-auth-provider'

  const { user } = useAuth()
  const { can } = usePermissions()
</script>

<template>
  <div v-if="can(user.role, 'create', 'Post')">
    <button>Create Post</button>
  </div>

  <div v-if="can(user.role, 'delete', 'Post')">
    <button>Delete Post</button>
  </div>
</template>
```

* **useFeatures**: A composable for managing available features and feature flags w/ variants support.

```ts { resource="src/main.ts" }
import { createApp } from 'vue'
import { createFeaturesPlugin } from '@vuetify/0'

const app = createApp()

app.use(
  createFeaturesPlugin({
    features: {
      comments: true,
      dev: false,
      search: {
        $value: true,
        $variation: 'v2',
        $description: 'The new and improved search experience',
      },
    },
  })
)

app.mount('#app')
```

```html { resource="src/components/SomeComponent.vue" }
<script lang="ts" setup>
  import { useFeatures } from '@vuetify/0'

  const features = useFeatures()
  const dev = features.get('dev')!
  const search = features.get('search')!
</script>

<template>
  <button @click="dev.toggle()">Toggle Dev</button>

  <input
    v-if="dev.value && features.variation('search') === 'v2'"
    placeholder="Search v2"
  />

  <input v-else placeholder="Search v1" />
</template>
```

* **useTimeline**: A composable for sequence management with undo/redo support.

```html { resource="src/components/SomeComponent.vue" }
<script lang="ts" setup>
  import { useTimeline } from '@vuetify/0'

  const timeline = useTimeline({ size: 5 })

  timeline.register({ id: 1, value: 'foo' })
  timeline.register({ id: 2, value: 'bar' })
  timeline.register({ id: 3, value: 'baz' })

  console.log(timeline.size) // 3

  timeline.undo()
  timeline.undo()

  console.log(timeline.values()) // ['foo']

  timeline.redo()

  console.log(timeline.values()) // ['foo', 'bar']
</script>
```

::: info

See all available composables on the [Vuetify0 documentation site](https://0.vuetifyjs.com/composables/).

:::

**Details:**

* [usePermissions Documentation](https://0.vuetifyjs.com/composables/plugins/use-permissions/)
* [useFeatures Documentation](https://0.vuetifyjs.com/composables/plugins/use-features/)
* [useTimeline Documentation](https://0.vuetifyjs.com/composables/registration/use-timeline/)

## Framework & Security Updates

With all the buzz around security vulnerabilities in the NPM ecosystem, we've prioritized enhancing our build and publishing processes to ensure the highest level of security for our users.

### Build System Modernization

This month brought significant improvements to our build infrastructure in Vuetify and across the ecosystem. Key updates include:

* **Vite 7 Support**: Full migration completed with improved build performance
* **Vue-TSC 3**: Updated TypeScript tooling for better type checking
* **Trusted Publishing**: Enhanced security for all package releases with the pnpm's **minimumReleaseAge** setting
* **TSGO:** Replaced our TSC usage with TSGO for faster builds and better DX

**Details:**

* [Commit: af9a9bf](https://github.com/vuetifyjs/vuetify/commit/af9a9bfc63fa44721f89076431fbe004e70d7c1c)
* [Commit: c78f8aa](https://github.com/vuetifyjs/vuetify/commit/c78f8aa066164f6ee5f2e1f106ed121963faffe5)

## Ecosystem Spotlight: Vuetify Link

<AppFigure :src="linklogo" alt="Vuetify Link logo" width="200" height="auto" class="mx-auto" title="Vuetify Link Logo" />

Vuetify Link is a new service that simplifies the process of creating and managing custom short links for your projects. The initial idea came from the need to share Vuetify Bins/Playgrounds/Studios without necessarily wanting to save them to your dashboard. Since these services all compress their data into the URL, it can often times be very long and cumbersome to share. It also enables us to continue to bolster the value proposition for **Vuetify One** subscribers with advanced options while making the core functionality of creating shortlinks free for everyone.

### Key Features

* **Custom Slugs**: Create memorable and branded short links
* **Link Management**: Edit, delete, and track your links from a simple dashboard
* **Analytics**: Monitor link performance with detailed statistics
* **Free & Pro Plans**: Basic link shortening is free, with advanced features available for Vuetify One subscribers

![Vuetify Link Landing Screenshot](https://vuetifyjs.b-cdn.net/docs/images/blog/september-2025-update/vlink_banner.png "Vuetify Link Landing")

We anticipate launching this new service **this month!** Stay tuned for the official release announcement with all the details.

## September 2025 Changelog

The following section provides an overview of the changes made in September 2025, including new features, bug fixes, and enhancements across the Vuetify framework.

**Key Improvements:**

* Introduced `spaced` prop for VBtn to enhance button spacing options.
* Added `truncate-length` prop to VFileInput for better filename management.
* Implemented `stick-to-target` prop in VOverlay for improved overlay positioning.
* Enhanced accessibility with `aria-controls` and `aria-expanded` in VSelects.
* Re-converted `VCalendar` based off of Vuetify 2 implementation.

**Expand** this section to see the detailed changelog for September 2025:

<details>

### :rocket: Features

* **filter:** keep dividers and subheaders ([#21822](https://github.com/vuetifyjs/vuetify/issues/21822)) ([18ac731](https://github.com/vuetifyjs/vuetify/commit/18ac7319a04df9645861977b723173c376655c2f)), closes [#7424](https://github.com/vuetifyjs/vuetify/issues/7424)
* **framework:** respect prefers-reduced-motion ([#21530](https://github.com/vuetifyjs/vuetify/issues/21530)) ([01c9e91](https://github.com/vuetifyjs/vuetify/commit/01c9e9115898118535865197660dd7399ae1626c)), closes [#19622](https://github.com/vuetifyjs/vuetify/issues/19622)
* **VBtn:** add `spaced` prop ([#21663](https://github.com/vuetifyjs/vuetify/issues/21663)) ([819605c](https://github.com/vuetifyjs/vuetify/commit/819605c6b4606bf45d33ea9c431c4e97a1bbd3b7)), closes [#21652](https://github.com/vuetifyjs/vuetify/issues/21652)
* **VCard:** allow semantic HTML tags for content parts ([#21943](https://github.com/vuetifyjs/vuetify/issues/21943)) ([5f8abb6](https://github.com/vuetifyjs/vuetify/commit/5f8abb6c5cece7fea660a7f4811e3c0108a4f402))
* **VColorPicker:** add `hide-eye-dropper` prop ([be452a5](https://github.com/vuetifyjs/vuetify/commit/be452a547f7efeb773fa8173695c6463137281a0)), closes [#19154](https://github.com/vuetifyjs/vuetify/issues/19154) [#19150](https://github.com/vuetifyjs/vuetify/issues/19150)
* **VColorPicker:** customizable eyeDropper icon ([#21656](https://github.com/vuetifyjs/vuetify/issues/21656)) ([71377a6](https://github.com/vuetifyjs/vuetify/commit/71377a69079ccdb258ead9dcee2bcd355d6ce6d3)), closes [#21406](https://github.com/vuetifyjs/vuetify/issues/21406)
* **VDataIterator:** add filtered items count to slot data ([#18641](https://github.com/vuetifyjs/vuetify/issues/18641)) ([7d51302](https://github.com/vuetifyjs/vuetify/commit/7d51302c8e609b78854934586dafef41ba188428))
* **VDataTable:** customizable expand/collapse icons ([#21698](https://github.com/vuetifyjs/vuetify/issues/21698)) ([1636f63](https://github.com/vuetifyjs/vuetify/commit/1636f632027255bdbc33a989ce667f9c9b352793))
* **VDataTable:** re-introduce `group-summary` slot ([#21802](https://github.com/vuetifyjs/vuetify/issues/21802)) ([a19cd87](https://github.com/vuetifyjs/vuetify/commit/a19cd8778ac21e9c050649d570e726ac11fa0008)), closes [#21800](https://github.com/vuetifyjs/vuetify/issues/21800)
* **VDatePicker:** re-introduce `first-day-of-year` prop ([#21760](https://github.com/vuetifyjs/vuetify/issues/21760)) ([af74f62](https://github.com/vuetifyjs/vuetify/commit/af74f62a1d57a63bcad835a4a2aded2ff03b419c)), closes [#20270](https://github.com/vuetifyjs/vuetify/issues/20270)
* **VFileInput:** add `truncate-length` prop ([#17972](https://github.com/vuetifyjs/vuetify/issues/17972)) ([28ef26c](https://github.com/vuetifyjs/vuetify/commit/28ef26c59b5e1991c469adbd567f305d88bac904)), closes [#17635](https://github.com/vuetifyjs/vuetify/issues/17635)
* **VFileUpload, VFileInput:** add `filter-by-type` prop ([#21576](https://github.com/vuetifyjs/vuetify/issues/21576)) ([1b78b06](https://github.com/vuetifyjs/vuetify/commit/1b78b06a40470186c83c88f95ec00ba71d36171d)), closes [#21150](https://github.com/vuetifyjs/vuetify/issues/21150)
* **VOverlay:** add `stick-to-target` prop ([#21704](https://github.com/vuetifyjs/vuetify/issues/21704)) ([8552779](https://github.com/vuetifyjs/vuetify/commit/855277993131333d57359dadbf1511532a98cc68)), closes [#19856](https://github.com/vuetifyjs/vuetify/issues/19856) [#19732](https://github.com/vuetifyjs/vuetify/issues/19732) [#17125](https://github.com/vuetifyjs/vuetify/issues/17125)
* **VProgressLinear:** ability to separate chunks ([#21744](https://github.com/vuetifyjs/vuetify/issues/21744)) ([4c66aa0](https://github.com/vuetifyjs/vuetify/commit/4c66aa0bda8763d31a5d61a1eff77e873cd4b4c1))
* **VTextField, VTextarea:** add `autocomplete` prop ([#21359](https://github.com/vuetifyjs/vuetify/issues/21359)) ([d94c003](https://github.com/vuetifyjs/vuetify/commit/d94c00309e6e744e267275cc179bbdfc61fdd848)), closes [#21353](https://github.com/vuetifyjs/vuetify/issues/21353)
* **VTimePicker:** add `period` prop ([#21823](https://github.com/vuetifyjs/vuetify/issues/21823)) ([8df7685](https://github.com/vuetifyjs/vuetify/commit/8df76851aff28dcfc8b73eee18d5613557aafce8)), closes [#15405](https://github.com/vuetifyjs/vuetify/issues/15405)
* **VTreeview:** add `header` slot ([fc86d05](https://github.com/vuetifyjs/vuetify/commit/fc86d05d0b72fb27ebc6bd2017d8684a3aa148a9))
* **VTreeview:** add `toggle` slot ([#21018](https://github.com/vuetifyjs/vuetify/issues/21018)) ([4ec13f2](https://github.com/vuetifyjs/vuetify/commit/4ec13f2841839d482ee38c9e7f0d72dc006d4090)), closes [#20307](https://github.com/vuetifyjs/vuetify/issues/20307)
* **VWindow, VCarousel:** add `crossfade` and `transition-duration` ([#21850](https://github.com/vuetifyjs/vuetify/issues/21850)) ([15a5c96](https://github.com/vuetifyjs/vuetify/commit/15a5c96933db148d568a88855d6ba3df53815001))

### :wrench: Bug Fixes

* **framework:** don't use multi-line :not() ([a15edec](https://github.com/vuetifyjs/vuetify/commit/a15edecc8313d13158d62776d4532eb9cc2e583a)), closes [#21995](https://github.com/vuetifyjs/vuetify/issues/21995)
* **goto:** always check for window.matchMedia support ([7d11a39](https://github.com/vuetifyjs/vuetify/commit/7d11a39d16262c867bcd1d760dee05758b95a398)), closes [#22059](https://github.com/vuetifyjs/vuetify/issues/22059)
* **group:** support `null` values ([#21743](https://github.com/vuetifyjs/vuetify/issues/21743)) ([facd4af](https://github.com/vuetifyjs/vuetify/commit/facd4af2e90a80c80c512b8a2df46cd6d48be5e2)), closes [#20550](https://github.com/vuetifyjs/vuetify/issues/20550)
* **nested:** detect and warn about multiple `null` values ([#21940](https://github.com/vuetifyjs/vuetify/issues/21940)) ([0960aa6](https://github.com/vuetifyjs/vuetify/commit/0960aa607835c63950976c570b880feb3f3ae358)), closes [#21815](https://github.com/vuetifyjs/vuetify/issues/21815)
* **rounded:** prioritize `tile` prop (like in v2) ([6b13382](https://github.com/vuetifyjs/vuetify/commit/6b13382f7784dfa47b0def7b7a80d184063bf392)), closes [#21844](https://github.com/vuetifyjs/vuetify/issues/21844)
* **selects:** open menu when items is mutated not just replaced ([#22067](https://github.com/vuetifyjs/vuetify/issues/22067)) ([a3f8b17](https://github.com/vuetifyjs/vuetify/commit/a3f8b17e66c1e12a14c80376b0ad7ad7c42cd4cd)), closes [#22066](https://github.com/vuetifyjs/vuetify/issues/22066)
* **v-touch:** set event handlers on root components ([#21997](https://github.com/vuetifyjs/vuetify/issues/21997)) ([1da3451](https://github.com/vuetifyjs/vuetify/commit/1da3451724ca97de6a95082c0a39736ef89a4906)), closes [#21768](https://github.com/vuetifyjs/vuetify/issues/21768)
* **VAlert:** use outline instead of background in forced-colors mode ([#21946](https://github.com/vuetifyjs/vuetify/issues/21946)) ([7560323](https://github.com/vuetifyjs/vuetify/commit/7560323d9d33a9d71d2975ab25537cc7bfe493ec))
* **VAutocomplete:** restore placeholder on blur ([#22114](https://github.com/vuetifyjs/vuetify/issues/22114)) ([d0ebeec](https://github.com/vuetifyjs/vuetify/commit/d0ebeec88485e3579967e073b0f17136cfd84eac)), closes [#21762](https://github.com/vuetifyjs/vuetify/issues/21762)
* **VBtn, VChip:** correct link active state after navigation cancellation ([#21651](https://github.com/vuetifyjs/vuetify/issues/21651)) ([bce7046](https://github.com/vuetifyjs/vuetify/commit/bce70460ea7e7c9243c5bbe7e0c384202a2c402f)), closes [#21594](https://github.com/vuetifyjs/vuetify/issues/21594)
* **VBtn:** add aria-disabled and tabindex to disabled links ([#22082](https://github.com/vuetifyjs/vuetify/issues/22082)) ([6e92383](https://github.com/vuetifyjs/vuetify/commit/6e92383726ee33cbb20cfa1e8c44e7d6f089a7fa)), closes [#22061](https://github.com/vuetifyjs/vuetify/issues/22061)
* **VBtn:** don't set group state on link click ([e292171](https://github.com/vuetifyjs/vuetify/commit/e292171a593020b3eeb02cf8fa377cca8f48235a)), closes [#21594](https://github.com/vuetifyjs/vuetify/issues/21594)
* **VBtn:** set group state for non-router links ([6bb3fce](https://github.com/vuetifyjs/vuetify/commit/6bb3fce6a165da8cd895ceba66690af3ab7422ef)), closes [#22085](https://github.com/vuetifyjs/vuetify/issues/22085)
* **VCard:** render border in forced-colors mode ([#21968](https://github.com/vuetifyjs/vuetify/issues/21968)) ([b30d5c8](https://github.com/vuetifyjs/vuetify/commit/b30d5c851947cb214927b7e6bd9288de9d4b15fa))
* **VChip:** correct opacity for plain variant ([#22005](https://github.com/vuetifyjs/vuetify/issues/22005)) ([48d20f3](https://github.com/vuetifyjs/vuetify/commit/48d20f3095b3b103c791b759dbbf28a751b374f5))
* **VChip:** render border in forced-colors mode ([#21970](https://github.com/vuetifyjs/vuetify/issues/21970)) ([59aeadc](https://github.com/vuetifyjs/vuetify/commit/59aeadc4337bd3273eebb31cb220728cf0aadac3))
* **VChipGroup:** render selected in forced-colors mode ([#21973](https://github.com/vuetifyjs/vuetify/issues/21973)) ([997dd56](https://github.com/vuetifyjs/vuetify/commit/997dd5668fe71994e11b4a406ea472697591ac6a))
* **VCombobox:** filter matching items when opening first time ([#21901](https://github.com/vuetifyjs/vuetify/issues/21901)) ([eeb9d14](https://github.com/vuetifyjs/vuetify/commit/eeb9d145be9f8fb0984ab8a82fc0b561c530cb17)), closes [#21900](https://github.com/vuetifyjs/vuetify/issues/21900)
* **VCombobox:** unstable menu state while typing ([#22045](https://github.com/vuetifyjs/vuetify/issues/22045)) ([3983af9](https://github.com/vuetifyjs/vuetify/commit/3983af946d49e9eab6c523777510871aa0b5d563))
* **VDataTable:** allow filters on all columns ([#21876](https://github.com/vuetifyjs/vuetify/issues/21876)) ([af20234](https://github.com/vuetifyjs/vuetify/commit/af20234e3642ff0cff82f546390eca7412c594d0))
* **VDataTable:** correct alignment of checkboxes ([402257d](https://github.com/vuetifyjs/vuetify/commit/402257d8490a43bb888203ddbb57b82773ad3c0b))
* **VDataTable:** expand rows when items are plain array ([#22109](https://github.com/vuetifyjs/vuetify/issues/22109)) ([d8b5c4a](https://github.com/vuetifyjs/vuetify/commit/d8b5c4ad009cb27a0dcee6a0c0ee8d3a0a3dd939)), closes [#22080](https://github.com/vuetifyjs/vuetify/issues/22080)
* **VDataTable:** more flexible alignment with grouping ([#21862](https://github.com/vuetifyjs/vuetify/issues/21862)) ([6d802d3](https://github.com/vuetifyjs/vuetify/commit/6d802d3c8e87752f601414141ce0ee843592535f)), closes [#17863](https://github.com/vuetifyjs/vuetify/issues/17863)
* **VDataTable:** should allow expanding rows when `return-object` is true ([#21128](https://github.com/vuetifyjs/vuetify/issues/21128)) ([a586965](https://github.com/vuetifyjs/vuetify/commit/a586965cf351aa34e632fe753c43ffd6e9304e4d)), closes [#21096](https://github.com/vuetifyjs/vuetify/issues/21096)
* **VList, VTreeview:** avoid locked active state when navigating ([#21725](https://github.com/vuetifyjs/vuetify/issues/21725)) ([bdbe15a](https://github.com/vuetifyjs/vuetify/commit/bdbe15ae1a6882dbfa48f620752eba9f26578d3b))
* **VList:** outline and selection in forced-colors mode ([#21958](https://github.com/vuetifyjs/vuetify/issues/21958)) ([a8eac52](https://github.com/vuetifyjs/vuetify/commit/a8eac52195d894b5a6f3f3c1a93de4f59a2dba7a))
* **VList:** use proper accessibility attributes ([#21444](https://github.com/vuetifyjs/vuetify/issues/21444)) ([9b2541e](https://github.com/vuetifyjs/vuetify/commit/9b2541e1085dd69295a23fd501d44dc51730638e)), closes [#20978](https://github.com/vuetifyjs/vuetify/issues/20978)
* **VListGroup:** fit the navigation drawer rail ([2ebc7fa](https://github.com/vuetifyjs/vuetify/commit/2ebc7fa5b4b395337faadf4a8dfbf09edac6b247)), closes [#22047](https://github.com/vuetifyjs/vuetify/issues/22047)
* **VListItem:** fix `rounded` prop ([9ec5a0d](https://github.com/vuetifyjs/vuetify/commit/9ec5a0d624dceb659f746d11263bb53298f2bdc5)), closes [#22015](https://github.com/vuetifyjs/vuetify/issues/22015)
* **VMenu, VTooltip:** default to `stick-to-target` false ([263ca4b](https://github.com/vuetifyjs/vuetify/commit/263ca4b9eee3b1f4acc201d255a88ea1c2c222d4)), closes [#22055](https://github.com/vuetifyjs/vuetify/issues/22055)
* **VNumberInput:** accept external changes when focused ([#21827](https://github.com/vuetifyjs/vuetify/issues/21827)) ([d0340e7](https://github.com/vuetifyjs/vuetify/commit/d0340e7ea0925dc9995a299cd61b6b91de30e239)), closes [#21735](https://github.com/vuetifyjs/vuetify/issues/21735) [#21804](https://github.com/vuetifyjs/vuetify/issues/21804)
* **VNumberInput:** ignore custom `type` ([c535f1a](https://github.com/vuetifyjs/vuetify/commit/c535f1a17ba2fa15ae182dc0aeeef8df985b0d91)), closes [#22110](https://github.com/vuetifyjs/vuetify/issues/22110)
* **VOtpInput:** focus next field when correcting values ([#21781](https://github.com/vuetifyjs/vuetify/issues/21781)) ([fc91e6d](https://github.com/vuetifyjs/vuetify/commit/fc91e6d7ee632437fb376b8169a88c593e436716)), closes [#21680](https://github.com/vuetifyjs/vuetify/issues/21680)
* **VProgressLinear:** ensure visibility when using custom colors ([#21949](https://github.com/vuetifyjs/vuetify/issues/21949)) ([e3fdb53](https://github.com/vuetifyjs/vuetify/commit/e3fdb53a1fe5bb332ad981012cfdf8cab79faa1a))
* **VSelects:** add `aria-controls` and `aria-expanded` ([#22025](https://github.com/vuetifyjs/vuetify/issues/22025)) ([a5abe89](https://github.com/vuetifyjs/vuetify/commit/a5abe893d7d3c9f93d69f60ece5a93185f74bb9a)), closes [#22017](https://github.com/vuetifyjs/vuetify/issues/22017)
* **VSelects/VCombobox/VAutocomplete:** use rounding from Sass variable ([d3e56de](https://github.com/vuetifyjs/vuetify/commit/d3e56def269205bb84cd26a0c8c24e433045f71a)), closes [#21956](https://github.com/vuetifyjs/vuetify/issues/21956)
* **VSkeletonLoader:** no wrapper for content ([#21637](https://github.com/vuetifyjs/vuetify/issues/21637)) ([17ae110](https://github.com/vuetifyjs/vuetify/commit/17ae11093e0ff21a0d0d16aa4559bedf86615236)), closes [#21286](https://github.com/vuetifyjs/vuetify/issues/21286)
* **VSlideGroup:** correct hasNext after resize ([#21124](https://github.com/vuetifyjs/vuetify/issues/21124)) ([0633aef](https://github.com/vuetifyjs/vuetify/commit/0633aef52540f5e9853e25d0ef2ad94e134fe8b2)), closes [#21115](https://github.com/vuetifyjs/vuetify/issues/21115)
* **VSlider:** respect disabled and readonly from form ([0bbf362](https://github.com/vuetifyjs/vuetify/commit/0bbf3623ae0a66743ead2b23fb7a0dc197a035f2)), closes [#22054](https://github.com/vuetifyjs/vuetify/issues/22054)
* **VSnackbar:** render border in forced-colors mode ([#21977](https://github.com/vuetifyjs/vuetify/issues/21977)) ([a2249c2](https://github.com/vuetifyjs/vuetify/commit/a2249c24aaed5cce0cc926993829c405b5d11296))
* **VTimeline:** render lines in forced-colors mode ([#21974](https://github.com/vuetifyjs/vuetify/issues/21974)) ([dc7417c](https://github.com/vuetifyjs/vuetify/commit/dc7417c60c95b34b2f8375eb2269955d846427d9))
* **VTreeview:** indent lines should support RTL ([1733666](https://github.com/vuetifyjs/vuetify/commit/1733666d5364819b78605185c00deeeef3f2f2a4)), closes [#21952](https://github.com/vuetifyjs/vuetify/issues/21952)
* **VTreeview:** match type of update:opened with VList ([#22092](https://github.com/vuetifyjs/vuetify/issues/22092)) ([8924b4d](https://github.com/vuetifyjs/vuetify/commit/8924b4d4230cba102f3293fca0fa4c569909eb3c)), closes [#22091](https://github.com/vuetifyjs/vuetify/issues/22091)
* **VTreeview:** support prepend icon and avatar ([#21813](https://github.com/vuetifyjs/vuetify/issues/21813)) ([478230a](https://github.com/vuetifyjs/vuetify/commit/478230abcdc0fb156523cc9edd4d5f10eea3e069)), closes [#21812](https://github.com/vuetifyjs/vuetify/issues/21812)
* **VWindow:** override `transition-duration` to respect user preference ([27fe364](https://github.com/vuetifyjs/vuetify/commit/27fe36478ae161b7758a08c8dd4b70e7068a8f06))

### :test_tube: Labs

* **mask:** create useMask composable ([#21736](https://github.com/vuetifyjs/vuetify/issues/21736)) ([a687f7a](https://github.com/vuetifyjs/vuetify/commit/a687f7a38f4377421f47660564fe7f02d6e0231c))
* **VCalendar:** correct effective weekdays determination ([#22042](https://github.com/vuetifyjs/vuetify/issues/22042)) ([54e6674](https://github.com/vuetifyjs/vuetify/commit/54e667426d5ddefbab951d240511cfc74afa0233))
* **VCalendar:** directly port from v2 ([#21910](https://github.com/vuetifyjs/vuetify/issues/21910)) ([2e6f72b](https://github.com/vuetifyjs/vuetify/commit/2e6f72baf3a8337dee76e321ed5e18910159c5f6)), closes [#19065](https://github.com/vuetifyjs/vuetify/issues/19065) [#20098](https://github.com/vuetifyjs/vuetify/issues/20098) [#20947](https://github.com/vuetifyjs/vuetify/issues/20947) [#20970](https://github.com/vuetifyjs/vuetify/issues/20970) [#21379](https://github.com/vuetifyjs/vuetify/issues/21379) [#21783](https://github.com/vuetifyjs/vuetify/issues/21783) [#21964](https://github.com/vuetifyjs/vuetify/issues/21964) [#22016](https://github.com/vuetifyjs/vuetify/issues/22016) [#22018](https://github.com/vuetifyjs/vuetify/issues/22018)
* **VCalendar:** fix click:date event error ([97d3a3e](https://github.com/vuetifyjs/vuetify/commit/97d3a3eed1add2b3957bb65916ebf234e9bf8e67)), closes [#22079](https://github.com/vuetifyjs/vuetify/issues/22079)
* **VCalendar:** prevent month view event duplication ([977a7e2](https://github.com/vuetifyjs/vuetify/commit/977a7e2a2e400092723e44024c23a2f56947ac77)), closes [#22062](https://github.com/vuetifyjs/vuetify/issues/22062)
* **VCalendar:** translate eventMoreText ([e41e091](https://github.com/vuetifyjs/vuetify/commit/e41e091f10a13aa55b14b567272412391617ff1a)), closes [#22062](https://github.com/vuetifyjs/vuetify/issues/22062)
* **VCalendar:** use camelCase event names ([8b2fae3](https://github.com/vuetifyjs/vuetify/commit/8b2fae3428d2228660c8c8d80721da5bb9a9db6d)), closes [#22063](https://github.com/vuetifyjs/vuetify/issues/22063)
* **VDateInput:** pass-through picker slots ([#21975](https://github.com/vuetifyjs/vuetify/issues/21975)) ([d91dad0](https://github.com/vuetifyjs/vuetify/commit/d91dad08751717ca2097932774485a939e2d9ca7))
* **VMaskInput:** fix caret position while editing ([#21925](https://github.com/vuetifyjs/vuetify/issues/21925)) ([27dc68c](https://github.com/vuetifyjs/vuetify/commit/27dc68caec935395fdd0d713e106db06f7e00404)), closes [#21776](https://github.com/vuetifyjs/vuetify/issues/21776)
* **VPicker:** add `hide-title` prop ([#21657](https://github.com/vuetifyjs/vuetify/issues/21657)) ([8d7eac3](https://github.com/vuetifyjs/vuetify/commit/8d7eac3dcd80387e4d3118f1660d7fb25251f66a)), closes [#21545](https://github.com/vuetifyjs/vuetify/issues/21545)
* **VVideo:** avoid interaction conflicts with VOverlay ([10a1821](https://github.com/vuetifyjs/vuetify/commit/10a18215226793f2832a5b68ebec52241f8db2c7)), closes [#21962](https://github.com/vuetifyjs/vuetify/issues/21962)
* **VVideo:** background variant should fill the container ([b766424](https://github.com/vuetifyjs/vuetify/commit/b76642493c7144df3573e6bedf4a62c7ea5c94e7))

### :arrows_counterclockwise: Reverts

* Revert "fix(VSelect): use selected text instead of value (#21902)" ([95dea2c](https://github.com/vuetifyjs/vuetify/commit/95dea2c3934d58fbebb50cde6314f19e8305cb1d)), closes [#22006](https://github.com/vuetifyjs/vuetify/issues/22006)
* Revert "fix(VBtn, VChip): correct link active state after navigation cancellation (#21651)" ([ab28070](https://github.com/vuetifyjs/vuetify/commit/ab28070a432a15ab8ae0aeba8faa0ab0cb0b4d38)), closes [#22072](https://github.com/vuetifyjs/vuetify/issues/22072) [#22065](https://github.com/vuetifyjs/vuetify/issues/22065)
* Revert "fix(VCombobox): filter matching items when opening first time" ([44002f6](https://github.com/vuetifyjs/vuetify/commit/44002f65364c524953a955479cd5badb3d926cf9)), closes [#22077](https://github.com/vuetifyjs/vuetify/issues/22077)

</details>

## The Pieces Come Together{ .mt-4 }

This month has been busy. We shipped a complete Figma UI Kit update, built out critical composables for v0, hardened our build infrastructure, and continued the steady march of bug fixes and improvements across the framework. Each piece matters, but what matters more is how they fit together—designers working from the same components developers implement, composables that solve real auth and feature flag problems, tools that make sharing work easier.

October brings our v0 live coding webinar where I'll build something real and show you what these composables actually look like in practice. We'll keep stabilizing Labs components and working through the community roadmap. As always, thanks for the bug reports, PRs, and Discord help. See you next month.

---

*The Vuetify Team*
