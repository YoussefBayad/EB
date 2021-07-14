import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth, handleUserProfile } from '../Firebase/utils';
import { authChange } from '../redux/User/userSlice';

const useAuthListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          dispatch(
            authChange({
              id: snapshot.id,
              ...snapshot.data(),
            })
          );
        });
      } else {
        dispatch(authChange(null));
      }
    });
    return () => {
      authListener();
    };
  }, [dispatch]);
  return;
};

export default useAuthListener;
