<template>
  <VRow>
    <template v-for="image in imageLayout" :cols="image.cols">
      <VCol :cols="image.cols">
        <VImg
          :src="`https://picsum.photos/500/300?image=${image.cols * 20}`"
          height="100%"
          cover
        ></VImg>
      </VCol>

      <VCol v-if="image.children" cols="6" class="d-flex flex-column">
        <VRow>
          <VCol v-for="children in image.children" :cols="children.cols">
            <VImg
              :src="`https://picsum.photos/500/300?image=${children.cols}`"
              height="100%"
              cover
            ></VImg>
          </VCol>
        </VRow>
      </VCol>
    </template>
  </VRow>
</template>

<script setup>
  const imageLayout = [
    { cols: 4 },
    {
      cols: 8,
      children: [{ cols: 12 }, { cols: 12 }],
    },
    { cols: 6 },
    { cols: 3 },
    { cols: 9 },
    { cols: 4 },
    { cols: 8 },
  ]
</script>
