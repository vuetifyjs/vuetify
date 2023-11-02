<template>
  <div class="border rounded my-6">
    <v-autocomplete
      ref="autocomplete"
      v-model="model"
      v-model:search="search"
      :items="releases"
      :menu-props="menuProps"
      :placeholder="tag"
      hide-details
      hide-no-data
      density="comfortable"
      item-title="name"
      label="Select Release Version"
      persistent-placeholder
      prepend-inner-icon="mdi-text-box-search-outline"
      return-object
    >
      <template #selection>
        <div class="me-1">{{ model?.tag_name }}</div>
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
      variant="flat"
      rounded="t-0 b"
    >
      <div
        v-if="model?.author"
        class="d-flex justify-space-between"
      >
        <v-list-item v-if="publishedOn" lines="two">
          <v-list-item-title class="d-flex flex-column justify-center">
            <div class="d-flex align-center">
              <i18n-t keypath="published" scope="global">
                <template #date>
                  <v-chip
                    :text="publishedOn"
                    class="ms-2 text-caption"
                    density="comfortable"
                    label
                    variant="flat"
                  />
                </template>
              </i18n-t>
            </div>

            <div v-if="model?.reactions?.total_count" class="mt-2">
              <v-chip
                v-if="isAuthenticated"
                class="px-1 mx-1"
                size="small"
                variant="outlined"
                @click="null"
              >
                <v-icon icon="mdi-emoticon-outline" />
                <v-menu activator="parent" location="bottom" offset="8, 8">
                  <v-sheet class="d-flex">
                    <v-btn
                      v-for="(value, key) in reactions"
                      :key="key"
                      class="rounded ma-1"
                      icon
                      size="x-small"
                      :text="value"
                      variant="flat"
                      @click="react(key)"
                    />
                  </v-sheet>
                </v-menu>
              </v-chip>

              <template v-for="(value, key) in reactions" :key="key">
                <template v-if="model?.reactions?.[key]">
                  <v-chip
                    class="mx-1 px-2"
                    size="small"
                    :style="!isAuthenticated ? 'pointer-events: none' : ''"
                    variant="outlined"
                    @click="react(key)"
                  >
                    {{ value }}
                    <span class="text-caption pl-1">{{ model.reactions[key] }}</span>
                  </v-chip>
                </template>
              </template>
            </div>
          </v-list-item-title>
        </v-list-item>

        <div class="pe-3 d-flex align-center flex-1-0-auto">
          <app-tooltip-btn
            v-for="(tooltip, i) in tooltips"
            :key="i"
            :href="tooltip.href"
            :icon="tooltip.icon"
            :path="tooltip.path"
            :color="tooltip.color ?? 'text-high-emphasis'"
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
          <app-markdown
            :content="model.body"
            class="releases"
          />
        </div>
      </template>

      <v-skeleton-loader
        v-if="!model && store.isLoading"
        type="heading, article, heading, subtitle, text, sentences"
        class="pa-4"
      />
    </v-card>
  </div>
</template>

<script setup lang="ts">
  // Composables
  import { useAuth0 } from '@/plugins/auth'
  import { useDate } from 'vuetify/labs/date'
  import { useI18n } from 'vue-i18n'
  import { useDisplay, version } from 'vuetify'
  import { useRoute, useRouter } from 'vue-router'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { Release, useReleasesStore } from '@/store/releases'

  // Utilities
  import { computed, onBeforeMount, ref, shallowRef, watch } from 'vue'
  import { wait } from '@/util/helpers'

  const reactions = {
    '+1': '👍',
    hooray: '🎉',
    rocket: '🚀',
    laugh: '😂',
    heart: '❤️',
    eyes: '👀',
  }

  const { isAuthenticated } = useAuth0() as any
  const { smAndUp } = useDisplay()
  const { t } = useI18n()
  const authStore = useAuthStore()
  const date = useDate()
  const route = useRoute()
  const router = useRouter()
  const store = useReleasesStore()

  const autocomplete = ref()
  const clicked = ref('copy-link')
  const model = ref<Release>()
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

    return date.format(new Date(model.value.published_at), smAndUp.value ? 'fullDateWithWeekday' : 'normalDateWithWeekday')
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

  async function react (value: string) {
    await authStore.setReaction(value, model?.value?.id)
    await store.find(search.value)
  }
</script>

<style lang="sass">
  .notes-autocomplete
    > .v-list.v-select-list
      background: transparent !important
  .releases
    img
      max-width: 100%
</style>
