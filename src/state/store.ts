import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers/rootReducer'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from './epics/rootEpic'

const epicMiddleware = createEpicMiddleware()
export const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
  devTools: true,
})
epicMiddleware.run(rootEpic)

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
