// Styles
import './VEditor.sass'

// Components
import { VBtn } from '@/components/VBtn/VBtn'
import { makeVFieldProps, VField } from '@/components/VField/VField'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VSheet } from '@/components/VSheet/VSheet'
import { VToolbar } from '@/components/VToolbar/VToolbar'

// Composables
import { useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { camelize, computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { callEvent, genericComponent, omit, propsFactory, toKebabCase, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'

type VEditorSlots = Omit<VInputSlots & VFieldSlots, 'default'>

enum Formats {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  StrikeThrough = 'strike-through',
  Subscript = 'subscript',
  Superscript = 'superscript',
  Code = 'code',
  Heading1 = 'heading1',
  Heading2 = 'heading2',
  Heading3 = 'heading3',
  Heading4 = 'heading4',
  Heading5 = 'heading5',
  Heading6 = 'heading6',
  Center = 'center',
  Left = 'left',
  Right = 'right',
  Justify = 'justify',
  Block = 'block',
  Highlight = 'highlight',
}

enum FormatCategory {
  Heading = 'heading',
  Alignment = 'alignment',
}

type Formatter = {
  name: Formats
  icon: string

  category?: FormatCategory
  config: { tag?: string, styles?: Record<string, string>}
}

const blockFormatter: Formatter = {
  name: Formats.Block,
  icon: 'mdi-format-default',
  config: { tag: 'div' },
}

const formats: Formatter[] = [
  {
    name: Formats.Bold,
    icon: 'mdi-format-bold',
    config: { tag: 'b' },
  },
  {
    name: Formats.Italic,
    icon: 'mdi-format-italic',
    config: { tag: 'i' },
  },
  {
    name: Formats.Underline,
    icon: 'mdi-format-underline',
    config: { tag: 'u' },
  },
  {
    name: Formats.StrikeThrough,
    icon: 'mdi-format-strikethrough',
    config: { tag: 's' },
  },
  {
    name: Formats.Subscript,
    icon: 'mdi-format-subscript',
    config: { tag: 'sub' },
  },
  {
    name: Formats.Superscript,
    icon: 'mdi-format-superscript',
    config: { tag: 'sup' },
  },
  {
    name: Formats.Code,
    icon: 'mdi-code-tags',
    config: { tag: 'code' },
  },
  {
    name: Formats.Heading1,
    category: FormatCategory.Heading,
    icon: 'mdi-format-header-1',
    config: { tag: 'h1' },
  },
  {
    name: Formats.Heading2,
    icon: 'mdi-format-header-2',
    category: FormatCategory.Heading,
    config: { tag: 'h2' },
  },
  {
    name: Formats.Heading3,
    icon: 'mdi-format-header-3',
    category: FormatCategory.Heading,
    config: { tag: 'h3' },
  },
  {
    name: Formats.Heading4,
    icon: 'mdi-format-header-4',
    category: FormatCategory.Heading,
    config: { tag: 'h4' },
  },
  {
    name: Formats.Heading5,
    icon: 'mdi-format-header-5',
    category: FormatCategory.Heading,
    config: { tag: 'h5' },
  },
  {
    name: Formats.Heading6,
    icon: 'mdi-format-header-6',
    category: FormatCategory.Heading,
    config: { tag: 'h6' },
  },
  {
    name: Formats.Left,
    icon: 'mdi-format-align-left',
    category: FormatCategory.Alignment,
    config: { styles: { textAlign: 'left' } },
  },
  {
    name: Formats.Right,
    icon: 'mdi-format-align-right',
    category: FormatCategory.Alignment,
    config: { styles: { textAlign: 'right' } },
  },
  {
    name: Formats.Center,
    icon: 'mdi-format-align-center',
    category: FormatCategory.Alignment,
    config: { styles: { textAlign: 'center' } },
  },
  {
    name: Formats.Justify,
    icon: 'mdi-format-align-justify',
    category: FormatCategory.Alignment,
    config: { styles: { textAlign: 'justify' } },
  },
]

const zeroWidthSpace = '\u200B'

export const makeVEditorProps = propsFactory({
  hideToolbar: {
    type: Boolean,
    default: false,
  },
  formats: {
    type: Array as PropType<Formats[]>,
    default: () => [
      Formats.Bold,
      Formats.Italic,
      Formats.Underline,
      Formats.StrikeThrough,
      Formats.Code,
      Formats.Heading1,
      Formats.Heading2,
      Formats.Heading3,
      Formats.Heading4,
      Formats.Heading5,
      Formats.Heading6,
      Formats.Center,
      Formats.Left,
      Formats.Right,
      Formats.Justify,
      Formats.Highlight,
    ],
  },
  height: {
    type: [Number, String],
    default: 'auto',
  },
  maxHeight: [Number, String],
  minHeight: {
    type: [Number, String],
    default: 100,
  },
  ...omit(makeVInputProps(), ['label']),
  ...omit(makeVFieldProps(), ['label']),
}, 'VEditor')

export const VEditor = genericComponent<VEditorSlots>()({
  name: 'VEditor',

  props: makeVEditorProps(),

  emits: {
    'click:control': (e: MouseEvent) => true,
    'mousedown:control': (e: MouseEvent) => true,
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (val: string) => true,
  },

  setup (props, { emit, slots }) {
    const editorRef = ref<HTMLDivElement>()

    const model = useProxiedModel(
      props,
      'modelValue',
      '',
      value => value,
      value => {
        const textContent = editorRef.value?.textContent?.trim()
        return textContent && textContent !== zeroWidthSpace ? value : ''
      }
    )

    const { isFocused, focus, blur } = useFocus(props)

    const vFieldRef = ref<VField>()
    const vInputRef = ref<VInput>()

    const isActive = computed(() => (
      isFocused.value ||
      props.active
    ))

    const activeFormats = ref<Set<string>>(new Set())

    const isFormatActive = computed(() => (tag: string) => activeFormats.value.has(tag))
    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant))
    const displayedFormats = computed(() => formats.filter(format => props.formats.includes(format.name)))

    function onKeyUp () {
      updateActiveStates()
    }

    function onMouseUp () {
      updateActiveStates()
    }

    function onControlMousedown (e: MouseEvent) {
      emit('mousedown:control', e)

      if (editorRef.value?.contains(e.target as Node)) return

      onFocus()
      e.preventDefault()
    }

    function onControlClick (e: MouseEvent) {
      emit('click:control', e)
    }

    function onClear (e: MouseEvent, reset: () => void) {
      e.stopPropagation()

      onFocus()

      nextTick(() => {
        model.value = ''
        reset()

        updateEditorInnerHTML('')
        updateActiveStates()

        callEvent(props['onClick:clear'], e)
      })
    }

    function onFocus () {
      if (editorRef.value !== document.activeElement) {
        editorRef.value?.focus()
      }

      if (!isFocused.value) focus()
    }

    function onInput (e: Event) {
      updateModel()
    }

    function updateEditorInnerHTML (newVal: string) {
      if (editorRef.value) {
        editorRef.value.innerHTML = newVal
      }
    }

    function updateModel () {
      if (editorRef.value) {
        model.value = editorRef.value.innerHTML
      }
    }

    function getObjectStyles (styleString: string): Record<string, string> {
      const styles: Record<string, string> = {}
      if (!styleString) return styles

      styleString.split(';').forEach(rule => {
        const [property, value] = rule.split(':').map(s => s.trim())
        if (property && value) {
          styles[camelize(property)] = value
        }
      })

      return styles
    }

    function getStringStyles (styles: Record<string, string>): string {
      return Object.entries(styles)
        .map(([property, value]) => {
          return `${toKebabCase(property)}: ${value}`
        })
        .join('; ')
    }

    function getSelection () {
      if (!editorRef.value) return null

      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return null

      const range = selection.getRangeAt(0)

      if (!editorRef.value.contains(range.commonAncestorContainer)) return null

      return { selection, range }
    }

    function getSelectionContainer (): Element | null {
      const result = getSelection()
      if (!result) return null

      const commonAncestor = result.range.commonAncestorContainer

      const container = commonAncestor.nodeType === Node.TEXT_NODE
        ? commonAncestor.parentNode
        : commonAncestor

      return container && container.nodeType === Node.ELEMENT_NODE
        ? container as Element
        : null
    }

    function hasSelection () {
      const selection = getSelection()?.selection

      if (!selection) return false
      return !selection.isCollapsed && selection.toString() !== zeroWidthSpace
    }

    function selectNode (element: Node) {
      selectBetweenNodes(element)
    }

    function selectBetweenNodes (start: Node, end?: Node | null) {
      const selection = window.getSelection()
      if (!selection) return

      const range = document.createRange()

      if (!end) {
        range.selectNodeContents(start)
      } else {
        range.setStart(start, 0)
        if (end.nodeType === Node.ELEMENT_NODE) {
          range.setEnd(end, end.childNodes.length)
        } else {
          range.setEnd(end, end.textContent?.length || 0)
        }
      }

      selection.removeAllRanges()
      selection.addRange(range)
    }

    function placeCursorInsideElement (element: Node) {
      const textNode = document.createTextNode(zeroWidthSpace)
      element.appendChild(textNode)
      selectNode(textNode)
      focusAtSelection()
    }

    function focusAtSelection () {
      const selectionResult = getSelection()
      if (!selectionResult) return

      selectionResult.range.collapse(false)
      selectionResult.selection.removeAllRanges()
      selectionResult.selection.addRange(selectionResult.range)
    }

    function getFormatterElement (format: Formatter) {
      const { tag, styles } = format.config
      const newElement = document.createElement(tag || 'div')

      if (styles) {
        const styleString = getStringStyles(styles)
        newElement.setAttribute('style', styleString)
      }

      return newElement
    }

    function hasSameFormatting (element: Element, format: Formatter) {
      const { tag, styles } = format.config

      const hasSameTag = tag ? element.tagName.toLowerCase() === tag.toLowerCase() : true

      const hasSameStyles = styles ? (() => {
        const elementStyleString = element.getAttribute('style') || ''
        const elementStyles = getObjectStyles(elementStyleString)
        return Object.entries(styles).every(([key, value]) => elementStyles[key] === value)
      })() : true

      return hasSameTag && hasSameStyles
    }

    function findFormattedElement (format: Formatter): Element | null {
      let element = getSelectionContainer()
      if (!element) return null

      while (element && element !== editorRef.value) {
        if (hasSameFormatting(element, format)) {
          return element
        }
        element = element.parentElement
      }

      return null
    }

    function isEmptyFragment (fragment: DocumentFragment): boolean {
      for (const node of fragment.childNodes) {
        if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
          const content = (node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node).textContent
          if (content?.replace(/\u200B/g, '').trim()) {
            return false
          }
        }
      }
      return true
    }

    function getFragmentBeforeCaret (element: Element) {
      const selectionResult = getSelection()
      if (!selectionResult) return
      const { range } = selectionResult

      const beforeRange = range.cloneRange()
      beforeRange.setStartBefore(element)
      beforeRange.setEnd(range.startContainer, range.startOffset)
      const fragment = beforeRange.cloneContents()

      return isEmptyFragment(fragment) ? null : fragment
    }

    function getFragmentAfterCaret (element: Element) {
      const selectionResult = getSelection()
      if (!selectionResult) return
      const { range } = selectionResult

      const afterRange = range.cloneRange()
      afterRange.setStart(range.startContainer, range.startOffset)
      afterRange.setEndAfter(element)

      const fragment = afterRange.cloneContents()
      return isEmptyFragment(fragment) ? null : fragment
    }

    function getFragmentAfterSelection (element: Element) {
      const selectionResult = getSelection()
      if (!selectionResult) return
      const { range } = selectionResult

      const afterRange = range.cloneRange()
      afterRange.setStart(range.endContainer, range.endOffset)
      afterRange.setEndAfter(element)

      const fragment = afterRange.cloneContents()
      return isEmptyFragment(fragment) ? null : fragment
    }

    function getFragmentInsideSelection () {
      const selectionResult = getSelection()
      if (!selectionResult) return
      const { range } = selectionResult

      if (range.collapsed) return null

      const fragment = range.cloneContents()
      return isEmptyFragment(fragment) ? null : fragment
    }

    function getMiddleFragment (element: Element) {
      const selectionResult = getSelection()
      if (!selectionResult) return
      const { range } = selectionResult

      const remainingFormatStack: HTMLElement[] = []
      let current: Node | null = range.startContainer
      while (current && current !== element) {
        if (current instanceof HTMLElement) {
          remainingFormatStack.unshift(current.cloneNode(false) as HTMLElement)
        }
        current = current.parentNode
      }

      const caretNode = document.createTextNode(zeroWidthSpace)
      return remainingFormatStack.reduce((child: Node, wrapper: Node) => {
        wrapper.appendChild(child)
        return wrapper
      }, caretNode)
    }

    function updateActiveStates () {
      if (!editorRef.value || props.readonly || props.disabled) return

      const newActiveFormats = new Set<string>()

      formats.forEach((format: Formatter) => {
        if (findFormattedElement(format)) {
          newActiveFormats.add(format.name)
        }
      })

      activeFormats.value = newActiveFormats
    }

    function applyFormat (format: Formatter) {
      if (format.category === FormatCategory.Heading) {
        applyHeadingFormat(format)
      } else if (format.category === FormatCategory.Alignment) {
        applyAlignmentFormat(format)
      } else {
        applyInlineFormat(format)
      }
    }

    function applyInlineFormat (format: Formatter) {
      const formattedElement = findFormattedElement(format)
      if (formattedElement) {
        removeFormat(formattedElement)
      } else {
        addFormat(format)
      }
    }

    function applyHeadingFormat (format: Formatter) {
      const currentBlockElement = getCurrentBlockElement()
      const currentBlockTag = currentBlockElement?.tagName.toLowerCase()
      const isCurrentBlockHeadingOrDiv = currentBlockTag?.startsWith('h') || currentBlockTag === 'div'

      preserveCaretPosition(() => {
        if (!editorRef.value) return

        if (!currentBlockElement) {
          formatContent(editorRef.value, format)
        } else if (hasSameFormatting(currentBlockElement, format)) {
          replaceFormat(currentBlockElement, blockFormatter)
        } else if (isCurrentBlockHeadingOrDiv) {
          replaceFormat(currentBlockElement, format)
        } else {
          formatContent(currentBlockElement, format)
        }
      })

      updateModel()
      updateActiveStates()
    }

    function applyAlignmentFormat (format: Formatter) {
      const blockElement = getCurrentBlockElement()
      const targetStyles = format.config.styles
      const targetAlignment = targetStyles?.textAlign

      if (!targetAlignment) return

      if (!blockElement) {
        preserveCaretPosition(() => {
          if (!editorRef.value) return
          formatContent(editorRef.value, format)
        })
      } else {
        const currentStyleString = blockElement.getAttribute('style') || ''
        const currentStyles = getObjectStyles(currentStyleString)
        const currentAlignment = currentStyles.textAlign

        if (currentAlignment === targetAlignment) {
          const newStyles = omit(currentStyles, ['textAlign'])
          const newStyleString = getStringStyles(newStyles)

          if (newStyleString) {
            blockElement.setAttribute('style', newStyleString)
          } else {
            blockElement.removeAttribute('style')
          }
        } else {
          const newStyles = { ...currentStyles, textAlign: targetAlignment }
          const newStyleString = getStringStyles(newStyles)
          blockElement.setAttribute('style', newStyleString)
        }
      }

      updateModel()
      updateActiveStates()
    }

    function addFormat (format: Formatter) {
      if (!editorRef.value || props.readonly || props.disabled) return

      editorRef.value?.focus()

      const formatter = getFormatterElement(format)
      surroundSelectionRange(formatter)

      selectNode(formatter)

      if (!hasSelection()) {
        placeCursorInsideElement(formatter)
      }

      updateModel()
      updateActiveStates()
    }

    function removeFormat (element: Element) {
      if (!editorRef.value || props.readonly || props.disabled) return

      const isElementEmpty = element.innerHTML.replace(/\u200B/g, '').trim() === ''

      if (isElementEmpty) {
        removeElement(element)
      } else if (hasSelection()) {
        unwrapSelection(element)
      } else {
        splitFormattingAtCaret(element)
      }

      updateModel()
      updateActiveStates()
      editorRef.value?.focus()
    }

    function surroundSelectionRange (element: Element) {
      const result = getSelection()
      if (!result) return

      const { range } = result

      try {
        range.surroundContents(element)
      } catch (e) {
        const fragment = range.extractContents()
        element.appendChild(fragment)
        range.insertNode(element)
      }
    }

    function getCurrentBlockElement () {
      const selectionResult = getSelection()
      if (!selectionResult) return null

      let node = selectionResult.selection.anchorNode

      // If it's a text node, move up to the parent
      if (node?.nodeType === 3) node = node.parentNode

      // Traverse up until we find a block element
      while (node && node !== editorRef.value) {
        const display = window.getComputedStyle(node as Element).display
        if (['block', 'list-item', 'table'].includes(display)) {
          return node as Element
        }
        node = node.parentNode
      }

      return null
    }

    function removeElement (element: Element) {
      const parent = element.parentNode
      if (!parent) return
      parent.removeChild(element)
    }

    function replaceFormat (element: Element, format: Formatter) {
      const formatter = getFormatterElement(format)
      replaceElement(element, formatter)
    }

    function replaceElement (element: Element, newElement: Element) {
      const attributes = element.attributes
      for (const attribute of attributes) {
        newElement.setAttribute(attribute.name, attribute.value)
      }

      while (element.firstChild) {
        newElement.appendChild(element.firstChild)
      }
      element.parentNode?.replaceChild(newElement, element)
    }

    function formatContent (element: Element, format: Formatter) {
      const formatter = getFormatterElement(format)

      while (element.firstChild) {
        formatter.appendChild(element.firstChild)
      }
      element.insertBefore(formatter, element.firstChild)
    }

    function unwrapElement (element: Element) {
      const parent = element.parentNode
      if (!parent) return

      while (element.firstChild) {
        parent.insertBefore(element.firstChild, element)
      }

      parent.removeChild(element)
    }

    function unwrapSelection (element: Element) {
      const parent = element.parentNode
      if (!parent) return

      const firstChild = element.firstChild
      const lastChild = element.lastChild

      if (!firstChild) {
        return
      }

      const emptyFragment = document.createTextNode(zeroWidthSpace)

      const selectionFragment = getFragmentInsideSelection()
      const beforeFragment = getFragmentBeforeCaret(element)
      const afterFragment = getFragmentAfterSelection(element)

      if (!selectionFragment) {
        return
      }

      if (!beforeFragment && !afterFragment) {
        unwrapElement(element)
        selectBetweenNodes(firstChild, lastChild)
      } else {
        parent.insertBefore(beforeFragment || emptyFragment, element)
        parent.insertBefore(selectionFragment, element)
        parent.insertBefore(afterFragment || emptyFragment, element)
        parent.removeChild(element)

        selectNode(selectionFragment)
      }
    }

    function splitFormattingAtCaret (element: Element) {
      const parent = element.parentNode
      if (!parent) return

      const emptyFragment = document.createTextNode(zeroWidthSpace)

      const beforeFragment = getFragmentBeforeCaret(element) || emptyFragment
      const afterFragment = getFragmentAfterCaret(element) || emptyFragment
      const middle = getMiddleFragment(element) || emptyFragment

      parent.insertBefore(beforeFragment, element)
      parent.insertBefore(middle, element)
      parent.insertBefore(afterFragment, element)
      parent.removeChild(element)

      selectNode(middle.firstChild || middle)
      focusAtSelection()
    }

    function preserveCaretPosition (callback: () => void) {
      const textNode = document.createTextNode(zeroWidthSpace)
      getSelection()?.range.insertNode(textNode)

      callback()

      selectNode(textNode)
      focusAtSelection()
    }

    watch(() => props.modelValue, newVal => {
      if (newVal === model.value) return
      model.value = newVal || ''
      updateEditorInnerHTML(newVal)
    })

    onMounted(() => {
      if (editorRef.value) {
        updateEditorInnerHTML(model.value || '')
        editorRef.value.addEventListener('keyup', onKeyUp)
        editorRef.value.addEventListener('mouseup', onMouseUp)
      }
    })

    onBeforeUnmount(() => {
      if (editorRef.value) {
        editorRef.value.removeEventListener('keyup', onKeyUp)
        editorRef.value.removeEventListener('mouseup', onMouseUp)
      }
    })

    useRender(() => {
      const hasToolbar = !props.hideToolbar && !!props.formats.length

      const { modelValue: _, ...inputProps } = VInput.filterProps(props)
      const fieldProps = VField.filterProps(props)

      return (
        <VInput
          ref={ vInputRef }
          v-model={ model.value }
          class={ props.class }
          style={ props.style }
          { ...inputProps }
          centerAffix={ !isPlainOrUnderlined.value }
          focused={ isFocused.value }
        >
          {{
            ...slots,
            default: ({
              id,
              isDisabled,
              isDirty,
              isReadonly,
              isValid,
              reset,
            }) => (
              <VField
                ref={ vFieldRef }
                onClick={ onControlClick }
                onMousedown={ onControlMousedown }
                onClick:clear={ (e: MouseEvent) => onClear(e, reset) }
                onClick:prependInner={ props['onClick:prependInner'] }
                onClick:appendInner={ props['onClick:appendInner'] }
                { ...fieldProps }
                id={ id.value }
                active={ isActive.value || isDirty.value }
                dirty={ isDirty.value || props.dirty }
                disabled={ isDisabled.value }
                focused={ isFocused.value }
                error={ isValid.value === false }
              >
                {{
                  ...slots,
                  default: () => (
                    <div class="v-editor__container">
                      { hasToolbar && (
                        <VToolbar
                          key="toolbar"
                          height="auto"
                          color="transparent"
                          density="compact"
                        >
                          {{
                            default: () => (
                              <div class="v-editor__toolbar-items">
                                { displayedFormats.value.map(format => (
                                  <VBtn
                                    variant="text"
                                    size="small"
                                    key={ format.name }
                                    icon={ format.icon }
                                    onClick={ () => applyFormat(format) }
                                    color={ isFormatActive.value(format.name) ? 'primary' : undefined }
                                  />
                                ))}
                              </div>
                            ),
                          }}
                        </VToolbar>
                      )}

                      <VSheet
                        width="100%"
                        color="transparent"
                        height={ props.height }
                        maxHeight={ props.maxHeight }
                        minHeight={ props.minHeight }
                        class="d-flex flex-column overflow-auto"
                      >
                        <div
                          ref={ editorRef }
                          class={ `v-editor px-4 mb-2 ${hasToolbar ? 'py-0' : 'py-4'}` }
                          contenteditable={ !isReadonly.value && !isDisabled.value }
                          onFocus={ onFocus }
                          onBlur={ blur }
                          onInput={ onInput }
                        />
                      </VSheet>
                    </div>
                  ),
                }}
              </VField>
            ),
          }}
        </VInput>
      )
    })

    return forwardRefs({}, vInputRef, vFieldRef, editorRef)
  },
})

export type VEditor = InstanceType<typeof VEditor>
