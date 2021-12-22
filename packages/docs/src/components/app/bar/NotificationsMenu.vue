<template>
  <app-menu
    v-model="menu"
    :max-width="maxWidth"
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
            location="top-left"
          >
            <v-icon
              class="mx-1"
              :icon="`mdi-bell${unread.length === 0 ? '-outline' : '-ring-outline'}`"
            />
          </v-badge>
        </template>
      </app-tooltip-btn>
    </template>
    <div class="d-flex pr-5">
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
        size="small"
        @click="toggleAll"
      />
    </div>

    <v-divider />

    <v-responsive
      class="overflow-y-scroll"
      max-height="340"
    >
      <div
        v-if="done"
        class="py-8 text-center text-subtitle-1"
      >
        <p>{{ t('done') }}</p>

        <v-icon
          color="grey lighten-2"
          size="96"
          icon="mdi-vuetify"
        />
      </div>

      <template v-else>
        <v-list>
          <v-list-item
            v-for="notification in notifications"
            :key="notification.slug"
            :ripple="false"
            :title="`${notification.metadata.emoji} ${notification.title}`"
            :subtitle="notification.created_at"
            @click="select(notification)"
          >
            <template #append>
              <v-btn
                :ripple="false"
                :icon="marked.icon"
                variant="text"
                @click.stop.prevent="toggle(notification)"
              />
            </template>
          </v-list-item>
        </v-list>
      </template>
    </v-responsive>
  </app-menu>
</template>

<script lang="ts">
  import { computed, ref } from 'vue'
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
    }
    // eslint-disable-next-line camelcase
    created_at: string
    slug: string
    title: string
  }

  export default {
    name: 'NotificationsMenu',

    components: { AppTooltipBtn, AppMenu },

    setup () {
      const { t } = useI18n()
      const { bucket } = useCosmic()
      const { mobile } = useDisplay()
      const user = useUserStore()
      const menu = ref(false)
      const done = ref(false)
      const all = ref([])
      const showArchived = ref(false)

      const unread = computed(() => all.value.filter(({ slug }) => !user.notifications.read.includes(slug)))
      const read = computed(() => all.value.filter(({ slug }) => user.notifications.read.includes(slug)))
      const notifications = computed(() => showArchived.value ? read.value : unread.value)

      const marked = computed(() => {
        const path = showArchived.value ? 'unread' : 'read'
        const icon = showArchived.value ? 'mdi-email-mark-as-unread' : 'mdi-email-open'

        return { icon, path }
      })

      const maxWidth = computed(() => mobile.value ? 296 : 320)

      async function load () {
        const { objects } = await bucket.getObjects({
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
        maxWidth,
        select,
        toggle,
        toggleAll,
      }
    },
  }
</script>
