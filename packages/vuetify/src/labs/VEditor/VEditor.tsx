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
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { callEvent, genericComponent, omit, propsFactory, useRender } from '@/util'

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
  Heading6 = 'heading6'
}

enum FormatCategory {
  Heading = 'heading',
}

type Formatter = {
  name: Formats
  icon: string
  category?: FormatCategory
  config: { tag: string, attributes?: Record<string, string> }
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

    function getCurrentSelection () {
      if (!editorRef.value) return null

      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return null

      const range = selection.getRangeAt(0)

      if (!editorRef.value.contains(range.commonAncestorContainer)) return null

      return { selection, range }
    }

    function getSelectionContainer (range: Range): Element | null {
      const commonAncestor = range.commonAncestorContainer

      const container = commonAncestor.nodeType === Node.TEXT_NODE
        ? commonAncestor.parentNode
        : commonAncestor

      return container && container.nodeType === Node.ELEMENT_NODE
        ? container as Element
        : null
    }

    function hasSelection () {
      const selection = getCurrentSelection()?.selection

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
      const selectionResult = getCurrentSelection()
      if (!selectionResult) return

      selectionResult.range.collapse(false)
      selectionResult.selection.removeAllRanges()
      selectionResult.selection.addRange(selectionResult.range)
    }

    function getFormatter (format: Formatter) {
      const { tag, attributes } = format.config
      const newElement = document.createElement(tag)
      attributes && Object.entries(attributes).forEach(([key, value]) => {
        newElement.setAttribute(key, value)
      })

      return newElement
    }

    function hasSameFormatting (element: Element, format: Formatter) {
      const { tag, attributes } = format.config
      return element.tagName.toLowerCase() === tag.toLowerCase() &&
        Object.entries(attributes || {}).every(([key, value]) => element?.getAttribute(key) === value)
    }

    function findFormattedElement (format: Formatter): Element | null {
      const result = getCurrentSelection()
      if (!result) return null

      let element = getSelectionContainer(result.range)
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
      const selectionResult = getCurrentSelection()
      if (!selectionResult) return
      const { range } = selectionResult

      const beforeRange = range.cloneRange()
      beforeRange.setStartBefore(element)
      beforeRange.setEnd(range.startContainer, range.startOffset)
      const fragment = beforeRange.cloneContents()

      return isEmptyFragment(fragment) ? null : fragment
    }

    function getFragmentAfterCaret (element: Element) {
      const selectionResult = getCurrentSelection()
      if (!selectionResult) return
      const { range } = selectionResult

      const afterRange = range.cloneRange()
      afterRange.setStart(range.startContainer, range.startOffset)
      afterRange.setEndAfter(element)

      const fragment = afterRange.cloneContents()
      return isEmptyFragment(fragment) ? null : fragment
    }

    function getFragmentAfterSelection (element: Element) {
      const selectionResult = getCurrentSelection()
      if (!selectionResult) return
      const { range } = selectionResult

      const afterRange = range.cloneRange()
      afterRange.setStart(range.endContainer, range.endOffset)
      afterRange.setEndAfter(element)

      const fragment = afterRange.cloneContents()
      return isEmptyFragment(fragment) ? null : fragment
    }

    function getFragmentInsideSelection () {
      const selectionResult = getCurrentSelection()
      if (!selectionResult) return
      const { range } = selectionResult

      if (range.collapsed) return null

      const fragment = range.cloneContents()
      return isEmptyFragment(fragment) ? null : fragment
    }

    function getMiddleFragment (element: Element) {
      const selectionResult = getCurrentSelection()
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
      } else {
        const formattedElement = findFormattedElement(format)
        if (formattedElement) {
          removeFormat(formattedElement)
        } else {
          addFormat(format)
        }
      }
    }

    function applyHeadingFormat (format: Formatter) {
      const currentBlockElement = getCurrentBlockElement()
      const isCurrentBlockHeading = currentBlockElement?.tagName.toLowerCase().startsWith('h')

      preserveCaretPosition(() => {
        if (!editorRef.value) return

        if (!currentBlockElement) {
          formatContent(editorRef.value, format)
        } else if (hasSameFormatting(currentBlockElement, format)) {
          unwrapElement(currentBlockElement)
        } else if (isCurrentBlockHeading) {
          replaceFormat(currentBlockElement, format)
        } else {
          formatContent(currentBlockElement, format)
        }
      })

      updateModel()
      updateActiveStates()
    }

    function addFormat (format: Formatter) {
      if (!editorRef.value || props.readonly || props.disabled) return

      editorRef.value?.focus()

      const newElement = getFormatter(format)
      surroundSelectionRange(newElement)

      selectNode(newElement)

      if (!hasSelection()) {
        placeCursorInsideElement(newElement)
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
      const result = getCurrentSelection()
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
      const selectionResult = getCurrentSelection()
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
      const formatter = getFormatter(format)
      while (element.firstChild) {
        formatter.appendChild(element.firstChild)
      }
      element.parentNode?.replaceChild(formatter, element)
    }

    function formatContent (element: Element, format: Formatter) {
      const formatter = getFormatter(format)

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
      updateModel()
      updateActiveStates()
    }

    function preserveCaretPosition (callback: () => void) {
      const textNode = document.createTextNode(zeroWidthSpace)
      getCurrentSelection()?.range.insertNode(textNode)

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
                          class={ `v-editor px-4 ${hasToolbar ? 'py-0' : 'py-4'}` }
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
