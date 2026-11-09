<template>
  <v-card>
    <v-layout :style="mode === 'single' ? 'background-color: rgb(var(--v-theme-primary), .12)' : undefined" height="650">
      <v-navigation-drawer
        :color="mode === 'single' ? 'transparent' : undefined"
        :floating="mode === 'single'"
        :rail="mode === 'multi' || !expanded"
        rail-width="96"
        width="220"
        permanent
      >
        <div class="d-flex flex-column align-start ga-3 pt-3 px-5 mb-10">
          <v-btn
            v-if="mode === 'single'"
            :aria-expanded="String(expanded)"
            :aria-label="expanded ? 'Collapse navigation' : 'Expand navigation'"
            :icon="expanded ? 'mdi-menu-open' : 'mdi-menu'"
            class="ms-1"
            variant="text"
            @click="expanded = !expanded"
          ></v-btn>

          <v-btn
            :aria-label="mode === 'single' && expanded ? undefined : fab.text"
            color="primary"
            height="56"
            min-width="max-content"
            rounded="lg"
          >
            <v-icon :icon="fab.icon" size="24"></v-icon>
            <v-expand-x-transition>
              <span v-if="mode === 'single' && expanded"><span class="ms-3">{{ fab.text }}</span></span>
            </v-expand-x-transition>
          </v-btn>
        </div>

        <v-navigation-btn
          v-for="item in sections"
          :key="item.value"
          :active="section === item.value"
          :active-icon="item.activeIcon"
          :badge="item.badge"
          :icon="item.icon"
          :text="item.text"
          @click="open(item)"
          @mouseenter="peek(item)"
          @mouseleave="leave"
        ></v-navigation-btn>

        <template v-if="mode === 'multi'" v-slot:append>
          <div class="py-4">
            <v-navigation-btn
              :active="section === 'settings'"
              active-icon="mdi-cog"
              icon="mdi-cog-outline"
              labels="none"
              text="Settings"
              @click="open({ value: 'settings', text: 'Settings' })"
            ></v-navigation-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-navigation-drawer
        v-if="mode === 'multi'"
        :model-value="!!current.items"
        :permanent="!floating"
        :scrim="false"
        :temporary="floating"
        width="240"
        disable-resize-watcher
        @update:model-value="preview = null"
      >
        <div class="h-100" @mouseenter="stay" @mouseleave="leave">
          <v-fade-transition mode="out-in">
            <v-list
              v-if="current.items"
              :key="current.value"
              v-model:opened="opened"
              :selected="[page]"
              class="pt-6"
              density="compact"
              nav
              @update:selected="select($event[0])"
            >
              <template v-for="entry in current.items" :key="entry.title ?? entry">
                <v-list-group v-if="entry.children" :value="`${entry.title} group`">
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :title="entry.title"></v-list-item>
                  </template>

                  <v-list-item
                    v-for="child in entry.children"
                    :key="child"
                    :title="child"
                    :value="child"
                  ></v-list-item>
                </v-list-group>

                <v-list-item v-else :title="entry" :value="entry"></v-list-item>
              </template>
            </v-list>
          </v-fade-transition>
        </div>
      </v-navigation-drawer>

      <v-main class="d-flex">
        <div
          :class="mode === 'single' ? 'ma-4 ms-0 rounded-xl bg-surface' : 'bg-surface-light'"
          class="d-flex flex-column flex-grow-1 align-center justify-center ga-6 pa-4"
        >
          <v-item-group v-model="mode" class="d-flex flex-column ga-3" style="width: 280px" mandatory @update:model-value="reset">
            <v-item
              v-for="option in modes"
              :key="option.value"
              v-slot="{ isSelected, toggle }"
              :value="option.value"
            >
              <v-card
                :color="isSelected ? 'primary' : undefined"
                :text="option.text"
                :title="option.title"
                @click="toggle"
              ></v-card>
            </v-item>
          </v-item-group>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
  import { computed, shallowRef } from 'vue'

  const modes = [
    { value: 'single', title: 'Single rail', text: 'The menu button expands the rail into a drawer.' },
    { value: 'multi', title: 'Multi sidebar', text: 'Sections with pages open a second drawer.' },
  ]

  const apps = [
    { value: 'mail', text: 'Mail', icon: 'mdi-email-outline', activeIcon: 'mdi-email', badge: 3 },
    { value: 'chat', text: 'Chat', icon: 'mdi-message-outline', activeIcon: 'mdi-message', badge: true },
    { value: 'spaces', text: 'Spaces', icon: 'mdi-account-group-outline', activeIcon: 'mdi-account-group' },
    { value: 'meet', text: 'Meet', icon: 'mdi-video-outline', activeIcon: 'mdi-video' },
  ]

  const docs = [
    { value: 'home', text: 'Home', icon: 'mdi-home-outline', activeIcon: 'mdi-home' },
    { value: 'getting-started', text: 'Get started', icon: 'mdi-rocket-launch-outline', activeIcon: 'mdi-rocket-launch' },
    {
      value: 'foundations',
      text: 'Foundations',
      icon: 'mdi-layers-outline',
      activeIcon: 'mdi-layers',
      items: ['Accessibility', 'Application layout', 'Global configuration', 'Theme'],
    },
    {
      value: 'styles',
      text: 'Styles',
      icon: 'mdi-palette-outline',
      activeIcon: 'mdi-palette',
      items: ['CSS reset', 'Colors', { title: 'Utility classes', children: ['Display', 'Flex', 'Spacing'] }],
    },
    {
      value: 'components',
      text: 'Components',
      icon: 'mdi-view-grid-outline',
      activeIcon: 'mdi-view-grid',
      badge: true,
      items: [
        { title: 'Buttons', children: ['Buttons', 'Icon buttons', 'Floating action buttons'] },
        'Cards',
        'Chips',
        { title: 'Navigation', children: ['Bottom navigation', 'Navigation buttons', 'Navigation drawers', 'Tabs'] },
      ],
    },
    { value: 'blog', text: 'Blog', icon: 'mdi-post-outline', activeIcon: 'mdi-post', badge: 2 },
  ]

  const mode = shallowRef('single')
  const expanded = shallowRef(false)
  const section = shallowRef('mail')
  const page = shallowRef('Mail')
  const opened = shallowRef(['Buttons group'])

  const sections = computed(() => mode.value === 'single' ? apps : docs)
  const preview = shallowRef(null)
  const current = computed(() => sections.value.find(item => item.value === (preview.value ?? section.value)) ?? {})
  const floating = computed(() => !!preview.value && !docs.find(item => item.value === section.value)?.items)
  const fab = computed(() => mode.value === 'single'
    ? { icon: 'mdi-pencil', text: 'Compose' }
    : { icon: 'mdi-magnify', text: 'Search' })

  function reset () {
    if (mode.value === 'single') return open(apps[0])

    section.value = 'components'
    page.value = 'Buttons'
    opened.value = ['Buttons group']
  }

  function open (item) {
    section.value = item.value
    page.value = item.text
    preview.value = null
  }

  function select (value) {
    section.value = current.value.value
    page.value = value
    preview.value = null
  }

  let timeout = -1

  function peek (item) {
    if (mode.value !== 'multi') return

    clearTimeout(timeout)
    preview.value = item.items ? item.value : null
  }

  function stay () {
    clearTimeout(timeout)
  }

  function leave () {
    clearTimeout(timeout)
    timeout = setTimeout(() => preview.value = null, 200)
  }
