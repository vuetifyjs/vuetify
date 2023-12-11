<template>
  <app-menu
    v-if="user.notifications.show"
    v-model="menu"
    :close-on-content-click="false"
    :open-on-hover="false"
    :width="width"
  >
    <template #activator="{ props }">
      <app-tooltip-btn v-bind="props">
        <template #icon>
          <v-badge
            :model-value="unread.length > 0"
            color="#ED561B"
            dot
            location="top end"
          >
            <v-icon
              :icon="icon"
              class="mx-1"
              color="medium-emphasis"
            />
          </v-badge>
        </template>
      </app-tooltip-btn>
    </template>

    <v-toolbar
      class="ps-4 pe-6"
      color="surface"
      density="compact"
    >
      <v-btn
        class="px-2 ms-n1 text-none font-weight-regular"
        size="small"
        variant="text"
        @click="showArchived = !showArchived"
      >
        {{ showArchived ? t('unread', { number: unread.length }) : t('read', { number: read.length }) }}
      </v-btn>
    </v-toolbar>

    <v-divider />

    <v-responsive
      max-height="340"
      min-height="204"
      style="overflow-y: scroll;"
    >
      <div
        v-if="done"
        class="py-8 text-center text-subtitle-1"
      >
        <p>{{ t('done') }}</p>

        <v-icon icon="$vuetify" size="96" color="#D7D7D7" />
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
              <template #prepend>
                <div class="pe-4 align-self-start">{{ notification.metadata.emoji }}</div>
              </template>

              <v-list-item-title class="text-wrap text-h6">
                <div class=" text-truncate">{{ notification.title }}</div>
              </v-list-item-title>

              <div class="text-caption mb-1 font-weight-bold text-medium-emphasis">{{ format(notification.created_at) }}</div>

              <div class="text-medium-emphasis text-caption">
                <app-markdown :content="notification.metadata.text" class="mb-n3" />

                <border-chip
                  :href="notification.metadata.action"
                  :text="notification.metadata.action_text"
                  append-icon="mdi-open-in-new"
                  @click="onClick(notification)"
                />
              </div>

              <template v-if="!showArchived" #append>
                <div class="ps-4">
                  <v-icon
                    color="medium-emphasis"
                    icon="mdi-check"
                    @click.stop.prevent="toggle(notification)"
                  />
                </div>
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
  import { useDate, useDisplay } from 'vuetify'
  import { useGtag } from 'vue-gtag-next'
  import { useI18n } from 'vue-i18n'

  // Stores
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
  const { event } = useGtag()
  const { bucket } = useCosmic()
  const { mobile } = useDisplay()
  const date = useDate()
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

  const icon = computed(() => {
    if (menu.value && unread.value.length > 0) return 'mdi-bell-ring'
    else if (menu.value) return 'mdi-bell'
    else if (unread.value.length > 0) return 'mdi-bell-ring-outline'
    else return 'mdi-bell-outline'
  })

  const width = computed(() => mobile.value ? 420 : 520)

  function format (str: string) {
    return date.format(new Date(str), 'fullDateWithWeekday')
  }
  function onClick (notification: Notification) {
    toggle(notification)
    menu.value = false
    event('click', {
      event_category: 'vuetify-notification',
      event_label: notification.slug,
      value: notification.metadata.action,
    })
  }
  function toggle ({ slug }: Notification) {
    user.notifications.read = user.notifications.read.includes(slug)
      ? user.notifications.read.filter(n => n !== slug)
      : [...user.notifications.read, slug]
  }

  onMounted(async () => {
    if (all.value.length) return

    const { objects = [] }: { objects: Notification[] } = (
      await bucket?.objects
        .find({ type: 'notifications' })
        .props('metadata,created_at,slug,title')
        .status('published')
        .sort('-created_at')
        .limit(10)
    ) || {}

    all.value = objects
  })
</script>
