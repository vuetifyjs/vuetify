// Styles
import './VEditor.sass'

// Components
import { VBtn } from '@/components/VBtn/VBtn'
import { VToolbar } from '@/components/VToolbar/VToolbar'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVEditorProps = propsFactory({
  modelValue: String,
  placeholder: String,
  readonly: Boolean,
  disabled: Boolean,
  hideToolbar: {
    type: Boolean,
    default: false,
  },
  toolbarItems: {
    type: Array as PropType<string[]>,
    default: () => ['bold', 'italic', 'underline'],
  },
}, 'VEditor')

const formatMap = { bold: 'b', italic: 'em', underline: 'u' }
const zeroWidthSpace = '\u200B'

export const VEditor = genericComponent()({
  name: 'VEditor',

  props: makeVEditorProps(),

  emits: {
    'update:modelValue': (val: string) => true,
    'update:focused': (focused: boolean) => true,
  },

  setup (props, { emit, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const editorRef = ref<HTMLDivElement>()
    const isFocused = ref(false)
    const activeFormats = ref<Set<string>>(new Set())

    const isFormatActive = computed(() => (tag: string) => activeFormats.value.has(tag))

    watch(() => props.modelValue, newVal => {
      if (newVal === model.value) return
      model.value = newVal || ''
      updateEditorInnerHTML(model.value)
    })

    function onKeyUp () {
      updateActiveStates()
    }

    function onMouseUp () {
      updateActiveStates()
    }

    function onFocus () {
      isFocused.value = true
      emit('update:focused', true)
    }

    function onBlur () {
      isFocused.value = false
      emit('update:focused', false)
    }

    function onInput (e: Event) {
      updateModel()
    }

    function formatBold () {
      applyFormat(formatMap.bold)
    }

    function formatItalic () {
      applyFormat(formatMap.italic)
    }

    function formatUnderline () {
      applyFormat(formatMap.underline)
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

    function findFormattedElement (tag: string): Element | null {
      const result = getCurrentSelection()
      if (!result) return null

      let element = getSelectionContainer(result.range)
      if (!element) return null

      while (element && element !== editorRef.value) {
        if (element.tagName.toLowerCase() === tag.toLowerCase()) {
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

      Object.entries(formatMap).forEach(([format, tag]) => {
        if (findFormattedElement(tag)) {
          newActiveFormats.add(tag)
        }
      })

      activeFormats.value = newActiveFormats
    }

    function applyFormat (tag: string, attributes: Record<string, string> = {}) {
      const formattedElement = findFormattedElement(tag)
      if (formattedElement) {
        removeFormat(formattedElement, tag)
      } else {
        addFormat(tag, attributes)
      }
    }

    function addFormat (tag: string, attributes: Record<string, string> = {}) {
      if (!editorRef.value || props.readonly || props.disabled) return
      editorRef.value?.focus()

      const newElement = document.createElement(tag)
      Object.entries(attributes).forEach(([key, value]) => {
        newElement.setAttribute(key, value)
      })

      surroundSelectionRange(newElement)

      selectNode(newElement)
      updateModel()
      updateActiveStates()

      if (!hasSelection()) {
        placeCursorInsideElement(newElement)
      }
    }

    function removeFormat (element: Element, tag: string) {
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

    function removeElement (element: Element) {
      const parent = element.parentNode
      if (!parent) return
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
        while (element.firstChild) {
          parent.insertBefore(element.firstChild, element)
        }

        parent.removeChild(element)

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
      const hasToolbar = !props.hideToolbar && props.toolbarItems.length

      return (
        <div>
          { hasToolbar && (
            <VToolbar
              flat
              key="toolbar"
              density="compact"
            >
              {{
                default: () => (
                  <div class="v-editor__toolbar-items">
                    { props.toolbarItems.includes('bold') && (
                      <VBtn
                        variant="text"
                        size="small"
                        key="bold-button"
                        icon="mdi-format-bold"
                        onClick={ formatBold }
                        color={ isFormatActive.value(formatMap.bold) ? 'primary' : undefined }
                      />
                    )}
                    { props.toolbarItems.includes('italic') && (
                      <VBtn
                        variant="text"
                        size="small"
                        key="italic-button"
                        icon="mdi-format-italic"
                        onClick={ formatItalic }
                        color={ isFormatActive.value(formatMap.italic) ? 'primary' : undefined }
                      />
                    )}
                    { props.toolbarItems.includes('underline') && (
                      <VBtn
                        variant="text"
                        size="small"
                        icon="mdi-format-underline"
                        key="underline-button"
                        onClick={ formatUnderline }
                        color={ isFormatActive.value(formatMap.underline) ? 'primary' : undefined }
                      />
                    )}
                  </div>
                ),
              }}
            </VToolbar>
          )}

          <div
            ref={ editorRef }
            contenteditable={ !props.readonly && !props.disabled }
            placeholder={ props.placeholder }
            onFocus={ onFocus }
            onBlur={ onBlur }
            onInput={ onInput }
          />
        </div>
      )
    })

    return {
      editorRef,
    }
  },
})

export type VEditor = InstanceType<typeof VEditor>
