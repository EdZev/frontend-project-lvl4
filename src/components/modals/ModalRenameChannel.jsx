import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useServer from '../../hooks/useServer.js';
import ModalForm from './ModalForm.jsx';

const ModalRenameChannel = (props) => {
  const { hideModal, modalInfo, channels } = props;
  const { t } = useTranslation();
  const server = useServer();

  const dataSubmit = (values) => {
    server.renameChannel(values, ({ status }) => {
      if (status === 'ok') {
        hideModal();
      }
    });
  };

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm
          hideModal={hideModal}
          modalInfo={modalInfo}
          channels={channels}
          dataSubmit={dataSubmit}
          testid="rename-channel"
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
