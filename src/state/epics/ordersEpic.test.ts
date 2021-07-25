import { of, Subject } from 'rxjs'
import { marbles } from 'rxjs-marbles/jest'
import { MarketsEnum } from 'src/enums/MarketsEnum'
import {
  DEFAULT_STATE,
  initialize,
  toggleInitialize,
} from '../reducers/ordersReducer'

const mockSend = jest.fn()
const mockSubject = new Subject()

jest.mock('../../services/socketService', () => ({
  sendSubscribeMessage: mockSend,
  cryptoFacilitiesSocket: mockSubject,
}))

// example marble test - would test all normally
describe('Orders Epic', () => {
  it(
    'toggleInitialize$: should unsubscribe from current market and initialize ther market',
    marbles((m) => {
      const { toggleInitialize$ } = require('./ordersEpic')
      const actions$ = m.cold('a', { a: toggleInitialize() })
      const state$ = of({ orders: DEFAULT_STATE })
      m.expect(toggleInitialize$(actions$, state$)).toBeObservable(
        m.cold('a', { a: initialize([MarketsEnum.eth]) })
      )
      m.flush()
      expect(mockSend).toHaveBeenCalledTimes(1)
      expect(mockSend).toHaveBeenCalledWith([MarketsEnum.btc], 'unsubscribe')
    })
  )
})
