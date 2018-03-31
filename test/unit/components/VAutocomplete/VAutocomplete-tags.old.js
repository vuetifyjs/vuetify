// import { test } from '@/test'
// import VSelect from '@/components/VSelect'
// import VMenu from '@/components/VMenu'

// test('VSelect - tags', ({ mount, compileToFunctions }) => {
//   const backspace = new Event('keydown')
//   backspace.keyCode = 8

//   function createTagsSelect (propsData) {
//     const change = jest.fn()
//     const wrapper = mount(VSelect, {
//       attachToDocument: true,
//       propsData: Object.assign({
//         tags: true,
//         value: []
//       }, propsData)
//     })

//     wrapper.vm.$on('input', change)
//     return { wrapper, change }
//   }

//   it.skip('should create new values when tagging', async () => {
//     const { wrapper, change } = createTagsSelect()

//     const input = wrapper.find('input')[0]

//     wrapper.vm.focus()
//     await wrapper.vm.$nextTick()

//     input.element.value = 'foo'
//     input.trigger('input')
//     await wrapper.vm.$nextTick()
//     await wrapper.vm.$nextTick()

//     input.trigger('keydown.enter')
//     await wrapper.vm.$nextTick()

//     expect(change).toHaveBeenCalledWith(['foo'])
//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })

//   it('should change selectedIndex with keyboard', async () => {
//     const { wrapper } = createTagsSelect({
//       value: ['foo', 'bar']
//     })

//     const input = wrapper.find('input')[0]

//     wrapper.vm.focus()
//     await wrapper.vm.$nextTick()

//     for (const index of [1, 0, -1]) {
//       input.trigger('keydown.left')
//       await wrapper.vm.$nextTick()
//       expect(wrapper.vm.selectedIndex).toBe(index)
//     }

//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })

//   it('should delete a tagged item when selected and backspace/delete is pressed', async () => {
//     const { wrapper, change } = createTagsSelect({
//       value: ['foo', 'bar']
//     })

//     const input = wrapper.find('input')[0]

//     wrapper.vm.focus()

//     input.trigger('keydown.left')
//     expect(wrapper.vm.selectedIndex).toBe(1)

//     input.trigger('keydown.delete')
//     await wrapper.vm.$nextTick()
//     expect(change).toHaveBeenCalledWith(['foo'])
//     expect(wrapper.vm.selectedIndex).toBe(0)

//     input.element.dispatchEvent(backspace) // Avoriaz doesn't wrap keydown.backspace
//     await wrapper.vm.$nextTick()
//     expect(change).toHaveBeenCalledWith([])
//     expect(wrapper.vm.selectedIndex).toBe(-1)

//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })

//   it('should add a tag on tab using the first suggestion', async () => {
//     const { wrapper, change } = createTagsSelect({
//       items: ['bar']
//     })

//     const input = wrapper.find('input')[0]

//     wrapper.vm.focus()
//     await wrapper.vm.$nextTick()

//     input.element.value = 'b'
//     input.trigger('input')
//     input.trigger('keydown.down')
//     input.trigger('keydown.tab')
//     await wrapper.vm.$nextTick()

//     expect(change).toBeCalledWith(['bar'])
//     expect(wrapper.vm.getMenuIndex()).toBe(-1)
//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })

//   it('should add a tag on tab using the current searchValue', async () => {
//     const { wrapper, change } = createTagsSelect({
//       items: ['bar']
//     })

//     const input = wrapper.find('input')[0]

//     wrapper.vm.focus()

//     wrapper.setProps({ searchInput: 'ba' })
//     input.trigger('keydown.tab')
//     await wrapper.vm.$nextTick()
//     expect(change).toBeCalledWith(['ba'])

//     wrapper.setProps({ searchInput: 'it' })
//     input.trigger('keydown.tab')
//     await wrapper.vm.$nextTick()
//     expect(change).toBeCalledWith(['ba', 'it'])

//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })

//   it.skip('should add a tag on enter using the current searchValue', async () => {
//     const { wrapper, change } = createTagsSelect({
//       items: ['bar']
//     })

//     const input = wrapper.find('input')[0]

//     wrapper.vm.focus()
//     await wrapper.vm.$nextTick()

//     input.element.value = 'ba'
//     input.trigger('input')
//     await wrapper.vm.$nextTick()
//     input.trigger('keydown.enter')
//     await wrapper.vm.$nextTick()

//     expect(change).toBeCalledWith(['ba'])
//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })

//   it.skip('should add a tag on left arrow and select the previous tag', async () => {
//     const { wrapper, change } = createTagsSelect({
//       value: ['foo'],
//       items: ['foo', 'bar']
//     })

//     const input = wrapper.find('input')[0]

//     wrapper.vm.focus()
//     await wrapper.vm.$nextTick()

