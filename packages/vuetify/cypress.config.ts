import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '5w5r1i',
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    specPattern: './src/**/*.spec.cy.{js,jsx,ts,tsx}',
    supportFile: './cypress/support/index.ts',
    video: false,
  },
  viewportWidth: 1075,
  viewportHeight: 825,
})
