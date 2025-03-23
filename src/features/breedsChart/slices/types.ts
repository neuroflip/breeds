type BreedsData = {
  name: string,
  value: number
}

type breedsChartAction = {
  type: string
  payload: Array<string>
}

type DogApiError = {
  status: string,
  message: string,
  code: number
}

export type { BreedsData, breedsChartAction, DogApiError }