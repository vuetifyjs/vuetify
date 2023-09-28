<template>
  <v-card>
    <v-card-title>List with {{ size }} elements</v-card-title>

    <v-card-text v-if="data">
      <v-list>
        <recursive-list :entry="data"></recursive-list>
      </v-list>
    </v-card-text>
    <v-card-actions v-else class="justify-center">
      <v-btn @click="data = MakeEntries()">Prepare</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
  import { computed, h, ref, VNode } from 'vue'
  import { VListGroup, VListItem } from 'vuetify/components'

  export type Entry = {
    name: string,
    children?: Entry[],
  }

  /*
  <VListGroup v-if="entry.children" lazy>
    <template v-slot:activator="{ props }">
      <VListItem v-bind="props">
        {{ p.val.name }}
      </VListItem>
    </template>

    <RecursiveList :val="e" v-for="e in p.val.children" />
  </VListGroup>

  <VListItem v-else>
    {{ p.val.name }}
  </VListItem>
  */
  const RecursiveList = ({ entry }: { entry: Entry }): VNode =>
    entry.children
      ? h(VListGroup, { lazy: true }, {
        default: () => entry.children?.map(entry => RecursiveList({ entry })),
        activator: ({ props }: any) => h(VListItem, props, { default: () => entry.name }),
      })
      : h(VListItem, null, { default: () => entry.name })

  function MakeEntries (prefix = 'Prop', depth = 5): Entry {
    let children

    if (depth > 0) {
      children = []

      for (let i = 0; i < 5; ++i) {
        children.push(MakeEntries(prefix + '.' + i, depth - 1))
      }
    }

    return { name: prefix, children }
  }

  function GetSize (v: Entry): number {
    return v.children?.map(GetSize).reduce((acc, v) => acc + v, 1) ?? 1
  }

  const data = ref<Entry>()
  const size = computed(() => data.value ? GetSize(data.value) : 0)
</script>
