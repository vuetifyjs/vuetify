<template>
  <div
    :class="[
      'v-morphing-icon',
      `v-morphing-icon--${ onDark ? 'on-dark' : 'on-light' }`,
    ]"
  >
    <div class="v-morphing-icon__underlay"></div>
    <div class="v-morphing-icon__content">
      <div class="v-morphing-icon__stack">
        <transition name="morphing-transition">
          <v-icon :key="icon" :icon="icon" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ icon: string, onDark?: boolean }>()
</script>

<style>
  /* blending */
  .v-morphing-icon {
    position: relative;
  }
  .v-morphing-icon__stack {
    overflow: hidden;
    filter: contrast(200) blur(0.2px);
    isolation: isolate;

    display: grid;
    place-items: center;

    > .v-icon {
      grid-area: 1/1;
    }
  }

  .v-morphing-icon__underlay {
    content: '';
    position: absolute;
    inset: 0;
    background-color: currentColor;
  }
  .v-morphing-icon--on-light {
    mix-blend-mode: multiply;
    .v-morphing-icon__content {
      mix-blend-mode: screen;
    }
    .v-morphing-icon__stack {
      color: #000;
      background-color: #fff;
      mix-blend-mode: darken;
    }
  }

  .v-morphing-icon--on-dark {
    mix-blend-mode: screen;
    .v-morphing-icon__content {
      mix-blend-mode: multiply;
      isolation: isolate;
    }
    .v-morphing-icon__stack {
      color: #fff;
      background-color: #000;
      mix-blend-mode: lighten;
    }
  }

  /* transition */
  .morphing-transition-leave-to,
  .morphing-transition-enter-from {
    opacity: 0;
    filter: blur(10px);
  }
  .morphing-transition-enter-active {
    transition:
      opacity 150ms linear,
      filter 400ms linear;
  }
  .morphing-transition-leave-active {
    transition:
      filter 400ms linear,
      opacity 150ms linear 300ms;
  }
</style>
