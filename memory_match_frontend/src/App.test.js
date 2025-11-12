import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders status bar title', () => {
  render(<App />);
  const title = screen.getByText(/Ocean Memory Match/i);
  expect(title).toBeInTheDocument();
});

test('first card can be flipped', () => {
  render(<App />);
  // Find a card button by role and label "Card hidden"
  const buttons = screen.getAllByRole('button', { name: /Card (hidden|revealed|matched)/i });
  expect(buttons.length).toBeGreaterThan(0);
  const first = buttons[0];
  // Initially not pressed
  expect(first).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(first);
  // After click, aria-pressed should be true (flipped or matched)
  expect(first).toHaveAttribute('aria-pressed', 'true');
});
