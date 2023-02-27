import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import '@testing-library/jest-dom/extend-expect';

test('Renderira ispravne navigacijske linkove za odjavljene korisnike', () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ loggedIn: false }}>
        <Navbar />
      </AuthContext.Provider>
    </BrowserRouter>
  );
  const registerLink = screen.getByText('Registirajte se');
  const loginLink = screen.getByText('Prijavite se');
  expect(registerLink).toBeInTheDocument();
  expect(loginLink).toBeInTheDocument();
});

test('Renderira ispravne navigacijske linkove za prijavljene korisnike', () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ loggedIn: true }}>
        <Navbar />
      </AuthContext.Provider>
    </BrowserRouter>
  );
  const logoutBtn = screen.getByText('Odjavite se');
  expect(logoutBtn).toBeInTheDocument();
});