//     input.element.value = 'b'
//     input.trigger('input')
//     await wrapper.vm.$nextTick()
//     input.trigger('keydown.left')
//     await wrapper.vm.$nextTick()

//     expect(change).toBeCalledWith(['foo', 'b'])
//     expect(wrapper.vm.selectedIndex).toBe(0)
//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })

//   it.skip('should remove a duplicate tag and add it to the end', async () => {
//     const { wrapper, change } = createTagsSelect({
//       value: ['foo', 'bar']
//     })

//     const input = wrapper.find('input')[0]

//     wrapper.vm.focus()
//     await wrapper.vm.$nextTick()

//     input.element.value = 'foo'
//     input.trigger('input')
//     input.trigger('keydown.tab')
//     await wrapper.vm.$nextTick()

//     expect(change).toBeCalledWith(['bar', 'foo'])
//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })

//   it.skip('should add tag with valid search value on blur', async () => {
//     const { wrapper, change } = createTagsSelect()

//     const input = wrapper.find('input')[0]

//     wrapper.vm.focus()
//     await wrapper.vm.$nextTick()

//     input.element.value = 'bar'
//     input.trigger('input')
//     await wrapper.vm.$nextTick()

//     wrapper.vm.blur()
//     await wrapper.vm.$nextTick()

//     expect(change).toBeCalledWith(['bar'])
//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })

//   it.skip('should be able to add a tag from user input after deleting a tag with delete', async () => {
//     const { wrapper, change } = createTagsSelect({
//       multiple: true,
//       value: ['foo', 'bar']
//     })

//     let input = wrapper.find('input')[0]

//     wrapper.vm.focus()
//     await wrapper.vm.$nextTick()

//     input.trigger('keydown.left')
//     await wrapper.vm.$nextTick()
//     expect(wrapper.vm.selectedIndex).toBe(1)
//     input.trigger('keydown.delete')
//     await wrapper.vm.$nextTick()
//     expect(change).toHaveBeenCalledWith(['foo'])
//     expect(wrapper.vm.selectedIndex).toBe(0)

//     // Must be reset for input to update
//     wrapper.vm.selectedIndex = -1
//     await wrapper.vm.$nextTick()

//     input.element.value = 'baz'
//     await wrapper.vm.$nextTick()
//     input.trigger('input')
//     await wrapper.vm.$nextTick()
//     input.trigger('keydown.enter')
//     await wrapper.vm.$nextTick()

//     expect(change).toBeCalledWith(['foo', 'baz'])
//     expect(wrapper.vm.selectedIndex).toBe(-1)

//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })

//   it.skip('should be able to add a tag from user input after clicking a deletable chip', async () => {
//     const { wrapper, change } = createTagsSelect({
//       chips: true,
//       clearable: true,
//       deletableChips: true,
//       multiple: true,
//       value: ['foo', 'bar']
//     })
//     await wrapper.vm.$nextTick()

//     const input = wrapper.find('input')[0]
//     const chip = wrapper.find('.chip')[1]
//     const close = chip.find('.chip__close')[0]

//     wrapper.vm.focus()
//     chip.trigger('click')
//     await wrapper.vm.$nextTick()
//     close.trigger('click')
//     await wrapper.vm.$nextTick()
//     expect(change).toHaveBeenCalledWith(['foo'])
//     expect(wrapper.vm.selectedIndex).toBe(-1)

//     input.element.value = 'baz'
//     await wrapper.vm.$nextTick()
//     input.trigger('input')
//     await wrapper.vm.$nextTick()
//     expect(wrapper.vm.searchValue).toBe('baz')
//     input.trigger('keydown.enter')
//     await wrapper.vm.$nextTick()

//     expect(change).toBeCalledWith(['foo', 'baz'])
//     expect(wrapper.vm.selectedIndex).toBe(-1)

//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })

//   it.skip('should not change search when selecting an index', () => {
//     const { wrapper } = createTagsSelect({
//       chips: true,
//       multiple: true,
//       value: ['foo', 'bar']
//     })

//     const input = wrapper.find('input')[0]

//     input.trigger('focus')
//     expect(wrapper.vm.selectedIndex).toBe(-1)

//     input.trigger('keydown.left')
//     expect(wrapper.vm.selectedIndex).toBe(1)

//     input.element.value = 'fizz'
//     input.trigger('input')
//     expect(wrapper.vm.searchValue).toBe(null)

//     input.trigger('keydown.right')
//     expect(wrapper.vm.selectedIndex).toBe(-1)

//     input.element.value = 'fizz'
//     input.trigger('input')
//     expect(wrapper.vm.searchValue).toBe('fizz')

//     expect('Unable to locate target [data-app]').toHaveBeenTipped()
//   })
// })
