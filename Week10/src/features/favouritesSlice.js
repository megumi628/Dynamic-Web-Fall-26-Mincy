// DEVTOOLS NOTES (Part 2)
// Action type:  favourites/favouriteToggled
//   (RTK builds it as `${slice name}/${reducer name}`)
// Payload:      a print id, e.g. 'p1'
// Triggered by: clicking the square "favourite" button on Composition I.
// What it changed (Diff tab): favourites > ids > 0: 'p1' was added, so
//   state.favourites.ids went from [] to ['p1'] (header count ■ 0 -> ■ 1).
//   Dispatching the same action again removes it, back to [].
//   Nothing under state.cart is touched; the cart slice keeps the same object.
// Time travel: dragging the slider back to the start empties the cart and the
//   favourites; dragging forward replays each action in order.

import {createSlice} from '@reduxjs/toolkit'

const favouritesSlice = createSlice({
  name: 'favourites',

  // Only ids are stored. The print data itself lives in data/prints.js.
  initialState: {
    ids: [],
  },

  reducers: {
    // In if present -> take it out. Not in -> put it in.
    favouriteToggled(state, action) {
      const id = action.payload

      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((favouriteId) => favouriteId !== id)
        return
      }

      state.ids.push(id)
    },
  },
})

export const {favouriteToggled} = favouritesSlice.actions

// Selectors: functions that take the WHOLE store state and return one piece.
// Keeping them next to the slice means only this file knows the state shape.
export const selectFavouriteIds = (state) => state.favourites.ids
export const selectFavouriteCount = (state) => state.favourites.ids.length

export default favouritesSlice.reducer
