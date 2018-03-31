// it.skip('should warn when using incorrect item together with segmented prop', async () => {
//     const items = [
//       { text: 'Hello', callback: () => {} },
//       { text: 'Hello' }
//     ]

//     const wrapper = mount(VSelect, {
//       propsData: {
//         segmented: true,
//         items
//       }
//     })

//     wrapper.vm.inputValue = items[1]

//     await wrapper.vm.$nextTick()

//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//     expect('items must contain both a text and callback property').toHaveBeenTipped()
//   })

// it.skip('should render buttons correctly when using items array with segmented prop', async () => {
//     const items = [
//       { text: 'Hello', callback: () => {} }
//     ]

//     const wrapper = mount(VSelect, {
//       propsData: {
//         segmented: true,
//         items
//       }
//     })

//     wrapper.vm.inputValue = items[0]

//     await wrapper.vm.$nextTick()

//     expect(wrapper.html()).toMatchSnapshot()
//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })

//   it.skip('should render buttons correctly when using slot with segmented prop', async () => {
//     const items = [
//       { text: 'Hello' }
//     ]

//     const vm = new Vue()
//     const selection = props => vm.$createElement('div', [props.item])
//     const component = Vue.component('test', {
//       render (h) {
//         return h(VSelect, {
//           props: {
//             segmented: true,
//             items
//           },
//           scopedSlots: {
//             selection
//           }
//         })
//       }
//     })

//     const wrapper = mount(component)

//     wrapper.vm.$children[0].inputValue = items[0]

//     await wrapper.vm.$nextTick()

//     expect(wrapper.html()).toMatchSnapshot()
//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })



  // it('should have the proper nudge', async () => {
  //   const wrapper = mount(VSelect, {
  //     attachToDocument: true,
  //     propsData: {
  //       hideDetails: true,
  //       items: ['foo', 'bar']
  //     }
  //   })

  //   expect(wrapper.vm.nudgeTop).toBe(-18)

  //   wrapper.setProps({ autocomplete: true })

  //   expect(wrapper.vm.nudgeTop).toBe(0)

  //   wrapper.setProps({ autocomplete: false, overflow: true })

  //   expect(wrapper.vm.nudgeTop).toBe(2)

  //   wrapper.setProps({ auto: true, overflow: false })

  //   expect(wrapper.vm.nudgeTop).toBe(-18)

  //   wrapper.setProps({ auto: false, overflow: true, hideDetails: false })

  //   expect(wrapper.vm.nudgeTop).toBe(26)

  //   wrapper.setProps({ hideDetails: true })

  //   expect(wrapper.vm.nudgeTop).toBe(2)

  //   expect('Unable to locate target [data-app]').toHaveBeenTipped()
  // })
