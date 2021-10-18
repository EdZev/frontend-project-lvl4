import {
  Button,
  Col,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import store from '../redux/store.js';
import { setCurrentChannelId } from '../redux/index.js';
import getModals from './modals/index.js';

const Channel = (props) => {
  const { t } = useTranslation();
  const {
    data,
    currentChannelId,
    showModal,
  } = props;
  const { id, name, removable } = data;
  const activeChannel = id === currentChannelId;
  const buttonStyle = activeChannel ? 'secondary' : 'light';
  const channelClassNames = cn('rounded-0', 'text-left', 'text-truncate', 'my-1');
  return (
    <Dropdown key={id} as={ButtonGroup}>
      <Button
        role="button"
        name={name}
        className={channelClassNames}
        variant={buttonStyle}
        onClick={() => store.dispatch(setCurrentChannelId(id))}
      >
        <span>#</span>
        {name}
      </Button>
      {(removable && (
        <>
          <Dropdown.Toggle aria-haspopup="true" split variant={buttonStyle} className="flex-grow-0 my-1 rounded-end" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal('renaming', id)}>{t('channel.rename')}</Dropdown.Item>
            <Dropdown.Item onClick={() => showModal('removing', id)}>{t('channel.remove')}</Dropdown.Item>
          </Dropdown.Menu>
        </>
      ))}
    </Dropdown>
  );
};

const Channels = (props) => {
  const {
    channels,
    currentChannelId,
    showModal,
  } = props;
  return (
    <ButtonGroup vertical className="w-100 overflow-hidden">
      {channels.map((channel) => (
        <Channel
          key={channel.id}
          data={channel}
          currentChannelId={currentChannelId}
          showModal={showModal}
        />
      ))}
    </ButtonGroup>
  );
};

const renderModal = ({ hideModal, modalInfo, channels }) => {
  if (!modalInfo.type) return null;
  const Modal = getModals(modalInfo.type);
  return <Modal hideModal={hideModal} modalInfo={modalInfo} channels={channels} />;
};

const ChannelsBox = () => {
  const { t } = useTranslation();
  const [modalInfo, setModalInfo] = useState({ type: null, id: null });
  const { channels, currentChannelId } = useSelector((state) => state.chat);
  const hideModal = () => setModalInfo({ type: null, id: null });
  const showModal = (type, id = null) => setModalInfo({ type, id });
  return (
    <Col className="col-4 col-md-2 border-right pt-4 px-0">
      <div className="d-flex justify-content-between mb-2 px-2 align-text-bottom">
        <h4 className="mb-0 mt-1">{t('channels')}</h4>
        <Button className="border" variant="light" onClick={() => showModal('adding')}>+</Button>
      </div>
      <Channels
        channels={channels}
        currentChannelId={currentChannelId}
        showModal={showModal}
      />
      {renderModal({ hideModal, modalInfo, channels })}
    </Col>
  );
};

export default ChannelsBox;
