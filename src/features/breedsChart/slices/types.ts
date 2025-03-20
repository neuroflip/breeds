export type BreedsData = {
  name: string,
  images: number
}

export interface breedsChartAction {
  type: string
  payload: Array<string>
}