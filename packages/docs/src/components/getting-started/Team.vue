<template>
  <v-container grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        v-for="(member, i) in team"
        :key="i"
        xs12
        sm6
        md4
      >
        <getting-started-member :value="member" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
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
          name: 'Heather Hill',
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
      ],
    }),
  }
</script>
