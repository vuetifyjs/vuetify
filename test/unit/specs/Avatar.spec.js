import Vue from 'vue/dist/vue.common'
import Vuetify from 'src/index'
import { mount } from 'avoriaz'
import { Avatar } from 'src/components/avatars'

Vue.use(Vuetify)

describe('Avatar.vue', () => {

  it('should render correct contents', () => {
    // There seems to be a problem mounting functional components using avoriaz?
    // Had to do it like this to make it not throw errors.
    // Need to investigate more

    const vm = new Vue({
      template: '<div><v-avatar></v-avatar></div>',
    }).$mount()

    expect(vm.$el.querySelector('.avatar')).not.toBeNull()
  })

})
