import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders Pagination with given start page as selected', () => {
    render(<Pagination page={1} pageSize={20} totalItems={100} />);

    expect(
      screen.getByRole('listitem', {
        name: /page 1/i,
      })
    ).toBeDefined();

    expect(
      screen
        .getByRole('listitem', {
          name: /page 1/i,
        })
        .hasAttribute('data-selected')
    ).toBeTruthy();
  });

  it('clicking Next changes the current page', async () => {
    const mockedFn = vi.fn();

    render(
      <Pagination
        page={1}
        pageSize={20}
        totalItems={100}
        onPageChange={mockedFn}
      />
    );

    const nextCTA = screen.getByRole('listitem', {
      name: /page 2/i,
    });

    act(() => {
      fireEvent.click(nextCTA);
    });

    await waitFor(() => expect(mockedFn).toHaveBeenCalled());

    return expect(
      screen
        .getByRole('listitem', {
          name: /page 2/i,
        })
        .hasAttribute('data-selected')
    ).toBeTruthy();
  });
});
