// Styles
import './VEditor.sass'

// Components
import { VBtn } from '@/components/VBtn/VBtn'
import { makeVFieldProps, VField } from '@/components/VField/VField'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VSheet } from '@/components/VSheet/VSheet'
import { VToolbar } from '@/components/VToolbar/VToolbar'

// Composables
import { useCaret, useElement, useSelection } from './composables'
import { FormatCategory, formats, Formats, useFormatter } from './composables/formatter'
import { useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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

    const caret = useCaret(editorRef)
    const selection = useSelection(editorRef)
    const formatter = useFormatter(editorRef)
    const editorElement = useElement(editorRef)
    const { isFocused, focus, blur } = useFocus(props)

    const vFieldRef = ref<VField>()
    const vInputRef = ref<VInput>()
    const activeFormats = ref<Set<string>>(new Set())

    const isActive = computed(() => (
      isFocused.value ||
      props.active
    ))
    const isFormatActive = computed(() => (tag: string) => activeFormats.value.has(tag))
    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant))
    const displayedFormats = computed(() => formats.filter(format => props.formats.includes(format.name)))

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
      updateModelValue()
    }

    function onKeyUp () {
      updateActiveFormats()
    }

    function onKeyDown (e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault()
            const boldFormat = formats.find(f => f.name === Formats.Bold)
            if (boldFormat) applyFormat(boldFormat)
            break
          case 'i':
            e.preventDefault()
            const italicFormat = formats.find(f => f.name === Formats.Italic)
            if (italicFormat) applyFormat(italicFormat)
            break
          case 'u':
            e.preventDefault()
            const underlineFormat = formats.find(f => f.name === Formats.Underline)
            if (underlineFormat) applyFormat(underlineFormat)
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
      if (!editorRef.value) return

      if (selection.hasText()) {
        e.preventDefault()
        return
      }

      const currentBlockElement = editorElement.getCurrentBlock() || editorRef.value

      // Custom behavior is needed for cross browser compatibility
      if (isAtLineEnd(currentBlockElement)) {
        e.preventDefault()
        startNewLine(currentBlockElement)
        updateModelValue()
      }
    }

    function onBackspaceKey (e: KeyboardEvent) {
      if (!editorRef.value || selection.hasText()) return

      const currentBlockElement = editorElement.getCurrentBlock() || editorRef.value

      // Custom behavior is needed for cross browser compatibility
      if (isAtLineStart(currentBlockElement) && !isFirstLine(currentBlockElement)) {
        e.preventDefault()
        mergeIntoPreviousLine(currentBlockElement)
        updateModelValue()
      }
    }

    function updateEditorHtml (newVal: string) {
      if (editorRef.value) {
        editorRef.value.innerHTML = newVal
      }
    }

    function updateModelValue () {
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

    function applyFormat (format: Formatter) {
      if (props.readonly || props.disabled) return

      if (format.category === FormatCategory.Heading) {
        formatter.heading.toggle(format)
      } else if (format.category === FormatCategory.Alignment) {
        formatter.alignment.toggle(format)
      } else {
        formatter.inline.toggle(format)
      }

      updateModelValue()
      updateActiveFormats()
    }

    function isFirstLine (currentBlockElement: Element | undefined) {
      return !currentBlockElement || [editorRef.value?.firstChild, editorRef.value].includes(currentBlockElement)
    }

    function isAtLineStart (currentBlockElement: Element) {
      const fragmentBeforeCaret = editorElement.getFragmentBeforeSelection(currentBlockElement)
      return !fragmentBeforeCaret
    }

    function isAtLineEnd (currentBlockElement: Element) {
      const fragmentAfterCaret = editorElement.getFragmentAfterCaret(currentBlockElement)
      return !fragmentAfterCaret
    }

    function startNewLine (currentBlockElement: Element | null) {
      if (!editorRef.value) return

      const newBlockTag = currentBlockElement?.tagName.toLowerCase() || 'div'
      const newBlock = document.createElement(newBlockTag)

      if (!currentBlockElement) {
        editorRef.value.appendChild(newBlock)
        caret.insertInto(newBlock)
      } else {
        currentBlockElement.parentElement?.insertBefore(newBlock, currentBlockElement.nextSibling)
        caret.insertInto(newBlock)
      }
    }

    function mergeIntoPreviousLine (currentBlockElement: Element) {
      if (!currentBlockElement) return

      const previousSibling = currentBlockElement.previousElementSibling
      const isPreviousSiblingBlock = previousSibling && window.getComputedStyle(previousSibling).display === 'block'
      if (isPreviousSiblingBlock) {
        caret.insertInto(previousSibling)
        previousSibling.appendChild(currentBlockElement)
      }

      caret.save()
      editorElement.unwrap(currentBlockElement)
      caret.restore()
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
