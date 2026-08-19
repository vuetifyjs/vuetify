// Components
import { VMenu } from '../VMenu'
import { VAutocomplete } from '@/components/VAutocomplete'
import { VBtn } from '@/components/VBtn'
import { VDialog } from '@/components/VDialog'
import { VList, VListItem, VListItemTitle } from '@/components/VList'
import { VSheet } from '@/components/VSheet'
import { VTextarea } from '@/components/VTextarea'
import { VTextField } from '@/components/VTextField'
import { VTooltip } from '@/components/VTooltip'

// Utilities
import { commands, render, screen, userEvent, wait } from '@test'
import { ref } from 'vue'

describe('VMenu', () => {
  describe('open-on-focus with template activator', () => {
    beforeEach(() => commands.setFocusEmulationDisabled())

    afterEach(() => commands.setFocusEmulationEnabled())

    it('should stay open across multiple clicks inside the content', async () => {
      render(() => (
        <VMenu openOnFocus closeOnContentClick={ false }>
          {{
            activator: ({ props }: any) => <VTextField { ...props } data-testid="field" placeholder="Click on me" />,
            default: () => (
              <VSheet class="pa-3" data-testid="menu-content">
                <button data-testid="inner-btn">Inner</button>
                <div data-testid="empty-region" style="height: 40px;">Empty</div>
              </VSheet>
            ),
          }}
        </VMenu>
      ))

      const input = screen.getByCSS('[data-testid="field"] input')
      await userEvent.click(input)
      await wait(400)
      await expect.poll(() => screen.queryByTestId('menu-content')).toBeVisible()

      input.blur()
      await wait(500)
      expect(screen.queryByTestId('menu-content')).toBeVisible()

      const innerBtn = screen.getByTestId('inner-btn')
      innerBtn.focus()
      await wait(50)
      innerBtn.blur()
      await wait(500)

      expect(screen.queryByTestId('menu-content')).toBeVisible()
    })
  })

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

  it('should stay closed when @keydown.enter handler closes the menu from inside a text field', async () => {
    const model = ref(false)
    render(() => (
      <VMenu v-model={ model.value } closeOnContentClick={ false }>
        {{
          activator: ({ props }: any) => <VBtn { ...props } data-testid="btn">Menu</VBtn>,
          default: () => (
            <VSheet class="pa-3" width="400">
              <VTextField label="Field 1" />
              <VTextField
                data-testid="field-2"
                label="Field 2"
                onKeydown={ (e: KeyboardEvent) => {
                  if (e.key === 'Enter') model.value = false
                }}
              />
            </VSheet>
          ),
        }}
      </VMenu>
    ))

    await userEvent.click(screen.getByTestId('btn'))
    await expect.poll(() => model.value).toBe(true)

    const input = screen.getByCSS('[data-testid="field-2"] input')
    await expect.poll(() => {
      input.focus()
      return document.activeElement
    }).toBe(input)

    await userEvent.keyboard('{Enter}')
    await wait(300)
    expect(model.value).toBe(false)

    await wait(200)
    expect(model.value).toBe(false)
  })

  describe('cascade close', () => {
    beforeEach(() => commands.setReduceMotionDisabled())

    afterEach(() => commands.setReduceMotionEnabled())

    it('should keep submenus open on mouse-leave when the root menu was not hover-opened', async () => {
      render(() => (
        <div>
          <VBtn data-testid="top-btn">
            Open
            <VMenu activator="parent">
              <VList>
                <VListItem data-testid="l1-item" link>
                  <span>L1</span>
                  <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                    <VList>
                      <VListItem data-testid="l2-item" link>L2</VListItem>
                    </VList>
                  </VMenu>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
          <div data-testid="outside" style="height: 40px;">outside</div>
        </div>
      ))

      // root opened by click → the whole chain is sticky against hover-leave
      await userEvent.click(screen.getByTestId('top-btn'))
      await expect.poll(() => screen.queryByTestId('l1-item')).toBeVisible()

      // hover-opened submenu, then leave entirely → stays open
      await userEvent.hover(screen.getByTestId('l1-item'))
      await expect.poll(() => screen.queryByTestId('l2-item')).toBeVisible()
      await userEvent.hover(screen.getByTestId('outside'))
      await wait(600)
      expect(screen.queryByTestId('l2-item')).toBeVisible()

      // keyboard-opened submenu, then leave → also stays open
      screen.getByTestId('l1-item').focus()
      await userEvent.keyboard('{ArrowRight}')
      await expect.poll(() => screen.queryByTestId('l2-item')).toBeVisible()
      await userEvent.hover(screen.getByTestId('outside'))
      await wait(600)

      expect(screen.queryByTestId('l2-item')).toBeVisible()
    })

    it('should collapse the whole chain when the cursor leaves a hover-opened root menu', async () => {
      render(() => (
        <div>
          <VBtn data-testid="top-btn" openOnHover>
            Open
            <VMenu activator="parent" openOnHover>
              <VList>
                <VListItem data-testid="l1-item" link>
                  <span>L1</span>
                  <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                    <VList>
                      <VListItem data-testid="l2-item" link>
                        <span>L2</span>
                        <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                          <VList>
                            <VListItem data-testid="l3-item" link>L3</VListItem>
                          </VList>
                        </VMenu>
                      </VListItem>
                    </VList>
                  </VMenu>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
          <div data-testid="outside" style="height: 200px;">outside</div>
        </div>
      ))

      // hover the whole chain open
      await userEvent.hover(screen.getByTestId('top-btn'))
      await expect.poll(() => screen.queryByTestId('l1-item')).toBeVisible()
      await userEvent.hover(screen.getByTestId('l1-item'))
      await expect.poll(() => screen.queryByTestId('l2-item')).toBeVisible()
      await userEvent.hover(screen.getByTestId('l2-item'))
      await expect.poll(() => screen.queryByTestId('l3-item')).toBeVisible()

      // cursor leaves everything → the entire tree collapses (root was hover-opened)
      await userEvent.hover(screen.getByTestId('outside'))

      await expect.poll(() => screen.queryByTestId('l3-item'), { timeout: 2500 }).toBeNull()
      await expect.poll(() => screen.queryByTestId('l2-item'), { timeout: 2500 }).toBeNull()
      await expect.poll(() => screen.queryByTestId('l1-item'), { timeout: 2500 }).toBeNull()
    })

    it('should return focus to the top-level activator after clicking the deepest item', async () => {
      render(() => (
        <div>
          <button data-testid="before">before</button>
          <VBtn data-testid="top-btn">
            Open
            <VMenu activator="parent">
              <VList>
                <VListItem data-testid="l1-item" link>
                  <span>L1</span>
                  <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                    <VList>
                      <VListItem data-testid="l2-item" link>
                        <span>L2</span>
                        <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                          <VList>
                            <VListItem data-testid="l3-item" link>L3</VListItem>
                          </VList>
                        </VMenu>
                      </VListItem>
                    </VList>
                  </VMenu>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </div>
      ))

      const topBtn = screen.getByTestId('top-btn')
      await userEvent.click(topBtn)
      await expect.poll(() => screen.queryByTestId('l1-item')).toBeVisible()

      await userEvent.hover(screen.getByTestId('l1-item'))
      await expect.poll(() => screen.queryByTestId('l2-item')).toBeVisible()

      await userEvent.hover(screen.getByTestId('l2-item'))
      await expect.poll(() => screen.queryByTestId('l3-item')).toBeVisible()

      await userEvent.click(screen.getByTestId('l3-item'))
      await wait(300)
      await expect.poll(() => screen.queryByTestId('l1-item')).toBeNull()

      expect(document.activeElement).toBe(topBtn)
    })

    // The hover-leave verdict only follows the menu chain for actual submenus. A tooltip
    // (or any non-submenu overlay) nested in a click-opened menu must still close on its own.
    it('should close a tooltip nested in a click-opened menu when the mouse leaves', async () => {
      render(() => (
        <div>
          <VBtn data-testid="top-btn">
            Open
            <VMenu activator="parent">
              <VList>
                <VListItem data-testid="item" link>
                  <span>Item</span>
                  <VTooltip activator="parent" openOnHover>
                    <span data-testid="tip">tip</span>
                  </VTooltip>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
          <div data-testid="outside" style="height: 40px;">outside</div>
        </div>
      ))

      await userEvent.click(screen.getByTestId('top-btn'))
      await expect.poll(() => screen.queryByTestId('item')).toBeVisible()

      await userEvent.hover(screen.getByTestId('item'))
      await expect.poll(() => screen.queryByTestId('tip')).toBeVisible()

      // VTooltip is eager, so its content stays mounted — assert it hides, not unmounts
      await userEvent.hover(screen.getByTestId('outside'))
      await expect.poll(() => screen.queryByTestId('tip')).not.toBeVisible()
    })

    it('should keep the parent menu open when parts of inner content hide on click', async () => {
      const showMore = ref(false)
      render(() => (
        <VBtn data-testid="menu-activator">
          Open
          <VMenu activator="parent" closeOnContentClick={ false }>
            <VSheet class="pa-3" data-testid="menu-content">
              <VBtn data-testid="submenu-activator" onClick={ () => (showMore.value = true) }>
                Show more
                <VMenu activator="parent" closeOnContentClick={ false } location="end top">
                  <VSheet class="pa-3">Submenu content</VSheet>
                </VMenu>
              </VBtn>
              { showMore.value && (
                <div
                  data-testid="collapsible-content"
                  style="height: 200px;"
                  onClick={ () => (showMore.value = false) }
                >More content</div>
              )}
            </VSheet>
          </VMenu>
        </VBtn>
      ))

      await userEvent.click(screen.getByTestId('menu-activator'))
      await expect.poll(() => screen.queryByTestId('menu-content')).toBeVisible()

      await userEvent.click(screen.getByTestId('submenu-activator'))
      await expect.poll(() => screen.queryByText('Submenu content')).toBeVisible()

      await userEvent.click(screen.getByTestId('collapsible-content'))
      await wait(300)

      expect(screen.queryByTestId('menu-content')).toBeVisible()
    })

    it('should close the whole stack when clicking outside with submenus open', async () => {
      render(() => (
        <div>
          <VBtn data-testid="opener">
            Open
            <VMenu activator="parent">
              <VList>
                <VListItem data-testid="l1" link>
                  <VListItemTitle>L1</VListItemTitle>
                  <VMenu activator="parent" openOnHover submenu>
                    <VList>
                      <VListItem data-testid="l2" link>
                        <VListItemTitle>L2</VListItemTitle>
                        <VMenu activator="parent" openOnHover submenu>
                          <VList>
                            <VListItem data-testid="l3" link>L3</VListItem>
                          </VList>
                        </VMenu>
                      </VListItem>
                    </VList>
                  </VMenu>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
          <div data-testid="outside" style="position: fixed; bottom: 0; right: 0; width: 120px; height: 120px;">out</div>
        </div>
      ))

      await userEvent.click(screen.getByTestId('opener'))
      await expect.poll(() => screen.queryByTestId('l1')).toBeVisible()
      await userEvent.hover(screen.getByTestId('l1'))
      await expect.poll(() => screen.queryByTestId('l2')).toBeVisible()
      await userEvent.hover(screen.getByTestId('l2'))
      await expect.poll(() => screen.queryByTestId('l3')).toBeVisible()

      await userEvent.click(screen.getByTestId('outside'))
      await expect.poll(() => screen.queryByTestId('l1')).toBeNull()
    })

    it('should return focus to the activator after clicking an interactive tooltip inside the content', async () => {
      render(() => (
        <div>
          <VBtn data-testid="opener">
            Open
            <VMenu activator="parent" closeOnContentClick={ false }>
              <VSheet class="pa-4" data-testid="menu-content">
                <VTextField data-testid="field" />
                <VBtn data-testid="tip-activator">
                  Hover me
                  <VTooltip activator="parent" interactive openOnHover>
                    <span data-testid="tip-content">Tooltip</span>
                  </VTooltip>
                </VBtn>
              </VSheet>
            </VMenu>
          </VBtn>
          <div data-testid="away" style="position: fixed; bottom: 0; right: 0; width: 120px; height: 120px;">away</div>
        </div>
      ))

      await userEvent.click(screen.getByTestId('opener'))
      await expect.poll(() => screen.queryByTestId('menu-content')).toBeVisible()

      await userEvent.click(screen.getByCSS('[data-testid="field"] input'))

      await userEvent.hover(screen.getByTestId('tip-activator'))
      await expect.poll(() => screen.queryByTestId('tip-content')).toBeVisible()
      await userEvent.click(screen.getByTestId('tip-content'))

      await userEvent.keyboard('{Escape}')
      await expect.poll(() => screen.queryByTestId('tip-content')).toBeNull()

      await userEvent.keyboard('{Escape}')
      await expect.poll(() => screen.queryByTestId('menu-content')).toBeNull()
      await expect.poll(() => screen.getByTestId('opener')).toHaveFocus()
    })

    it('should close the parent menu when clicking outside an autocomplete child', async () => {
      render(() => (
        <div>
          <VBtn data-testid="opener">
            Open
            <VMenu activator="parent" closeOnContentClick={ false }>
              <VSheet class="pa-4" data-testid="menu-content">
                <VAutocomplete items={['California', 'Colorado', 'Florida', 'Texas']} label="Autocomplete" />
              </VSheet>
            </VMenu>
          </VBtn>
          <div data-testid="outside" style="position: fixed; bottom: 0; right: 0; width: 120px; height: 120px;">out</div>
        </div>
      ))

      await userEvent.click(screen.getByTestId('opener'))
      await expect.poll(() => screen.queryByTestId('menu-content')).toBeVisible()
      await userEvent.click(screen.getByCSS('[role="combobox"] input'))
      await expect.poll(() => screen.queryByText('California')).toBeVisible()

      await userEvent.click(screen.getByTestId('outside'))
      await expect.poll(() => screen.queryByTestId('menu-content')).toBeNull()
    })

    it('should keep the top menu open when clicking a sibling after opening a deep submenu', async () => {
      render(() => (
        <VBtn data-testid="opener">
          Open
          <VMenu activator="parent">
            <VList>
              <VListItem data-testid="l1-1" link>
                <VListItemTitle>L1.1</VListItemTitle>
                <VMenu activator="parent" submenu>
                  <VList>
                    <VListItem data-testid="l2-1" link>
                      <VListItemTitle>L2.1</VListItemTitle>
                      <VMenu activator="parent" submenu>
                        <VList>
                          <VListItem data-testid="l3-1" link>L3.1</VListItem>
                        </VList>
                      </VMenu>
                    </VListItem>
                  </VList>
                </VMenu>
              </VListItem>
              <VListItem data-testid="l1-2" link>
                <VListItemTitle>L1.2</VListItemTitle>
                <VMenu activator="parent" submenu>
                  <VList>
                    <VListItem data-testid="l2-2" link>L2.2</VListItem>
                  </VList>
                </VMenu>
              </VListItem>
            </VList>
          </VMenu>
        </VBtn>
      ))

      await userEvent.click(screen.getByTestId('opener'))
      await expect.poll(() => screen.queryByTestId('l1-1')).toBeVisible()
      await userEvent.click(screen.getByTestId('l1-1'))
      await expect.poll(() => screen.queryByTestId('l2-1')).toBeVisible()
      await userEvent.click(screen.getByTestId('l2-1'))
      await expect.poll(() => screen.queryByTestId('l3-1')).toBeVisible()

      await userEvent.click(screen.getByTestId('l1-2'))
      await wait(300)

      // Top menu stays open, the previously open branch collapses.
      expect(screen.queryByTestId('l1-1')).toBeVisible()
      expect(screen.queryByTestId('l3-1')).toBeNull()
    })

    // A non-menu overlay child (tooltip, plain overlay) doesn't participate in the
    // menu close cascade, so an outside click used to leave the menu open.
    it('should close the menu on outside click while a tooltip child is open', async () => {
      render(() => (
        <div>
          <VBtn data-testid="opener">
            Open
            <VMenu activator="parent" closeOnContentClick={ false }>
              <VSheet class="pa-4" data-testid="menu-content">
                <VBtn data-testid="tip-btn">
                  Tip
                  <VTooltip activator="parent" openOnHover={ false } openOnClick>Tooltip</VTooltip>
                </VBtn>
                <VBtn data-testid="other">Other</VBtn>
              </VSheet>
            </VMenu>
          </VBtn>
          <div data-testid="outside" style="position: fixed; bottom: 0; right: 0; width: 120px; height: 120px;">out</div>
        </div>
      ))

      await userEvent.click(screen.getByTestId('opener'))
      await expect.poll(() => screen.queryByTestId('menu-content')).toBeVisible()
      await userEvent.click(screen.getByTestId('tip-btn'))
      await expect.poll(() => screen.queryByText('Tooltip')).toBeVisible()

      await userEvent.click(screen.getByTestId('outside'))
      await expect.poll(() => screen.queryByTestId('menu-content')).toBeNull()
    })

    it('should keep the menu open when clicking inside it while a tooltip child is open', async () => {
      render(() => (
        <VBtn data-testid="opener">
          Open
          <VMenu activator="parent" closeOnContentClick={ false }>
            <VSheet class="pa-4" data-testid="menu-content">
              <VBtn data-testid="tip-btn">
                Tip
                <VTooltip activator="parent" openOnHover={ false } openOnClick>Tooltip</VTooltip>
              </VBtn>
              <VBtn data-testid="other">Other</VBtn>
            </VSheet>
          </VMenu>
        </VBtn>
      ))

      await userEvent.click(screen.getByTestId('opener'))
      await expect.poll(() => screen.queryByTestId('menu-content')).toBeVisible()
      await userEvent.click(screen.getByTestId('tip-btn'))
      await expect.poll(() => screen.queryByText('Tooltip')).toBeVisible()

      await userEvent.click(screen.getByTestId('other'))
      await wait(300)
      expect(screen.queryByTestId('menu-content')).toBeVisible()
    })

    it('should keep the menu open when dismissing a scrimmed child overlay', async () => {
      render(() => (
        <VBtn data-testid="opener">
          Open
          <VMenu activator="parent" closeOnContentClick={ false }>
            <VSheet class="pa-4" data-testid="menu-content">
              <VBtn data-testid="dialog-btn">
                Dialog
                <VDialog activator="parent" width="200">
                  <VSheet class="pa-4" data-testid="dialog-content">Dialog</VSheet>
                </VDialog>
              </VBtn>
            </VSheet>
          </VMenu>
        </VBtn>
      ))

      await userEvent.click(screen.getByTestId('opener'))
      await expect.poll(() => screen.queryByTestId('menu-content')).toBeVisible()
      await userEvent.click(screen.getByTestId('dialog-btn'))
      await expect.poll(() => screen.queryByTestId('dialog-content')).toBeVisible()

      await userEvent.click(document.querySelector('.v-overlay__scrim')!, { position: { x: 5, y: 5 } })
      await expect.poll(() => screen.queryByTestId('dialog-content')).toBeNull()
      await wait(300)
      expect(screen.queryByTestId('menu-content')).toBeVisible()
    })

    it('should not close a hosting menu when clicking an item of a menu inside a dialog', async () => {
      render(() => (
        <VBtn data-testid="opener">
          Open
          <VMenu activator="parent" closeOnContentClick={ false }>
            <VSheet class="pa-4" data-testid="menu-content">
              <VBtn data-testid="dialog-btn">
                Dialog
                <VDialog activator="parent" width="300">
                  <VSheet class="pa-4" data-testid="dialog-content">
                    <VBtn data-testid="inner-opener">
                      Inner menu
                      <VMenu activator="parent">
                        <VBtn data-testid="inner-item">
                          Item
                          <VMenu activator="parent" submenu>
                            <VBtn data-testid="deep-item">Deep</VBtn>
                          </VMenu>
                        </VBtn>
                      </VMenu>
                    </VBtn>
                  </VSheet>
                </VDialog>
              </VBtn>
            </VSheet>
          </VMenu>
        </VBtn>
      ))

      await userEvent.click(screen.getByTestId('opener'))
      await expect.poll(() => screen.queryByTestId('menu-content')).toBeVisible()
      await userEvent.click(screen.getByTestId('dialog-btn'))
      await expect.poll(() => screen.queryByTestId('dialog-content')).toBeVisible()

      await userEvent.click(screen.getByTestId('inner-opener'))
      await expect.poll(() => screen.queryByTestId('inner-item')).toBeVisible()
      await userEvent.click(screen.getByTestId('inner-item'))
      await expect.poll(() => screen.queryByTestId('deep-item')).toBeVisible()

      // The cascade closes both menus inside the dialog, and stops there.
      await userEvent.click(screen.getByTestId('deep-item'))
      await expect.poll(() => screen.queryByTestId('inner-item')).toBeNull()

      expect(screen.queryByTestId('deep-item')).toBeNull()
      expect(screen.queryByTestId('dialog-content')).toBeVisible()
      expect(screen.queryByTestId('menu-content')).toBeVisible()
    })
  })

  describe('one submenu open per level', () => {
    beforeEach(() => commands.setReduceMotionDisabled())

    afterEach(() => commands.setReduceMotionEnabled())

    function renderSiblings () {
      return render(() => (
        <div>
          <VBtn data-testid="top-btn">
            Open
            <VMenu activator="parent">
              <VList>
                <VListItem data-testid="a-item" link>
                  <span>A</span>
                  <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                    <VList>
                      <VListItem data-testid="a-sub" link>A-1</VListItem>
                    </VList>
                  </VMenu>
                </VListItem>
                <VListItem data-testid="b-item" link>
                  <span>B</span>
                  <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                    <VList>
                      <VListItem data-testid="b-sub" link>B-1</VListItem>
                    </VList>
                  </VMenu>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </div>
      ))
    }

    it('should close a hover-opened submenu when a sibling submenu opens on hover', async () => {
      renderSiblings()

      await userEvent.click(screen.getByTestId('top-btn'))
      await expect.poll(() => screen.queryByTestId('a-item')).toBeVisible()

      await userEvent.hover(screen.getByTestId('a-item'))
      await expect.poll(() => screen.queryByTestId('a-sub')).toBeVisible()

      await userEvent.hover(screen.getByTestId('b-item'))
      await expect.poll(() => screen.queryByTestId('b-sub')).toBeVisible()

      // only one submenu should remain open at this level
      await expect.poll(() => screen.queryByTestId('a-sub')).toBeNull()
    })

    it('should close a keyboard-opened submenu when a sibling submenu opens on hover', async () => {
      renderSiblings()

      await userEvent.click(screen.getByTestId('top-btn'))
      await expect.poll(() => screen.queryByTestId('a-item')).toBeVisible()

      screen.getByTestId('a-item').focus()
      await userEvent.keyboard('{ArrowRight}')
      await expect.poll(() => screen.queryByTestId('a-sub')).toBeVisible()

      await userEvent.hover(screen.getByTestId('b-item'))
      await expect.poll(() => screen.queryByTestId('b-sub')).toBeVisible()

      await expect.poll(() => screen.queryByTestId('a-sub')).toBeNull()
    })

    it('should close a submenu and its open descendants when a sibling opens', async () => {
      render(() => (
        <div>
          <VBtn data-testid="top-btn">
            Open
            <VMenu activator="parent">
              <VList>
                <VListItem data-testid="a-item" link>
                  <span>A</span>
                  <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                    <VList>
                      <VListItem data-testid="a-sub" link>
                        <span>A-1</span>
                        <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                          <VList>
                            <VListItem data-testid="a-sub-sub" link>A-1-a</VListItem>
                          </VList>
                        </VMenu>
                      </VListItem>
                    </VList>
                  </VMenu>
                </VListItem>
                <VListItem data-testid="b-item" link>
                  <span>B</span>
                  <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                    <VList>
                      <VListItem data-testid="b-sub" link>B-1</VListItem>
                    </VList>
                  </VMenu>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </div>
      ))

      await userEvent.click(screen.getByTestId('top-btn'))
      await expect.poll(() => screen.queryByTestId('a-item')).toBeVisible()

      await userEvent.hover(screen.getByTestId('a-item'))
      await expect.poll(() => screen.queryByTestId('a-sub')).toBeVisible()
      await userEvent.hover(screen.getByTestId('a-sub'))
      await expect.poll(() => screen.queryByTestId('a-sub-sub')).toBeVisible()

      // switching to sibling B should collapse A and its whole open subtree
      await userEvent.hover(screen.getByTestId('b-item'))
      await expect.poll(() => screen.queryByTestId('b-sub')).toBeVisible()

      await expect.poll(() => screen.queryByTestId('a-sub')).toBeNull()
      expect(screen.queryByTestId('a-sub-sub')).toBeNull()
    })
  })

  describe('submenu keyboard navigation', () => {
    it('should close submenus one level at a time with ArrowLeft and keep focus inside', async () => {
      render(() => (
        <div>
          <button data-testid="before">before</button>
          <VBtn data-testid="top-btn">
            Open
            <VMenu activator="parent">
              <VList>
                <VListItem data-testid="l1-item-1" link>L1-1</VListItem>
                <VListItem data-testid="l1-item-2" link>
                  <span>L1-2</span>
                  <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                    <VList>
                      <VListItem data-testid="l2-item-1" link>L2-1</VListItem>
                      <VListItem data-testid="l2-item-2" link>
                        <span>L2-2</span>
                        <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                          <VList>
                            <VListItem data-testid="l3-item-1" link>L3-1</VListItem>
                            <VListItem data-testid="l3-item-2" link>L3-2</VListItem>
                          </VList>
                        </VMenu>
                      </VListItem>
                    </VList>
                  </VMenu>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
          <button data-testid="after">after</button>
        </div>
      ))

      screen.getByTestId('before').focus()

      await userEvent.keyboard('{Tab}')
      await expect.poll(() => document.activeElement).toBe(screen.getByTestId('top-btn'))

      await userEvent.keyboard('{ArrowDown}')
      await expect.poll(() => document.activeElement).toBe(screen.getByTestId('l1-item-1'))
      await userEvent.keyboard('{ArrowDown}')
      await expect.poll(() => document.activeElement).toBe(screen.getByTestId('l1-item-2'))

      await userEvent.keyboard('{ArrowRight}')
      await expect.poll(() => document.activeElement).toBe(screen.getByTestId('l2-item-1'))
      await userEvent.keyboard('{ArrowDown}')
      await expect.poll(() => document.activeElement).toBe(screen.getByTestId('l2-item-2'))

      await userEvent.keyboard('{ArrowRight}')
      await expect.poll(() => document.activeElement).toBe(screen.getByTestId('l3-item-1'))

      await userEvent.keyboard('{ArrowLeft}')
      await expect.poll(() => screen.queryByTestId('l3-item-1')).toBeNull()
      expect(screen.queryByTestId('l2-item-1')).toBeVisible()
      expect(document.activeElement).toBe(screen.getByTestId('l2-item-2'))

      await userEvent.keyboard('{ArrowDown}')
      await expect.poll(() => document.activeElement).toBe(screen.getByTestId('l2-item-1'))
      await userEvent.keyboard('{ArrowLeft}')
      await expect.poll(() => screen.queryByTestId('l2-item-1')).toBeNull()
      expect(screen.queryByTestId('l1-item-1')).toBeVisible()
      expect(document.activeElement).toBe(screen.getByTestId('l1-item-2'))

      await userEvent.keyboard('{Tab}')
      await expect.poll(() => screen.queryByTestId('l1-item-1')).toBeNull()
      expect(document.activeElement).toBe(screen.getByTestId('after'))
    })

    it('should keep focus inside the menu tree when Tab/Shift+Tab is pressed in a submenu', async () => {
      render(() => (
        <div>
          <button data-testid="before">before</button>
          <VBtn data-testid="top-btn">
            Open
            <VMenu activator="parent">
              <VList>
                <VListItem data-testid="l1-item-1" link>L1-1</VListItem>
                <VListItem data-testid="l1-item-2" link>
                  <span>L1-2</span>
                  <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                    <VList>
                      <VListItem data-testid="l2-item-1" link>L2-1</VListItem>
                      <VListItem data-testid="l2-item-2" link>L2-2</VListItem>
                    </VList>
                  </VMenu>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
          <button data-testid="after">after</button>
        </div>
      ))

      screen.getByTestId('before').focus()

      await userEvent.keyboard('{Tab}')
      await expect.poll(() => document.activeElement).toBe(screen.getByTestId('top-btn'))

      await userEvent.keyboard('{ArrowDown}')
      await expect.poll(() => document.activeElement).toBe(screen.getByTestId('l1-item-1'))
      await userEvent.keyboard('{ArrowDown}')
      await expect.poll(() => document.activeElement).toBe(screen.getByTestId('l1-item-2'))
      await userEvent.keyboard('{ArrowRight}')
      await expect.poll(() => document.activeElement).toBe(screen.getByTestId('l2-item-1'))

      await userEvent.keyboard('{Tab}')
      await expect.poll(() => screen.queryByTestId('l2-item-1')).toBeNull()
      expect(screen.queryByTestId('l1-item-1')).toBeVisible()
      expect(document.activeElement).toBe(screen.getByTestId('l1-item-2'))

      await userEvent.keyboard('{ArrowRight}')
      await expect.poll(() => document.activeElement).toBe(screen.getByTestId('l2-item-1'))

      await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
      await expect.poll(() => screen.queryByTestId('l2-item-1')).toBeNull()
      expect(screen.queryByTestId('l1-item-1')).toBeVisible()
      expect(document.activeElement).toBe(screen.getByTestId('l1-item-2'))
    })

    // Animations widen the gap between content mount and item layout, which is
    // exactly when the open keystroke used to drop focus, so run with real motion.
    describe('with animations', () => {
      beforeEach(() => commands.setReduceMotionDisabled())

      afterEach(() => commands.setReduceMotionEnabled())

      it('should focus the first submenu item with a single ArrowRight press', async () => {
        render(() => (
          <div>
            <button data-testid="before">before</button>
            <VBtn data-testid="top-btn">
              Open
              <VMenu activator="parent">
                <VList>
                  <VListItem data-testid="l1-item-1" link>L1-1</VListItem>
                  <VListItem data-testid="l1-item-2" link>
                    <span>L1-2</span>
                    <VMenu openOnFocus={ false } activator="parent" openOnHover submenu>
                      <VList>
                        <VListItem data-testid="l2-item-1" link>L2-1</VListItem>
                        <VListItem data-testid="l2-item-2" link>L2-2</VListItem>
                      </VList>
                    </VMenu>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </div>
        ))

        screen.getByTestId('top-btn').focus()

        // Each open is a single keypress — no retry. Polling waits for the
        // deferred focus to land, but never re-presses the key.
        await userEvent.keyboard('{ArrowDown}')
        await expect.poll(() => document.activeElement).toBe(screen.getByTestId('l1-item-1'))

        await userEvent.keyboard('{ArrowDown}')
        await expect.poll(() => document.activeElement).toBe(screen.getByTestId('l1-item-2'))

        await userEvent.keyboard('{ArrowRight}')
        await expect.poll(() => document.activeElement).toBe(screen.getByTestId('l2-item-1'))
      })
    })
  })
})
