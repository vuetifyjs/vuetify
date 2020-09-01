<template>
  <v-btn
    :aria-label="$t('become-a-sponsor')"
    :to="{
      name: 'Documentation',
      params: {
        category: 'introduction',
        page: 'sponsors-and-backers'
      }
    }"
    color="primary"
    outlined
    rounded
    small
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span
      class="text-capitalize font-weight-regular"
      v-text="$t('become-a-sponsor')"
    />
  </v-btn>
</template>

<script>
  export default { name: 'SponsorLink' }
</script>
