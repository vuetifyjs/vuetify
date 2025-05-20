<template>
  <div class="border rounded my-6">
    <v-autocomplete
      ref="autocomplete"
      v-model="model"
      v-model:search="search"
      :items="releases"
      :menu-props="menuProps"
      :placeholder="tag"
      density="comfortable"
      item-title="name"
      label="Select Release Version"
      prepend-inner-icon="mdi-text-box-search-outline"
      rounded="b-0"
      variant="solo-filled"
      hide-details
      hide-no-data
      persistent-placeholder
      return-object
    >
      <template #selection>
        <div class="d-flex align-center">
          <div class="me-1">{{ model?.tag_name }}</div>

          <template v-if="model?.reactions?.total_count">
            &mdash;
          </template>

          <template v-for="(value, key) in reactions" :key="key">
            <template v-if="model?.reactions?.[key]">
              <span class="d-inline-flex align-center text-body-2 me-2">
                {{ value }}

                <span class="text-caption">{{ model.reactions[key] }}</span>
              </span>
            </template>
          </template>
        </div>
      </template>

      <template #item="{ item, props: itemProps }">
        <v-list-item
          v-if="item?.title"
          v-bind="itemProps"
        >
          <template v-if="item.raw?.reactions" #append>
            {{ genEmoji(item.raw.reactions.total_count) }}
          </template>
        </v-list-item>

        <template v-else>
          <v-divider />

          <v-list-item
            :title="t('load-more')"
            class="mb-n2"
            @click="store.fetch"
          />
        </template>
      </template>

      <template #append-inner>
        <v-progress-circular
          v-if="store.isLoading"
          indeterminate="disable-shrink"
          size="18"
          width="2"
        />
      </template>
    </v-autocomplete>

    <v-card
      rounded="t-0 b"
      variant="flat"
    >
      <div
        v-if="model?.author"
        class="d-flex align-center justify-space-between pa-4 bg-surface-light border-y"
      >
        <div class="d-flex align-center text-caption">
          <i18n-t v-if="publishedOn" keypath="published" scope="global">
            <template #date>
              <border-chip
                :text="publishedOn"
                class="ms-1"
                prepend-icon="mdi-calendar"
              />
            </template>
          </i18n-t>
        </div>

        <div class="d-flex align-center">
          <AppTooltipBtn
            v-for="(tooltip, i) in tooltips"
            :key="i"
            :color="tooltip.color ?? 'text-high-emphasis'"
            :href="tooltip.href"
            :icon="tooltip.icon"
            :path="tooltip.path"
            :target="tooltip.href ? '_blank' : undefined"
            class="text-white ms-2"
            density="comfortable"
            size="small"
            variant="flat"
            @click="tooltip?.onClick?.()"
          />
        </div>
      </div>

      <template v-if="model?.body">
        <v-divider />

        <div class="px-4 pt-4">
          <AppMarkdown
            :content="model.body"
            class="releases"
          />
        </div>

        <template v-if="model.zipball_url && model.tarball_url">
          <v-divider class="my-2" />

          <div class="px-4 pb-4">
            <h2 class="text-h6 font-weight-bold">Assets</h2>

            <AppSheet>
              <v-list-item
                :href="model.zipball_url"
                append-icon="mdi-download-box-outline"
                prepend-icon="mdi-folder-zip-outline"
                target="_blank"
                title="Source code (zip)"
                nav
                slim
              />

              <v-divider />

              <v-list-item
                :href="model.tarball_url"
                append-icon="mdi-download-box-outline"
                prepend-icon="mdi-folder-zip-outline"
                target="_blank"
                title="Source code (tar.gz)"
                nav
                slim
              />
            </AppSheet>
          </div>
        </template>
      </template>

      <v-skeleton-loader
        v-if="!model && store.isLoading"
        class="pa-4"
        type="heading, article, heading, subtitle, text, sentences"
      />
    </v-card>
  </div>
</template>

<script setup lang="ts">
  // Composables
  import { version } from 'vuetify'

  // Types
  import type { Release } from '@/stores/releases'

  const reactions = {
    '+1': '👍',
    hooray: '🎉',
    rocket: '🚀',
    laugh: '😂',
    heart: '❤️',
    eyes: '👀',
  }

  const { smAndUp } = useDisplay()
  const { t } = useI18n()
  const adapter = useDate()
  const route = useRoute()
  const router = useRouter()
  const store = useReleasesStore()

  const autocomplete = shallowRef()
  const clicked = shallowRef('copy-link')
  const model = shallowRef<Release>()
  const search = shallowRef('')
  let timeout = -1 as any

  const menuProps = computed(() => {
    return {
      contentClass: 'notes-autocomplete rounded-b-lg',
      maxHeight: 300,
    }
  })

  const tooltips = computed(() => {
    return [
      {
        color: '#3b5998',
        icon: clicked.value === 'copied' ? 'mdi-check' : 'mdi-share-variant-outline',
        async onClick () {
          navigator.clipboard.writeText(`${window.location.origin}/getting-started/release-notes/?version=${model.value!.tag_name}`)

          clicked.value = 'copied'

          await wait(1500)

          clicked.value = 'copy-link'
        },
        path: clicked.value,
      },
      {
        color: '#738ADB',
        icon: 'mdi-discord',
        href: 'https://discord.gg/QHWSAbA',
        path: 'discuss-on-discord',
      },
      {
        color: '#212121',
        href: model.value!.html_url,
        icon: 'mdi-github',
        path: 'open-github-release',
      },
    ]
  })

  const releases = computed(() => {
    const releases = store.releases.slice()

    releases.push(null as any)

    return releases
  })

  const tag = computed(() => (route.query.version ?? `v${version}`) as string)

  const publishedOn = computed(() => {
    if (!model.value?.published_at) return undefined

    return adapter.format(new Date(model.value.published_at), smAndUp.value ? 'fullDateWithWeekday' : 'normalDateWithWeekday')
  })

  onBeforeMount(async () => {
    await store.fetch()

    model.value = await store.find(tag.value)
  })

  watch(model, val => {
    const version = val?.tag_name ?? tag.value

    if (!version) return

    router.push({ query: { version } })

    autocomplete.value?.blur()
  })

  watch(search, onSearch)

  function genEmoji (count: number) {
    switch (true) {
      case (count >= 100): return '💫'
      case (count > 50): return '🔥'
      case (count > 30): return '🌶️'
      default: return undefined
    }
  }

  async function onSearch (val: string) {
    clearTimeout(timeout)

    timeout = setTimeout(() => store.find(val), 500)
  }

  // function timeAgo (string: string): string {
  //   const date = adapter.toJsDate(adapter.date(string))
  //   const now = new Date()
  //   const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  //   let interval = seconds / 31536000
  //   if (interval > 1) return `${Math.floor(interval)} years ago`

  //   interval = seconds / 2592000
  //   if (interval > 1) return `${Math.floor(interval)} months ago`

  //   interval = seconds / 86400
  //   if (interval > 1) return `${Math.floor(interval)} days ago`

  //   interval = seconds / 3600
  //   if (interval > 1) return `${Math.floor(interval)} hours ago`

  //   interval = seconds / 60
  //   if (interval > 1) return `${Math.floor(interval)} minutes ago`

  //   return `${Math.floor(seconds)} seconds ago`
  // }
</script>

<style lang="sass">
  .notes-autocomplete
    > .v-list.v-select-list
      background: transparent !important
  .releases
    img
      max-width: 100%
</style>
