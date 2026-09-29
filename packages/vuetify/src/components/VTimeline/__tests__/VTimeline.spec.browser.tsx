// Components
import { VTimeline, VTimelineItem } from '..'

// Utilities
import { render, screen, showcase } from '@test'
import { nextTick, ref } from 'vue'

// Types
import type {
  TimelineAlign,
  TimelineSide,
  TimelineTruncateLine,
} from '../VTimeline'

const stories = {
  Vertical: (
    <VTimeline>
      <VTimelineItem key="1">
        {{
          default: () => 'Content',
          opposite: () => 'Opposite',
        }}
      </VTimelineItem>
      <VTimelineItem key="2">
        {{
          default: () => <div class="mb-10">Content</div>,
          opposite: () => 'Opposite',
        }}
      </VTimelineItem>
    </VTimeline>
  ),
  Horizontal: (
    <VTimeline direction="horizontal">
      <VTimelineItem key="1">
        {{
          default: () => 'Content',
          opposite: () => 'Opposite',
        }}
      </VTimelineItem>
      <VTimelineItem key="2">
        {{
          default: () => <div class="mb-10">Content</div>,
          opposite: () => 'Opposite',
        }}
      </VTimelineItem>
    </VTimeline>
  ),
}

describe('VTimeline', () => {
  describe('vertical', () => {
    it('should support truncate-line', async () => {
      const truncateLine = ref<TimelineTruncateLine>()
      render(() => (
        <VTimeline truncateLine={ truncateLine.value }>
          <VTimelineItem key="1">
            {{
              default: () => 'Content',
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
          <VTimelineItem key="2">
            {{
              default: () => <div class="mb-10">Content</div>,
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
        </VTimeline>
      ))

      const timeline = screen.getByCSS('.v-timeline')

      expect(timeline).not.toHaveClass('v-timeline--truncate-line-start')
      expect(timeline).not.toHaveClass('v-timeline--truncate-line-end')

      truncateLine.value = 'start'
      await nextTick()

      expect(timeline).toHaveClass('v-timeline--truncate-line-start')
      expect(timeline).not.toHaveClass('v-timeline--truncate-line-end')

      truncateLine.value = 'end'
      await nextTick()

      expect(timeline).not.toHaveClass('v-timeline--truncate-line-start')
      expect(timeline).toHaveClass('v-timeline--truncate-line-end')

      truncateLine.value = 'both'
      await nextTick()

      expect(timeline).toHaveClass('v-timeline--truncate-line-start')
      expect(timeline).toHaveClass('v-timeline--truncate-line-end')
    })

    it('should keep nested timeline connectors continuous when parent lines are truncated', async () => {
      render(() => (
        <VTimeline align="start" side="end" truncateLine="both">
          <VTimelineItem>
            <VTimeline class="nested-timeline" align="start" side="end">
              <VTimelineItem>First nested item</VTimelineItem>
              <VTimelineItem>Second nested item</VTimelineItem>
            </VTimeline>
          </VTimelineItem>
          <VTimelineItem>
            <VTimeline class="nested-timeline" align="start" side="end">
              <VTimelineItem>First nested item</VTimelineItem>
              <VTimelineItem>Second nested item</VTimelineItem>
            </VTimeline>
          </VTimelineItem>
        </VTimeline>
      ))

      await nextTick()

      for (const timeline of screen.getAllByCSS('.nested-timeline')) {
        const dividers = timeline.querySelectorAll(':scope > .v-timeline-item > .v-timeline-divider')
        const firstBefore = dividers[0].querySelector(':scope > .v-timeline-divider__before')!
        const after = dividers[0].querySelector(':scope > .v-timeline-divider__after')!
        const before = dividers[1].querySelector(':scope > .v-timeline-divider__before')!
        const lastAfter = dividers[dividers.length - 1].querySelector(':scope > .v-timeline-divider__after')!

        expect(getComputedStyle(firstBefore).display).not.toBe('none')
        expect(getComputedStyle(after).display).not.toBe('none')
        expect(getComputedStyle(before).display).not.toBe('none')
        expect(getComputedStyle(lastAfter).display).not.toBe('none')
        expect(firstBefore.getBoundingClientRect().height).toBeGreaterThan(0)
        expect(after.getBoundingClientRect().bottom).toBe(before.getBoundingClientRect().top)
        expect(lastAfter.getBoundingClientRect().height).toBeGreaterThan(0)
      }

      const lastDivider = screen.getByCSS('.v-timeline:not(.nested-timeline) > .v-timeline-item:last-child > .v-timeline-divider')
      const lastBefore = lastDivider.querySelector(':scope > .v-timeline-divider__before')!
      const lastDot = lastDivider.querySelector(':scope > .v-timeline-divider__dot')!
      const dotRect = lastDot.getBoundingClientRect()

      expect(lastBefore.getBoundingClientRect().bottom).toBe(dotRect.top + dotRect.height / 2)
    })

    it('should support align', async () => {
      const align = ref<TimelineAlign>('center')

      render(() => (
        <VTimeline align={ align.value }>
          <VTimelineItem key="1">
            {{
              default: () => (
                <div>
                  <div class="headline-small">Title</div>
                  <div class="label-large">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
          <VTimelineItem key="2">
            {{
              default: () => (
                <div>
                  <div class="headline-small">Title</div>
                  <div class="label-large">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
        </VTimeline>
      ))

      const timeline = screen.getByCSS('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--align-center')

      align.value = 'start'
      await nextTick()

      expect(timeline).toHaveClass('v-timeline--align-start')
    })

    it('should support side', async () => {
      const side = ref<TimelineSide>('start')

      render(() => (
        <VTimeline side={ side.value }>
          <VTimelineItem key="1">
            {{
              default: () => (
                <div>
                  <div class="headline-small">Title</div>
                  <div class="label-large">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
          <VTimelineItem key="2">
            {{
              default: () => (
                <div>
                  <div class="headline-small">Title</div>
                  <div class="label-large">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
        </VTimeline>
      ))

      const timeline = screen.getByCSS('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--side-start')

      side.value = 'end'
      await nextTick()

      expect(timeline).toHaveClass('v-timeline--side-end')
    })
  })

  it('should not fill dot when size is a number and fill-dot is false', async () => {
    render(() => (
      <VTimeline>
        <VTimelineItem size={ 40 } fillDot={ false }>
          {{ default: () => 'Content' }}
        </VTimelineItem>
      </VTimeline>
    ))

    const outerDot = screen.getByCSS('.v-timeline-divider__dot')
    const innerDot = screen.getByCSS('.v-timeline-divider__inner-dot')

    expect(outerDot.getBoundingClientRect().width).toBe(40)
    expect(innerDot.getBoundingClientRect().width).toBe(32)
    expect(innerDot.getBoundingClientRect().height).toBe(32)
  })

  it('should fill dot when size is a number and fill-dot is true', async () => {
    render(() => (
      <VTimeline>
        <VTimelineItem size={ 40 } fillDot>
          {{ default: () => 'Content' }}
        </VTimelineItem>
      </VTimeline>
    ))

    const outerDot = screen.getByCSS('.v-timeline-divider__dot')
    const innerDot = screen.getByCSS('.v-timeline-divider__inner-dot')

    expect(outerDot.getBoundingClientRect().width).toBe(40)
    expect(innerDot.getBoundingClientRect().width).toBe(40)
    expect(innerDot.getBoundingClientRect().height).toBe(40)
  })

  showcase({ stories })
})
