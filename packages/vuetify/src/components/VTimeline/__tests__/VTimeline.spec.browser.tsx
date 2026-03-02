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

  showcase({ stories })
})
