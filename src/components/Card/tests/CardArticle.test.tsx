import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardArticle from '../styled/CardArticle';

describe('CardArticle', () => {
  test('initial render', () => {
    render(<CardArticle />)

    const article = screen.getByRole('article')

    expect(article).toBeInTheDocument()
    expect(article).toHaveStyle(`width: auto;
      max-width: 600px;
      height: 100%;
      margin: 25px;
      border-radius: 15px;
      background-color: var(--tertiary);
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      padding: 15px;`)
  });
});
