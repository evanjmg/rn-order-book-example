import { bufferTime, filter, map } from 'rxjs/operators'
import { webSocket } from 'rxjs/webSocket'
import { OrderUpdateResponse } from 'src/models/OrderUpdateResponse'

const CRYPTO_FACILITIES_SOCKET_URL = 'wss://www.cryptofacilities.com/ws/v1'

export const BOOK_FEED = 'book_ui_1'
export const BUFFER_TIME = 2000
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

export const isBookFeed = (res: unknown): boolean => {
  if (typeof res !== 'object' || res === null) {
    return false
  }
  const maybeUpdate = res as OrderUpdateResponse
  return !!maybeUpdate.asks && !!maybeUpdate.bids
}

export const listenToBookFeed$ = cryptoFacilitiesSocket.pipe(
  filter(isBookFeed),
  bufferTime(BUFFER_TIME)
)
