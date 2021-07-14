import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {Formik, Form , Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import ErrorText from '../../components/ErrorMessage'
import Button from '../../components/forms/Button';

import './styles.scss';

const Modal = ({ showModal, toggleModal, initialValues,onSubmit,task}) => {

 
  const validationSchema = Yup.object({
    name:Yup.string().required('This field is required'),
    price:Yup.number().min(0).max(500).required('This field is required'),
    totalCharge:Yup.number().min(1).max(48).required('This field is required'),
    photoURL:Yup.string().url().required('This field is required')
  })
  let values;
  if(initialValues.photoURL === null){
     values = {...initialValues, photoURL:''} 
  }else{
    values = {...initialValues}
  }
  return (
   <>
      {showModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="modal-overlay"
            onClick={() => toggleModal()}
          />
          <motion.div
            initial={{ opacity: 0  }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="modal"
          >
            <div className="addNewProductForm">
          <Formik 
                initialValues={values}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                >
                  {formik=>(
          <Form>
            <h2>Add new product</h2>
            <div>
            <label htmlFor="category"  >Category</label>
            <Field 
            as='select'
            name='category'
        
              
            >
              <option value="headphones">Headphones</option>
              <option value="earbuds">Earbuds</option>
              <option value="battery">Battery</option>
            </Field>
            </div>
            <div>
            <label htmlFor='name' >Name</label>
            <Field
              type="text"
              
              name='name'
            />
            <ErrorMessage name='name' component={ErrorText}/>
            </div>
            <div>
            <label htmlFor='photoURL'>Photo URL</label>
            <Field
              type="url"
              name='photoURL'
            />
            <ErrorMessage  name='photoURL' component={ErrorText}/>
            </div>
            <div>
            <label htmlFor='price' >Price</label>
            <Field
              type="number"
              name='price'
               
            />
            <ErrorMessage name='price' component={ErrorText}/>
            </div>
            <div>
            <label htmlFor='totalCharge'>Total Charge</label>
            <Field
              type="number"
              name='totalCharge'
              
            />
            <ErrorMessage name='totalCharge' component={ErrorText}/>
            </div>
            <label className='checkbox-label' htmlFor='wireless'>Wireless</label>
            <Field
              type="checkbox"
              name='wireless'
             
            />
            {formik.values.category !== 'battery' && (
              <>
                <label className='checkbox-label' htmlFor='waterProof'>Water Prof</label>

                <Field
                type="checkbox"
                name='waterProof'
                
                  
                />
                <ErrorMessage name='waterProof' component={ErrorText}/>
                <label className='checkbox-label' htmlFor='tile'>Tile</label>
                <Field
                   type="checkbox"
                   name='tile'
                 
                  
                />
                <ErrorMessage name='tile' component={ErrorText}/>
                <label className='checkbox-label' htmlFor='fullControl'>fullControl</label>
                <Field
                  type="checkbox"
                  name='fullControl'
                
                 
                />
                <ErrorMessage name='fullControl' component={ErrorText}/>
                <label className='checkbox-label' htmlFor='eitherBudSolo'>Either BudSolo</label>
                <Field
                  type="checkbox"
                  name='eitherBudSolo'
                
                  
                />

                <label className='checkbox-label' htmlFor='wirelessCharging'>Wireless Charging</label>
                <Field
                  
                  type="checkbox"
                  name='wirelessCharging'
                 
                />
              </>
            )}

            <Button type="submit">{task}</Button>
          </Form>
          )}
          </Formik>
        </div>
          </motion.div>
        </>
      )}
 </>
  );
  
};

export default Modal;
