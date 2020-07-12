<template>
  <v-container>
    <v-row
      justify="center"
    >
      <v-col
        v-for="(member, i) in team"
        :key="i"
        cols="12"
        sm="6"
        lg="4"
      >
        <div class="mb-4 text-center member">
          <v-avatar
            size="164"
            class="elevation-4"
            color="#DDF0FE"
          >
            <v-hover>
              <v-img
                slot-scope="{ hover }"
                :src="`https://avataaars.io/?${member.avatar}`"
              >
                <v-sheet
                  :color="hover ? 'rgba(0, 0, 0, .72)' : 'transparent'"
                  class="transition-fast-in-fast-out"
                  dark
                  height="100%"
                  style="position: absolute; top: 0; left: 0;"
                  width="100%"
                >
                  <v-row
                    v-show="hover"
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-col
                      class="pb-0"
                      cols="12"
                    >
                      <i18n
                        tag="app-md"
                        class="font-weight-medium mr-1"
                        :path="member.title"
                      />
                    </v-col>
                    <v-col>
                      <a
                        v-if="member.email"
                        :aria-label="`${member.name}'s Email`"
                        :href="`mailto:${member.email}`"
                        :title="`${member.name}'s Email`"
                        class="text-decoration-none mx-2"
                        target="_blank"
                        rel="noopener"
                      >
                        <v-icon>$mdiEmail</v-icon>
                      </a>
                      <a
                        v-if="member.twitter"
                        :aria-label="`${member.name}'s Twitter Profile`"
                        :href="`https://twitter.com/${member.twitter}`"
                        :title="`${member.name}'s Twitter Profile`"
                        class="text-decoration-none mx-2"
                        target="_blank"
                        rel="noopener"
                      >
                        <v-icon>$mdiTwitter</v-icon>
                      </a>
                      <a
                        v-if="member.github"
                        :aria-label="`${member.name}'s Github Profile`"
                        :href="`https://github.com/${member.github}`"
                        :title="`${member.name}'s Github Profile`"
                        class="text-decoration-none mx-2"
                        target="_blank"
                        rel="noopener"
                      >
                        <v-icon>$mdiGithub</v-icon>
                      </a>
                      <a
                        v-if="member.linkedin"
                        :aria-label="`${member.name}'s LinkedIn Profile`"
                        :href="`https://linkedin.com/in/${member.linkedin}`"
                        :title="`${member.name}'s LinkedIn Profile`"
                        class="text-decoration-none mx-2"
                        target="_blank"
                        rel="noopener"
                      >
                        <v-icon>$mdiLinkedin</v-icon>
                      </a>
                      <a
                        v-if="member.patreon"
                        :aria-label="`${member.name}'s Patreon`"
                        :href="`https://patreon.com/${member.github}`"
                        :title="`${member.name}'s Patreon`"
                        class="text-decoration-none mx-2"
                        target="_blank"
                        rel="noopener"
                      >
                        <v-icon>$mdiPatreon</v-icon>
                      </a>
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-img>
            </v-hover>
          </v-avatar>
          <div
            class="font-weight-light headline"
            v-text="member.name"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'TeamMembers',

    data: () => ({
      team: [
        {
          title: 'founder',
          name: 'John Leider',
          email: 'john@vuetifyjs.com',
          github: 'johnleider',
          twitter: '@zeroskillz',
          avatar: 'avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Blonde&facialHairType=Blank&clotheType=Hoodie&clotheColor=Heather&eyeType=Side&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Light',
        },
        {
          title: 'operations',
          name: 'Heather Leider',
          email: 'heather@vuetifyjs.com',
          avatar: 'avatarStyle=Transparent&topType=LongHairStraight2&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Pink&eyeType=Hearts&eyebrowType=Default&mouthType=Tongue&skinColor=Light',
        },
        {
          title: 'keeper',
          name: 'Kael Watts-Deuchar',
          github: 'kaelwd',
          patreon: 'kaelwd',
          twitter: '@kaelwd',
          avatar: 'avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Heather&eyeType=Squint&eyebrowType=SadConcernedNatural&mouthType=Concerned&skinColor=Pale',
        },
        {
          title: 'core',
          name: 'Albert Kaaman',
          github: 'nekosaur',
          avatar: 'avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=Auburn&facialHairType=MoustacheMagnum&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=Black&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Tongue&skinColor=Pale',
        },
        {
          title: 'core',
          name: 'Jacek Karczmarczyk',
          github: 'jacekkarczmarczyk',
          avatar: 'accessoriesType=Prescription02&avatarStyle=Transparent&clotheColor=Red&clotheType=ShirtCrewNeck&eyeType=EyeRoll&eyebrowType=AngryNatural&facialHairType=Blank&mouthType=Concerned&skinColor=Yellow&topType=ShortHairShortRound',
        },
        {
          title: 'core',
          name: 'Andrew Henry',
          github: 'MajesticPotatoe',
          linkedin: 'andrew-henry-01049830',
          avatar: 'avatarStyle=Transparent&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=Hoodie&clotheColor=Heather&eyeType=Dizzy&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
        },
        {
          title: 'cm',
          name: 'Brandon Deo',
          github: 'bdeo',
          linkedin: 'brandondeo',
          avatar: 'avatarStyle=Transparent&clotheColor=Heather&clotheType=ShirtCrewNeck&eyeType=Default&eyebrowType=Default&facialHairColor=Black&facialHairType=Blank&hairColor=Blonde&mouthType=Default&skinColor=Pale&topType=ShortHairShortRound',
        },
        {
          title: 'core',
          name: 'Dmitry Sharshakov',
          github: 'sh7dm',
          avatar: 'accessoriesType=Blank&avatarStyle=Transparent&clotheColor=Heather&clotheType=Hoodie&eyeType=Default&eyebrowType=Default&facialHairType=Blank&graphicType=Bear&hairColor=BrownDark&mouthType=Smile&skinColor=Pale&topType=ShortHairShortFlat',
        },
        {
          title: 'core',
          name: 'Sean Kimball',
          github: 'chewy94',
          linkedin: 'sean-kimball-b50922126',
          avatar: 'avatarStyle=Transparent&clotheColor=Heather&clotheType=ShirtVNeck&eyeType=Happy&eyebrowType=FlatNatural&facialHairColor=Black&facialHairType=BeardLight&hairColor=Black&mouthType=Smile&skinColor=Pale&topType=ShortHairShortFlat',
        },
        {
          title: 'core',
          name: 'Johanna Lee',
          email: 'johannarlee@gmail.com',
          github: 'johannaRlee',
          twitter: 'johannaRlee',
          avatar: 'avatarStyle=Transparent&topType=LongHairBob&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Black&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
        },
        {
          title: 'core',
          name: 'Vanessa Alvarez',
          email: 'vanessalvarez8a@gmail.com',
          linkedin: 'vanessaalvarez',
          twitter: 'vanessalvarez8a',
          avatar: 'avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Red&eyeType=Side&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Pale',
        },
      ],
    }),
  }
</script>

<style>
  .member h3 {
    font-size: 24px;
    font-weight: 500;
  }
</style>
