<template>
  <div class="text-caption px-4 mb-2">With static child</div>

  <div class="bg-surface-variant pa-4 position-relative rounded-lg mx-2 mb-2">
    <div class="mb-2">Relative parent</div>

    <div class="bg-surface-light position-static pa-3">
      <div class="mb-2">Static parent</div>

      <div class="position-static bg-primary rounded-lg pa-3 d-inline-block me-2">
        Static child
      </div>

      <div class="position-static bg-blue rounded-lg pa-3 d-inline-block">
        Static sibling
      </div>
    </div>
  </div>

  <div class="text-caption px-4 mb-2">With absolute child</div>

  <div class="bg-surface-variant pa-4 position-relative rounded-lg mx-2 mb-2">
    <div class="mb-2">Relative parent</div>

    <div class="bg-surface-light position-static pa-3">
      <div class="mb-3">Static parent</div>

      <div class="position-absolute top-0 right-0 bg-primary rounded-lg pa-3 d-inline-block">
        Absolute child
      </div>

      <div class="position-static bg-blue rounded-lg pa-3 d-inline-block">
        Static sibling
      </div>
    </div>
  </div>
</template>
