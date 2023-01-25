import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/anecdoteReducer'

import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      notificationL:notificationReducer,
    }
  })
  
  
  export default store
  