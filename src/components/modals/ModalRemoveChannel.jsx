import React, { useEffect, useRef } from 'react';
import { Modal, Form } from 'react-bootstrap';
import useServer from '../../hooks/useServer.jsx';

const ModalRemoveChannel = (props) => {
  const { hideModal, modalInfo } = props;
  const server = useServer();
  const { id } = modalInfo;

  const inputField = useRef();
  useEffect(() => {
    inputField.current.focus();
  });

  const remove = (e) => {
    e.preventDefault();
    server.removeChannel({ id }, ({ status }) => {
      if (status === 'ok') {
        hideModal();
      }
    });
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Remove Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={remove}>
          <input className="btn btn-danger mt-2" ref={inputField} type="submit" value="submit" />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemoveChannel;
