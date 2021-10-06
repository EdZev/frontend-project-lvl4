import React, { useRef } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Modal, Form } from 'react-bootstrap';
import useServer from '../../hooks/useServer.jsx';
import store from '../../redux/store';
import { setCurrentChannelId } from '../../redux/index';

const ModalChannel = (props) => {
  const { hideModal, channels, modalInfo } = props;
  const { type, id } = modalInfo;
  const server = useServer();

  const inputField = useRef(null);

  const typeSubmit = {
    adding: ({ name }, { setSubmitting }) => {
      server.newChannel({ name }, (res) => {
        if (res.status === 'ok') {
          store.dispatch(setCurrentChannelId(res.data.id));
          hideModal();
          return;
        }
        setSubmitting(false);
      });
    },
    renaming: ({ name }, { setSubmitting }) => {
      server.renameChannel({ id, name }, ({ status }) => {
        if (status === 'ok') {
          hideModal();
          return;
        }
        setSubmitting(false);
      });
    },
  };

  const typeFieldName = {
    adding: () => ({ name: '' }),
    renaming: () => {
      const { name } = channels.find((c) => c.id === id);
      return { name };
    },
  };

  const channelNames = channels.map((c) => c.name);
  const channelSchema = yup.object().shape({
    name: yup.string()
      .required()
      .min(3, 'от 3 до 20 знаков')
      .max(20, 'от 3 до 20 знаков')
      .notOneOf(channelNames, 'имя канала должно быть уникальным'),
  });

  const FormNewChannel = () => (
    <Formik
      initialValues={typeFieldName[type]()}
      validationSchema={channelSchema}
      onSubmit={typeSubmit[type]}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              data-testid="input-body"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={isSubmitting}
              ref={inputField}
              required
              isInvalid={errors.name && touched.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name && touched.name && errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <input className="btn btn-primary mt-2" type="submit" value="submit" />
        </Form>
      )}
    </Formik>
  );

  const title = {
    adding: 'Add new channel',
    renaming: 'Rename channel',
  };
  return (
    <Modal show onHide={hideModal} onEntered={() => inputField.current.select()}>
      <Modal.Header closeButton>
        <Modal.Title>{title[type]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormNewChannel />
      </Modal.Body>
    </Modal>
  );
};

export default ModalChannel;
