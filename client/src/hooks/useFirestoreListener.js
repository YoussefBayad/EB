import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { firestore } from '../Firebase/utils';

const useFirestoreListener = (status) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === 'idle') return;
    else {
      firestore
        .collection('products')
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          let products = [];
          snapshot.docs.map((snap) =>
            products.push({ ...snap.data(), documentID: snap.id })
          );
          dispatch({
            type: 'products/fetchProducts/fulfilled',
            payload: products,
          });
        });
    }
  }, [status, dispatch]);
};

export default useFirestoreListener;
