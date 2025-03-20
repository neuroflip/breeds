export type BreedsData = {
  name: string,
  images: number
}

/*interface breedsChartActionPayload {
  breeds: Array<string>
}*/


export interface breedsChartAction {
  type: string
  payload: Array<string>
}