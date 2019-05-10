const ingredients = require.context(
  '@/pan', false, /\.vue$/
)

const meals = []

for (const file of ingredients.keys()) {
  if (file.search(/_/) >= 0) continue

  meals.push(file.replace(/\.\/|.vue/g, ''))
}

export default meals
