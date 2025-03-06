/* eslint-disable sonarjs/no-identical-functions */
/// <reference types="../../../../types/cypress" />

// Components
import { VTimeline, VTimelineItem } from '../'

// Utilities
import { ref } from 'vue'

// Types
import type {
  TimelineAlign,
  TimelineSide,
  TimelineTruncateLine,
} from '../VTimeline'

describe('VTimeline', () => {
  describe('vertical', () => {
    it('should render', () => {
      cy.mount(() => (
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

      cy.get('.v-timeline').should('have.class', 'v-timeline--vertical')
    })

    it('should support truncate-line', () => {
      const truncateLine = ref<TimelineTruncateLine>()
      cy.mount(() => (
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

      cy.get('.v-timeline')
        .should('not.have.class', 'v-timeline--truncate-line-start')
        .should('not.have.class', 'v-timeline--truncate-line-end')
        .then(() => {
          truncateLine.value = 'start'
        })
        .get('.v-timeline')
        .should('have.class', 'v-timeline--truncate-line-start')
        .then(() => {
          truncateLine.value = 'end'
        })
        .get('.v-timeline')
        .should('have.class', 'v-timeline--truncate-line-end')
        .then(() => {
          truncateLine.value = 'both'
        })
        .get('.v-timeline')
        .should('have.class', 'v-timeline--truncate-line-end')
        .should('have.class', 'v-timeline--truncate-line-start')
    })

    it('should support align', () => {
      const align = ref<TimelineAlign>('center')

      cy.mount(() => (
        <VTimeline align={ align.value }>
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

      cy.get('.v-timeline')
        .should('have.class', 'v-timeline--align-center')
        .then(() => align.value = 'start')
        .get('.v-timeline')
        .should('have.class', 'v-timeline--align-start')
    })

    it('should support side', () => {
      const side = ref<TimelineSide>('start')

      cy.mount(() => (
        <VTimeline side={ side.value }>
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

      cy.get('.v-timeline')
        .should('have.class', 'v-timeline--side-start')
        .then(() => side.value = 'end')
        .get('.v-timeline')
        .should('have.class', 'v-timeline--side-end')
    })

    it('should support truncate-line and align', () => {
      cy.mount(() => (
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

      cy.get('.v-timeline')
        .should('have.class', 'v-timeline--truncate-line-start')
        .should('have.class', 'v-timeline--align-start')
    })
  })

  describe('horizontal', () => {
    it('should render', () => {
      cy.mount(() => (
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

      cy.get('.v-timeline').should('have.class', 'v-timeline--horizontal')
    })

    it('should support truncate-line', () => {
      const truncateLine = ref<TimelineTruncateLine>()
      cy.mount(() => (
        <VTimeline direction="horizontal" truncateLine={ truncateLine.value }>
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

      cy.get('.v-timeline')
        .should('not.have.class', 'v-timeline--truncate-line-start')
        .should('not.have.class', 'v-timeline--truncate-line-end')
        .then(() => {
          truncateLine.value = 'start'
        })
        .get('.v-timeline')
        .should('have.class', 'v-timeline--truncate-line-start')
        .then(() => {
          truncateLine.value = 'end'
        })
        .get('.v-timeline')
        .should('have.class', 'v-timeline--truncate-line-end')
        .then(() => {
          truncateLine.value = 'both'
        })
        .get('.v-timeline')
        .should('have.class', 'v-timeline--truncate-line-end')
        .should('have.class', 'v-timeline--truncate-line-start')
    })

    it('should support align', () => {
      const align = ref<TimelineAlign>('center')

      cy.mount(() => (
        <VTimeline direction="horizontal" align={ align.value }>
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

      cy.get('.v-timeline')
        .should('have.class', 'v-timeline--align-center')
        .then(() => align.value = 'start')
        .get('.v-timeline')
        .should('have.class', 'v-timeline--align-start')
    })

    it('should support side', () => {
      const side = ref<TimelineSide>('start')

      cy.mount(() => (
        <VTimeline direction="horizontal" side={ side.value }>
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

      cy.get('.v-timeline')
        .should('have.class', 'v-timeline--side-start')
        .then(() => side.value = 'end')
        .get('.v-timeline')
        .should('have.class', 'v-timeline--side-end')
    })
  })
})
