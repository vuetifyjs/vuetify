<template>
  <div class="bg-surface-variant pa-4 position-relative rounded-lg ma-2">
    <div class="bg-surface-light position-relative py-3 ps-3">
      <!-- position-absolute used for demonstration purposes -->
      <div class="position-absolute top-0 left-0 right-0 bg-primary pa-3 w-100">
        Fixed child
      </div>

      <div class="overflow-y-auto pe-3" style="max-height: 250px">
        <div class="mt-12">Relative parent</div>

        <div
          v-for="n in 10"
          :key="n"
          class="bg-info rounded-lg pa-3 mt-2"
        >
          Static child
        </div>
      </div>
    </div>
  </div>
</template>
