import { render, screen } from '@testing-library/react';
import App from './App';

test('يتم عرض عنوان نموذج المستخدم', () => {
  render(<App />);
  const heading = screen.getByText(/نموذج المستخدم/i);
  expect(heading).toBeInTheDocument();
});
