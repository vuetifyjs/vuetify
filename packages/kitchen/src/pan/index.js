const ingredients = require.context(
  '@/pan', false, /\.vue$/
)

const meals = []

for (const file of ingredients.keys()) {
  if (file === './index.js' || file === './_Template.vue') continue

  meals.push(file.replace(/\.\/|.vue/g, ''))
}

export default meals
