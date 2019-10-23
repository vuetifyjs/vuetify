// Returns a function to generate stories
export const storyFactory = (components) => {
  return opts => {
    // If user supplied a string,
    // create an object with it
    if (typeof opts === 'string') {
      opts = { template: opts }
    }

    return {
      components,
      ...opts
    }
  }
}
