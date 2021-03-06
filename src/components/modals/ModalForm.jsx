import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ModalForm = (props) => {
  const {
    hideModal,
    modalInfo,
    channels,
    dataSubmit,
    testid,
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

  const [authFailed, setAuthFailed] = useState(null);
  const inputValue = {
    adding: () => '',
    renaming: () => {
      const { name } = channels.find((c) => c.id === id);
      return name;
    },
  };

  const formik = useFormik({
    initialValues: { name: inputValue[type]() },
    validationSchema: channelSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { name } = values;
      try {
        dataSubmit({ id, name });
        setAuthFailed(null);
      } catch (e) {
        setSubmitting(false);
        inputField.current.select();
        setAuthFailed(t('errors.defaultError'));
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          data-testid={testid}
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          ref={inputField}
          required
          disabled={formik.isSubmitting}
          isInvalid={(formik.errors.name && formik.touched.name) || authFailed}
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.name) || authFailed}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="text-end">
        <Button role="button" name={t('modals.cancel')} className="btn btn-secondary m-2" disabled={formik.isSubmitting} type="button" onClick={hideModal}>{t('modals.cancel')}</Button>
        <Button role="button" name={t('modals.send')} className="btn btn-primary m-2" disabled={formik.isSubmitting} type="submit">{t('modals.send')}</Button>
      </div>
    </Form>
  );
};

export default ModalForm;
