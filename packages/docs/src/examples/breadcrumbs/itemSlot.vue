<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:item="props">
        <a :href="props.item.href" :class="[props.item.disabled && 'disabled']">{{ props.item.text.toUpperCase() }}</a>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard'
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1'
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ]
    })
  }
</script>

<style lang="stylus" scoped>
  .disabled
    color: grey
    pointer-events: none
</style>
