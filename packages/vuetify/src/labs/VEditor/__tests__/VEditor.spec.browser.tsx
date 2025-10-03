// Utilities
import { render, screen, userEvent, wait } from '@test'
import { ref } from 'vue'
import { FormatCategory } from '../composables/formatter'
import { VEditor } from '../VEditor'

const removeAllZeroWidthSpaces = (text: string) => text.replace(/\u200B/g, '')

describe('VEditor', () => {
  describe('props', () => {
    it('should hide toolbar when hideToolbar is true', async () => {
      render(() => <VEditor hideToolbar />)

      const toolbar = screen.queryByCSS('.v-editor__toolbar-items')
      expect(toolbar).toBeNull()
    })

    it('should show toolbar when hideToolbar is false', async () => {
      render(() => <VEditor />)

      const toolbar = screen.getByCSS('.v-editor__toolbar-items')
      expect(toolbar).toBeVisible()
    })

    it('should hide toolbar when formats array is empty', async () => {
      render(() => <VEditor formats={[]} />)

      const toolbar = screen.queryByCSS('.v-editor__toolbar-items')
      expect(toolbar).toBeNull()
    })

    it('should apply custom height', async () => {
      render(() => <VEditor height={ 300 } />)

      const sheet = screen.getByCSS('.v-sheet')
      expect(sheet).toHaveStyle('height: 300px')
    })

    it('should apply custom minHeight', async () => {
      render(() => <VEditor minHeight={ 200 } />)

      const sheet = screen.getByCSS('.v-sheet')
      expect(sheet).toHaveStyle('min-height: 200px')
    })

    it('should apply custom maxHeight', async () => {
      render(() => <VEditor maxHeight={ 500 } />)

      const sheet = screen.getByCSS('.v-sheet')
      expect(sheet).toHaveStyle('max-height: 500px')
    })

    it('should be readonly when readonly prop is true', async () => {
      render(() => <VEditor readonly />)

      const editor = screen.getByCSS('.v-editor')
      expect(editor).toHaveAttribute('contenteditable', 'false')
    })

    it('should be disabled when disabled prop is true', async () => {
      render(() => <VEditor disabled />)

      const editor = screen.getByCSS('.v-editor')
      expect(editor).toHaveAttribute('contenteditable', 'false')
    })

    it('should filter formats based on formats prop', async () => {
      render(() => <VEditor formats={['bold', 'italic']} />)

      // Check that toolbar exists
      const toolbar = screen.getByCSS('.v-editor__toolbar-items')
      expect(toolbar).toBeVisible()

      // Check that buttons exist (they should be rendered)
      const buttons = screen.getAllByCSS('.v-btn')
      expect(buttons).toHaveLength(2)
    })
  })

  describe('formatting', () => {
    it('should not apply format when readonly', async () => {
      const onUpdateModelValue = vi.fn()

      render(() => (
        <VEditor
          readonly
          modelValue="Test Content"
          onUpdate:modelValue={ onUpdateModelValue }
        />
      ))

      const buttons = screen.getAllByCSS('.v-btn')

      await userEvent.click(buttons[0])

      expect(onUpdateModelValue).not.toHaveBeenCalled()
    })

    it('should not apply format when disabled', async () => {
      const onUpdateModelValue = vi.fn()

      render(() => (
        <VEditor
          disabled
          modelValue="Test Content"
          onUpdate:modelValue={ onUpdateModelValue }
        />
      ))

      const buttons = screen.getAllByCSS('.v-btn')

      await userEvent.click(buttons[0])

      expect(onUpdateModelValue).not.toHaveBeenCalled()
    })

    it('should enable bold format correctly', async () => {
      const modelValue = ref('')

      render(() => (
        <VEditor
          v-model={ modelValue.value }
          formats={['bold']}
        />
      ))

      const boldButton = screen.getByCSS(`button[name="bold"]`)
      await userEvent.click(boldButton)

      const editor = screen.getByCSS('.v-editor')
      await userEvent.type(editor, 'Hello')

      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('<b>Hello</b>')
    })

    it('should apply bold format correctly', async () => {
      const modelValue = ref('Hello')

      render(() => (
        <VEditor
          v-model={ modelValue.value }
          formats={['bold']}
        />
      ))

      const editor = screen.getByCSS('.v-editor')

      await userEvent.click(editor)
      await userEvent.keyboard('{Ctrl>}a{/Ctrl}')

      const boldButton = screen.getByCSS(`button[name="bold"]`)
      await userEvent.click(boldButton)

      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('<b>Hello</b>')
    })

    it('should disable bold format correctly', async () => {
      const modelValue = ref('Some text')

      render(() => (
        <VEditor
          v-model={ modelValue.value }
          formats={['bold']}
        />
      ))

      const editor = screen.getByCSS('.v-editor')
      await userEvent.click(editor)

      const boldButton = screen.getByCSS(`button[name="bold"]`)

      // this should enable bold format
      await userEvent.click(boldButton)
      // this should disable bold format
      await userEvent.click(boldButton)

      await userEvent.type(editor, ' updated')

      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('Some text updated')
    })

    it('should remove entire bold format at selection', async () => {
      const modelValue = ref('<b>Hello</b>')

      render(() => (
        <VEditor
          v-model={ modelValue.value }
          formats={['bold']}
        />
      ))

      const editor = screen.getByCSS('.v-editor')

      await userEvent.click(editor)
      await userEvent.keyboard('{Ctrl>}a{/Ctrl}')

      const boldButton = screen.getByCSS(`button[name="bold"]`)
      await userEvent.click(boldButton)

      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('Hello')
    })

    it('should remove partial bold format at selection', async () => {
      const modelValue = ref('<b>HelloWorld</b>')

      render(() => (
        <VEditor
          v-model={ modelValue.value }
          formats={['bold']}
        />
      ))

      const editor = screen.getByCSS('.v-editor')
      await userEvent.click(editor)

      await userEvent.keyboard('{Shift>}{ArrowLeft>5}{/Shift}')

      const boldButton = screen.getByCSS(`button[name="bold"]`)
      await userEvent.click(boldButton)

      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('<b>Hello</b><span>World</span>')
    })

    it('should remove bold formatting at caret', async () => {
      const modelValue = ref('<b>HelloWorld</b>')

      render(() => (
        <VEditor
          v-model={ modelValue.value }
          formats={['bold']}
        />
      ))

      const editor = screen.getByCSS('.v-editor')
      await userEvent.click(editor)

      await userEvent.keyboard('{ArrowLeft>5}')

      const boldButton = screen.getByCSS(`button[name="bold"]`)
      await userEvent.click(boldButton)

      await userEvent.type(editor, 'middle')

      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('<b>Hello</b>middle<b>World</b>')
    })

    it('should handle heading format', async () => {
      const modelValue = ref('<b>Hello</b>')

      render(() => (
        <VEditor
          v-model={ modelValue.value }
          formats={['heading1', 'heading2']}
        />
      ))

      const editor = screen.getByCSS('.v-editor')
      await userEvent.click(editor)

      await userEvent.click(screen.getByCSS(`button[name="${FormatCategory.Heading}"]`))
      await wait(200)
      await userEvent.click(screen.getByCSS(`button[name="heading1"]`))

      // should apply heading 1
      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('<h1><b>Hello</b></h1>')

      await userEvent.click(screen.getByCSS(`button[name="${FormatCategory.Heading}"]`))
      await wait(200)
      await userEvent.click(screen.getByCSS(`button[name="heading2"]`))

      // should apply heading 2
      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('<h2><b>Hello</b></h2>')

      await userEvent.click(screen.getByCSS(`button[name="${FormatCategory.Heading}"]`))
      await wait(200)
      await userEvent.click(screen.getByCSS(`button[name="heading2"]`))

      // should remove heading
      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('<div><b>Hello</b></div>')
    })

    it('should handle alignment format', async () => {
      const modelValue = ref('<b>Hello</b>')

      render(() => (
        <VEditor
          v-model={ modelValue.value }
          formats={['align-left', 'align-right']}
        />
      ))

      const editor = screen.getByCSS('.v-editor')
      await userEvent.click(editor)

      await userEvent.click(screen.getByCSS(`button[name="${FormatCategory.Alignment}"]`))
      await wait(200)
      await userEvent.click(screen.getByCSS(`button[name="align-left"]`))

      // should align left
      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('<div style="text-align: left"><b>Hello</b></div>')

      await userEvent.click(screen.getByCSS(`button[name="${FormatCategory.Alignment}"]`))
      await wait(200)
      await userEvent.click(screen.getByCSS(`button[name="align-right"]`))

      // should align right
      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('<div style="text-align: right"><b>Hello</b></div>')

      await userEvent.click(screen.getByCSS(`button[name="${FormatCategory.Alignment}"]`))
      await wait(200)
      await userEvent.click(screen.getByCSS(`button[name="align-right"]`))

      // should remove alignment
      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('<div><b>Hello</b></div>')
    })

    it('should apply alignment format when editor is empty', async () => {
      const modelValue = ref('')

      render(() => (
        <VEditor v-model={ modelValue.value } formats={['align-right']} />
      ))

      const editor = screen.getByCSS('.v-editor')
      await userEvent.click(editor)

      await userEvent.click(screen.getByCSS(`button[name="${FormatCategory.Alignment}"]`))
      await wait(200)
      await userEvent.click(screen.getByCSS(`button[name="align-right"]`))

      await userEvent.type(editor, 'hello')

      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('<div style="text-align: right">hello</div>')
    })
  })

  describe('keyboard shortcuts', () => {
    it('should handle Ctrl+B keydown', async () => {
      const modelValue = ref('')

      render(() => (
        <VEditor
          v-model={ modelValue.value }
          formats={['bold']}
        />
      ))

      const editor = screen.getByCSS('.v-editor')
      await userEvent.click(editor)

      await userEvent.keyboard('{Ctrl>}b{/Ctrl}')
      await userEvent.type(editor, 'Hello')

      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('<b>Hello</b>')
    })

    it('should handle Ctrl+B keydown when there is selection', async () => {
      const modelValue = ref('<b>Hello</b>')

      render(() => (
        <VEditor
          v-model={ modelValue.value }
          formats={['bold']}
        />
      ))

      const editor = screen.getByCSS('.v-editor')

      await userEvent.click(editor)
      await userEvent.keyboard('{Ctrl>}a{/Ctrl}')

      await userEvent.keyboard('{Ctrl>}b{/Ctrl}')

      expect(removeAllZeroWidthSpaces(modelValue.value)).toBe('Hello')
    })
  })
})
