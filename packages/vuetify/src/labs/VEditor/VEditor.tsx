// Styles
import './VEditor.sass'

// Components
import { VBtn } from '@/components/VBtn/VBtn'
import { makeVFieldProps, VField } from '@/components/VField/VField'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VSheet } from '@/components/VSheet/VSheet'
import { VToolbar } from '@/components/VToolbar/VToolbar'

// Composables
import { useCaret, useSelection } from './composables'
import { blockFormatter, FormatCategory, formats, Formats, useFormatter } from './composables/formatter'
import { useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getObjectStyles, getStringStyles, isEmptyNode, wrapByTag } from './utils'
import { callEvent, genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { Formatter } from './composables/formatter'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'

type VEditorSlots = Omit<VInputSlots & VFieldSlots, 'default'>

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
      Formats.Highlight,
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
    const caret = useCaret(editorRef)
    const selection = useSelection(editorRef)
    const formatter = useFormatter(editorRef)

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
      updateActiveFormats()
    }

    function onKeyDown (e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault()
            const boldFormat = formats.find(f => f.name === Formats.Bold)
            if (boldFormat) toggleFormat(boldFormat)
            break
          case 'i':
            e.preventDefault()
            const italicFormat = formats.find(f => f.name === Formats.Italic)
            if (italicFormat) toggleFormat(italicFormat)
            break
          case 'u':
            e.preventDefault()
            const underlineFormat = formats.find(f => f.name === Formats.Underline)
            if (underlineFormat) toggleFormat(underlineFormat)
            break
        }
      }

      if (e.key === 'Enter') {
        onEnterKey(e)
      }

      if (e.key === 'Backspace') {
        onBackspaceKey(e)
      }
    }

    function onEnterKey (e: KeyboardEvent) {
      if (selection.hasText()) {
        e.preventDefault()
        return
      }

      if (!editorRef.value) return

      const currentBlockElement = getCurrentBlockElement()
      const fragmentAfterCaret = getFragmentAfterCaret(currentBlockElement || editorRef.value)

      if (fragmentAfterCaret) return

      e.preventDefault()

      const newBlockTag = currentBlockElement?.tagName.toLowerCase() || 'div'
      const newBlock = document.createElement(newBlockTag)

      if (!currentBlockElement) {
        editorRef.value.appendChild(newBlock)
        caret.insertInto(newBlock)
      } else {
        currentBlockElement.parentElement?.insertBefore(newBlock, currentBlockElement.nextSibling)
        caret.insertInto(newBlock)
      }

      updateModel()
    }

    function onBackspaceKey (e: KeyboardEvent) {
      if (selection.hasText()) return

      const currentBlockElement = getCurrentBlockElement()
      if (!currentBlockElement) return

      if (currentBlockElement === editorRef.value?.firstChild) return

      const fragmentBeforeCaret = getFragmentBeforeSelection(currentBlockElement)
      if (fragmentBeforeCaret) return

      e.preventDefault()

      const previousSibling = currentBlockElement.previousElementSibling
      const isPreviousSiblingBlock = previousSibling && window.getComputedStyle(previousSibling).display === 'block'
      if (isPreviousSiblingBlock) {
        caret.insertInto(previousSibling)
        previousSibling.appendChild(currentBlockElement)
      }

      caret.save()
      unwrapElement(currentBlockElement)
      caret.restore()

      updateActiveFormats()
      updateModel()
    }

    function onMouseUp () {
      updateActiveFormats()
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

        updateEditorHtml('')
        updateActiveFormats()

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

    function updateEditorHtml (newVal: string) {
      if (editorRef.value) {
        editorRef.value.innerHTML = newVal
      }
    }

    function updateModel () {
      if (editorRef.value) {
        model.value = editorRef.value.innerHTML
      }
    }

    function updateActiveFormats () {
      if (!editorRef.value || props.readonly || props.disabled) return

      const newActiveFormats = new Set<string>()

      formats.forEach((format: Formatter) => {
        if (formatter.findElementWithFormat(format)) {
          newActiveFormats.add(format.name)
        }
      })

      activeFormats.value = newActiveFormats
    }

    function getFragmentBeforeSelection (element: Element): Node | null {
      const selectionResult = selection.get()
      if (!selectionResult) return null
      const { range } = selectionResult

      const beforeRange = range.cloneRange()
      beforeRange.setStartBefore(element)
      beforeRange.setEnd(range.startContainer, range.startOffset)
      const fragment = beforeRange.cloneContents()

      return isEmptyNode(fragment) ? null : fragment
    }

    function getFragmentAfterCaret (element: Element): Node | null {
      const selectionResult = selection.get()
      if (!selectionResult) return null
      const { range } = selectionResult

      const afterRange = range.cloneRange()
      afterRange.setStart(range.startContainer, range.startOffset)
      afterRange.setEndAfter(element)

      const fragment = afterRange.cloneContents()
      return isEmptyNode(fragment) ? null : fragment
    }

    function getFragmentAfterSelection (element: Element): Node | null {
      const selectionResult = selection.get()
      if (!selectionResult) return null
      const { range } = selectionResult

      const afterRange = range.cloneRange()
      afterRange.setStart(range.endContainer, range.endOffset)
      afterRange.setEndAfter(element)

      const fragment = afterRange.cloneContents()
      return isEmptyNode(fragment) ? null : fragment
    }

    function getContentInsideSelection (): Node | null {
      const selectionResult = selection.get()
      if (!selectionResult) return null
      const { range } = selectionResult

      if (range.collapsed) return null

      const contents = range.cloneContents()
      return isEmptyNode(contents) ? null : wrapByTag(contents, 'span')
    }

    function getFragmemntAtSplit (element: Element): Node | null {
      const selectionResult = selection.get()
      if (!selectionResult) return null
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

    function toggleFormat (format: Formatter) {
      if (format.category === FormatCategory.Heading) {
        toggleHeadingFormat(format)
      } else if (format.category === FormatCategory.Alignment) {
        toggleAlignmentFormat(format)
      } else {
        toggleInlineFormat(format)
      }

      updateModel()
      updateActiveFormats()
    }

    function toggleInlineFormat (format: Formatter) {
      const formattedElement = formatter.findElementWithFormat(format)
      if (formattedElement) {
        removeInlineFormat(formattedElement)
      } else {
        addInlineFormat(format)
      }
    }

    function toggleHeadingFormat (format: Formatter) {
      const currentBlockElement = getCurrentBlockElement()
      const currentBlockTag = currentBlockElement?.tagName.toLowerCase()
      const isCurrentBlockHeadingOrDiv = currentBlockTag?.startsWith('h') || currentBlockTag === 'div'

      if (!editorRef.value) return

      caret.save()

      if (!currentBlockElement) {
        formatChildren(editorRef.value, format)
      } else if (formatter.isApplied(format, currentBlockElement)) {
        replaceFormat(currentBlockElement, blockFormatter)
      } else if (isCurrentBlockHeadingOrDiv) {
        replaceFormat(currentBlockElement, format)
      } else {
        formatChildren(currentBlockElement, format)
      }

      caret.restore()
    }

    function toggleAlignmentFormat (format: Formatter) {
      const blockElement = getCurrentBlockElement()
      const targetStyles = format.config.styles
      const targetAlignment = targetStyles?.textAlign

      if (!editorRef.value) return

      if (!targetAlignment) return

      if (!blockElement) {
        caret.save()
        formatChildren(editorRef.value, format)
        caret.restore()
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
    }

    function addInlineFormat (format: Formatter) {
      if (!editorRef.value || props.readonly || props.disabled) return

      editorRef.value?.focus()

      const formatterElement = formatter.get(format)
      selection.wrap(formatterElement)

      if (!selection.hasText()) {
        caret.insertInto(formatterElement)
      } else {
        selection.select(formatterElement)
      }
    }

    function removeInlineFormat (element: Element) {
      if (!editorRef.value || props.readonly || props.disabled) return

      const isElementEmpty = isEmptyNode(element)

      if (isElementEmpty) {
        removeElement(element)
      } else if (selection.hasText()) {
        unwrapSelection(element)
      } else {
        splitElementAtCaret(element)
      }
    }

    function getCurrentBlockElement () {
      const selectionResult = selection.get()
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

    function removeElement (element: Node) {
      const parent = element.parentNode
      if (!parent) return
      parent.removeChild(element)
    }

    function replaceFormat (element: Element, format: Formatter) {
      const formatterElement = formatter.get(format)
      replaceElement(element, formatterElement)
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

    function formatChildren (element: Element, format: Formatter) {
      const formatterElement = formatter.get(format)

      while (element.firstChild) {
        formatterElement.appendChild(element.firstChild)
      }
      element.insertBefore(formatterElement, element.firstChild)
      return formatterElement
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

      const selectedContent = getContentInsideSelection()
      const afterFragment = getFragmentAfterSelection(element)
      const beforeFragment = getFragmentBeforeSelection(element)

      if (!selectedContent) {
        return
      }

      if (!beforeFragment && !afterFragment) {
        unwrapElement(element)
        selection.selectBetween(firstChild, lastChild)
      } else {
        parent.insertBefore(beforeFragment || emptyFragment, element)
        parent.insertBefore(selectedContent, element)
        parent.insertBefore(afterFragment || emptyFragment, element)
        parent.removeChild(element)

        selection.select(selectedContent)
      }
    }

    function splitElementAtCaret (element: Element) {
      const parent = element.parentNode
      if (!parent) return

      const emptyFragment = document.createTextNode(zeroWidthSpace)

      const middle = getFragmemntAtSplit(element) || emptyFragment
      const afterFragment = getFragmentAfterCaret(element) || emptyFragment
      const beforeFragment = getFragmentBeforeSelection(element) || emptyFragment

      parent.insertBefore(beforeFragment, element)
      parent.insertBefore(middle, element)
      parent.insertBefore(afterFragment, element)
      parent.removeChild(element)

      caret.insertInto(middle.firstChild || middle)
    }

    watch(() => props.modelValue, newVal => {
      if (newVal === model.value) return
      model.value = newVal || ''
      updateEditorHtml(newVal)
    })

    onMounted(() => {
      if (editorRef.value) {
        updateEditorHtml(model.value || '')
        editorRef.value.addEventListener('keyup', onKeyUp)
        editorRef.value.addEventListener('keydown', onKeyDown)
        editorRef.value.addEventListener('mouseup', onMouseUp)
      }
    })

    onBeforeUnmount(() => {
      if (editorRef.value) {
        editorRef.value.removeEventListener('keyup', onKeyUp)
        editorRef.value.removeEventListener('keydown', onKeyDown)
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
                class="v-editor__field"
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
                                    onClick={ () => toggleFormat(format) }
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
