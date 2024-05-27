<template>
  <v-container class="team-members">
    <v-row>
      <template v-for="(member, i) in members" :key="i">
        <v-col
          cols="12"
        >
          <AboutTeamMember v-bind="{ member }" />
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

<script setup>
  const props = defineProps({ team: String })
  const teams = useTeamStore()
  const members = computed(() => teams.members.filter(member => member.team === props.team))
</script>

<style lang="sass">
  .team-members
    .v-markdown
      > p
        margin: 0

      a
        text-decoration: none
</style>
