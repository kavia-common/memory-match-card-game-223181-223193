import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import ThemeSelect from './pages/ThemeSelect';
import SelectMode from './pages/SelectMode';
import GamePage from './pages/GamePage';

/**
 * PUBLIC_INTERFACE
 * RequireUsername ensures that a username is present; otherwise redirects to /login.
 */
function RequireUsername() {
  const { username } = React.useContext(AppContext);
  const location = useLocation();
  if (!username) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

/**
 * PUBLIC_INTERFACE
 * AppRouter wires up routes for login, theme selection, mode selection, and game.
 */
export default function AppRouter() {
  return (
    <AppProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route element={<RequireUsername />}>
              <Route path="/theme" element={<ThemeSelect />} />
              <Route path="/select" element={<SelectMode />} />
              <Route path="/game" element={<GamePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>
  );
}
