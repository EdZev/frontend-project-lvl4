import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
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
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <Form onSubmit={remove}>
          <div className="text-end">
            <Button role="button" name={t('modals.cancel')} className="btn btn-secondary m-2" type="button" onClick={hideModal}>{t('modals.cancel')}</Button>
            <Button role="button" name={t('modals.removing')} className="btn btn-danger m-2" type="submit">{t('modals.removing')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemoveChannel;
