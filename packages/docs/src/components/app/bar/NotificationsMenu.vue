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
            :value="unread.length"
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
      class="pl-4 pr-5"
      color="surface"
      density="compact"
    >
      <v-btn
        :disabled="showArchived ? unread.length < 1 : read.length < 1"
        class="px-2 ml-n1"
        size="small"
        variant="text"
        @click="showArchived = !showArchived"
      >
        {{ showArchived ? t('unread', { number: unread.length }) : t('read', { number: read.length }) }}
      </v-btn>

      <v-spacer />

      <app-tooltip-btn
        v-if="marked"
        :disabled="done"
        :icon="marked.icon"
        :path="`marked-${marked.path}`"
        color="medium-emphasis"
        size="small"
        @click="toggleAll"
      />
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
        <v-list :lines="false">
          <template
            v-for="(notification, i) in notifications"
            :key="notification.slug"
          >

            <v-divider
              v-if="i !== 0"
              class="my-3"
              inset
            />

            <v-list-item
              :ripple="false"
              class="py-2"
            >
              <template #prepend>
                <div class="mr-3 text-h6 mt-n16">
                  {{ notification.metadata.emoji }}
                </div>
              </template>

              <v-list-item-title
                class="text-wrap text-h6 mb-1"
                v-text="notification.title"
              />

              <v-list-item-subtitle
                class="text-caption"
              >
                {{ notification.metadata.text }}

                <app-link :href="notification.metadata.action">
                  {{ notification.metadata.action_text }}
                </app-link>
              </v-list-item-subtitle>

              <template #append>
                <v-btn
                  :ripple="false"
                  :icon="marked.icon"
                  class="ml-3"
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

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify'
  import { useUserStore } from '@/store/user'
  import { useCosmic } from '@/composables/cosmic'
  import { formatDate } from '@/util/date.js'
  import AppTooltipBtn from '@/components/app/TooltipBtn.vue'
  import AppMenu from '@/components/app/menu/Menu.vue'

  type Notification = {
    metadata: {
      emoji: string
      text: string
    }
    // eslint-disable-next-line camelcase
    created_at: string
    slug: string
    title: string
  }

  export default defineComponent({
    name: 'NotificationsMenu',

    components: { AppTooltipBtn, AppMenu },

    setup () {
      const { t } = useI18n()
      const { bucket } = useCosmic()
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

      async function load () {
        const { objects } = await bucket.getObjects<Notification>({
          query: {
            type: 'notifications',
            status: 'published',
          },
          props: 'created_at,metadata,slug,title',
          limit: 5,
          sort: '-created_at',
        })

        all.value = objects ?? []
      }

      function select (notification: Notification) {
        // this.snackbar = {
        //   slug,
        //   ...metadata,
        // }

        menu.value = false
      }

      function toggle ({ slug }: Notification) {
        user.notifications.read = user.notifications.read.includes(slug)
          ? user.notifications.read.filter(n => n !== slug)
          : [...user.notifications.read, slug]
      }

      function toggleAll () {
        user.notifications.read = !showArchived.value
          ? all.value.map(({ slug }) => slug)
          : []
      }

      load()

      return {
        t,
        formatDate,
        menu,
        done,
        unread,
        read,
        notifications,
        marked,
        showArchived,
        width,
        select,
        toggle,
        toggleAll,
      }
    },
  })
</script>
