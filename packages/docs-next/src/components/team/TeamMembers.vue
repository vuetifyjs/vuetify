<template>
  <v-container id="team-members">
    <v-row>
      <template v-for="(member, i) in team">
        <v-col
          :key="i"
          cols="12"
        >
          <team-member v-bind="{ member }" />
        </v-col>

        <v-divider
          v-if="i < team.length - 1"
          :key="`divider-${i}`"
          class="mb-1 flex-1-1-100"
        />
      </template>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'TeamMembers',

    data: () => ({
      core: {
        johnleider: {
          focus: ['[vuetifyjs/*](https://github.com/vuetifyjs)'],
          funding: [
            '[GitHub Sponsors](https://github.com/sponsors/johnleider)',
            '[Patreon](https://patreon.com/vuetify)',
          ],
          languages: ['English'],
          linkedin: 'john-leider-626183a2',
          location: 'Fort Worth, TX, USA',
          name: 'John Leider',
          twitter: 'zeroskillz',
          work: 'CEO @ Vuetify',
        },
        heatherleider: {
          focus: ['[vuetifyjs/*](https://github.com/vuetifyjs)'],
          languages: ['English'],
          location: 'Fort Worth, TX, USA',
          name: 'Heather Leider',
          twitter: 'grneyedgrl01',
          work: 'COO @ Vuetify',
        },
        KaelWD: {
          focus: [
            '[vuetifyjs/*](https://github.com/vuetifyjs)',
            '[vuetify-loader](https://github.com/vuetifyjs/vuetify-loader)',
            '[eslint-plugin-vuetify](https://github.com/vuetifyjs/eslint-plugin-vuetify)',
          ],
          funding: [
            '[GitHub Sponsors](https://github.com/sponsors/kaelwd)',
            '[Patreon](https://patreon.com/kaelwd)',
          ],
          languages: ['English'],
          location: 'Melbourne, Australia',
          name: 'Kael Watts-Deuchar',
          twitter: 'kaelwd',
        },
        nekosaur: {
          focus: ['[vuetifyjs](https://github.com/vuetifyjs)'],
          languages: ['Swedish', 'English'],
          location: 'Malmö, Sweden',
          name: 'Albert Kaaman',
        },
        jacekkarczmarczyk: {
          focus: ['[vuetifyjs](https://github.com/vuetifyjs)'],
          languages: ['Polish', 'English'],
          location: 'Warsaw, Poland',
          name: 'Jacek Karczmarczyk',
        },
        MajesticPotatoe: {
          focus: ['[vuetifyjs](https://github.com/vuetifyjs)', '[vuetifyjs/docs](https://github.com/vuetifyjs/vuetify/tree/master/packages/docs)'],
          funding: [
            '[GitHub Sponsors](https://github.com/sponsors/majesticpotatoe)',
            '[Open Collective](https://opencollective.com/vuetify)',
          ],
          languages: ['English'],
          linkedin: 'andrew-henry-01049830',
          location: 'Rochester, NY, USA',
          name: 'Andrew Henry',
          twitter: 'SeeMWhyK',
        },
        bdeo: {
          focus: ['**vuetifyjs/issue-helper**'],
          languages: ['English'],
          funding: ['[GitHub Sponsors](https://github.com/sponsors/bdeo)'],
          linkedin: 'andrew-henry-01049830',
          location: 'Philadelphia, PA, USA',
          name: 'Brandon Deo',
        },
        sh7dm: {
          focus: ['[vuetifyjs](https://github.com/vuetifyjs)'],
          languages: ['Russian', 'English'],
          location: 'Russian Federation',
          name: 'Dmitry Sharshakov',
        },
        johannaRlee: {
          focus: ['[vuetifyjs beginners guide](https://github.com/vuetifyjs/vuetify/tree/master/packages/docs)'],
          languages: ['English'],
          linkedin: 'johannaklay',
          location: 'DFW, TX, USA',
          name: 'Johanna Lee',
          twitter: 'johannaRlee',
        },
        chewy94: {
          languages: ['English'],
          linkedin: 'sean-kimball-b50922126',
          location: 'Goodyear, Arizona, USA',
          name: 'Sean Kimball',
        },
        vanessalvarez8a: {
          languages: ['English', 'Spanish'],
          linkedin: 'vanessaalvarez',
          location: 'Dallas, TX, USA',
          name: 'Vanessa Alvarez',
          twitter: 'vanessalvarez8a',
        },
      },
      contributors: {},
      team: [],
    }),

    async mounted () {
      const org = await fetch('https://api.github.com/orgs/vuetifyjs/members', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json())

      const team = []

      for (const key of Object.keys(this.core)) {
        const member = org.find(u => u.login === key)

        if (!member) continue

        team.push({
          ...this.core[key],
          avatar: member.avatar_url,
          github: key,
        })
      }

      this.team = team
    },
  }
</script>

<style lang="sass">
  #team-members
    .v-markdown
      > p
        margin: 0

      a
        text-decoration: none
</style>
