// Styles
import '@/labs/VCommandPalette/VCommandPalette.scss'

// Components
import { VHotkey } from '@/labs/VCommandPalette/VHotkey'

// Composables
import { useLocale } from '@/composables/locale'
import { provideTheme } from '@/composables/theme'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVCommandPaletteInstructionsProps = propsFactory({
  hasItems: Boolean,
  hasParent: Boolean,
  hasSelection: Boolean,
}, 'VCommandPaletteInstructions')

export const VCommandPaletteInstructions = genericComponent()({
  name: 'VCommandPaletteInstructions',

  props: makeVCommandPaletteInstructionsProps(),

  setup (props) {
    const { t } = useLocale()

    const { themeClasses } = provideTheme(props)

    useRender(() => (
      <div class={[
        'v-command-palette-instructions',
        themeClasses.value,
      ]}
      >
        { props.hasItems && (
          <div key="select-instruction" class="d-flex align-center">
            <VHotkey keys="enter" />
            <span class="ms-2">{ t('$vuetify.command.select') }</span>
          </div>
        )}
        { props.hasItems && (
          <div key="navigate-instruction" class="d-flex align-center">
            <VHotkey keys="arrowup arrowdown" />
            <span class="ms-2">{ t('$vuetify.command.navigate') }</span>
          </div>
        )}
        { props.hasParent && (
          <div key="back-instruction" class="d-flex align-center">
            <VHotkey keys="backspace" />
            <span class="ms-2">{ t('$vuetify.command.goBack') }</span>
          </div>
        )}
        <div class="d-flex align-center">
          <VHotkey keys="escape" />
          <span class="ms-2">{ t('$vuetify.command.close') }</span>
        </div>
      </div>
    ))
  },
})

export type VCommandPaletteInstructions = InstanceType<typeof VCommandPaletteInstructions>
