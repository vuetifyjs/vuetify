<template>
  <div class="d-flex justify-center">
    <v-video
      class="align-self-center"
      image="https://jsek.work/vt-sunflowers.jpg"
      src="https://jsek.work/vt-sunflowers.mp4"
      eager
      muted
    >
      <template v-slot:header>
        <div class="d-flex pa-2 pointer-pass-through">
          <v-list-item
            class="py-2 pl-3 pr-8 video-header-element"
            prepend-avatar="https://jsek.work/vt-sunflowers.jpg"
            rounded="pill"
            subtitle="Example video"
            title="Sunflowers"
          ></v-list-item>
          <v-icon-btn
            class="ml-auto video-header-element"
            icon="mdi-share-variant"
            variant="text"
          ></v-icon-btn>
        </div>
      </template>
    </v-video>
  </div>
</template>

<style scoped>
.video-header-element {
  background: #0008;
  color: #fff;
}
</style>
