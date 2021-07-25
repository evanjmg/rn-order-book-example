import { OrderUpdateResponse } from 'src/models/OrderUpdateResponse'
import { bufferTime, filter } from 'rxjs/operators'
import { cryptoFacilitiesSocket } from './socketService'

const BUFFER_TIME = 1000

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
