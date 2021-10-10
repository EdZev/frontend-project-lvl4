import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useServer from '../../hooks/useServer.js';

const ModalRemoveChannel = (props) => {
  const { hideModal, modalInfo } = props;
  const { id } = modalInfo;
  const { t } = useTranslation();
  const server = useServer();

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
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <Form onSubmit={remove}>
          <div className="text-end">
            <button className="btn btn-secondary m-2" type="button" onClick={hideModal}>{t('modals.cancel')}</button>
            <button className="btn btn-primary m-2" type="submit">{t('modals.removing')}</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemoveChannel;
