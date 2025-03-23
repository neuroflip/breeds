import { afterAll, afterEach, beforeAll, describe, expect, test,vi } from 'vitest';
import { act, screen, waitFor } from '@testing-library/react';
import Card from '../Card';
import { configureStore } from '@reduxjs/toolkit';
import { breedsChartSlice, fetchBreeds } from '../../../features/breedsChart/slices/BreedsChartSlice';
import { renderWithProviders } from '../../../test-utils';
import { http, HttpResponse, delay } from 'msw'
import { setupServer, SetupServerApi } from 'msw/node'
import { BREAD_API, getFetchImageAPIUrl } from '../../../features/breedsChart/slices/utils';
import breedsData from './allBreeds.json'
import imagesData from './breedImages.json'

let server: SetupServerApi;
const mockStore = configureStore({
  reducer: {
    breedsChart: breedsChartSlice.reducer
  }
})

vi.mock('../../ErrorBox/ErrorBox')
vi.mock('../../LoadingSpinner/LoadingSpinner')

describe('Card Initial render and Load Content correctly', () => {
  beforeAll(() => {
    const handlers = [
      http.get(BREAD_API, async () => {
        await delay(150)
        return HttpResponse.json(breedsData)
      }),
      http.get(getFetchImageAPIUrl('affenpinscher'), async () => {
          await delay(150)
          return HttpResponse.json(imagesData)
      }),
      http.get(getFetchImageAPIUrl('african'), async () => {
          await delay(150)
          return HttpResponse.json(imagesData)
        })
    ]
    
    server = setupServer(...handlers)
    server.listen()
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('initial render before dispatch main action', () => {
    const { container } = renderWithProviders(<Card>
      Card Content
    </Card>, { store: mockStore });

    const cardElement = screen.getByRole('article');

    expect(cardElement).toBeInTheDocument();
    expect(cardElement.tagName).toBe('ARTICLE');
    expect(cardElement.className).toBe('card');
    expect(screen.queryByText('ErrorBox')).not.toBeInTheDocument();
    expect(screen.queryByText('LoadingSpinner')).not.toBeInTheDocument();

    //snapshot
    expect(container).toMatchSnapshot()
  });

  test('initial render before dispatch main action to check title renderProp is called', () => {
    const renderTitle = vi.fn()

    renderWithProviders(<Card renderTitle={renderTitle}>
      Card Content
    </Card>, { store: mockStore });

    const cardElement = screen.getByRole('article');

    expect(cardElement).toBeInTheDocument();
    expect(renderTitle).toHaveBeenCalled();
  });

  test('dispatch main action to load from API and add the card content', async () => {
    renderWithProviders(<Card>
      Card Content
    </Card>, { store: mockStore });
    
    await act(async () =>
      mockStore.dispatch(fetchBreeds())
    )

    waitFor(() => {
      expect(screen.queryByText('ErrorBox')).not.toBeInTheDocument();
      expect(screen.getByText('LoadingSpinner')).toBeInTheDocument();
    })

    const cardElement = screen.getByRole('article');

    expect(cardElement).toBeInTheDocument();
    expect(cardElement.className).toBe('card');
    expect(screen.queryByText('LoadingSpinner')).not.toBeInTheDocument()
    expect(screen.queryByText('ErrorBox')).not.toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  });
});

describe('Card Load Content correctly with error', () => {
  beforeAll(() => {
    const handlers = [
      http.get(BREAD_API, async () => {
        await delay(150)
        return new HttpResponse(null, { status: 401 })
      })
    ]
    
    server = setupServer(...handlers)
    server.listen()
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('dispatch main action and get a load error', async () => {
    renderWithProviders(<Card>
      Card Content
    </Card>, { store: mockStore });
    
    await act(async () =>
      mockStore.dispatch(fetchBreeds())
    )

    waitFor(() => {
      //waitsFor initial loading state
      expect(screen.queryByText('ErrorBox')).not.toBeInTheDocument();
      expect(screen.getByText('LoadingSpinner')).toBeInTheDocument();
    })

    const cardElement = screen.getByRole('article');

    expect(screen.queryByText('LoadingSpinner')).not.toBeInTheDocument()
    expect(screen.queryByText('Card Content')).not.toBeInTheDocument()
    expect(cardElement).toBeInTheDocument();
    expect(cardElement.className).toBe('card');
    expect(screen.getByText('ErrorBox')).toBeInTheDocument()

  })
});