import { describe, expect, test } from 'vitest';
import { selectBreedsByImagePercentage, selectTotalImagesAmount } from '../../../slices/selectors';
import { AppState } from '../../../../../store/types';
import longData from './longBreadsData.json'
import shortData from './breadsData.json'
import expectedValuesForLongData from './expectedValuesForLongData.json'
import expectedValuesForShortData from './expectedValuesForShortData.json'

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
