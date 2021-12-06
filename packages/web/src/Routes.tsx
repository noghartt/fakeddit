// TODO: I don't know if renaming `Routes` as `Router` is a good idea, because
// someone that is reading this code can be confused with BrowserRouter. So, I
// think that, in the future, this will be changed.
import { Routes as Router, Route } from 'react-router-dom';

import { LoginRoutes } from './modules/users/LoginRoutes';
import { RequireAuthLayout } from './modules/auth/RequireAuthLayout';
import { FeedPage } from './modules/feed/FeedPage';

export const Routes = () => (
  <Router>
    <Route path="/*" element={<LoginRoutes />} />
    <Route element={<RequireAuthLayout />}>
      <Route path="/feed" element={<FeedPage />} />
    </Route>
  </Router>
);
