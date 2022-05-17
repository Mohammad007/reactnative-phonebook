import { configureStore } from '@reduxjs/toolkit'
import PhonebookSlice from './reducerslist/PhonebookSlice'

export const store = configureStore({
    reducer: {
      phonebooks: PhonebookSlice,
  },
})