import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorText from '../../components/ErrorMessage';
import Button from '../../components/forms/Button';

import './styles.scss';
import axios from 'axios';

const Modal = ({ showModal, setShowModal, initialValues, onSubmit, task }) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const validationSchema = Yup.object({
    name: Yup.string().required('This field is required'),
    price: Yup.number().min(0).max(500).required('This field is required'),
    totalCharge: Yup.number().min(1).max(48),
    imageUrl: Yup.string(),
  });

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/upload', formData, config);
      setImageUrl(data);
      console.log('url', data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    <>
      {showModal && (
        <>
          <div
            className='modal-overlay'
            onClick={() => setShowModal(!showModal)}></div>
          <div className='modal'>
            <div className='addNewProductForm'>
              <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                  onSubmit({ ...values, imageUrl });
                }}
                validationSchema={validationSchema}>
                {(formik) => (
                  <Form>
                    <h2>{task}</h2>

                    <div>
                      <label htmlFor='category'>Category:</label>
                      <Field as='select' name='category'>
                        <option value='headphones'>Headphones</option>
                        <option value='earbuds'>Earbuds</option>
                        <option value='battery'>Battery</option>
                      </Field>
                    </div>
                    <div>
                      <label htmlFor='name'>Name :</label>
                      <Field type='text' name='name' />
                      <ErrorMessage name='name' component={ErrorText} />
                    </div>

                    <div>
                      <label htmlFor='price'>Price :</label>
                      <Field type='number' name='price' />
                      <ErrorMessage name='price' component={ErrorText} />
                    </div>
                    <div>
                      <label htmlFor='imageUrl'>Photo URL :</label>
                      <Field
                        name='imageUrl'
                        type='file'
                        onChange={(e) => uploadFileHandler(e)}
                      />
                      <ErrorMessage name='imageUrl' component={ErrorText} />
                    </div>
                    <div>
                      <label htmlFor='totalCharge'>Total Charge :</label>
                      <Field type='number' name='totalCharge' />
                      <ErrorMessage name='totalCharge' component={ErrorText} />
                    </div>
                    <div className='checkboxes'>
                      <div className='checkbox'>
                        <label className='checkbox-label' htmlFor='wireless'>
                          Wireless
                        </label>
                        <Field
                          type='checkbox'
                          name='wireless'
                          checked={Boolean(formik.values.details.wireless)}
                        />
                      </div>
                      {formik.values.category !== 'battery' && (
                        <>
                          <div className='checkbox'>
                            <label
                              className='checkbox-label'
                              htmlFor='waterProof'>
                              Water Prof
                            </label>

                            <Field
                              type='checkbox'
                              name='waterProof'
                              checked={Boolean(
                                formik.values.details.waterProof
                              )}
                            />
                          </div>

                          <div className='checkbox'>
                            <label className='checkbox-label' htmlFor='tile'>
                              Tile
                            </label>
                            <Field
                              type='checkbox'
                              name='tile'
                              checked={Boolean(formik.values.details.tile)}
                            />
                          </div>
                          <div className='checkbox'>
                            <label
                              className='checkbox-label'
                              htmlFor='fullControl'>
                              fullControl
                            </label>
                            <Field
                              type='checkbox'
                              name='fullControl'
                              checked={Boolean(
                                formik.values.details.fullControl
                              )}
                            />
                          </div>
                          <div className='checkbox'>
                            <label
                              className='checkbox-label'
                              htmlFor='eitherBudSolo'>
                              Either BudSolo
                            </label>
                            <Field
                              type='checkbox'
                              name='eitherBudSolo'
                              checked={Boolean(
                                formik.values.details.eitherBudSolo
                              )}
                            />
                          </div>
                          <div className='checkbox'>
                            <label
                              className='checkbox-label'
                              htmlFor='wirelessCharging'>
                              Wireless Charging
                            </label>
                            <Field
                              type='checkbox'
                              name='wirelessCharging'
                              checked={Boolean(
                                formik.values.details.wirelessCharging
                              )}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    {uploading ? (
                      <Button type='submit' disabled>
                        Uploading
                      </Button>
                    ) : (
                      <Button type='submit'>{task}</Button>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
