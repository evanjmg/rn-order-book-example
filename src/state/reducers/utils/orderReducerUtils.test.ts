import { mergeData } from './orderReducerUtils'
import { omit } from 'ramda'
import { Order } from 'src/models/OrderUpdateResponse'
const MOCK_KEY = '33764'
const MOCK_NUMBER = parseInt(MOCK_KEY, 10)
const MOCK_SIDE = {
  '33759': 470212,
  '33764': 470153,
  '33767': 470165,
  '33774': 470120,
  '33882': 317125,
  '34005': 1930,
  '34051': 2061,
}
describe('Order Reducer Utils', () => {
  describe('mergeData', () => {
    it('remove from UI if size is 0', () => {
      const side = omit([MOCK_KEY], MOCK_SIDE)
      const whaleOrder: Order = [33767, 470165]
      expect(mergeData(MOCK_SIDE, [[MOCK_NUMBER, 0]], whaleOrder)).toEqual({
        side,
        whaleOrder,
      })
    })
    it('should update when key exists', () => {
      const side = { ...MOCK_SIDE, [MOCK_KEY]: 10 }
      const whaleOrder: Order = [33767, 470165]
      expect(mergeData(MOCK_SIDE, [[MOCK_NUMBER, 10]], whaleOrder)).toEqual({
        side,
        whaleOrder,
      })
    })
    it('should add when no key exists', () => {
      const side = omit([MOCK_KEY], MOCK_SIDE)
      const whaleOrder: Order = [33767, 470165]
      expect(
        mergeData(side, [[MOCK_NUMBER, MOCK_SIDE[MOCK_KEY]]], whaleOrder)
      ).toEqual({
        side: MOCK_SIDE,
        whaleOrder,
      })
    })
  })
})
