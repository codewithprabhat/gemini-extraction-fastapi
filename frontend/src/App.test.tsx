import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders select document page heading', () => {
  render(<App />);
  const heading = screen.getByText(/select/i);
  expect(heading).toBeInTheDocument();
});
