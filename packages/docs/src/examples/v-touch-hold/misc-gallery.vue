<template>
  <v-card class="mx-auto" max-width="400">
    <v-toolbar :color="selected.length ? 'primary' : undefined" density="compact">
      <v-toolbar-title>
        {{ selected.length ? `${selected.length} selected` : 'Photos' }}
      </v-toolbar-title>
      <v-slide-x-reverse-transition>
        <v-btn
          v-if="selected.length"
          class="mr-3"
          size="small"
          text="Clear"
          variant="outlined"
          @click="selected = []"
        ></v-btn>
      </v-slide-x-reverse-transition>
    </v-toolbar>

    <v-item-group v-model="selected" multiple>
      <v-row class="pa-1" no-gutters>
        <v-col
          v-for="photo in photos"
          :key="photo"
          class="pa-1"
          cols="4"
        >
          <v-item v-slot="{ isSelected, toggle }" :value="photo">
            <v-img
              :gradient="isSelected ? 'rgba(0,0,0,.4), rgba(0,0,0,.4)' : undefined"
              :src="`https://picsum.photos/300?image=4${photo}`"
              :style="isSelected ? 'outline: 4px solid rgb(var(--v-theme-primary)); outline-offset: -4px' : undefined"
              aspect-ratio="1"
              class="rounded-lg"
              cover
              v-touch-hold="toggle"
              @click="isSelecting ? toggle() : logSimpleClick(photo)"
              @pointerenter="e => e.pointerType === 'mouse' && (hovered = photo)"
              @pointerleave="hovered = null"
            >
              <v-fade-transition>
                <v-icon-btn
                  v-if="hovered === photo || isSelecting"
                  :aria-label="`Select photo ${photo}`"
                  :aria-pressed="isSelected"
                  :icon="isSelected ? 'mdi-check-circle-outline' : 'mdi-checkbox-blank-circle-outline'"
                  class="position-absolute bg-grey-darken-2 ma-1"
                  color="white"
                  icon-size="32"
                  size="32"
                  variant="text"
                  @click.stop="toggle"
                ></v-icon-btn>
              </v-fade-transition>
            </v-img>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

    <v-scroll-x-transition mode="out-in">
      <div :key="last" class="text-body-small text-center text-medium-emphasis pa-3">{{ last }}</div>
    </v-scroll-x-transition>
  </v-card>
</template>

<script setup>
  import { ref, shallowRef, toRef, watch } from 'vue'

  const photos = [0, 1, 2, 3, 4, 5]
  const selected = ref([])
  const hovered = shallowRef(null)
  const last = shallowRef('———')
  const isSelecting = toRef(() => selected.value.length > 0)

  watch(selected, (v, old) => !!old.length + !!v.length === 1 && logSelection(!!v.length))

  function logSelection (active) {
    last.value = `Selection mode ${active ? 'active' : 'deactivated'}`
  }

  function logSimpleClick (photo) {
    last.value = `Normal click on photo #${photo}`
  }
</script>
