import { configureStore } from '@reduxjs/toolkit'
import { productRed } from './productRed'

export default configureStore({
  reducer: {
    productRed:productRed
  },
})