import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useAuth = (props) => {
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push(history.location.pathname);
    } else {
      history.push('/');
    }
  }, [currentUser, history]);

  return currentUser;
};

export default useAuth;
