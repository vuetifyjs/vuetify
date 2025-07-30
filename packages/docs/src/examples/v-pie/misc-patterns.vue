<template>
  <v-container class="d-flex justify-center">
    <div class="h-0">
      <svg height="0" version="1.1" width="0" xmlns="http://www.w3.org/2000/svg">
        <!-- source: https://pattern.monster -->
        <defs>
          <pattern
            id="pattern-1"
            height="20"
            patternTransform="scale(.5)"
            patternUnits="userSpaceOnUse"
            width="40"
          >
            <path
              d="M40 0 20-10V0l20 10zm0 10L20 0v10l20 10zm0 10L20 10v10l20 10zM0 20l20-10v10L0 30zm0-10L20 0v10L0 20zM0 0l20-10V0L0 10z"
              fill="none"
              stroke="rgb(var(--v-theme-surface))"
            />
          </pattern>
          <pattern
            id="pattern-2"
            height="8"
            patternTransform="scale(.5)"
            patternUnits="userSpaceOnUse"
            width="70"
          >
            <path
              d="M-.02 22c8.373 0 11.938-4.695 16.32-9.662C20.785 7.258 25.728 2 35 2s14.215 5.258 18.7 10.338C58.082 17.305 61.647 22 70.02 22M-.02 14.002C8.353 14 11.918 9.306 16.3 4.339 20.785-.742 25.728-6 35-6S49.215-.742 53.7 4.339c4.382 4.967 7.947 9.661 16.32 9.664M70 6.004c-8.373-.001-11.918-4.698-16.3-9.665C49.215-8.742 44.272-14 35-14S20.785-8.742 16.3-3.661C11.918 1.306 8.353 6-.02 6.002"
              fill="none"
              stroke="rgb(var(--v-theme-surface))"
            />
          </pattern>
          <pattern
            id="pattern-3"
            height="10"
            patternTransform="scale(.5)"
            patternUnits="userSpaceOnUse"
            width="10"
          >
            <path
              d="M5 0v10ZM0 5h10Z"
              fill="none"
              stroke="rgb(var(--v-theme-surface))"
            />
          </pattern>
        </defs>
      </svg>
    </div>

    <div class="d-flex mt-6 justify-center">
      <v-pie
        :items="items"
        :legend="{ position: $vuetify.display.smAndUp ? 'left' : 'bottom' }"
        :tooltip="{ subtitleFormat: '[value]%' }"
        hover-scale=".1"
        inner-cut="60"
        animation
        hide-slice
      >
        <template v-slot:center>
          <div class="text-center">
            <v-icon class="opacity-60" icon="mdi-leaf" size="44"></v-icon>
          </div>
        </template>
      </v-pie>
    </div>
  </v-container>
</template>

<script setup>
  const items = [
    { key: 1, title: 'Walnut', value: 57, color: '#607322', pattern: 'url(#pattern-1)' },
    { key: 2, title: 'Oak', value: 31, color: '#c19a00', pattern: 'url(#pattern-2)' },
    { key: 3, title: 'Pine', value: 12, color: '#ffa600', pattern: 'url(#pattern-3)' },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        { key: 1, title: 'Walnut', value: 57, color: '#607322', pattern: 'url(#pattern-1)' },
        { key: 2, title: 'Oak', value: 31, color: '#c19a00', pattern: 'url(#pattern-2)' },
        { key: 3, title: 'Pine', value: 12, color: '#ffa600', pattern: 'url(#pattern-3)' },
      ],
    }),
  }
</script>
