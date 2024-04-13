<template>
  <div>
    <div class="text-center d-flex pb-4">
      <v-btn class="ma-2" @click="all">
        All
      </v-btn>
      <v-btn class="ma-2" @click="none">
        None
      </v-btn>
    </div>

    <div class="pb-4">v-model {{ panel }}</div>

    <v-expansion-panels
      v-model="panel"
      multiple
    >
      <v-expansion-panel
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        title="Foo"
        value="foo"
      ></v-expansion-panel>

      <v-expansion-panel
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        title="Bar"
        value="bar"
      ></v-expansion-panel>

      <v-expansion-panel
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        title="Baz"
        value="baz"
      ></v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const panel = ref([])
  function all () {
    panel.value = ['foo', 'bar', 'baz']
  }
  function none () {
    panel.value = []
  }
</script>

<script>
  export default {
    data () {
      return {
        panel: [],
      }
    },
    methods: {
      all () {
        this.panel = ['foo', 'bar', 'baz']
      },
      none () {
        this.panel = []
      },
    },
  }
</script>
