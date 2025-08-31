<template>
  <v-container max-width="300">
    <div
      v-for="n in 10"
      :key="n"
      class="py-2 border-b d-flex align-center ga-2"
    >
      Some Text Here
      <v-spacer></v-spacer>
      <v-icon-btn
        icon="mdi-dots-vertical"
        size="small"
        variant="outlined"
        @click="show"
      ></v-icon-btn>
    </div>

    <v-menu
      v-model="showMenu"
      :offset="[-8,-12]"
      :target="menuTarget"
      location="bottom end"
      scroll-strategy="close"
    >
      <v-list
        :items="menuItems"
        class="py-0"
        density="compact"
        item-value="code"
        item-props
        slim
      >
        <template v-slot:prepend>
          <v-icon class="mr-n2" size="small"></v-icon>
        </template>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const showMenu = ref(false)
  const menuTarget = ref(null)

  const menuItems = [
    { title: 'Create', prependIcon: 'mdi-plus-circle-outline', code: 'add' },
    { type: 'divider' },
    { title: 'Modify', prependIcon: 'mdi-pencil-outline', code: 'edit' },
    { type: 'divider' },
    { title: 'Remove', prependIcon: 'mdi-trash-can-outline', code: 'delete' },
  ]

  async function show(evt) {
    if (showMenu.value) {
      showMenu.value = false
      await new Promise(r => setTimeout(r, 100))
    }
    menuTarget.value = evt.target.closest('.v-icon-btn')
    showMenu.value = true
  }
</script>
