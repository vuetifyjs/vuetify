import VEditDialog from '../VEditDialog'
import VMenu from '../../VMenu'

import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import { keyCodes } from '../../../util/helpers'
import mixins from '../../../util/mixins'

describe('VEditDialog.ts', () => {
  type Instance = InstanceType<typeof VEditDialog>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    document.body.setAttribute('data-app', 'true')

    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VEditDialog, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        mocks: {
          $vuetify: {
            theme: {
              dark: false,
            },
          },
        },
        ...options,
      })
    }
  })

  it('should render', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render custom button texts', () => {
    const wrapper = mountFunction({
      propsData: {
        cancelText: `I don't want to modify that!`,
        saveText: 'Save it!',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should open and close', async () => {
    jest.useFakeTimers()

    const open = jest.fn()
    const close = jest.fn()

    const wrapper = mountFunction({
      listeners: {
        open,
        close,
      },
    })

    wrapper.vm.isActive = true
    await wrapper.vm.$nextTick()
    expect(open).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(wrapper.vm.focus, 50)

    wrapper.vm.isActive = false
    await wrapper.vm.$nextTick()
    expect(close).toHaveBeenCalledTimes(1)

    jest.useRealTimers()
  })

  it('should react to menu', async () => {
    const open = jest.fn()
    const close = jest.fn()

    const wrapper = mountFunction({
      listeners: {
        open,
        close,
      },
    })

    const menu = wrapper.find(VMenu)

    menu.vm.$emit('input', true)
    await wrapper.vm.$nextTick()
    expect(open).toHaveBeenCalledTimes(1)

    menu.vm.$emit('input', false)
    await wrapper.vm.$nextTick()
    expect(close).toHaveBeenCalledTimes(1)
  })

  it('should react to input', async () => {
    jest.useFakeTimers()

    const parentWrapper = mount({
      template: `
        <v-edit-dialog :return-value.sync="val">
          <template v-slot:input>
            <input v-model="val" class="test"/>
          </template>
        </v-edit-dialog>
      `,
      components: {
        'v-edit-dialog': mixins(VEditDialog).extend({
          render () {
            return this.genContent()
          },
        }),
      },
      data () {
        return {
          val: '',
        }
      },
    })

    const wrapper = parentWrapper.find(VEditDialog)
    const field = parentWrapper.find('input.test')
    const input = wrapper.vm.$refs.content as HTMLElement

    // Make sure originalValue gets set
    wrapper.vm.isActive = true
    field.setValue('test')
    input.dispatchEvent(new KeyboardEvent('keydown', { keyCode: keyCodes.esc } as KeyboardEventInit))
    expect(wrapper.emitted('cancel')).toBeTruthy()
    expect(wrapper.emitted('update:return-value')[0]).toEqual([''])
    expect(wrapper.props('returnValue')).toBe('')

    wrapper.vm.isActive = true
    field.setValue('test')
    input.dispatchEvent(new KeyboardEvent('keydown', { keyCode: keyCodes.enter } as KeyboardEventInit))
    expect(wrapper.emitted('save')).toBeTruthy()
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function))
    jest.advanceTimersByTime(0)
    expect(wrapper.emitted('update:return-value')[1]).toEqual(['test'])
    expect(wrapper.props('returnValue')).toBe('test')

    jest.useRealTimers()
  })

  it('should render button', () => {
    const fn = jest.fn()

    const wrapper = mountFunction({
      render () {
        return this.genButton(fn, 'test')
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    const btn = wrapper.find('.v-btn')
    btn.trigger('click')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should focus', () => {
    const wrapper = mountFunction({
      render () {
        return this.genContent()
      },
      slots: {
        input: '<input class="test" />',
      },
    })

    const input = wrapper.find('input.test')

    expect(document.activeElement).not.toEqual(input.element as HTMLInputElement)
    wrapper.vm.focus()
    expect(document.activeElement).toEqual(input.element as HTMLInputElement)
  })

  it('should render actions', () => {
    const save = jest.fn()
    const saveEvent = jest.fn()

    const wrapper = mountFunction({
      methods: {
        save,
      },
      render () {
        return this.genActions()
      },
      listeners: {
        save: saveEvent,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    const btn = wrapper.find('.v-btn:last-child')
    btn.trigger('click')
    expect(save).toHaveBeenCalledTimes(1)
    expect(saveEvent).toHaveBeenCalledTimes(1)
  })

  it('should cancel', () => {
    const cancel = jest.fn()
    const wrapper = mountFunction({
      listeners: {
        cancel,
      },
      data: () => ({
        isActive: true,
      }),
    })

    wrapper.vm.cancel()
    expect(wrapper.vm.isActive).toBeFalsy()
    expect(cancel).toHaveBeenCalledTimes(1)
  })
})