</script>

<script>
  export default {
    data: () => ({
      modes: [
        { value: 'single', title: 'Single rail', text: 'The menu button expands the rail into a drawer.' },
        { value: 'multi', title: 'Multi sidebar', text: 'Sections with pages open a second drawer.' },
      ],
      apps: [
        { value: 'mail', text: 'Mail', icon: 'mdi-email-outline', activeIcon: 'mdi-email', badge: 3 },
        { value: 'chat', text: 'Chat', icon: 'mdi-message-outline', activeIcon: 'mdi-message', badge: true },
        { value: 'spaces', text: 'Spaces', icon: 'mdi-account-group-outline', activeIcon: 'mdi-account-group' },
        { value: 'meet', text: 'Meet', icon: 'mdi-video-outline', activeIcon: 'mdi-video' },
      ],
      docs: [
        { value: 'home', text: 'Home', icon: 'mdi-home-outline', activeIcon: 'mdi-home' },
        { value: 'getting-started', text: 'Get started', icon: 'mdi-rocket-launch-outline', activeIcon: 'mdi-rocket-launch' },
        {
          value: 'foundations',
          text: 'Foundations',
          icon: 'mdi-layers-outline',
          activeIcon: 'mdi-layers',
          items: ['Accessibility', 'Application layout', 'Global configuration', 'Theme'],
        },
        {
          value: 'styles',
          text: 'Styles',
          icon: 'mdi-palette-outline',
          activeIcon: 'mdi-palette',
          items: ['CSS reset', 'Colors', { title: 'Utility classes', children: ['Display', 'Flex', 'Spacing'] }],
        },
        {
          value: 'components',
          text: 'Components',
          icon: 'mdi-view-grid-outline',
          activeIcon: 'mdi-view-grid',
          badge: true,
          items: [
            { title: 'Buttons', children: ['Buttons', 'Icon buttons', 'Floating action buttons'] },
            'Cards',
            'Chips',
            { title: 'Navigation', children: ['Bottom navigation', 'Navigation buttons', 'Navigation drawers', 'Tabs'] },
          ],
        },
        { value: 'blog', text: 'Blog', icon: 'mdi-post-outline', activeIcon: 'mdi-post', badge: 2 },
      ],
      mode: 'single',
      expanded: false,
      section: 'mail',
      page: 'Mail',
      opened: ['Buttons group'],
      preview: null,
      timeout: -1,
    }),

    computed: {
      sections () {
        return this.mode === 'single' ? this.apps : this.docs
      },
      current () {
        return this.sections.find(item => item.value === (this.preview ?? this.section)) ?? {}
      },
      floating () {
        return !!this.preview && !this.docs.find(item => item.value === this.section)?.items
      },
      fab () {
        return this.mode === 'single'
          ? { icon: 'mdi-pencil', text: 'Compose' }
          : { icon: 'mdi-magnify', text: 'Search' }
      },
    },

    methods: {
      open (item) {
        this.section = item.value
        this.page = item.text
        this.preview = null
      },
      select (value) {
        this.section = this.current.value
        this.page = value
        this.preview = null
      },
      peek (item) {
        if (this.mode !== 'multi') return

        clearTimeout(this.timeout)
        this.preview = item.items ? item.value : null
      },
      stay () {
        clearTimeout(this.timeout)
      },
      leave () {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.preview = null, 200)
      },
      reset () {
        if (this.mode === 'single') return this.open(this.apps[0])

        this.section = 'components'
        this.page = 'Buttons'
        this.opened = ['Buttons group']
      },
    },
  }
</script>
