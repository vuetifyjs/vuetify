<template>
  <v-card>
    <v-toolbar :collapse="collapse" title="Toolbar">
      <v-btn
        class="ml-3"
        icon="mdi-magnify"
        v-tooltip:bottom="'Search all products'"
      ></v-btn>

      <v-btn
        class="mr-3"
        icon="mdi-dots-vertical"
        size="small"
        variant="elevated"
      >
        <v-icon></v-icon>
        <v-speed-dial :location="dialLocation" activator="parent" open-on-hover>
          <v-btn
            v-for="(item, i) in dialActions"
            :key="i"
            :color="item.color"
            :icon="item.icon"
            v-tooltip="{ location: tooltipLocation, text: item.tooltip }"
          ></v-btn>
        </v-speed-dial>
      </v-btn>
    </v-toolbar>

    <v-card-text class="text-center pa-8">
      <v-btn
        :text="collapse ? 'Expand' : 'Collapse'"
        color="surface-variant"
        @click="collapse = !collapse"
      ></v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { shallowRef, toRef } from 'vue'

  const collapse = shallowRef(false)
  const dialLocation = toRef(() => collapse.value ? 'right center' : 'bottom center')
  const tooltipLocation = toRef(() => collapse.value ? 'bottom' : 'left')

  const dialActions = [
    { color: 'success', icon: '$success', tooltip: 'Share feedback' },
    { color: 'warning', icon: 'mdi-alert', tooltip: 'Report problem' },
    { color: 'purple', icon: 'mdi-bell', tooltip: 'Open notifications' },
  ]
</script>

<script>
  export default {
    data: () => ({
      collapse: false,
      dialActions: [
        { color: 'success', icon: '$success', tooltip: 'Share feedback' },
        { color: 'warning', icon: 'mdi-alert', tooltip: 'Report problem' },
        { color: 'purple', icon: 'mdi-bell', tooltip: 'Open notifications' },
      ],
    }),
    computed: {
      dialLocation () {
        return this.collapse ? 'right center' : 'bottom center'
      },
      tooltipLocation () {
        return this.collapse ? 'bottom' : 'left'
      },
    },
  }
</script>
