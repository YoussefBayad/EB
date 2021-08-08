import React, { useState } from 'react';
import Modal from '../Modal';
import { useDispatch } from 'react-redux';
import edit from './../../assets/icon/edit.svg';
import { editProduct } from '../../redux/Products/productsSlice';

const CreatModal = ({ initialValues, task, setError }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(editProduct({ ...values }));
    setShowModal(!showModal);
  };
  const onclick = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <img
        className='edit'
        src={edit}
        alt='edit'
        onClick={() => onclick(initialValues.deleteAble)}
      />
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        initialValues={initialValues}
        onSubmit={onSubmit}
        task={task}
      />
    </>
  );
};

export default CreatModal;
