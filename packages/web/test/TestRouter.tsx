import { useState, useLayoutEffect } from 'react';
import { Router } from 'react-router-dom';
import type { History } from 'history';

interface TestRouterProps {
  history: History;
  children: React.ReactNode;
  basename?: string;
}

export const TestRouter = ({
  history,
  basename,
  children,
}: TestRouterProps) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};
