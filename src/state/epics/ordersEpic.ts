import { combineEpics, Epic, ofType } from 'redux-observable'
import { of, merge } from 'rxjs'
import { ignoreElements, map, mergeMap, tap } from 'rxjs/operators'
import { connectSocket, SocketActionType } from '../actions/socketActions'
import {
  initializeOrders,
  OrderActionType,
  updateReceived,
} from '../actions/orderActions'
import { AppRootState } from '../store'
import { MarketsEnum } from 'src/enums/MarketsEnum'
import {
  listenToBookFeed$,
  sendSubscribeMessage,
} from 'src/services/socketService'
import { OrderUpdateResponse } from 'src/models/OrderUpdateResponse'

export const listenToConnect$: Epic<
  ReturnType<typeof connectSocket>,
  any, // @TODO: use typesafe-actions
  AppRootState
> = (action$) =>
  action$.pipe(
    ofType(SocketActionType.connect),
    mergeMap(() =>
      merge(
        of(initializeOrders([MarketsEnum.btc])),
        listenToBookFeed$.pipe(
          map((res) => updateReceived(res as OrderUpdateResponse[]))
        )
      )
    )
  )

export const initializeOrders$: Epic<
  ReturnType<typeof initializeOrders>,
  any, // @TODO: use typesafe-actions
  AppRootState
> = (actions$) =>
  actions$.pipe(
    ofType(OrderActionType.initializeOrders),
    tap({
      next: ({ payload }) => sendSubscribeMessage(payload),
    }),
    ignoreElements()
  )

export const ordersEpic$ = combineEpics(listenToConnect$, initializeOrders$)
