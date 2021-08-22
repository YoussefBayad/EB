import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/Modal';
import Button from '../../components/forms/Button';
import AdminProducts from '../../features/admin/AdminProducts';
import {
  addProduct,
  deleteProduct,
  fetchProducts,
} from '../../redux/products/productsSlice';
import './index.scss';

const Admin = (props) => {
  const dispatch = useDispatch();
  const {
    data: products,
    loading,
    message,
  } = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth.user._id);

  // fetch products
  useEffect(() => {
    if (products?.length > 0) return;
    dispatch(fetchProducts());
  }, [products.length, dispatch]);

  // model display state
  const [showModal, setShowModal] = useState(false);
  const configModal = {
    showModal,
    setShowModal,
  };

  // initial state
  const initialValues = {
    category: 'headphones',
    imageURL: '',
    name: 'Wireless Earpods:  Mini Bluetooth Earpods',
    price: 82,
    details: {
      wireless: true,
      wirelessCharging: true,
      waterProof: false,
      fullControl: true,
      eitherBudSolo: true,
      tile: true,
      totalCharge: 6,
    },
  };

  // add product
  const onSubmit = (values) => {
    const { name, price, category, imageURL, ...others } = values;
    console.log('values', values);

    dispatch(
      addProduct({
        user,
        name,
        price,
        imageURL,
        details: others,
      })
    );
    setShowModal(false);
  };

  // delete product
  const onDeleteProduct = (_id) => {
    dispatch(deleteProduct(_id));
  };

  return (
    <div className='admin'>
      <Modal
        {...configModal}
        onSubmit={onSubmit}
        initialValues={initialValues}
        task={'Add Product'}
      />
      <div className='manageProducts'>
        <h1>Manage Products</h1>
        <div className='call-to-actions'>
          <Button onClick={() => setShowModal(!showModal)} disabled={loading}>
            Add new product
          </Button>
        </div>
        {message && <h2 className='error'>{message}</h2>}
        <AdminProducts
          products={products}
          loading={loading}
          onDeleteProduct={onDeleteProduct}
        />
      </div>
    </div>
  );
};

export default Admin;
