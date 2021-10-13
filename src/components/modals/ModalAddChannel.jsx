import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useServer from '../../hooks/useServer.js';
import store from '../../redux/store';
import { setCurrentChannelId } from '../../redux/index';
import ModalForm from './ModalForm.jsx';

const ModalAddChannel = (props) => {
  const { hideModal, modalInfo, channels } = props;
  const { t } = useTranslation();
  const server = useServer();

  const dataSubmit = (values) => {
    server.newChannel(values, (res) => {
      if (res.status === 'ok') {
        store.dispatch(setCurrentChannelId(res.data.id));
        hideModal();
      }
    });
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addNewChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm
          hideModal={hideModal}
          modalInfo={modalInfo}
          channels={channels}
          dataSubmit={dataSubmit}
          testid="add-channel"
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
