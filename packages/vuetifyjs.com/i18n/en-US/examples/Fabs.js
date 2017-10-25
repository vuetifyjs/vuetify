export default {
  promotedAction: {
    header: "Promoted action",
    desc: `Floating action buttons can be attached to material to signify a promoted action in your application. The default size will be used in most cases, whereas the <code>small</code> variant can be used to maintain continuity with similar sized elements.`
  },
  small: {
    header: "Small variant",
    desc: `For better visual appeal, we use a small button to match our list avatars.`
  },
  displayAnimation: {
    header: "Display animation",
    desc: `When displaying for the first time, a floating action button should animate onto the screen. Here we use the <code>v-fab-transition</code> with v-show. You can also use any custom transition provided by Vuetify or your own.`
  },
  lateralScreens: {
    header: "Lateral screens",
    desc: `When changing the default action of your button, it is recommended that you display a transition to signify a change. We do this by binding the <code>key</code> prop to a piece of data that can properly signal a change in action to the Vue transition system. While you can use a custom transition for this, ensure that you set the <code>mode</code> prop to <strong>out-in</strong>.`
  },
  speedDial: {
    header: "FAB with speed-dial",
    desc: `The speed-dial component has an very robust api for customizing your FAB experience exactly how you want.`
  }
}
