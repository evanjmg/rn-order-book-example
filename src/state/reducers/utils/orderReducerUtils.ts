import { OrderSide } from 'src/models/OrderSide'
import { Order, Price } from 'src/models/OrderUpdateResponse'

export const createKey = (price: Price) => String(price)

export const mergeData = (
  side: OrderSide,
  orders: Order[],
  whaleOrder: Order | null
): { side: OrderSide; whaleOrder: Order | null } => {
  let editableSide = { ...side }
  let latestWhaleOrder = whaleOrder
  orders.forEach((order) => {
    const [price, size] = order
    const key = createKey(price)
    if (editableSide[key] && size === 0) {
      // remove from UI if size is 0
      delete editableSide[key]
    } else if (size > 0) {
      // store updated size
      editableSide[key] = size

      // save largest order for relative UI
      if (!latestWhaleOrder || size > latestWhaleOrder[1]) {
        latestWhaleOrder = order
      }
    }
  })
  return { side: editableSide, whaleOrder: latestWhaleOrder }
}
