<template>
  <v-infinite-carousel :auto-play="{ speed: 40 }" gap="0" draggable mask>
    <div class="bubbles">
      <v-sheet
        v-for="([x, y, scale], index) in bubbles"
        :key="index"
        :style="{ left: `${x}px`, top: `${y}px`, scale }"
        class="bubble"
        elevation="4"
        rounded="circle"
      >
        <v-icon :icon="logos[index]" size="56"></v-icon>
      </v-sheet>
    </div>
  </v-infinite-carousel>
</template>

<script setup>
  const logos = [
    'mdi-beer',
    'mdi-language-typescript',
    'mdi-nodejs',
    'mdi-sass',
    'mdi-language-html5',
    'mdi-github',
    '$vuetify',
    'mdi-linkedin',
    'mdi-dropbox',
    'mdi-reddit',
    'mdi-facebook',
    'mdi-twitter',
  ]

  // [x, y, scale], at least 32px apart, including across the seam of the 880px tile
  const bubbles = [
    [22, 75, 0.6],
    [53, 234, 1],
    [151, 1, 0.8],
    [176, 138, 0.6],
    [307, 24, 0.8],
    [317, 208, 1],
    [461, 141, 0.6],
    [470, 3, 0.8],
    [587, 235, 1],
    [595, 76, 0.6],
    [754, 28, 1],
    [761, 222, 0.8],
  ]
</script>

<style scoped>
.bubbles {
  position: relative;
  width: 880px;
  height: 400px;
}

.bubble {
  --phase-x: mod(sibling-index() * 0.618034, 1);
  --phase-y: mod(sibling-index() * 0.324718, 1);
  --duration-x: calc(2s + var(--phase-x) * 4s);
  --duration-y: calc(4s + var(--phase-y) * 2s);

  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 152px;
  height: 152px;
  animation-name: drift-x, drift-y;
  animation-duration: var(--duration-x), var(--duration-y);
  /* up to a full back-and-forth, so bubbles start out of sync */
  animation-delay:
    calc(mod(sibling-index() * 0.732051, 1) * -2 * var(--duration-x)),
    calc(mod(sibling-index() * 0.645751, 1) * -2 * var(--duration-y));
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  transition: background-color .2s, color .2s;
}

.bubble:hover {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
}

@keyframes drift-x {
  from { transform: translateX(-7px); }
  to { transform: translateX(7px); }
}

@keyframes drift-y {
  from { translate: 0 -7px; }
  to { translate: 0 7px; }
}
</style>
