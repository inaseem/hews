import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Article from '../Article';

describe('Article', () => {
  it('renders Article with given data', () => {
    render(
      <Article
        commentsCount={76}
        createdAt="2006-10-09T18:21:51.000Z"
        createdBy="sam"
        onClick={() => null}
        title="LK99 discovered"
        upvotesCount={456}
      />
    );

    expect(
      screen.getByRole('heading', {
        name: /LK99 discovered/i,
      })
    ).toBeDefined();
  });

  it('clicking Article invokes click handler', () => {
    const mockedFn = vi.fn();
    render(
      <Article
        commentsCount={76}
        createdAt="2006-10-09T18:21:51.000Z"
        createdBy="sam"
        onClick={mockedFn}
        title="LK99 discovered"
        upvotesCount={456}
      />
    );

    screen
      .getByRole('heading', {
        name: /LK99 discovered/i,
      })
      .click();

    expect(mockedFn).toHaveBeenCalledOnce();
  });
});
