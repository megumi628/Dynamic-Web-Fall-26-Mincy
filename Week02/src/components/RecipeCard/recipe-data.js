// Importing the image gives us back a url string that Vite knows how to
// serve in dev and how to fingerprint at build time.
// NOTE: the old create-react-app version of this file used
//   imgSrc: require('../../assets/pancake.jpg')
// require() does not exist in a Vite project. Always use import.
import IMG from '../../assets/IMG_7012.jpg'

export const RECIPE = {
  title: 'Creamy Mashed Potato',
  imgSrc: IMG,
  description:
    'A super‑easy lazy‑day side dish, ready in 20 minutes.',
  ingredients: [
    {measure: '400g', item: 'Potatoes'},
    {measure: '50g', item: 'Unsalted butter'},
    {measure: '100ml', item: 'Whole milk'},
    {measure: '1/2 tsp', item: 'Salt'},
    {measure: '1/4 tsp', item: 'Freshly ground black pepper'},
  ],
  instructions: [
    'Peel potatoes and cut them into small, evenly‑sized chunks.',
    'Place potato chunks into salted boiling water, cook for 15‑20 minutes until fork‑tender.',
    'Drain the water completely while potatoes are still hot.',
    'Add butter to hot potatoes and mash thoroughly.',
    'Pour in warm milk little by little, keep mashing until smooth and creamy.',
    'Season with salt and black pepper, stir well and serve hot.',
  ],
}
