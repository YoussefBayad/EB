import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timestamp } from '../../Firebase/utils';
import Modal from '../../components/Modal';
import Button from '../../components/forms/Button';
import AdminProducts from '../../components/AdminProducts';
import Spinner from '../../components/Spinner';
import useFirestoreListener from '../../hooks/useFirestoreListener';
import { addProduct, deleteProduct } from '../../redux/Products/productsSlice';
import './index.scss';

const Admin = (props) => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
 
  const toggleModal = () => setShowModal(!showModal);
  
  const configModal = {
    showModal,
    toggleModal,
  };

  const initialValues = {
    category:'headphones',
    photoURL:'https://images-na.ssl-images-amazon.com/images/I/41GFa7W547L._AC_SY400_.jpg',
    name: 'Wireless Earpods:  Mini Bluetooth Earpods' ,
    price:82,
    wireless:true,
    wirelessCharging:true,
    waterProof:false,
    fullControl:true,
    eitherBudSolo:true,
    tile:true,
    totalCharge:6,
  }
 

 

  const onSubmit = (values) => {
    const {category, photoURL, price,name,wireless,wirelessCharging,waterProof,fullControl,eitherBudSolo,tile,totalCharge} = values;
    

    dispatch(
      addProduct({
        category,
        photoURL,
        name,
        price,
        count: 0,
        wireless,
        wirelessCharging,
        waterProof,
        fullControl,
        eitherBudSolo,
        tile,
        totalCharge,
        createdAt: timestamp(),
        deleteAble: true,
      })
    );
  setShowModal(false)
  };

  const onDeleteProduct = ({ documentID, deleteAble }) => {
    if (deleteAble === true) {
      dispatch(deleteProduct(documentID));
      setError(null);
    } else {
      setError('You can delete only the products you added');
      setTimeout(() => setError(null), 2000);
    }
  };

  useFirestoreListener(status);
  return (
    <div className="admin">
      <Modal {...configModal} onSubmit={onSubmit} initialValues={initialValues} task={"Add Product"} />
      <div className="manageProducts">
        <h1>Manage Products</h1>
        <div className="call-to-actions">
          <Button onClick={() => toggleModal()}>Add new product</Button>
        </div>
        {error && <h2 className="error">{error}</h2>}

        <Spinner status={status} style={{ margin: '5rem auto ' }} />
        
        <AdminProducts
          products={products}
          onDeleteProduct={onDeleteProduct}
          setError={setError}
        />
      </div>
    </div>
  );
};

export default Admin;
