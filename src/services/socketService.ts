import { bufferTime, filter, map } from 'rxjs/operators'
import { webSocket } from 'rxjs/webSocket'
import { OrderUpdateResponse } from 'src/models/OrderUpdateResponse'

const CRYPTO_FACILITIES_SOCKET_URL = 'wss://www.cryptofacilities.com/ws/v1'

export const BOOK_FEED = 'book_ui_1'
export const cryptoFacilitiesSocket = webSocket(CRYPTO_FACILITIES_SOCKET_URL)

export const sendSubscribeMessage = (
  product_ids: string[],
  event: string = 'subscribe'
) =>
  cryptoFacilitiesSocket.next({
    product_ids,
    event,
    feed: BOOK_FEED,
  })
export const disconnect = () => cryptoFacilitiesSocket.complete()
