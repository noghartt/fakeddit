import { Routes, Route } from 'react-router-dom';

import { LoginLayout } from './LoginLayout';

import { LoginPage } from './LoginPage';
import { SignupPage } from './SignupPage';

export const LoginRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginLayout />}>
      <Route index element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
    </Route>
  </Routes>
);
