import { describe, expect, test } from 'vitest';
import { selectBreedsByImagePercentage, selectTotalImagesAmount } from '../../../slices/selectors';
import { AppState } from '../../../../../store/types';
import longData from './longBreadsData.json'
import shortData from './breadsData.json'

const expectedValuesForLongData = [
  { name: 'Breed3', value: 12.5 },
  { name: 'Breed6', value: 12.5 },
  { name: 'Breed9', value: 12.5 },
  { name: 'Breed12', value: 12.5 },
  { name: 'Breed1', value: 7.5 },
  { name: 'Breed4', value: 7.5 },
  { name: 'Breed7', value: 7.5 },
  { name: 'Breed10', value: 7.5 },
  { name: 'Breed2', value: 5 },
  { name: 'Breed5', value: 5 }
];

const expectedValuesForShortData = [
  { name: 'Breed3', value: 50 },
  { name: 'Breed1', value: 30 },
  { name: 'Breed2', value: 20 }
];

describe('Calculated selectors', () => {
  test('selectTotalImagesAmount using logData', () => {
    const state: AppState = {
      breedsChart: {
        breeds: longData,
        isLoading: false,
        error: null
      }
    }

    const result = selectTotalImagesAmount(state)

    expect(result).toBe(400)
  })

  test('selectBreedsByImagePercentage with less than 10 elements', () => {
    const state: AppState = {
      breedsChart: {
        breeds: shortData,
        isLoading: false,
        error: null
      }
    }

    const result = selectBreedsByImagePercentage(state)

    expect(result.length).toBe(3);
    for (let i=0; i<3; i++) {
      expect(result[i].name).toBe(expectedValuesForShortData[i].name);
      expect(result[i].value).toBe(expectedValuesForShortData[i].value);
    }
  });

  test('selectBreedsByImagePercentage with more than 10 elements', () => {
    const state: AppState = {
      breedsChart: {
        breeds: longData,
        isLoading: false,
        error: null
      }
    }

    const result = selectBreedsByImagePercentage(state)

    expect(result.length).toBe(10);
    for (let i=0; i<9; i++) {
      expect(result[i].name).toBe(expectedValuesForLongData[i].name);
      expect(result[i].value).toBe(expectedValuesForLongData[i].value);
    }
  });
 
});
