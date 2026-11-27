---
layout: blog
meta:
  title: Vuetify — State of the Union 2026
  description: Two years after the last State of the Union. Vuetify 4 and Vuetify0 1.0 shipped, the tooling learned to talk to AI agents, and here is where Vuetify goes next.
  keywords: vuetify, blog, news, updates, ecosystem, state of the union, Vuetify 4, Vuetify0, Vuetify MCP, long-term support, Vuetify One, roadmap
---

<script setup>
  import AboutTeamMember from '@/components/about/TeamMember.vue'

  const teams = useTeamMembersStore()
  const jacek = computed(() => teams.members.find(member => member.github === 'J-Sek'))
</script>

# State of the Union 2026

Two years ago I wrote the first State of the Union and promised it would be the first of many posts. This is the second one. A lot happened in between: a stall I had to own, a team rebuilt in the open, two major releases, and a new foundation under the whole framework.

![Hero image for State of the Union 2026](https://cdn.vuetifyjs.com/docs/images/blog/state-of-the-union-2026/state-of-the-union-2026-hero.png "State of the Union 2026 hero image"){ height=112 }

🖊️ John Leider • 📅 November 23rd, 2026

<PromotedEntry />

---

## Table of Contents

* [Introduction](#introduction)
* [Looking Back – The Journey So Far](#looking-back)
  * [Promises from 2024: kept and not kept](#promises)
* [Current State – Where We Are Now](#current-state)
  * [Growth](#growth)
  * [Ongoing Success](#ongoing-success)
  * [How Vuetify is funded](#funding)
  * [Roadmap Updates](#roadmap)
* [Looking Ahead – The Future](#looking-ahead)
* [Personal Reflections](#personal-reflections)
* [Conclusion](#conclusion)

---

## Introduction { #introduction }

Vuetify turns ten this year. What started in 2016 as a Material Design component library for Vue is now three things: a complete UI framework, a headless foundation called [Vuetify0](https://0.vuetifyjs.com/) that the framework itself is built on, and a set of tools that make both of them easy to adopt, upgrade, and use with AI agents.

The short version of the last two years: weekly downloads of `vuetify` more than doubled, [Vuetify 4](/blog/february-2026-update/) shipped on the date we announced, [Vuetify0 reached 1.0](/blog/announcing-vuetify0-v1/) on its published schedule, and Vuetify 3 has a long-term support date you can plan around. The honest version includes a funding problem that isn't solved and a community we had to rebuild after losing our Discord server. I'll cover both, because you deserve the whole picture.

## Looking Back – The Journey So Far { #looking-back }

![Timeline of Vuetify milestones from September 2024 to November 2026](https://cdn.vuetifyjs.com/docs/images/blog/state-of-the-union-2026/timeline.png "Vuetify milestones, September 2024 to November 2026")

### The reset

The 2024 State of the Union ended on a hopeful note. I had taken a full-time job and handed creative and engineering control to Kael. Six months later I wrote the [post-mortem](/blog/state-of-the-union-2024-post-mortem/) and admitted what happened: "it's not that kind of machine—it doesn't coast." The framework stalled, and that was on me.

So I changed how I build the team. A job listing drew over 130 applications, and instead of hiring one person, we brought on **seven new core team members** in focused roles: Nuxt, components, documentation, scaffolding, and tooling. Then in [July 2025](/blog/july-2025-update/) I created a new role, the **Framework Czar**, the lead maintainer of the core framework, and Jacek Czarniecki took it.

<AboutTeamMember v-if="jacek" v-bind="{ member: jacek }" class="mb-4" />

Having Jacek run the framework freed me to work on the bigger architectural questions, and it shows. That turned out to matter more than I expected, because when the money ran out, the two of us became the team that kept shipping. He wrote four of this year's monthly updates himself, and so far every 2026 minor on the roadmap has landed in its target quarter.

### Vuetify 3, finished properly

Vuetify 3 kept improving right up to its last minor:

* [**v3.8 (Andromeda)**](/blog/announcing-vuetify-3.8/) in April 2025 promoted [`v-number-input`](/components/number-inputs/) and [`v-snackbar-queue`](/components/snackbar-queue/) out of labs.
* [**v3.9 (Zealot)**](/getting-started/release-notes/?version=v3.9.0) in July 2025 promoted [`v-treeview`](/components/treeview/) and [`v-time-picker`](/components/time-pickers/).
* [**v3.10 (Argos)**](/getting-started/release-notes/?version=v3.10.0) in September 2025 added support for `prefers-reduced-motion`.
* [**v3.11 (Harbinger)**](/getting-started/release-notes/?version=v3.11.0) in November 2025 promoted [`v-calendar`](/components/calendars/) and [`v-hotkey`](/components/hotkeys/).
* [**v3.13**](/getting-started/release-notes/?version=v3.13.0) on July 27th, 2026 was the final v3 minor, and it started the [long-term support](/introduction/long-term-support/) window for the v3 line.

### Vuetify 4

[**v4.0 (Revisionist)**](/blog/february-2026-update/) shipped on February 23rd, 2026, the date we had announced. It moved all of Vuetify's styles into CSS cascade layers, so Vuetify no longer fights your CSS with `!important`, and it works alongside Tailwind and UnoCSS. Typography and elevation follow Material Design 3, the grid was overhauled, and the CSS reset got smaller.

We also wanted the upgrade to be boring. Every breaking change in v4 can be reverted with a drop-in snippet, so you can upgrade first and migrate visuals at your own pace. The [upgrade guide](/getting-started/upgrade-guide/), [vuetify-codemods](https://github.com/vuetifyjs/vuetify-codemods), the [ESLint plugin](https://github.com/vuetifyjs/eslint-plugin-vuetify), and new tools in Vuetify MCP all shipped to support it.

Then the minors came on schedule. The [2026 roadmap](/introduction/roadmap/) targeted one per quarter, and each landed inside its quarter:

* [**v4.1 (Ascendant)**](/getting-started/release-notes/?version=v4.1.0) in June promoted seven components from labs, including [`v-file-upload`](/components/file-upload/), [`v-date-input`](/components/date-inputs/), and [`v-color-input`](/components/color-inputs/).
* [**v4.2 (Crusader)**](/getting-started/release-notes/?version=v4.2.0) in September made `@vuetify/v0` Vuetify's first runtime dependency.
* [**v4.3 (Paladin)**](/blog/announcing-vuetify-4.3/) in October added right-click menus to [`v-menu`](/components/menus/), opt-in Material Design Expressive styles for 7 components, and steadier SSR layouts.

Since the last State of the Union we've published **118 stable releases** of `vuetify`. Patches now ship weekly.

### Vuetify0

Vuetify0 is where I've spent most of my time since handing the framework to Jacek. It's a headless meta-framework: the selection, registration, focus management, theming, and accessibility logic that Vuetify has relied on for a decade, extracted, hardened, and frozen under semver. In the [alpha post](/blog/announcing-vuetify0-alpha/) I put it simply: "You bring the styles. Vuetify0 brings everything else."

It went from a [pre-alpha in August 2025](/blog/august-2025-update/) to a public [alpha](/blog/announcing-vuetify0-alpha/) on April 7th, [beta](/blog/announcing-vuetify0-beta/) with an API freeze in June, a [release candidate](/blog/announcing-vuetify0-rc/) in July, and [1.0](/blog/announcing-vuetify0-v1/) on July 22nd, 2026. Every date on the road to 1.0 was published ahead of time, and every one was met. The freeze is enforced by CI, not by good intentions. Since 1.0 we've shipped [data tables and grids](https://github.com/vuetifyjs/0/releases/tag/v1.2.0), [Kanban, Menu, Tour, and a Virtualizer](/blog/announcing-vuetify0-v1-3/), and most recently a [TimePicker and calendar support](/blog/announcing-vuetify0-v1-4/) that handles non-Gregorian calendars.

The best proof that it works is that we build on it ourselves. As Jacek wrote in the [September update](/blog/september-2026-update/): "Vuetify0 is the first dependency Vuetify has ever had. … That's how much we trust it."

### The ecosystem

In 2024 I listed One, Bin, Play, Snips, and Issues. The toolbox is much bigger now:

* [**Vuetify MCP**](https://github.com/vuetifyjs/mcp) (public May 2025) gives AI assistants the real Vuetify API instead of guesses. It's hosted at `https://mcp.vuetifyjs.com/mcp`, free, and needs no account. Since [v0.12.0](/blog/september-2026-update/) it can plan a multi-step upgrade from Vuetify 2 all the way to 4 and hand your agent a rulebook to apply it.
* [**Vuetify CLI**](https://github.com/vuetifyjs/cli) (v1.0 on the same day as Vuetify 4) scaffolds new projects, including a Tailwind preset, and `vuetify add mcp` wires MCP into your editor.
* [**Nuxt module**](https://github.com/vuetifyjs/nuxt-module) was overhauled and is in release candidate.
* [**Vuetify Issues**](https://issues.vuetifyjs.com/) was rebuilt on Vuetify 3 in August 2025, as promised.
* [**Vuetify Link**](https://link.vuetifyjs.com/) and [**pkg-diff**](https://pkg-diff.vuetifyjs.com/) joined [Play](https://play.vuetifyjs.com/) and [Bin](https://bin.vuetifyjs.com/), and Vuetify0 has its own playground, [v0play](https://v0play.vuetifyjs.com/).
* A free [Material Design 3 Figma UI Kit](/blog/september-2025-update/), and Vuetify-made themes free for personal use.
* First styled design systems on Vuetify0: [Emerald](https://0.vuetifyjs.com/systems/emerald) and [Bulma](https://0.vuetifyjs.com/systems/bulma).

We also took the story on the road. I joined the live DejaVue panel at [VueConf Toronto 2024](https://castro.fm/episode/Sk1BNw), talked about [Vuetify MCP at Frontend Nation 2025](https://youtu.be/byDyxCbCk-k), joined GitHub's [Open Source Friday](https://www.youtube.com/watch?v=Q_Ef-JMdAG0) in March 2026, and presented Vuetify0 at several Vue.js Talks meetups, including ["Vuetify goes Headless"](https://luma.com/event/evt-PEyGhXazySEUo16). On the partner side, [Epicmax](https://epicmax.co/blog/epicmax-partners-with-vuetify) became an official Vuetify partner in October 2024, and [HeroDevs](/blog/vuetify-herodevs-partnership/) took on extended support for Vuetify 2 in March 2025.

### Promises from 2024: kept and not kept { #promises }

When you write a State of the Union, you're making promises in public. Here's how we did.

| What I said in 2024 | Status |
|---|---|
| Split the CSS utilities out of the core so Vuetify works with tools like Tailwind | **Kept.** Vuetify 4's CSS layers, the [Tailwind guide](/blog/building-with-vite-and-tailwindcss/), the [UnoCSS guide](/blog/building-with-nuxt-and-unocss/), and the CLI presets. |
| Move core styling from SASS variables to CSS variables | **Partly kept.** Fonts became CSS variables in v4.0.1 and the MD3 blueprint drives the Expressive styles, but Sass is still the main customization surface. |
| Rebuild Vuetify Issues | **Kept.** It went live in August 2025. |
| Hand the framework to Kael | **Reversed.** It stalled, I owned it in the [post-mortem](/blog/state-of-the-union-2024-post-mortem/), and we rebuilt the team. |
| Make sure we never hit a funding crisis like that again | **Not kept.** More on that [below](#funding). |
| "This is just the first of many blog posts to come" | **Kept.** There's been an update every month since April 2025. |

And one promise we made since: in May 2026 we said that by November 1st, 2026, labs would be drained, with every component either graduating or being retired. **We missed that.** v4.1 and v4.3 promoted ten components out of labs, but v4.3 also added new ones, and the roadmap still has a list of labs components targeted for Q4. I'd rather tell you that here than let it quietly disappear from the roadmap.

## Current State – Where We Are Now { #current-state }

### Growth 🚀 { #growth }

In the 2024 post I was excited that Vuetify 3 had passed Vuetify 2. Since then, usage has more than doubled.

![Monthly npm downloads of vuetify from January 2024 to October 2026](https://cdn.vuetifyjs.com/docs/images/blog/state-of-the-union-2026/downloads.png "Monthly npm downloads of vuetify")

* `vuetify` had **618,714** downloads in the week of November 15–21, 2024. In the same week this year, November 16–22, it had **1,396,782**.
* All of 2024 was **28.4 million** downloads, and 2025 was **34.1 million**. 2026 passed both with more than a month to go, at **45.2 million** through November 22nd.
* Since January 2024, **287 people** have committed to the framework, **1,261 pull requests** were merged, and the open issue backlog went from about **737** to **223**.

Here's the same chart I shared in 2024, two years later:

![Weekly downloads by Vuetify major version](https://cdn.vuetifyjs.com/docs/images/blog/state-of-the-union-2026/versions.png "Weekly downloads for Vuetify versions")

Vuetify 3 is still the most installed version, and Vuetify 4 has passed Vuetify 2 nine months after release. That spread is why so much of our work this year went into migration tooling. A lot of teams are still on 2 and 3, and we want every one of them to have a clear path forward.

### Ongoing Success 📈 { #ongoing-success }

For a business, the real question is simple: can we bet on this? Here's the answer in 2026.

* **Predictable support.** Vuetify 3 is in [long-term support](/introduction/long-term-support/) with critical bug and security fixes until **July 27th, 2027**. For teams still on Vuetify 2, which reached end of life on January 23rd, 2025, our [HeroDevs partnership](/blog/vuetify-herodevs-partnership/) provides extended security support.
* **Upgrades you don't have to dread.** Revertible breaking changes, codemods, ESLint rules, and an MCP upgrade engine that plans the trip from 2 to 4 one step at a time. The hosted server never sees your code. It gives your agent a plan and a rulebook, and the agent reports every change, marking what's safe to apply in bulk and what needs a human.
* **Accessibility and security.** Forced-colors support, `prefers-reduced-motion`, an [axe-core](https://github.com/dequelabs/axe-core) sweep across every Vuetify0 component, and a dedicated Vuetify0 security pass against prototype pollution and CSS injection. In August, GitHub named Vuetify among the [50 projects in Session 4 of its Secure Open Source Fund](https://github.blog/open-source/maintainers/what-50-open-source-projects-taught-us-about-security-in-the-ai-era/).
* **Transparency when things go wrong.** When our Discord account was taken over in June, we published a full [incident report](/about/incidents/2026-06-nyven-infostealer/). No package, source, release, CI pipeline, or user data was affected.
* **Real apps, already on 4.** Open source projects like [Mealie](https://github.com/mealie-recipes/mealie) and [Modoboa](https://github.com/modoboa/modoboa) already run on Vuetify 4.
* **Help when you need it.** [Direct support plans](/introduction/enterprise-support/) put the Vuetify team in a chat with your developers, [Epicmax](https://www.epicmax.co/?ref=vuetify) is our official consulting partner, and [Enterprise Sponsorship](/sponsor/) adds priority fixes, roadmap input, and office hours.

For developers, the story is just as practical. The [Vuetify MCP](https://github.com/vuetifyjs/mcp) keeps your AI assistant from answering with Vuetify 2 code, and `@vuetify/mcp` downloads in 2026 are already three times the 2025 total. The [Vuetify0 docs](https://0.vuetifyjs.com/) publish `llms.txt` and offer Ask AI on every page, and the Vuetify repo has an `AGENTS.md` to guide AI tools. "By hand or by AI agent, it should just work."

### How Vuetify is funded 💙 { #funding }

Vuetify is MIT licensed, and it always will be. Nothing is gated behind a paid tier. It's funded by the people and companies who build on it: [GitHub Sponsors](https://github.com/sponsors/johnleider), [Open Collective](https://opencollective.com/vuetify), [Vuetify One](/one/), direct support, enterprise sponsorships, the [Vuetify Store](https://store.vuetifyjs.com/), and partners like HeroDevs and Epicmax.

Here is the honest part. In the [post-mortem](/blog/state-of-the-union-2024-post-mortem/) I put $5,000 of my own money into Open Collective and wrote, "If 30 companies matched me, we'd fund Vuetify for years." They didn't. My $5,000, what was already in the fund, and what came in each month stretched the rebuilt team a little over a year, but we never landed the new sponsorship to replace it, and the fund ran out. Since April the monthly updates have said that funds were exhausted, then running low, and in August we said the team had scaled down. Today most of that team contributes quietly, if at all, and the day-to-day work is mostly Jacek and me. In 2024 I wrote that we would never hit a crisis like that again. I was wrong, and the fix is still in progress.

What changed is how we're responding. Vuetify One now has Solo and Team plans, Open Collective backers get One benefits automatically, and Snips is now included with Vuetify One. We added an [Enterprise Sponsorship](/sponsor/) page for companies that run Vuetify in production, and we're moving away from one-off sales toward relationships that last.

A big thank you to the companies that back Vuetify, including [DeepCloud](https://www.deepcloud.swiss/), [Abacus](https://www.abacus.ch/), [hoop.swiss](https://www.hoop.swiss/), and the [City of Munich](https://www.muenchen.de/). Everyone else is on our [sponsors page](/introduction/sponsors-and-backers/). You're the reason we get to keep doing this.

### Roadmap Updates 🛣️ { #roadmap }

Here's what's on deck for the rest of 2026. Everything else lives on the [Vuetify Roadmap](/introduction/roadmap/) and the [Vuetify0 roadmap](https://0.vuetifyjs.com/roadmap).

* [**v4.4 (Arbiter)**](https://github.com/vuetifyjs/vuetify/milestone/95), with a deadline of **December 8th**. It includes the long-standing `v-drag` directive.
* [**Vuetify0 v1.5**](https://github.com/vuetifyjs/0/milestone/10), due **December 15th**, with a headless DatePicker and DateRangePicker.
* [**Vuetify 5 (Tardis)**](https://github.com/vuetifyjs/vuetify/milestone/87) is in planning and has no date yet.

## Looking Ahead – The Future { #looking-ahead }

**One engine, many looks.** Vuetify 5 is where the component library and the headless meta-framework become one unified architecture. We're already moving there one system at a time. RTL, locale, observers, and display have moved onto Vuetify0, and the theme and date systems are next. If you've used Vuetify at any point in the last decade, you've relied on this logic without seeing it. Soon you'll be able to build on it directly, with whatever look you want.

**Design systems.** Material Design is becoming one look among many. Emerald and Bulma are out, Onyx is coming, and we're planning recreations of Bootstrap 6, Ant Design, HeroUI, and Material Design 1, an anniversary edition of the look Vuetify started with. No dates yet, but you can follow along on the [Vuetify0 roadmap](https://0.vuetifyjs.com/roadmap).

**Built for agents.** Vuetify0 is the first Vue framework designed from day one to be consumed by AI agents, and the rest of the ecosystem is following. The goal hasn't changed since the MCP launched: whether you write the code or your agent does, it should be correct the first time.

**A clock you can plan around.** Vuetify 3's long-term support ends on July 27th, 2027. If you're on 3, now is a good time to try the [upgrade guide](/getting-started/upgrade-guide/) or point the MCP at your project. If you're still on 2, the MCP can plan both hops.

**Community, rebuilt.** In June we lost our original Discord server to an account takeover, and it couldn't be restored. We started over. The new server is smaller, and that's okay. If you were part of the old one, please [come back](https://community.vuetifyjs.com). We want to hear what you're building.

## Personal Reflections { #personal-reflections }

When I wrote the last State of the Union, I thought stepping back was the responsible thing to do. It turned out to be the moment I learned what Vuetify needs from me. It doesn't need me in every pull request. It needs a clear direction, a team with real ownership, and someone willing to say out loud when things aren't working.

Going back to the four lessons from 2024, here's how they held up:

1. **Sustainability is key.** Still true, and still the hardest one. Passion alone isn't enough, and neither is a single revenue stream. We're building several, and we're doing it without gating features.
2. **Community is your foundation.** Every monthly update this year ends by naming the people who sent a PR. When the Discord was taken, the community is what made starting over worth it.
3. **Set clear goals.** Published dates changed everything. Vuetify 4 and every step on the road to Vuetify0 1.0 landed when we said they would, and the one big goal we missed, draining labs, I've told you about plainly.
4. **Developer retention is a challenge.** We solved part of it by giving people focused roles they could own, and by putting a Framework Czar in charge of the day-to-day.

I'd add a fifth: **build on precedent.** Vuetify0 exists because a decade of solving the same problems taught us which answers last. That's the foundation I want the next ten years built on.

## Conclusion { #conclusion }

Thank you to Jacek, who has carried this framework with me through the lean months, to everyone who joined the [core team](/about/meet-the-team/) during the rebuild, to Kael, who built so much of the technology under Vuetify, to every contributor who sent a pull request, and to every sponsor, backer, and One subscriber who kept the lights on. Vuetify is ten years old because of you.

If Vuetify helps you or your business succeed, here's how to help it keep going:

* **Sponsor.** Point your company at [Open Collective](https://opencollective.com/vuetify), [GitHub Sponsors](https://github.com/sponsors/johnleider), or [Enterprise Sponsorship](/sponsor/).
* **Subscribe to [Vuetify One](/one/).** You get the premium tools, and the framework gets funded.
* **Contribute.** Start with the [contributing guide](/getting-started/contributing/). We name every contributor, every month.
* **Come back to [Discord](https://community.vuetifyjs.com).** Bring a question, an answer, or something you built.
* **Tell us your story.** If your team is adopting Vuetify or Vuetify0, [reach out](mailto:john@vuetifyjs.com). I want to hear it.

Two years ago I said we were just getting started. That's still true. See you in the next one. 🔥

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://community.vuetifyjs.com), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements.*
