<template>
  <v-container id="team-members">
    <v-row>
      <template v-for="(member, i) in team">
        <v-col
          :key="i"
          cols="12"
        >
          <div class="d-flex">
            <v-avatar size="72">
              <v-img :src="member.avatar" />
            </v-avatar>

            <div class="pl-6 font-weight-medium">
              <div class="text-h5 mb-1 font-weight-bold d-flex align-center">
                <span
                  class="mr-3"
                  v-text="member.name"
                />

                <a
                  v-if="member.twitter"
                  :href="`https://twitter.com/${member.twitter}`"
                  class="d-inline-flex text-decoration-none mr-1"
                  rel="noopener"
                  target="_blank"
                >
                  <v-icon color="#40BBF4">
                    $mdiTwitter
                  </v-icon>
                </a>

                <a
                  v-if="member.github"
                  :href="`https://github.com/${member.github}`"
                  class="d-inline-flex text-decoration-none mr-1"
                  rel="noopener"
                  target="_blank"
                >
                  <v-icon color="#24292E">
                    $mdiGithub
                  </v-icon>
                </a>

                <a
                  v-if="member.linkedin"
                  :href="`https://linkedin.com/in/${member.linkedin}`"
                  class="d-inline-flex text-decoration-none mr-1"
                  rel="noopener"
                  target="_blank"
                >
                  <v-icon color="#0077B5">
                    $mdiLinkedin
                  </v-icon>
                </a>
              </div>

              <div
                v-if="member.focus"
                class="d-flex align-center flex-wrap"
              >
                <i18n
                  class="text-uppercase caption font-weight-regular"
                  path="focus"
                  tag="h3"
                />

                <div class="mx-2">
                  &nbsp;—&nbsp;
                </div>

                <template v-for="(focus, k) in member.focus">
                  <app-md
                    :key="k"
                    v-text="focus"
                  />

                  <span
                    v-if="k < member.focus.length - 1"
                    :key="`span-${k}`"
                    class="mx-2"
                  >
                    •
                  </span>
                </template>
              </div>

              <div
                v-if="member.funding"
                class="d-flex align-center flex-wrap mt-1"
              >
                <i18n
                  class="text-uppercase caption font-weight-regular"
                  path="funding"
                  tag="h3"
                />

                <div class="mx-2">
                  &nbsp;—&nbsp;
                </div>

                <template v-for="(funding, k) in member.funding">
                  <app-md
                    :key="k"
                    v-text="funding"
                  />

                  <span
                    v-if="k < member.funding.length - 1"
                    :key="`span-${k}`"
                    class="mx-2"
                  >
                    •
                  </span>
                </template>
              </div>

              <template v-for="field in ['work', 'location', 'languages']">
                <div
                  v-if="member[field]"
                  :key="field"
                  class="text-subtitle d-flex align-center my-2"
                >
                  <v-icon
                    left
                    v-text="icons[field]"
                  />

                  <template v-if="Array.isArray(member[field])">
                    <template v-for="(focus, j) in member[field]">
                      <app-md
                        :key="j"
                        v-text="focus"
                      />

                      <span
                        v-if="j < member[field].length - 1"
                        :key="`span-${j}`"
                        class="mx-2"
                      >
                        •
                      </span>
                    </template>
                  </template>

                  <template v-else>
                    {{ member[field] }}
                  </template>
                </div>
              </template>
            </div>
          </div>
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
          focus: ['[vuetifyjs/docs](https://github.com/vuetifyjs/vuetify/tree/master/packages/docs)'],
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
        chewy94: {
          languages: ['English'],
          linkedin: 'sean-kimball-b50922126',
          location: 'Goodyear, Arizona, USA',
          name: 'Sean Kimball',
        },
        johannaRlee: {
          languages: ['English'],
          linkedin: 'sean-kimball-b50922126',
          location: 'Dallas, TX, USA',
          name: 'Johanna Lee',
          twitter: 'johannaRlee',
        },
        vanessalvarez8a: {
          languages: ['English'],
          linkedin: 'vanessaalvarez',
          location: 'Dallas, TX, USA',
          name: 'Vanessa Alvarez',
          twitter: 'vanessalvarez8a',
        },
      },
      contributors: {},
      icons: {
        languages: '$mdiTranslate',
        location: '$mdiMapMarkerOutline',
        work: '$mdiBriefcaseVariantOutline',
      },
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
