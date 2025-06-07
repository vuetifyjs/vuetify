// Components
import { VTimeline, VTimelineItem } from '../'

// Utilities
import { render } from '@test'

describe('VTimeline', () => {
  describe('vertical', () => {
    it('should render', () => {
      const { container } = render(() => (
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
      ))

      expect(container.querySelector('.v-timeline')).toHaveClass('v-timeline--vertical')
    })

    it('should support truncate-line to start', () => {
      const { container } = render(() => (
        <VTimeline truncateLine="start">
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

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--truncate-line-start')
    })

    it('should support truncate-line to end', () => {
      const { container } = render(() => (
        <VTimeline truncateLine="end">
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

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--truncate-line-end')
    })

    it('should support truncate-line to both', () => {
      const { container } = render(() => (
        <VTimeline truncateLine="both">
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

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--truncate-line-start')
      expect(timeline).toHaveClass('v-timeline--truncate-line-end')
    })

    it('should support align center', () => {
      const { container } = render(() => (
        <VTimeline align="center">
          <VTimelineItem key="1">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
          <VTimelineItem key="2">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
        </VTimeline>
      ))

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--align-center')
    })

    it('should support align start', () => {
      const { container } = render(() => (
        <VTimeline align="start">
          <VTimelineItem key="1">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
          <VTimelineItem key="2">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
        </VTimeline>
      ))

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--align-start')
    })

    it('should support side start', () => {
      const { container } = render(() => (
        <VTimeline side="start">
          <VTimelineItem key="1">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
          <VTimelineItem key="2">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
        </VTimeline>
      ))

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--side-start')
    })

    it('should support side end', () => {
      const { container } = render(() => (
        <VTimeline side="end">
          <VTimelineItem key="1">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
          <VTimelineItem key="2">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
        </VTimeline>
      ))

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--side-end')
    })

    it('should support truncate-line and align', () => {
      const { container } = render(() => (
        <VTimeline truncateLine="start" align="start">
          <VTimelineItem key="1">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
          <VTimelineItem key="2">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
        </VTimeline>
      ))

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--truncate-line-start')
      expect(timeline).toHaveClass('v-timeline--align-start')
    })
  })

  describe('horizontal', () => {
    it('should render', () => {
      const { container } = render(() => (
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
      ))

      expect(container.querySelector('.v-timeline')).toHaveClass('v-timeline--horizontal')
    })

    it('should support truncate-line to start', () => {
      const { container } = render(() => (
        <VTimeline direction="horizontal" truncateLine="start">
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

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--truncate-line-start')
    })

    it('should support truncate-line to end', () => {
      const { container } = render(() => (
        <VTimeline direction="horizontal" truncateLine="end">
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

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--truncate-line-end')
    })

    it('should support truncate-line to both', () => {
      const { container } = render(() => (
        <VTimeline direction="horizontal" truncateLine="both">
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

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--truncate-line-start')
      expect(timeline).toHaveClass('v-timeline--truncate-line-end')
    })

    it('should support align center', () => {
      const { container } = render(() => (
        <VTimeline direction="horizontal" align="center">
          <VTimelineItem key="1">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
          <VTimelineItem key="2">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
        </VTimeline>
      ))

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--align-center')
    })

    it('should support align start', () => {
      const { container } = render(() => (
        <VTimeline direction="horizontal" align="start">
          <VTimelineItem key="1">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
          <VTimelineItem key="2">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
        </VTimeline>
      ))

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--align-start')
    })

    it('should support side start', () => {
      const { container } = render(() => (
        <VTimeline direction="horizontal" side="start">
          <VTimelineItem key="1">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
          <VTimelineItem key="2">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
        </VTimeline>
      ))

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--side-start')
    })

    it('should support side end', () => {
      const { container } = render(() => (
        <VTimeline direction="horizontal" side="end">
          <VTimelineItem key="1">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
          <VTimelineItem key="2">
            {{
              default: () => (
                <div>
                  <div class="text-h6">Title</div>
                  <div class="text-subtitle-2">Subtitle</div>
                </div>
              ),
              opposite: () => 'Opposite',
            }}
          </VTimelineItem>
        </VTimeline>
      ))

      const timeline = container.querySelector('.v-timeline')
      expect(timeline).toHaveClass('v-timeline--side-end')
    })
  })
})
