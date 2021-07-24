import { Price } from './OrderUpdateResponse'

export interface BookItemCell {
  key: string
  priceString: string
  price: Price
  totalString: string
  sizeString: string
  relativeSize: number
}
