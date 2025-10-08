import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header title or FAB', () => {
  render(<App />);
  const title = screen.getByText(/Notes Pro/i);
  const fab = screen.getByTestId('fab');
  expect(title || fab).toBeTruthy();
});
