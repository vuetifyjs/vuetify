// Components
import { VMenu } from '../VMenu'
import { VBtn } from '@/components/VBtn'
import { VList, VListItem } from '@/components/VList'
import { VSheet } from '@/components/VSheet'
import { VTextarea } from '@/components/VTextarea'
import { VTextField } from '@/components/VTextField'

// Utilities
import { render, screen, userEvent, wait } from '@test'
import { ref } from 'vue'

describe('VMenu', () => {
  it('should return focus to the activator on Escape', async () => {
    render(() => (
      <VTextField data-testid="field" placeholder="Click or focus">
        <VMenu activator="parent" closeOnContentClick={ false }>
          <VSheet class="pa-3" data-testid="menu-content">
            <p>Non-form content</p>
          </VSheet>
        </VMenu>
      </VTextField>
    ))

    const input = screen.getByCSS('[data-testid="field"] input')
    await userEvent.click(input)
    await expect.poll(() => screen.queryByTestId('menu-content')).toBeVisible()

    await userEvent.keyboard('{Escape}')
    await expect.poll(() => screen.queryByTestId('menu-content')).toBeNull()

    expect(document.activeElement).toBe(input)
  })

  it('should close when Tab exits the content with no next focusable element', async () => {
    const model = ref(false)
    render(() => (
      <VBtn data-testid="btn">
        Open
        <VMenu v-model={ model.value } activator="parent" closeOnContentClick={ false }>
          <VSheet class="pa-3" data-testid="menu-content">
            <button data-testid="only-button">Only</button>
          </VSheet>
        </VMenu>
      </VBtn>
    ))

    await userEvent.click(screen.getByTestId('btn'))
    await expect.poll(() => screen.queryByTestId('menu-content')).toBeVisible()

    screen.getByTestId('only-button').focus()
    await userEvent.keyboard('{Tab}')
    await wait(60)

    expect(model.value).toBe(false)
  })

  it('should not prevent Enter on an input inside menu content', async () => {
    const onEnter = vi.fn()
    render(() => (
      <VBtn data-testid="btn">
        Open
        <VMenu activator="parent" closeOnContentClick={ false }>
          <VSheet class="pa-3">
            <input data-testid="menu-input" />
          </VSheet>
        </VMenu>
      </VBtn>
    ))

    await userEvent.click(screen.getByTestId('btn'))
    await wait(150)

    const input = screen.getByTestId('menu-input')
    input.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') onEnter(e.defaultPrevented)
    })
    input.focus()
    await wait(50)
    expect(document.activeElement).toBe(input)

    await userEvent.keyboard('{Enter}')

    expect(onEnter).toHaveBeenCalledWith(false)
  })

  it('should not prevent Enter on a textarea inside menu content', async () => {
    const onEnter = vi.fn()
    render(() => (
      <VBtn data-testid="btn">
        Open
        <VMenu activator="parent" closeOnContentClick={ false }>
          <VSheet class="pa-3">
            <textarea data-testid="menu-textarea" />
          </VSheet>
        </VMenu>
      </VBtn>
    ))

    await userEvent.click(screen.getByTestId('btn'))
    await wait(150)

    const textarea = screen.getByTestId('menu-textarea')
    textarea.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') onEnter(e.defaultPrevented)
    })
    textarea.focus()
    await wait(50)
    expect(document.activeElement).toBe(textarea)

    await userEvent.keyboard('{Enter}')

    expect(onEnter).toHaveBeenCalledWith(false)
  })

  it('should not prevent Enter on a button inside menu content', async () => {
    const onClick = vi.fn()
    render(() => (
      <VBtn data-testid="btn">
        Open
        <VMenu activator="parent" closeOnContentClick={ false }>
          <VSheet class="pa-3">
            <button data-testid="menu-action" onClick={ onClick }>OK</button>
          </VSheet>
        </VMenu>
      </VBtn>
    ))

    await userEvent.click(screen.getByTestId('btn'))
    await wait(150)

    const action = screen.getByTestId('menu-action')
    action.focus()
    await wait(50)
    expect(document.activeElement).toBe(action)

    await userEvent.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should capture focus into a VTextarea inside menu content', async () => {
    render(() => (
      <VBtn data-testid="btn">
        Open
        <VMenu activator="parent" closeOnContentClick={ false }>
          <VSheet class="pa-3" width="280">
            <VTextField label="Title" />
            <VTextarea data-testid="notes" label="Notes" rows={ 3 } />
          </VSheet>
        </VMenu>
      </VBtn>
    ))

    await userEvent.click(screen.getByTestId('btn'))
    await wait(50)

    const textarea = screen.getByCSS('[data-testid="notes"] textarea')
    textarea.focus()
    expect(document.activeElement).toBe(textarea)

    await userEvent.keyboard('hello')

    expect(textarea).toHaveValue('hello')
  })

  it('should capture focus into a VList when tabbing into an open-on-focus button', async () => {
    render(() => (
      <div>
        <button data-testid="before">before</button>
        <VBtn data-testid="btn">
          Open
          <VMenu activator="parent" openOnFocus closeOnContentClick={ false }>
            <VList data-testid="menu-list">
              <VListItem data-testid="item-1" link>Item 1</VListItem>
              <VListItem link>Item 2</VListItem>
            </VList>
          </VMenu>
        </VBtn>
        <button data-testid="after">after</button>
      </div>
    ))

    screen.getByTestId('before').focus()
    await userEvent.keyboard('{Tab}')
    await wait(50)

    await expect.poll(() => screen.queryByTestId('menu-list')).toBeVisible()
  })

  it('should not reopen via open-on-focus after click-outside', async () => {
    const model = ref(false)
    render(() => (
      <div>
        <button data-testid="before">before</button>
        <VBtn data-testid="btn">
          Open
          <VMenu
            v-model={ model.value }
            activator="parent"
            openOnFocus
            closeOnContentClick={ false }
          >
            <VList data-testid="menu-list">
              <VListItem link>Item 1</VListItem>
            </VList>
          </VMenu>
        </VBtn>
        <div data-testid="outside" style="padding: 24px;">outside</div>
      </div>
    ))

    screen.getByTestId('before').focus()
    await userEvent.keyboard('{Tab}')
    await wait(400)
    await expect.poll(() => model.value).toBe(true)

    await userEvent.click(screen.getByTestId('outside'))
    await wait(300)
    expect(model.value).toBe(false)

    await wait(200)
    expect(model.value).toBe(false)
  })

  it('should not return focus to the activator when Tab moves focus to the next element', async () => {
    const model = ref(false)
    render(() => (
      <div>
        <button data-testid="before">before</button>
        <VBtn data-testid="btn">
          Open
          <VMenu
            v-model={ model.value }
            activator="parent"
            openOnFocus
            captureFocus={ false }
            closeOnContentClick={ false }
          >
            <VSheet class="pa-3" data-testid="menu-content">No focusable content</VSheet>
          </VMenu>
        </VBtn>
        <button data-testid="after">after</button>
      </div>
    ))

    screen.getByTestId('before').focus()
    await userEvent.keyboard('{Tab}')
    await wait(400)

    const btn = screen.getByTestId('btn')
    const after = screen.getByTestId('after')
    await expect.poll(() => model.value).toBe(true)
    expect(document.activeElement).toBe(btn)

    await userEvent.keyboard('{Tab}')
    await wait(300)

    expect(model.value).toBe(false)
    expect(document.activeElement).toBe(after)
  })
})
