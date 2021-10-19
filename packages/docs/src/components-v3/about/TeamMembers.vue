<template>
  <v-container class="team-members">
    <v-row>
      <template v-for="(member, i) in members" :key="i">
        <v-col
          cols="12"
        >
          <about-team-member v-bind="{ member }" />
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

<script lang="ts">
  // Utilities
  import { computed, defineComponent } from 'vue'
  import { useTeamStore } from '@/store-v3/team'

  export default defineComponent({
    name: 'TeamMembers',

    props: { team: String },

    setup (props) {
      const team = useTeamStore()
      const members = computed(() => team.members.filter(member => member.team === props.team))

      return { members }
    },
  })
</script>

<style lang="sass">
  .team-members
    .v-markdown
      > p
        margin: 0

      a
        text-decoration: none
</style>
