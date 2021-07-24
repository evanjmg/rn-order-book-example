import { combineEpics } from 'redux-observable'
import { ordersEpic$ } from './ordersEpic'

export const rootEpic = combineEpics(ordersEpic$)
