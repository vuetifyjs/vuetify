<template>
  <AppListList
    v-if="auth.isSubscriber && user.pins"
    v-model:opened="opened"
    :items="pinned"
    class="pb-0 mb-n2"
    nav
  >
    <template #item="{ props: itemProps }">
      <v-hover>
        <template #default="{ props: activatorProps, isHovering }">
          <v-list-item
            :title="itemProps.title"
            :to="itemProps.to"
            class="mb-1"
            v-bind="activatorProps"
            @click.prevent="onClickPin(itemProps.to)"
          >
            <template #append>
              <v-icon
                v-if="isHovering"
                class="me-1"
                icon="mdi-pin-off"
                size="16"
                @click.prevent.stop="onClickPinRemove({
                  title: itemProps.title,
                  to: itemProps.to,
                  category: '',
                })"
              />
            </template>
          </v-list-item>
        </template>
      </v-hover>
    </template>
  </AppListList>
</template>

<script lang="ts" setup>
  import { Pin } from '@/stores/pins'

  const props = defineProps<{ rail: boolean }>()

  const auth = useAuthStore()
  const pins = usePinsStore()
  const user = useUserStore()
  const router = useRouter()

  const _opened = ref<string[]>([])
  const opened = computed({
    get: () => props.rail ? [] : _opened.value,
    set: val => _opened.value = val,
  })
  const pinned = computed(() => ([{
    activeIcon: 'mdi-pin',
    inactiveIcon: 'mdi-pin-outline',
    items: [...pins.pins],
    title: 'Pinned',
  }]))

  async function onClickPin (to: string) {
    pins.isPinning = true

    await router.replace(to)

    pins.isPinning = false
  }

  function onClickPinRemove (pin: Pin) {
    pins.toggle(false, pin)
  }

  onBeforeMount(() => {
    pins.load()
  })

  watch(() => pins.pins, (val, oldVal) => {
    if (val.length < oldVal.length) return

    opened.value = ['Pinned']
  })
</script>
