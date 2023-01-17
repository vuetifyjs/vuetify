<template>
  <app-menu
    v-model="menu"
    :close-on-content-click="false"
    :open-on-hover="false"
    :width="width"
  >
    <template #activator="{ props }">
      <app-tooltip-btn
        path="notifications"
        v-bind="props"
      >
        <template #icon>
          <v-badge
            :model-value="unread.length > 0"
            color="#ED561B"
            dot
            location="top end"
          >
            <v-icon
              :icon="`mdi-bell${unread.length === 0 ? '-outline' : '-ring-outline'}`"
              class="mx-1"
              color="medium-emphasis"
            />
          </v-badge>
        </template>
      </app-tooltip-btn>
    </template>

    <v-toolbar
      class="ps-4 pe-5"
      color="surface"
      density="compact"
    >
      <v-btn
        :disabled="showArchived ? unread.length < 1 : read.length < 1"
        class="px-2 ms-n1"
        size="small"
        variant="text"
        @click="showArchived = !showArchived"
      >
        {{ showArchived ? t('unread', { number: unread.length }) : t('read', { number: read.length }) }}
      </v-btn>
    </v-toolbar>

    <v-divider />

    <v-responsive
      class="overflow-y-auto"
      max-height="340"
    >
      <div
        v-if="done"
        class="py-8 text-center text-subtitle-1"
      >
        <p>{{ t('done') }}</p>

        <v-icon
          color="grey-lighten-2"
          size="96"
          icon="mdi-vuetify"
        />
      </div>

      <template v-else>
        <v-list lines="three">
          <template
            v-for="(notification, i) in notifications"
            :key="notification.slug"
          >

            <v-divider
              v-if="i !== 0"
              class="my-1"
            />

            <v-list-item
              :ripple="false"
              class="py-2"
            >
              <v-list-item-title class="text-wrap text-h6 mb-1 text-truncate">
                <span>{{ notification.metadata.emoji }}</span>

                <span class="ps-3"> {{ notification.title }}</span>
              </v-list-item-title>

              <div class="text-caption text-medium-emphasis ps-10">
                {{ notification.metadata.text }}

                <app-link :href="notification.metadata.action">
                  {{ notification.metadata.action_text }}
                </app-link>
              </div>

              <template #append>
                <v-btn
                  :ripple="false"
                  :icon="marked.icon"
                  class="ms-3"
                  color="medium-emphasis"
                  variant="text"
                  @click.stop.prevent="toggle(notification)"
                />
              </template>
            </v-list-item>
          </template>
        </v-list>
      </template>
    </v-responsive>
  </app-menu>
</template>

<script setup lang="ts">
  // Components
  import AppTooltipBtn from '@/components/app/TooltipBtn.vue'

  // Composables
  import { useCosmic } from '@/composables/cosmic'
  import { useDisplay } from 'vuetify'
  import { useI18n } from 'vue-i18n'
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed, onMounted, ref } from 'vue'

  // Types
  interface Notification {
    metadata: {
      action: string
      action_text: string
      emoji: string
      text: string
    }
    // eslint-disable-next-line camelcase
    created_at: string
    slug: string
    title: string
  }

  const { t } = useI18n()
  const { bucket } = useCosmic<Notification>()
  const { mobile } = useDisplay()
  const user = useUserStore()
  const menu = ref(false)
  const all = ref<Notification[]>([])
  const showArchived = ref(false)

  const unread = computed(() => all.value.filter(({ slug }) => !user.notifications.read.includes(slug)))
  const read = computed(() => all.value.filter(({ slug }) => user.notifications.read.includes(slug)))
  const notifications = computed(() => showArchived.value ? read.value : unread.value)
  const done = computed(() => {
    return (
      showArchived.value && read.value.length < 1
    ) || (
      !showArchived.value && unread.value.length < 1
    )
  })

  const marked = computed(() => {
    const path = showArchived.value ? 'unread' : 'read'
    const icon = showArchived.value ? 'mdi-email-mark-as-unread' : 'mdi-email-open'

    return { icon, path }
  })

  const width = computed(() => mobile.value ? 420 : 520)

  function toggle ({ slug }: Notification) {
    user.notifications.read = user.notifications.read.includes(slug)
      ? user.notifications.read.filter(n => n !== slug)
      : [...user.notifications.read, slug]
  }

  onMounted(async () => {
    if (all.value.length) return

    const { objects = [] } = (
      await bucket?.objects
        .find({ type: 'notifications' })
        .props('created_at,metadata,slug,title')
        .status('published')
        .sort('-created_at')
        .limit(5)
    ) || {}

    all.value = objects
  })
</script>
