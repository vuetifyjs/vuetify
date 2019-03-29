<template>
  <div class="text-xs-center">
    <v-menu>
      <template #activator="{ on: menu }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn
              color="primary"
              dark
              v-on="{ ...tooltip, ...menu }"
            >Dropdown w/ Tooltip</v-btn>
          </template>
          <span>Im A ToolTip</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          @click=""
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me1' },
        { title: 'Click Me2' },
        { title: 'Click Me3' },
        { title: 'Click Me4' }
      ]
    })
  }
</script>
