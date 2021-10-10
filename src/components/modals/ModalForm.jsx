import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ModalForm = (props) => {
  const {
    hideModal,
    modalInfo,
    channels,
    dataSubmit,
  } = props;
  const { type, id } = modalInfo;
  const { t } = useTranslation();

  const inputField = useRef(null);
  useEffect(() => {
    inputField.current.select();
  }, []);

  const channelNames = channels.map((c) => c.name);
  const channelSchema = yup.object().shape({
    name: yup.string()
      .required()
      .min(3, 'errors.channelLength')
      .max(20, 'errors.channelLength')
      .notOneOf(channelNames, 'errors.channelName'),
  });

  const [authFailed, setAuthFailed] = useState({ status: false, errors: '' });
  const inputValue = {
    adding: () => '',
    renaming: () => {
      const { name } = channels.find((c) => c.id === id);
      return name;
    },
  };

  const formik = useFormik({
    initialValues: { name: inputValue[type]() },
    onSubmit: async (values) => {
      const { name } = values;
      try {
        await channelSchema.validate(values);
        setAuthFailed({ status: false, errors: '' });
        dataSubmit({ id, name });
      } catch (e) {
        const errorMessage = () => {
          if (e.errors) {
            const [errMessage] = e.errors;
            return t(errMessage);
          }
          return t('errors.defaultError');
        };
        inputField.current.select();
        setAuthFailed({ status: true, errors: errorMessage() });
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          data-testid="input-body"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          ref={inputField}
          required
          isInvalid={authFailed.status}
        />
        <Form.Control.Feedback type="invalid">
          {authFailed.errors}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="text-end">
        <button className="btn btn-secondary m-2" type="button" onClick={hideModal}>{t('modals.cancel')}</button>
        <button className="btn btn-primary m-2" type="submit">{t(`modals.${type}`)}</button>
      </div>
    </Form>
  );
};

export default ModalForm;
