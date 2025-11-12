import { render, screen } from '@testing-library/react';
import App from './App';

test('renders status bar title', () => {
  render(<App />);
  const title = screen.getByText(/Memory Match/i);
  expect(title).toBeInTheDocument();
});
