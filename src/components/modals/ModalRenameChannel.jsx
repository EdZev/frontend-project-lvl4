import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Modal, Form } from 'react-bootstrap';
import useServer from '../../hooks/useServer.jsx';

const ModalRenameChannel = (props) => {
  const { hideModal, modalInfo, channels } = props;
  const server = useServer();
  const currentChannel = channels.find((c) => c.id === modalInfo.id);

  const inputField = useRef();
  useEffect(() => {
    inputField.current.select();
  });

  const FormRenameChannel = () => {
    const [invalid, setInvalid] = useState(false);
    const formik = useFormik({
      initialValues: { name: currentChannel.name },
      onSubmit: ({ name }) => {
        const matchCheck = channels.find((channel) => channel.name === name);
        if (matchCheck) {
          setInvalid(true);
          inputField.current.select();
          return;
        }
        server.renameChannel({ id: currentChannel.id, name }, ({ status }) => {
          if (status === 'ok') {
            hideModal();
          }
        });
      },
    });
    return (
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Control
            data-testid="input-body"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            ref={inputField}
            required
            isInvalid={invalid}
          />
          <Form.Control.Feedback type="invalid">
            Сhannel name mast be unique
          </Form.Control.Feedback>
        </Form.Group>
        <input className="btn btn-primary mt-2" type="submit" value="submit" />
      </Form>
    );
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Rename Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormRenameChannel />
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
