import { render, screen } from '@testing-library/react';
import AppRouter from './AppRouter';

test('renders login heading', () => {
  render(<AppRouter />);
  const title = screen.getByText(/Memory Match/i);
  expect(title).toBeInTheDocument();
});
