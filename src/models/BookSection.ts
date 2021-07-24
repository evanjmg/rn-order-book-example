import { SectionType } from 'src/enums/SectionType'
import { BookItemCell } from './BookItemCell'

export type BookSectionData = { priceString: string }[] | BookItemCell[]

export interface BookSection {
  key: SectionType
  data: BookSectionData
}
