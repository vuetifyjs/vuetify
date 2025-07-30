<template>
  <div class="pb-3">
    <v-video
      :controls-props="{ class: 'px-4' }"
      :rounded="['lg', 'pill']"
      :start-at="10"
      class="mx-auto"
      height="260"
      image="https://jsek.work/vt-sunflowers.jpg"
      src="https://jsek.work/vt-sunflowers.mp4"
      eager
      floating
      muted
    ></v-video>
  </div>
</template>
