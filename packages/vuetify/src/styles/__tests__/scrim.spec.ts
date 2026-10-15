// Utilities
import { resolve } from 'node:path'
import { compileString } from 'sass'

const options = { loadPaths: [resolve('src')], quietDeps: true }

describe('scrim styles', () => {
  it('should retain configurable overlay fallback values and Safari blur', () => {
    const { css } = compileString(`
      @use 'components/VOverlay/variables' with (
        $overlay-opacity: .5,
        $overlay-scrim-background: red,
        $overlay-scrim-blur: 6px
      );
      @use 'components/VOverlay/VOverlay';
    `, options)

    expect(css).toContain('--v-overlay-opacity: var(--v-scrim-opacity, 0.5)')
    expect(css).toContain('var(--v-scrim-color, red)')
    expect(css).toContain('-webkit-backdrop-filter: blur(var(--v-scrim-blur, 6px))')
    expect(css).toContain('backdrop-filter: blur(var(--v-scrim-blur, 6px))')
  })

  it('should retain configurable drawer fallback values', () => {
    const { css } = compileString(`
      @use 'components/VNavigationDrawer/variables' with (
        $navigation-drawer-scrim-opacity: .5,
        $navigation-drawer-scrim-background: red,
        $navigation-drawer-scrim-blur: 6px
      );
      @use 'components/VNavigationDrawer/VNavigationDrawer';
    `, options)

    expect(css).toContain('--v-navigation-drawer-scrim-opacity: var(--v-scrim-opacity, 0.5)')
    expect(css).toContain('var(--v-scrim-color, red)')
    expect(css).toContain('blur(calc(var(--v-scrim-blur, 6px) * var(--v-navigation-drawer-scrim-progress)))')
  })

  it('should apply opacity to customized Sass palette colors', () => {
    const { css } = compileString(`
      @use 'styles/settings/colors' as settings with ($red: ('base': #123456));
      @use 'styles/generic/colors';
    `, options)

    expect(css).toContain('background-color: color-mix(in srgb, #123456 calc(var(--v-background-opacity, 1) * 100%), transparent)')
  })
})
