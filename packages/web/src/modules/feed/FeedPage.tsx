import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export const FeedPage = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const handleLogout = () => {
    signout(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div>
      <h1>You're logged in!</h1>
      <button onClick={handleLogout}>Log out!</button>
    </div>
  );
};
