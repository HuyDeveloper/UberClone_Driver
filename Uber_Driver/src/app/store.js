import { configureStore } from '@reduxjs/toolkit'
import navReducer from '../components/navSlice'
export const store = configureStore({
  reducer: {
    nav: navReducer
  }
})
