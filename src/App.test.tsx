import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('render profile title', () => {
  const { getByRole } = render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  expect(getByRole('app')).toBeInTheDocument();
});
