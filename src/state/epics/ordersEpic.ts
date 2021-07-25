import { combineEpics, Epic, ofType } from 'redux-observable'
import { of, merge, Observable } from 'rxjs'
import {
  catchError,
  ignoreElements,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators'
import {
  connectSocket,
  disconnectSocket,
  SocketActionType,
} from '../actions/socketActions'
import { AppRootState } from '../store'
import { disconnect, sendSubscribeMessage } from 'src/services/socketService'
import { OrderUpdateResponse } from 'src/models/OrderUpdateResponse'
import { MarketsEnum } from 'src/enums/MarketsEnum'
import { listenToBookFeed$ } from 'src/services/ordersService'
import {
  initialize,
  invalidate,
  updateReceived,
  toggleInitialize,
} from '../reducers/ordersReducer'
import { getFeed } from '../selectors/ordersSelectors'

const getFeedOperator = (state$: Observable<AppRootState>) =>
  withLatestFrom(state$.pipe(map(getFeed)))

export const listenToConnect$: Epic<
  ReturnType<typeof connectSocket>,
  any, // @TODO: use typesafe-actions
  AppRootState
> = (action$, state$) =>
  action$.pipe(
    ofType(SocketActionType.connect),
    getFeedOperator(state$),
    // switch onto new socket subscription
    switchMap(([_, feed]) =>
      merge(
        of(initialize(feed)),
        listenToBookFeed$.pipe(
          map((res) => updateReceived(res as OrderUpdateResponse[])),
          // on killed sockets invalidate cache
          catchError(() => of(invalidate()))
        )
      )
    )
  )

export const listenToDisconnect$: Epic<
  ReturnType<typeof disconnectSocket>,
  any, // @TODO: use typesafe-actions
  AppRootState
> = (actions$, state$) =>
  actions$.pipe(
    ofType(SocketActionType.disconnect),
    tap({ next: () => disconnect() }),
    ignoreElements()
  )

export const initializeOrders$: Epic<
  ReturnType<typeof initialize>,
  any, // @TODO: use typesafe-actions
  AppRootState
> = (actions$) =>
  actions$.pipe(
    ofType(initialize.type),
    tap({
      next: ({ payload }) => sendSubscribeMessage(payload),
    }),
    ignoreElements()
  )

export const toggleInitialize$: Epic<
  ReturnType<typeof toggleInitialize>,
  any, // @TODO: use typesafe-actions
  AppRootState
> = (action$, state$) =>
  action$.pipe(
    ofType(toggleInitialize.type),
    getFeedOperator(state$),
    tap({ next: ([_, feed]) => sendSubscribeMessage(feed, 'unsubscribe') }),
    map(([_, [market]]) =>
      initialize([
        market === MarketsEnum.btc ? MarketsEnum.eth : MarketsEnum.btc,
      ])
    )
  )

export const ordersEpic$ = combineEpics(
  listenToConnect$,
  listenToDisconnect$,
  initializeOrders$,
  toggleInitialize$
)
