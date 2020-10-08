<template>
  <v-container class="team-members">
    <v-row>
      <template v-for="(member, i) in members">
        <v-col
          :key="i"
          cols="12"
        >
          <team-member v-bind="{ member }" />
        </v-col>

        <v-divider
          v-if="i < members.length - 1"
          :key="`divider-${i}`"
          class="mb-1 flex-1-1-100"
        />
      </template>
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'TeamMembers',

    props: { team: String },

    computed: {
      all: get('team/all'),
      members () {
        return this.all.filter(member => member.team === this.team)
      },
    },
  }
</script>

<style lang="sass">
  .team-members
    .v-markdown
      > p
        margin: 0

      a
        text-decoration: none
</style>
